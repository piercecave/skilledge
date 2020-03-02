"use strict";

const dbUser = require("./../helpers/dbUser");

async function setResult(req, res) {

    try {

        // Insert user and skill connection into User_Skills
        const insertEventReasonQuery = "INSERT INTO Result_Reason(ResultID, ReasonID) VALUES(?,?)"
        await req.db.query(insertEventReasonQuery, [req.params.eventid, req.body.reasonid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("Event and reason connection successfully added.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add reason to event.");
        req.db.end();
        return;
    }
}

async function addReason(req, res) {

    try {

        // Insert user and skill connection into User_Skills
        const insertEventReasonQuery = "INSERT INTO Result_Reason(ResultID, ReasonID) VALUES(?,?)"
        await req.db.query(insertEventReasonQuery, [req.params.eventid, req.body.reasonid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("Event and reason connection successfully added.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add reason to event.");
        req.db.end();
        return;
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    setResult,
    addReason
}