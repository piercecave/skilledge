"use strict";

const { Credentials } = require("./../models/user");
const { getUserByEmail } = require("./db_requests");

async function createNewSession(req, res) {

    // Parse credentials
    // Get user by email
    // Authenticate user
    // Pass new session
    // Get user ip address
    // Log new user sign in
    // Return to user

    try {
        var credentials = new Credentials(req.body);

        var user = await getUserByEmail(req.db, credentials.email);

        var testMatch = await user.authenticate(credentials.password);

        if (testMatch) {
            req.session.key = credentials.email;
        } else {
            throw new Error("Password not valid");
        }

        req.db.end();

        res.status(201).json(user.nonSensitiveInfo());

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not log-in.");
        req.db.end();
        return;
    }
}

async function deleteExistingSession(req, res) {

    try {
        req.session.destroy(function (err) {
            if (err) {
                throw new Error("Could not log out.")
            } else {
                res.set("Content-Type", "text/plain");
                res.status(200).send("Logged out.");
            }
        });

        req.db.end();
    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not log-out.");
        req.db.end();
        return;
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    createNewSession,
    deleteExistingSession
}