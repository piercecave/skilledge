"use strict";

const { Skill } = require("./../models/skill");
const dbUser = require("./../helpers/dbUser");

const dates = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

async function getAllSkills(req, res) {

    try {

        const selectAllFromSkillsQuery = "SELECT * FROM Skills"
        const selectResult = await req.db.query(selectAllFromSkillsQuery);

        req.db.end();
        res.status(201).json(selectResult);

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not retrieve skills.");
        req.db.end();
        return;
    }
}

function nextDate(date) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}

async function addHabit(req, res) {

    try {

        // Add habit attributes into habits table

        var loggedInUser = await dbUser.getUserByEmail(req, res);
        loggedInUser = loggedInUser[0];
        var userSkillID = await dbUser.getUserSkillID(req, res, loggedInUser);
        userSkillID = userSkillID[0];

        const insertHabitQuery = "INSERT INTO Habits(UserSkillID, HabitAction, HabitStartDate, HabitEndDate, HabitTime, HabitLocation) VALUES(?,?,?,?,?,?)"
        const insertResult = await req.db.query(insertHabitQuery, [userSkillID.UserSkillID, req.body.habitAction, req.body.habitStartDate, req.body.habitEndDate, req.body.habitTime, req.body.habitLocation]);

        // Add habit and weekday connections

        const insertedHabitID = insertResult.insertId;
        console.log("Weekday list" + req.body.habitWeekdaysList);
        const habitWeekdayList = JSON.parse(req.body.habitWeekdaysList);
        for (const weekday of habitWeekdayList) {

            const selectWeekdayIdQuery = "SELECT WeekdayID FROM Weekdays WHERE WeekdayName = ?";
            var weekdayID = await req.db.query(selectWeekdayIdQuery, [weekday]);
            weekdayID = weekdayID[0].WeekdayID;

            const insertHabitWeekdayQuery = "INSERT INTO Habit_Weekday(HabitID, WeekdayID) VALUES(?,?)"
            await req.db.query(insertHabitWeekdayQuery, [insertedHabitID, weekdayID]);
        }

        // Add pending events for timeline provided
        var dateIterator = new Date(req.body.habitStartDate);
        const endDate = new Date(req.body.habitEndDate);
        while (dateIterator <= endDate) {
            if (habitWeekdayList.includes(dates[dateIterator.getDay()])) {
                // add event
                const insertEventQuery = "INSERT INTO Events(HabitID, ResultID, EventDate) VALUES(?,?,?)"
                await req.db.query(insertEventQuery, [insertedHabitID, 3, dateIterator.toISOString().split("T")[0]]);
            }

            dateIterator = nextDate(dateIterator);
        }

        req.db.end();
        res.status(201).send("Updated!");

    } catch (err) {
        console.log(err.message);
        res.set("Content-Type", "text/plain");
        res.status(400).send("Bad Request: Could not retrieve skills.");
        req.db.end();
        return;
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    getAllSkills,
    addHabit
}