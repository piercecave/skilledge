"use strict";

const { NewUser } = require("./../models/user");
const dbUser = require("./../helpers/dbUser");

async function createNewUser(req, res) {

    // Generate new user from request data
    // Validate user inputted valid data
    // Generate user from newuserobject
    // Insert new user into mysql database
    // Remove sensitive data from user
    // Return user json to user via http response

    try {
        var newUser = new NewUser(req.body);
        newUser.validate();

        const userToInsert = await newUser.toUser();

        const insertQuery = "INSERT INTO Users(Email, PassHash, UserName, FirstName, LastName, PhotoURL) VALUES(?,?,?,?,?,?)"
        const insertResult = await req.db.query(insertQuery, [userToInsert.email, userToInsert.passHash, userToInsert.userName, userToInsert.firstName, userToInsert.lastName, userToInsert.photoURL]);
        userToInsert.ID = insertResult.insertId;

        req.db.end();
        res.status(201).json(userToInsert.nonSensitiveInfo());

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not generate new user.");
        req.db.end();
        return;
    }
}

async function addSkill(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Insert user and skill connection into User_Skills
        const insertUserSkillQuery = "INSERT INTO User_Skill(UserID, SkillID) VALUES(?,?)"
        await req.db.query(insertUserSkillQuery, [loggedInUser.ID, req.params.skillid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("User and skill connection successfully added.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add skill for user.");
        req.db.end();
        return;
    }
}

async function getUserSkills(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Get skills for user
        const selectSkillsQuery = `
        SELECT S.SkillID, S.SkillName, S.SkillDesc
        FROM User_Skill AS US
            JOIN Users AS U ON US.UserID = U.ID
            JOIN Skills AS S ON S.SkillID = US.SkillID
        WHERE U.ID = ?
        `
        
        const userSkills = await req.db.query(selectSkillsQuery, [loggedInUser.ID]);

        req.db.end();
        res.set("Content-Type", "application/json");
        res.status(200).json(userSkills);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not get skills for user.");
        req.db.end();
        return;
    }
}

async function getUserEvents(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Get events for user
        const selectEventsQuery = `
        SELECT S.SkillID, S.SkillName, H.HabitID, H.HabitAction, H.HabitTime, H.HabitLocation, E.EventID, E.EventDate, R.ResultID, R.ResultName
        FROM Results AS R
            JOIN Events AS E ON R.ResultID = E.ResultID
            JOIN Habits AS H ON E.HabitID = H.HabitID
            JOIN User_Skill AS US ON H.UserSkillID = US.UserSkillID
            JOIN Users AS U ON US.UserID = U.ID
            JOIN Skills AS S ON S.SkillID = US.SkillID
        WHERE U.ID = ?
        `
        
        const userEvents = await req.db.query(selectEventsQuery, [loggedInUser.ID]);

        req.db.end();
        res.set("Content-Type", "application/json");
        res.status(200).json(userEvents);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add skill for user.");
        req.db.end();
        return;
    }
}

async function getUserEventsForDay(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Get events for day
        const selectEventsQuery = `
        SELECT S.SkillID, S.SkillName, H.HabitID, H.HabitAction, H.HabitTime, H.HabitLocation, E.EventID, E.EventDate, R.ResultID, R.ResultName
        FROM Results AS R
            JOIN Events AS E ON R.ResultID = E.ResultID
            JOIN Habits AS H ON E.HabitID = H.HabitID
            JOIN User_Skill AS US ON H.UserSkillID = US.UserSkillID
            JOIN Users AS U ON US.UserID = U.ID
            JOIN Skills AS S ON S.SkillID = US.SkillID
        WHERE U.ID = ? 
            AND E.EventDate = ?
        `
        
        const userEvents = await req.db.query(selectEventsQuery, [loggedInUser.ID, req.params.date]);

        req.db.end();
        res.set("Content-Type", "application/json");
        res.status(200).json(userEvents);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add skill for user.");
        req.db.end();
        return;
    }
}

