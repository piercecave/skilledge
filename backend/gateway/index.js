"use strict";

var fs = require('fs');
var http = require('http');
var https = require('https');

const express = require("express");
const multer = require("multer");

const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient(6379, "redisserver");
const redisStore = require('connect-redis')(session);

redisClient.on('error', (err) => {
  console.log('Redis Error: ', err);
});

var privateKey  = fs.readFileSync(process.env.TLSKEY, 'utf8');
var certificate = fs.readFileSync(process.env.TLSCERT, 'utf8');
var credentials = {key: privateKey, cert: certificate};
var forceSsl = require('express-force-ssl');

const db = require("./middleware/db");
const { checkIsLoggedIn } = require("./middleware/auth");

const users = require("./handlers/users");
const sessions = require("./handlers/sessions");
const cors = require("./middleware/cors");

const app = express();

// Forces a secure connection
app.use(forceSsl);
// JSON parsing for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// JSON parsing for application/json
app.use(express.json());
// JSON parsing for multipart/form-data (required with FormData)
app.use(multer().none());
// Add CORS headers
app.use(cors.setHTTPHeaders);

app.use(session({
  secret: 'redissessionsecret',
  name: 'RedisSessionDB',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: new redisStore({ host: 'redisserver', port: 6379, client: redisClient, ttl: 86400 }),
}));

// Establish a connection with the database and pass the connection 
// along in the request object
app.use(db.getDB);

// ----- API Routes -----

async function handleHome(req, res) {
  console.log("Just heard something bruh!");
  req.db.end();
  res.set("Content-Type", "text/plain");
  res.status(200).send("I heard you bruh.");
}

app.get("/", checkIsLoggedIn, handleHome);

// Handle creating a new user
app.post("/users", users.createNewUser);
app.post("/sessions", sessions.createNewSession);
app.delete("/sessions", sessions.deleteExistingSession);

http.createServer(app).listen(80);
https.createServer(credentials, app).listen(443);