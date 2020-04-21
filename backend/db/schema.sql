CREATE DATABASE IF NOT EXISTS skilledgedb;
USE skilledgedb;

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

CREATE TABLE IF NOT EXISTS Skills (
    SkillID INT NOT NULL AUTO_INCREMENT,
    SkillName VARCHAR(255) NOT NULL UNIQUE,
    SkillDesc VARCHAR(1024) NOT NULL,
    PRIMARY KEY (SkillID)
);

CREATE TABLE IF NOT EXISTS User_Skill (
    UserSkillID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    SkillID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (SkillID) REFERENCES Skills(SkillID),
    PRIMARY KEY (UserSkillID)
);

CREATE TABLE IF NOT EXISTS Habits (
    HabitID INT NOT NULL AUTO_INCREMENT,
    UserSkillID INT NOT NULL,
    HabitAction VARCHAR(1024) NOT NULL,
    HabitStartDate DATE,
    HabitEndDate DATE,
    HabitTime TIME,
    HabitLocation VARCHAR(255),
    FOREIGN KEY (UserSkillID) REFERENCES User_Skill(UserSkillID),
    PRIMARY KEY (HabitID)
);

CREATE TABLE IF NOT EXISTS Weekdays (
    WeekdayID INT NOT NULL AUTO_INCREMENT,
    WeekdayName VARCHAR(48) NOT NULL,
    PRIMARY KEY (WeekdayID)
);

CREATE TABLE IF NOT EXISTS Habit_Weekday (
    HabitWeekdayID INT NOT NULL AUTO_INCREMENT,
    HabitID INT NOT NULL,
    WeekdayID INT NOT NULL,
    FOREIGN KEY (HabitID) REFERENCES Habits(HabitID),
    FOREIGN KEY (WeekdayID) REFERENCES Weekdays(WeekdayID),
    PRIMARY KEY (HabitWeekdayID)
);

CREATE TABLE IF NOT EXISTS Results (
    ResultID INT NOT NULL AUTO_INCREMENT,
    ResultName VARCHAR(255) NOT NULL,
    PRIMARY KEY (ResultID)
);

CREATE TABLE IF NOT EXISTS Events (
    EventID INT NOT NULL AUTO_INCREMENT,
    HabitID INT NOT NULL,
    ResultID INT NOT NULL,
    EventDate DATE NOT NULL,
    FOREIGN KEY (HabitID) REFERENCES Habits(HabitID),
    FOREIGN KEY (ResultID) REFERENCES Results(ResultID),
    PRIMARY KEY (EventID)
);

CREATE TABLE IF NOT EXISTS Reasons (
    ReasonID INT NOT NULL AUTO_INCREMENT,
    ReasonName VARCHAR(255) NOT NULL,
    ReasonDesc VARCHAR(1024),
    PRIMARY KEY (ReasonID)
);

CREATE TABLE IF NOT EXISTS Event_Reason (
    EventReasonID INT NOT NULL AUTO_INCREMENT,
    EventID INT NOT NULL,
    ReasonID INT NOT NULL,
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    FOREIGN KEY (ReasonID) REFERENCES Reasons(ReasonID),
    PRIMARY KEY (EventReasonID)
);

CREATE TABLE IF NOT EXISTS Sleep_Values (
    SleepValueID INT NOT NULL AUTO_INCREMENT,
    SleepValueName VARCHAR(255) NOT NULL,
    SleepValueDesc VARCHAR(1024),
    PRIMARY KEY (SleepValueID)
);

CREATE TABLE IF NOT EXISTS Sleep_Reports (
    SleepReportID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    SleepReportDate DATE NOT NULL,
    SleepValueID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (SleepValueID) REFERENCES Sleep_Values(SleepValueID),
    PRIMARY KEY (SleepReportID)
);

CREATE TABLE IF NOT EXISTS Mood_Values (
    MoodValueID INT NOT NULL AUTO_INCREMENT,
    MoodValueName VARCHAR(255) NOT NULL,
    MoodValueDesc VARCHAR(1024),
    PRIMARY KEY (MoodValueID)
);

CREATE TABLE IF NOT EXISTS Mood_Reports (
    MoodReportID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    MoodReportDate DATE NOT NULL,
    MoodValueID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (MoodValueID) REFERENCES Mood_Values(MoodValueID),
    PRIMARY KEY (MoodReportID)
);


INSERT INTO Mood_Values (MoodValueName, MoodValueDesc) VALUES ('Below Average', 'Worse mood than usual');
INSERT INTO Mood_Values (MoodValueName, MoodValueDesc) VALUES ('Average', 'Normal mood for a normal day');
INSERT INTO Mood_Values (MoodValueName, MoodValueDesc) VALUES ('Above Average', 'Better than normal mood for today');

INSERT INTO Sleep_Values (SleepValueName, SleepValueDesc) VALUES ('Below Average', 'Slept worse/less than I normally do');
INSERT INTO Sleep_Values (SleepValueName, SleepValueDesc) VALUES ('Average', 'Slept an average amount');
INSERT INTO Sleep_Values (SleepValueName, SleepValueDesc) VALUES ('Above Average', 'Slept in, longer than I usually do');

INSERT INTO Reasons (ReasonName, ReasonDesc) VALUES ('Motivation', 'I did not feel motivated enough.');
INSERT INTO Reasons (ReasonName, ReasonDesc) VALUES ('Tired', 'I was too tired.');
INSERT INTO Reasons (ReasonName, ReasonDesc) VALUES ('Busy', 'I had more important things to do.');

INSERT INTO Results (ResultName) VALUES ('Success');
INSERT INTO Results (ResultName) VALUES ('Failure');
INSERT INTO Results (ResultName) VALUES ('Pending');

INSERT INTO Weekdays (WeekdayName) VALUES ('Sunday');
INSERT INTO Weekdays (WeekdayName) VALUES ('Monday');
INSERT INTO Weekdays (WeekdayName) VALUES ('Tuesday');
INSERT INTO Weekdays (WeekdayName) VALUES ('Wednesday');
INSERT INTO Weekdays (WeekdayName) VALUES ('Thursday');
INSERT INTO Weekdays (WeekdayName) VALUES ('Friday');
INSERT INTO Weekdays (WeekdayName) VALUES ('Saturday');

INSERT INTO Skills (SkillName, SkillDesc) VALUES ('Rock Climbing', 'Get stronger, enjoy the outdoors, and make friends all at once by learning how to Rock Climb!');
INSERT INTO Skills (SkillName, SkillDesc) VALUES ('Guitar', 'Learn to play your favorite songs, or make your own by learning how to play guitar!');

INSERT INTO Users (
    ID,
    Email,
    PassHash,
    UserName,
    FirstName,
    LastName,
    PhotoURL
) VALUES (
    1,
    "piercecave@gmail.com",
    "$2b$13$MYsJm86K3Pa7motknPkRsuH.1iAHfUJz8pBhVxdUSIi0qYUafVdqG",
    "piercecave",
    "Pierce",
    "Cave",
    "https://www.gravatar.com/avatar/ee771f1f5bbad95d67c17eb33545bceb"

);



-- Reference https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'testpwd';