async function addSleepReport(req, res) {

    try {
        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Insert user and skill connection into User_Skills
        const insertSleepReportQuery = "INSERT INTO Sleep_Reports(UserID, SleepReportDate, SleepValueID) VALUES(?,?,?)"
        await req.db.query(insertSleepReportQuery, [loggedInUser.ID, req.body.sleepreportdate, req.body.sleepvalueid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("Sleep report successfully added for user.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add sleep report for user.");
        req.db.end();
        return;
    }
}

async function getSleepReports(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Get skills for user
        const selectSkillsQuery = `
        SELECT SR.SleepReportID, SR.SleepReportDate, SR.SleepValueID, SV.SleepValueID, SV.SleepValueName, SV.SleepValueDesc
        FROM Sleep_Reports AS SR
            JOIN Sleep_Values AS SV ON SV.SleepValueID = SR.SleepValueID
        WHERE SR.UserID = ?
        `
        
        const userSleepReports = await req.db.query(selectSkillsQuery, [loggedInUser.ID]);

        req.db.end();
        res.set("Content-Type", "application/json");
        res.status(200).json(userSleepReports);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not get sleep reports for user.");
        req.db.end();
        return;
    }
}

async function getSleepReportForDate(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Get skills for user
        const selectSkillsQuery = `
        SELECT SR.SleepReportID, SR.SleepReportDate, SR.SleepValueID, SV.SleepValueID, SV.SleepValueName, SV.SleepValueDesc
        FROM Sleep_Reports AS SR
            JOIN Sleep_Values AS SV ON SV.SleepValueID = SR.SleepValueID
        WHERE SR.UserID = ?
            AND SR.SleepReportDate = ?
        `
        
        const userSleepReports = await req.db.query(selectSkillsQuery, [loggedInUser.ID, req.params.date]);

        req.db.end();
        res.set("Content-Type", "application/json");
        res.status(200).json(userSleepReports);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not get sleep reports for given date.");
        req.db.end();
        return;
    }
}

async function editSleepReport(req, res) {

    try {

        // Insert user and skill connection into User_Skills
        const updateSleepReportQuery = `
            UPDATE Sleep_Reports 
            SET 
                SleepValueID = ?
            WHERE
                SleepReportID = ?;
        `
        await req.db.query(updateSleepReportQuery, [req.body.sleepvalueid, req.body.sleepreportid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("Successfully edited sleep report.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not edit sleep report.");
        req.db.end();
        return;
    }
}

async function addMoodReport(req, res) {

    try {
        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        const insertMoodReportQuery = "INSERT INTO Mood_Reports(UserID, MoodReportDate, MoodValueID) VALUES(?,?,?)"
        await req.db.query(insertMoodReportQuery, [loggedInUser.ID, req.body.moodreportdate, req.body.moodvalueid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("Mood report successfully added for user.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not add mood report for user.");
        req.db.end();
        return;
    }
}

async function getMoodReports(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        const selectMoodReportsQuery = `
            SELECT MR.MoodReportID, MR.MoodReportDate, MR.MoodValueID, MV.MoodValueID, MV.MoodValueName, MV.MoodValueDesc
            FROM Mood_Reports AS MR
                JOIN Mood_Values AS MV ON MV.MoodValueID = MR.MoodValueID
            WHERE MR.UserID = ?
        `
        
        const userMoodReports = await req.db.query(selectMoodReportsQuery, [loggedInUser.ID]);

        req.db.end();
        res.set("Content-Type", "application/json");
        res.status(200).json(userMoodReports);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not get mood reports for user.");
        req.db.end();
        return;
    }
}

async function getMoodReportForDate(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        const selectMoodReportsQuery = `
        SELECT MR.MoodReportID, MR.MoodReportDate, MR.MoodValueID, MV.MoodValueID, MV.MoodValueName, MV.MoodValueDesc
        FROM Mood_Reports AS MR
            JOIN Mood_Values AS MV ON MV.MoodValueID = MR.MoodValueID
        WHERE MR.UserID = ?
            AND MR.MoodReportDate = ?
        `
        
        const userMoodReports = await req.db.query(selectMoodReportsQuery, [loggedInUser.ID, req.params.date]);

        req.db.end();
        res.set("Content-Type", "application/json");
        res.status(200).json(userMoodReports);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not get mood reports for given date.");
        req.db.end();
        return;
    }
}

async function editMoodReport(req, res) {

    try {

        // Insert user and skill connection into User_Skills
        const updateMoodReportQuery = `
            UPDATE Mood_Reports 
            SET 
                MoodValueID = ?
            WHERE
                MoodReportID = ?;
        `
        await req.db.query(updateMoodReportQuery, [req.body.moodvalueid, req.body.moodreportid]);

        req.db.end();
        res.set("Content-Type", "text/plain");
        res.status(201).send("Successfully edited mood report.");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not edit mood report.");
        req.db.end();
        return;
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    createNewUser,
    addSkill,
    getUserSkills,
    getUserEvents,
    getUserEventsForDay,
    addSleepReport,
    getSleepReports,
    getSleepReportForDate,
    editSleepReport,
    addMoodReport,
    getMoodReports,
    getMoodReportForDate,
    editMoodReport
}