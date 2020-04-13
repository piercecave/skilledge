"use strict";

async function setResult(req, res) {

    try {

        // Insert user and skill connection into User_Skills
        const updateEventResultQuery = `
            UPDATE Events 
            SET 
                ResultID = ?
            WHERE
                EventID = ?;
        `
        await req.db.query(updateEventResultQuery, [req.body.resultid, req.params.eventid]);

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

async function addReasons(req, res) {

    try {

        for (const reason of req.body) {
            // Insert user and skill connection into User_Skills
            const insertEventReasonQuery = "INSERT INTO Event_Reason(EventID, ReasonID) VALUES(?,?)"
            await req.db.query(insertEventReasonQuery, [req.params.eventid, reason.ReasonID]);
        }

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("Event and reason connections successfully added.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add reasons to event.");
        req.db.end();
        return;
    }
}

async function getReasons(req, res) {

    try {
        // Get skills for user
        const selectReasonsQuery = `
        SELECT R.ReasonID, R.ReasonName, R.ReasonDesc
        FROM Event_Reason AS ER
            JOIN Reasons AS R ON R.ReasonID = ER.ReasonID
        WHERE ER.EventID = ?
        `
        
        const eventReasons = await req.db.query(selectReasonsQuery, [req.params.eventid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(200).json(eventReasons);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not get reasons for event.");
        req.db.end();
        return;
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    setResult,
    addReasons,
    getReasons
}