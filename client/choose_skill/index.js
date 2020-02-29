"use strict";

const GET_SKILLS_URL = "https://api.skilledge.site/skills";
const ADD_SKILL_URL = "https://api.skilledge.site/users/skills/";

/**
 *  Functions that will be called once the window is loaded
 *  Submit button will get click event listener and call fetchUrlSummary
 */

window.addEventListener("load", () => {
    checkAuthenticated();
});

const checkAuthenticated = () => {
    fetch(GET_SKILLS_URL, {
        credentials: 'include'
    })
        .then(displayResult)
        .catch(displayError);
}

const displayResult = async (response) => {
    const responseJSON = await response.json();

    const skillButtonsContainer = document.getElementById('skillButtonsContainer');

    for (const skill of responseJSON) {
        const skillButton = document.createElement("button");

        skillButton.classList.add("btn", "btn-primary");
        skillButton.innerText = skill.SkillName;

        skillButton.onclick = () => {
            fetch(ADD_SKILL_URL + skill.SkillID, {
                method: 'POST',
                credentials: 'include'
            })
                .then((response) => {
                    skillButton.setAttribute("disabled", "n/a");
                    window.location.href = '/set_up_habit?skillid=' + skill.SkillID;
                })
                .catch(displayError);
        };

        skillButtonsContainer.appendChild(skillButton);
        skillButtonsContainer.appendChild(document.createElement("br"));
        skillButtonsContainer.appendChild(document.createElement("br"));
    }
}

/**
 * Function to handle the result of an unsuccessful fetch call
 * @param {Object} error - Error resulting from unsuccesful fetch call 
 */
const displayError = (error) => {
    console.log(error);
    // Retrieve container for displaying error
    // const metaContainer = id('meta-container');
    // if (metaContainer.classList.contains("hidden")) {
    //     metaContainer.classList.remove("hidden");
    // }
    // metaContainer.innerHTML = "";

    // // Render error
    // const errorMsg = document.createElement('h2');
    // errorMsg.classList.add("error-msg");
    // errorMsg.textContent = error;
    // metaContainer.appendChild(errorMsg);
}


/* ------------------------------ Helper Functions  ------------------------------ */

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {String} idName HTML element ID.
 * @returns {Object} DOM object associated with ID.
 */
const id = (idName) => {
    return document.getElementById(idName);
}

const idValue = (idName) => {
    return document.getElementById(idName).value;
}

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