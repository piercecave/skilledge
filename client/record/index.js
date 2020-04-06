"use strict";

const GET_EVENTS_FOR_DATE_URL = "https://api.skilledge.site/users/events/:date";
const SET_RESULT_URL = "https://api.skilledge.site/events/:eventid/result";

/**
 *  Functions that will be called once the window is loaded
 */

let state = {
    currentDate: new Date()
}

window.addEventListener("load", () => {
    // Check for date query
    const urlParams = new URLSearchParams(window.location.search);
    const userProvidedDate = urlParams.get('date');
    console.log("user provided date: " + userProvidedDate)
    if (userProvidedDate) {
        console.log("passed if test");
        state.currentDate = new Date(userProvidedDate + "T06:00:00Z");
    }
    var formattedDate = "";
    if (userProvidedDate) {
        formattedDate = formatDateForDB(state.currentDate);
    } else {
        formattedDate = formatLocalDateForDB(state.currentDate);
    }
    document.getElementById("currentDateLabel").innerText = formattedDate;
    loadEvents(formattedDate);
    configureDatePickers();
});

const loadEvents = (currentDate) => {

    fetch(GET_EVENTS_FOR_DATE_URL.replace(":date", currentDate), {
        credentials: 'include'
    })
        .then(checkStatus)
        .then((response) => {
            return response.json();
        })
        .then(createEventCards)
        .catch(displayError);
}

const configureDatePickers = () => {
    var prevDateButton = document.getElementById("prevDateButton");

    prevDateButton.onclick = () => {
        var dateOffset = (24 * 60 * 60 * 1000) * 1;
        state.currentDate.setTime(state.currentDate.getTime() - dateOffset);
        var formattedDate = formatDateForDB(state.currentDate);
        document.getElementById("currentDateLabel").innerText = formattedDate;
        loadEvents(formattedDate);
    }

    var nextDateButton = document.getElementById("nextDateButton");

    nextDateButton.onclick = () => {
        var dateOffset = (24 * 60 * 60 * 1000) * 1;
        state.currentDate.setTime(state.currentDate.getTime() + dateOffset);
        var formattedDate = formatDateForDB(state.currentDate);
        document.getElementById("currentDateLabel").innerText = formattedDate;
        loadEvents(formattedDate);
    }
}

const createEventCards = (responseJSON) => {

    const eventsContainer = document.getElementById("eventsContainer");
    eventsContainer.innerHTML = "";

    console.log(responseJSON);

    for (const event of responseJSON) {
        console.log(event);

        // Create card
        const eventCard = document.createElement("div");
        eventCard.classList.add("card");
        eventsContainer.appendChild(eventCard);
        // Create card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        eventCard.appendChild(cardBody);
        // Create label
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = event.SkillName;
        cardBody.appendChild(cardTitle);
        // Create action
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = event.HabitAction;
        cardBody.appendChild(cardText);
        // Create success button
        const successButton = document.createElement("button");
        successButton.classList.add("btn", "btn-primary", "mr-1");
        successButton.innerText = "Success";
        configureSuccessButton(event, successButton);
        cardBody.appendChild(successButton);
        // Create failure button
        const failureButton = document.createElement("button");
        failureButton.classList.add("btn", "btn-danger");
        failureButton.innerText = "Not today";
        configureFailureButton(event, failureButton);
        cardBody.appendChild(failureButton);
    }
}

const configureSuccessButton = (event, successButton) => {

    successButton.onclick = () => {

        const newResult = {
            resultid: 1
        }

        fetch(SET_RESULT_URL.replace(":eventid", event.EventID), {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResult)
        })
            .then(checkStatus)
            .then(function() {
                window.location.href = '/calendar';
            })
            .catch(displayError);
    };
}

const configureFailureButton = (event, failureButton) => {

    failureButton.onclick = () => {

        const newResult = {
            resultid: 2
        }

        fetch(SET_RESULT_URL.replace(":eventid", event.EventID), {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResult)
        })
            .then(checkStatus)
            .then(function() {
                window.location.href = '/calendar';
            })
            .catch(displayError);
    };
}

/**
 * Function to handle the result of an unsuccessful fetch call
 * @param {Object} error - Error resulting from unsuccesful fetch call 
 */
const displayError = (error) => {
    console.log(error);
}

const formatDateForDB = (currentDate) => {
    var newYear = currentDate.getUTCFullYear();
    var newMonth = currentDate.getUTCMonth() + 1;
    var newDate = currentDate.getUTCDate();
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
}

const formatLocalDateForDB = (currentDate) => {
    var newYear = currentDate.getFullYear();
    var newMonth = currentDate.getMonth() + 1;
    var newDate = currentDate.getDate();
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
}


/* ------------------------------ Helper Functions  ------------------------------ */

/**
 * Helper function to return the response's result text if successful, otherwise
 * returns the rejected Promise result with an error status and corresponding text
 * @param {Object} response Response to check for success/error
 * @returns {Object} Valid result text if response was successful, otherwise rejected
 *                   Promise result
 */
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
}