"use strict";

const ADD_HABIT_URL = "https://api.skilledge.site/users/skills/:skillid/habits";

/**
 *  Functions that will be called once the window is loaded
 */

window.addEventListener("load", () => {
    var chooseSkillCard = document.getElementById('skillChooseCard');
    // chooseSkillCard
    let animation = anime({
        targets: '#skillChooseCard',
        // Properties 
        translateX: "-150%",
        // Property Parameters
        duration: 2000,
        easing: 'linear',
        // Animation Parameters
    });
    configureSubmitButton();
});

const configureSubmitButton = () => {

    const addHabitSubmitButton = document.getElementById("addHabitSubmitButton");

    addHabitSubmitButton.onclick = () => {

        const urlParams = new URLSearchParams(window.location.search);
        const urlSkillID = urlParams.get('skillid');

        var weekdays = [];

        var checkboxElements = document.getElementById('checkboxesContainer').getElementsByTagName('input');

        for (const checkboxElement of checkboxElements) {
            if (checkboxElement.checked) {
                weekdays.push(checkboxElement.value);
            }
        }

        var newHabit = {
            habitAction: document.getElementById("actionInput").value,
            habitStartDate: document.getElementById("startDateInput").value,
            habitEndDate: document.getElementById("endDateInput").value,
            habitTime: document.getElementById("timeInput").value,
            habitLocation: document.getElementById("locationInput").value,
            habitWeekdaysList: JSON.stringify(weekdays)
        }

        fetch(ADD_HABIT_URL.replace(":skillid", urlSkillID), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHabit)
        })
            .then(checkStatus)
            .then((response) => {
                // console.log(response);
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