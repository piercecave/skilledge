"use strict";

const { User } = require("./../models/user");

async function getUserByEmail(req, res) {

    try {

        const selectEmailQuery = "SELECT * FROM Users WHERE Email = ?"
        const user = await req.db.query(selectEmailQuery, [req.session.key]);
        console.log("#1 loggedInUser " + JSON.stringify(user));
        return user;

    } catch (err) {
        console.log(err);
        throw new Error("Error retrieving user with that email.");
    }
}

async function getUserSkillID(req, res, loggedInUser) {

    try {

        const selectIDQuery = "SELECT UserSkillID FROM User_Skill WHERE SkillID = ? AND UserID = ?"
        return await req.db.query(selectIDQuery, [req.params.skillid, parseInt(loggedInUser.ID)]);

    } catch (err) {
        console.log(err);
        throw new Error("Error retrieving user with that email.");
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    getUserByEmail,
    getUserSkillID
}