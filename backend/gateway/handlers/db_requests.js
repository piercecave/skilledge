
const { User } = require("./../models/user");

// getUserByEmail retrieves user from database associated with a given email
async function getUserByEmail(db, email) {
    try {
        const qry = "SELECT ID, PassHash, UserName, FirstName, LastName, PhotoURL FROM Users WHERE Email = ?;";
        const userFromDB = await db.query(qry, [email]);
        var user = new User(userFromDB[0].Email, userFromDB[0].UserName, userFromDB[0].FirstName, userFromDB[0].LastName, userFromDB[0].PhotoURL);

        user.passHash = userFromDB[0].PassHash;

        return user;
    } catch (err) {
        throw new Error("Could not retrieve user from database.");
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    getUserByEmail
}