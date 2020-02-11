"use strict";

const crypto = require('crypto');
const bcrypt = require('bcrypt');

class User {
    constructor(email, userName, firstName, lastName, photoURL) {
        this.email = email;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoURL = photoURL;
    }

    async setPassword(password) {
        this.passHash = await bcrypt.hash(password, 13);
    }

    async authenticate(password) {

        var match = await bcrypt.compare(password, this.passHash);

        return match;
    }

    nonSensitiveInfo() {
        
        return {
            "userName": this.userName,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "photoURL": this.photoURL
        }
    }
}

class NewUser {
    constructor(requestBody) {

        if (!this.checkAllAreStrings(requestBody)) {
            throw new Error('Invalid request body.');
        }

        this.userName = requestBody.userName;
        this.firstName = requestBody.firstName;
        this.lastName = requestBody.lastName;
        this.email = requestBody.email;
        this.password = requestBody.password;
        this.passwordConf = requestBody.passwordConf;
    }

    checkAllAreStrings(requestBody) {

        const variablesToCheck = ["userName", "firstName", "lastName", "email", "password", "passwordConf"];

        for (var userInputtedVariable of variablesToCheck) {
            if (typeof (requestBody[userInputtedVariable]) != "string") {
                return false;
            }
        }

        return true;
    }

    validate() {

        if (!this.validateEmailAddress(this.email)) {
            throw new Error("Email not valid");
        }

        if (this.password.length < 6) {
            throw new Error("Password has fewer than 6 characters");
        }

        if (this.password.localeCompare(this.passwordConf) !== 0) {
            throw new Error("Password and password confirmation do not match");
        }

        if (this.userName.length == 0 || this.userName.indexOf(' ') !== -1) {
            throw new Error("Username must be greater than 0 length and cannot contain spaces");
        }

        return true;
    }

    validateEmailAddress(email) {
        var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase());
    }

    async toUser() {

        var noWhiteSpaceEmail = this.email.trim();
        var lowerCaseEmail = noWhiteSpaceEmail.toLowerCase();

        var hasher = crypto.createHash('md5');
        hasher.update(lowerCaseEmail);
        var photoURL = "https://www.gravatar.com/avatar/" + hasher.digest('hex');

        var user = new User(this.email, this.userName, this.firstName, this.lastName, photoURL);

        await user.setPassword(this.password);
        return user;
    }
}

class Credentials {
    
    constructor(requestBody) {

        if (!this.checkAllAreStrings(requestBody)) {
            throw new Error('Invalid request body.');
        }

        this.email = requestBody.email;
        this.password = requestBody.password;
    }

    checkAllAreStrings(requestBody) {

        const variablesToCheck = ["email", "password"];

        for (var userInputtedVariable of variablesToCheck) {
            if (typeof (requestBody[userInputtedVariable]) != "string") {
                return false;
            }
        }

        return true;
    }
}

/**
* Expose public handler functions.
*/
module.exports = {
    User,
    NewUser,
    Credentials
}