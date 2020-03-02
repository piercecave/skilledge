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

async function getUserEventsForDay(req, res) {

    try {

        // Get userid by email
        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];

        // Get events for day
        const selectEventsQuery = `
        SELECT * 
        FROM Events AS E
            JOIN Habits AS H ON E.HabitID = H.HabitID
            JOIN User_Skill AS US ON H.UserSkillID = US.UserSkillID
            JOIN Users AS U ON US.UserID = U.ID
        WHERE U.ID = ? 
            AND Event.EventDate = ?
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

/**
* Expose public handler functions.
*/
module.exports = {
    createNewUser,
    addSkill,
    getUserEventsForDay
}