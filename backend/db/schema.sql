CREATE DATABASE IF NOT EXISTS pongdb;
USE pongdb;

CREATE TABLE IF NOT EXISTS Users (
    ID INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PassHash VARCHAR(72) NOT NULL,
    UserName VARCHAR(255) NOT NULL UNIQUE,
    FirstName VARCHAR(128),
    LastName VARCHAR(128),
    PhotoURL VARCHAR(2083) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS UserSignInLog (
    UserID INT NOT NULL,
    SignInTime DATETIME NOT NULL,
    ClientIP VARCHAR(60) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

-- Reference https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'testpwd';

