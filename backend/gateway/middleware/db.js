"use strict";

// POSSIBLY IMPLEMENT CONNECTION POOL SO SIGHT STOPS ERRORING OUT

const mysql = require("promise-mysql");

async function getDB(req, res, next) {
  try {
    // Create connection with database
    let db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      debug: true
    });

    // Store reference to DB connection in request object so 
    // handler functions can use the connection
    req.db = db;
    next();
  } catch (err) {
    console.error(err);
    res.set("Content-Type", "text/plain");
    res.status(500).send("Server Error: Cannot connect to database.");
    return
  }
}

module.exports = {
  getDB
}