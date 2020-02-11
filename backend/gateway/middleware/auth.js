"use strict";

async function checkIsLoggedIn(req, res, next) {

    if (!req.session.key) {
        res.set("Content-Type", "text/plain");
        res.status(401).send("Unauthorized");
        return
    }
    next();
}

/**
* Expose public handler functions.
*/
module.exports = {
    checkIsLoggedIn
}