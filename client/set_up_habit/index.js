"use strict";

const GET_USER_SKILLS_URL = "https://api.skilledge.site/users/skills";
const ADD_HABIT_URL = "https://api.skilledge.site/users/skills/:skillid/habits";

/**
 * Edit date and time pickers
 * Edit submit card to display current options
 * Edit submit button to gather correct data
 */

 var state = {
     currentStep: 0,
     chosenSkillID: 0,
     chosenSkillName: ""
 }

window.addEventListener("load", () => {
    // setProcessStep(1);
    getUserSkills();
    configureProcessNavButtons();
    configureDatePickers();
    configureSubmitButton();
    // yourFunction();
});

const delay = ms => new Promise(res => setTimeout(res, ms));

const yourFunction = async () => {
    await delay(4000);
    setProcessStep(1);
    await delay(2000);
    setProcessStep(2);
    await delay(2000);
    setProcessStep(3);
    await delay(2000);
    setProcessStep(4);
    await delay(2000);
    setProcessStep(5);
    await delay(2000);
    setProcessStep(6);
};

const getUserSkills = () => {
    fetch(GET_USER_SKILLS_URL, {
        credentials: 'include'
    })
        .then(displaySkills)
        .catch(displayError);
}

const displaySkills = async (response) => {
    const responseJSON = await response.json();

    const userSkillsContainer = document.getElementById('userSkillsContainer');

    for (const skill of responseJSON) {

        // Create card
        const skillCard = document.createElement("div");
        skillCard.classList.add("my-3");
        userSkillsContainer.appendChild(skillCard);
        // Create card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        skillCard.appendChild(cardBody);
        // Create label
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = skill.SkillName;
        cardBody.appendChild(cardTitle);
        // Create action
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = skill.SkillDesc;
        cardBody.appendChild(cardText);
        // Create submit button
        const skillButton = document.createElement("button");
        skillButton.classList.add("btn", "btn-primary");
        skillButton.innerText = "Select";
        cardBody.appendChild(skillButton);

        skillButton.onclick = () => {
            state.chosenSkillID = skill.SkillID;
            state.chosenSkillName = skill.SkillName;
            nextStep();
        };
    }
}

const prevStep = () => {
    state.currentStep = state.currentStep - 1;
    setProcessStep(state.currentStep);
}

const nextStep = () => {
    state.currentStep = state.currentStep + 1;
    setProcessStep(state.currentStep);
}

const configureProcessNavButtons = () => {

    var prevButtons = document.getElementsByClassName("prevButton");
    var nextButtons = document.getElementsByClassName("nextButton");

    for (var i = 0; i < prevButtons.length; i++) {
        prevButtons[i].onclick = () => prevStep();
    };

    for (var i = 0; i < nextButtons.length; i++) {
        nextButtons[i].onclick = () => nextStep();
    };
}

const configureSubmitButton = () => {

    const addHabitSubmitButton = document.getElementById("addHabitSubmitButton");

    addHabitSubmitButton.onclick = () => {

        var weekdays = [];

        var checkboxElements = document.getElementById('checkboxesContainer').getElementsByTagName('input');

        for (const checkboxElement of checkboxElements) {
            if (checkboxElement.checked) {
                weekdays.push(checkboxElement.value);
            }
        }

        var newHabit = {
            habitAction: document.getElementById("actionInput").value,
            habitStartDate: getHabitStartDate(),
            habitEndDate: getHabitEndDate(),
            habitTime: getHabitTime(),
            habitLocation: document.getElementById("locationInput").value,
            habitWeekdaysList: JSON.stringify(weekdays)
        }

        fetch(ADD_HABIT_URL.replace(":skillid", state.chosenSkillID), {
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
                window.location.href = '/calendar';
            })
            .catch(displayError);
    };
}

const configureDatePickers = () => {
    const startYearInput = document.getElementById("startYearInput");
    const startMonthInput = document.getElementById("startMonthInput");
    const startDateInput = document.getElementById("startDateInput");

    const endYearInput = document.getElementById("endYearInput");
    const endMonthInput = document.getElementById("endMonthInput");
    const endDateInput = document.getElementById("endDateInput");

    var currentDate = new Date();

    startYearInput.value = currentDate.getFullYear();
    startMonthInput.value = currentDate.getMonth() + 1;
    startDateInput.value = currentDate.getDate();

    var endDate = currentDate;
    endDate.setDate(endDate.getDate() + 30);

    endYearInput.value = endDate.getFullYear();
    endMonthInput.value = endDate.getMonth() + 1;
    endDateInput.value = endDate.getDate();
}

const getHabitStartDate = () => {
    const startYearInput = document.getElementById("startYearInput");
    const startMonthInput = document.getElementById("startMonthInput");
    const startDateInput = document.getElementById("startDateInput");

    var year = +(startYearInput.value);
    var month = +(startMonthInput.value);
    var date = +(startDateInput.value);

    if (month < 10) {
        month = "0" + month;
    }

    if (date < 10) {
        date = "0" + date;
    }
    
    return year + "-" + month + "-" + date;
}

const getHabitEndDate = () => {
    const endYearInput = document.getElementById("endYearInput");
    const endMonthInput = document.getElementById("endMonthInput");
    const endDateInput = document.getElementById("endDateInput");
    
    var year = +(endYearInput.value);
    var month = +(endMonthInput.value);
    var date = +(endDateInput.value);

    if (month < 10) {
        month = "0" + month;
    }

    if (date < 10) {
        date = "0" + date;
    }
    
    return year + "-" + month + "-" + date;
}

const getHabitTime = () => {
    const hourInput = document.getElementById("hourInput");
    const minutesInput = document.getElementById("minutesInput");
    const periodInput = document.getElementById("periodInput");

    var hour = +hourInput.value;
    var minutes = +minutesInput.value;

    if (periodInput.value.localeCompare("PM") == 0) {
        hour += 12;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    return hour + ":" + minutes + ":" + "00";
}

const setProcessStep = (step) => {

    var cardsXPosition = step * -1 * 112.5;

    return anime({
        targets: '.processBox',
        // Properties 
        translateX: cardsXPosition + "%",
        // Property Parameters
        duration: 500,
        easing: 'linear',
        // Animation Parameters
    });
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