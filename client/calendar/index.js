"use strict";

const GET_EVENTS_FOR_USER_URL = "https://api.skilledge.site/users/events";

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

var eventsData = [];
var eventDates = [];

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

window.addEventListener("load", () => {
    loadEvents();
});

const loadEvents = () => {

    fetch(GET_EVENTS_FOR_USER_URL, {
        credentials: 'include'
    })
        .then(checkStatus)
        .then((response) => {
            return response.json();
        })
        .then(initCalendar)
        .catch(displayError);
}

function initCalendar(responseJSON) {

    console.log(responseJSON);

    eventDates = Array.from(responseJSON, event => event.EventDate.substring(0, 10)).filter(onlyUnique);

    eventsData = responseJSON.map(function(event) {
        event.FormattedEventDate = event.EventDate.substring(0, 10);
        return event;
    });
    console.log(eventsData);

    showCalendar(currentMonth, currentYear);
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    var selectYear = document.getElementById("year");
    var selectMonth = document.getElementById("month");
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    var tbl = document.getElementById("calendar-body"); // body of the calendar
    var selectYear = document.getElementById("year");
    var selectMonth = document.getElementById("month");
    var monthAndYear = document.getElementById("monthAndYear");

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                var cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }
            else {
                var cell = document.createElement("td");
                cell.classList.add("day_cell");
                var cellText = document.createElement("p");
                cellText.innerText = date;
                cellText.classList.add("day_text");
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                var currentDateString = getComparableDate(year, month, date);
                if (eventDates.includes(currentDateString)) {
                    var cellMarker = document.createElement("div");
                    cellMarker.classList.add("event_marker");
                    var eventsForDate = eventsData.filter((event) => {
                        return currentDateString.localeCompare(event.FormattedEventDate) == 0;
                    });
                    if (eventsForDate) {
                        if (eventsForDate[0].ResultName.localeCompare("Success") == 0) {
                            cellMarker.classList.add("success_day");
                        } else if (eventsForDate[0].ResultName.localeCompare("Failure") == 0) {
                            cellMarker.classList.add("failure_day");
                        }
                    }
                    cell.appendChild(cellMarker);
                    cell.onclick = (function(currentDateString) {return function() {
                        sendToRecord(currentDateString);
                    };})(currentDateString);
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

function sendToRecord(currentDateString) {
    window.location.href = "https://skilledge.site/record/?date=" + currentDateString;
}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

const formatDateForDB = (currentDate) => {
    var newYear = currentDate.getFullYear();
    var newMonth = currentDate.getMonth() + 1;
    var newDate = currentDate.getDate();
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
}

const getComparableDate = (year, month, date) => {
    var newYear = year;
    var newMonth = month + 1;
    var newDate = date;
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
}

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
}

const displayError = (error) => {
    console.log(error);
}