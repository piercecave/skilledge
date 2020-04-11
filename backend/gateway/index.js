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

const db = require("./middleware/db");
const { checkIsLoggedIn } = require("./middleware/auth");
const cors = require("./middleware/cors");

const users = require("./handlers/users");
const skills = require("./handlers/skills");
const habits = require("./handlers/habits");
const events = require("./handlers/events");
const sessions = require("./handlers/sessions");

const app = express();
const cookie = {
  sameSite: "none",
  maxAge: 86400 * 30
}
if (process.env.ENV.localeCompare("DEVELOPMENT") != 0) {
  var privateKey = fs.readFileSync(process.env.TLSKEY, 'utf8');
  var certificate = fs.readFileSync(process.env.TLSCERT, 'utf8');
  var credentials = { key: privateKey, cert: certificate };
  var forceSsl = require('express-force-ssl');
  // Forces a secure connection
  app.use(forceSsl);
  cookie = {
    sameSite: "none",
    maxAge: 86400 * 30
  }
}

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
  cookie: cookie,
  store: new redisStore({ host: 'redisserver', port: 6379, client: redisClient, ttl: 86400 * 30 }),
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

// creating a new user
app.post("/users", users.createNewUser);
// getting all skills for a user
app.get("/users/skills", checkIsLoggedIn, users.getUserSkills);
// adding a skill to a user
app.post("/users/skills/:skillid", checkIsLoggedIn, users.addSkill);
// // getting all habits for a user
// app.get("/users/habits", checkIsLoggedIn, users.getUserHabits);
// creating a habit for a specific skill for a specific user
app.post("/users/skills/:skillid/habits", checkIsLoggedIn, skills.addHabit);
// getting all events for a user
app.get("/users/events", checkIsLoggedIn, users.getUserEvents);
// getting all events for a certain day for a user
app.get("/users/events/:date", checkIsLoggedIn, users.getUserEventsForDay);
// // creating an event for a habit
// app.post("/habits/:habitid/events", checkIsLoggedIn, habits.addEvent);
// reporting a result for an event
app.patch("/events/:eventid/result", checkIsLoggedIn, events.setResult);
// adding a reason for an event's result
app.post("/events/:eventid/reasons", checkIsLoggedIn, events.addReason);

// logging in and logging out
app.post("/sessions", sessions.createNewSession);
app.delete("/sessions", sessions.deleteExistingSession);

// getting all skills
app.get("/skills", skills.getAllSkills);

http.createServer(app).listen(80);
https.createServer(credentials, app).listen(443);
console.log("Server up and running!");