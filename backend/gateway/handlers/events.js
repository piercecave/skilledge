"use strict";

const { NewUser } = require("./../models/user");

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

/**
* Expose public handler functions.
*/
module.exports = {
    createNewUser
}