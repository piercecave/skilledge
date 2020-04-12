import React from 'react';
import './SetUpHabitPage.css';
import { Header } from './Header';
import anime from 'animejs/lib/anime.es';
import { Skill } from './Skill';

export class SetUpHabitPage extends React.Component {

    constructor(props) {
        super(props);

        document.title = 'Set Up Habit';

        this.GET_USER_SKILLS_URL = process.env.REACT_APP_BACKEND_URL + "/users/skills";
        this.ADD_HABIT_URL = process.env.REACT_APP_BACKEND_URL + "/users/skills/:skillid/habits";
        this.initSetUpHabitPage = this.initSetUpHabitPage.bind(this);
        this.chooseSkill = this.chooseSkill.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            currentStep: 0,
            chosenSkillID: 0,
            chosenSkillName: "",
            skills: []
        }
    }

    componentDidMount() {
        this.initSetUpHabitPage();
    }

    initSetUpHabitPage() {
        this.getUserSkills();
        this.configureProcessNavButtons();
        this.configureDatePickers();
    }

    getUserSkills() {
        fetch(this.GET_USER_SKILLS_URL, {
            credentials: 'include'
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({ skills: response });
            })
            .catch(this.displayError);
    }

    prevStep() {
        this.setState((prevState) => {
            return {
                currentStep: prevState.currentStep - 1
            }
        }, this.setProcessStep);
    }

    nextStep() {
        this.setState((prevState) => {
            return {
                currentStep: prevState.currentStep + 1
            }
        }, this.setProcessStep);
    }

    configureProcessNavButtons() {

        var prevButtons = document.getElementsByClassName("prevButton");
        var nextButtons = document.getElementsByClassName("nextButton");

        for (var i = 0; i < prevButtons.length; i++) {
            prevButtons[i].onclick = () => this.prevStep();
        };

        for (var j = 0; j < nextButtons.length; j++) {
            nextButtons[j].onclick = () => this.nextStep();
        };
    }

    submit() {
        var weekdays = [];

        var checkboxElements = document.getElementById('checkboxesContainer').getElementsByTagName('input');

        for (const checkboxElement of checkboxElements) {
            if (checkboxElement.checked) {
                weekdays.push(checkboxElement.value);
            }
        }

        var newHabit = {
            habitAction: document.getElementById("actionInput").value,
            habitStartDate: this.getHabitStartDate(),
            habitEndDate: this.getHabitEndDate(),
            habitTime: this.getHabitTime(),
            habitLocation: document.getElementById("locationInput").value,
            habitWeekdaysList: JSON.stringify(weekdays)
        }

        fetch(this.ADD_HABIT_URL.replace(":skillid", this.state.chosenSkillID), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHabit)
        })
            .then(this.checkStatus)
            .then((response) => {
                // console.log(response);
                window.location.href = '/calendar';
            })
            .catch(this.displayError);
    }

    configureDatePickers() {
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

    getHabitStartDate() {
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

    getHabitEndDate() {
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

    getHabitTime() {
        const hourInput = document.getElementById("hourInput");
        const minutesInput = document.getElementById("minutesInput");
        const periodInput = document.getElementById("periodInput");

        var hour = +hourInput.value;
        var minutes = +minutesInput.value;

        if (periodInput.value.localeCompare("PM") === 0) {
            hour += 12;
        }

        if (hour < 10) {
            hour = "0" + hour;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return hour + ":" + minutes + ":00";
    }

    setProcessStep() {

        var cardsXPosition = this.state.currentStep * -1 * 112.5;

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

    displayError(error) {
        console.log(error);
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    chooseSkill(skillProps) {
        this.setState({
            chosenSkillID: skillProps.skill.SkillID,
            chosenSkillName: skillProps.skill.SkillName,
        });
        this.nextStep();
    }

    render() {
        return (
            <div className="SetUpHabitPage">
                <Header />
                <h2 className="scheduleHabitHeader mt-4">Schedule A Habit</h2>
                <div id="main">
                    <div id="skillChooseCard" className="processBox">
                        <div className="card-body">
                            <h4 className="card-title">Skill</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Which skill would you like to create a habit for?</h6>
                            <div id="userSkillsContainer">
                                {this.state.skills.map((skill, index) => (
                                    <Skill key={index} skill={skill} onClick={this.chooseSkill} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="actionChooseCard" className="processBox">
                        <div className="card-body">
                            <h4 className="card-title">Action</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Decide on an action to take everyday!</h6>
                            <p>What <strong>action</strong> do you want to take?</p>
                            <input id="actionInput" className="form-control" type="text" placeholder="e.g. I will go rock climbing for 1 hour."
                                required />
                            <div className="processNavContainer">
                                <button className="btn btn-outline-primary prevButton mt-3">Previous</button>
                                <button className="btn btn-outline-primary nextButton mt-3">Next</button>
                            </div>
                        </div>
                    </div>
                    <div id="timeChooseCard" className="processBox">
                        <div className="card-body">
                            <h4 className="card-title">Time</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Choosing a time improves your ability to follow through.</h6>
                            <p>What <strong>time</strong> will you do <em>your habit</em>?</p>
                            <label htmlFor="hourInput">
                                Hour:
                                <input className="form-control" type="number" id="hourInput" name="hourInput" min="1" max="12" defaultValue="12" />
                            </label>
                            <label htmlFor="minutesInput">
                                Minutes:
                                    <input className="form-control" type="number" id="minutesInput" name="minutesInput" min="1" max="59" defaultValue="0" />
                            </label>
                            <label>
                                AM or PM
                                    <select className="custom-select" id="periodInput" name="periodInput">
                                    <option defaultValue="AM">AM</option>
                                    <option defaultValue="PM">PM</option>
                                </select>
                            </label>
                            <div className="processNavContainer">
                                <button className="btn btn-outline-primary prevButton mt-3">Previous</button>
                                <button className="btn btn-outline-primary nextButton mt-3">Next</button>
                            </div>
                        </div>
                    </div>
                    <div id="locationChooseCard" className="processBox">
                        <div className="card-body">
                            <h4 className="card-title">Location</h4>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Knowing where exactly you plan to work makes it easier to get started.
                            </h6>
                            <p><strong>Where</strong> will you do <em>your habit</em>?</p>
                            <input id="locationInput" className="form-control" type="text" placeholder="Boulder Climbing Gym" required />
                            <div className="processNavContainer">
                                <button className="btn btn-outline-primary prevButton mt-3">Previous</button>
                                <button className="btn btn-outline-primary nextButton mt-3">Next</button>
                            </div>
                        </div>
                    </div>
                    <div id="dateRangeChooseCard" className="processBox">
                        <div className="card-body">
                            <h4 className="card-title">Date Range</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Set a start date and end date for your habit. We recommend about a
          month to start.</h6>
                            <p>What <strong>day</strong> will you <strong>start</strong> <em>your habit</em>?</p>
                            <label htmlFor="startMonthInput">
                                Month:
                                <input className="form-control" type="number" id="startMonthInput" name="startMonthInput" min="1" max="12" />
                            </label>
                            <label htmlFor="startDateInput">
                                Date:
                                <input className="form-control" type="number" id="startDateInput" name="startDateInput" min="1" max="31" />
                            </label>
                            <label htmlFor="startYearInput">
                                Year:
                                <input className="form-control" type="number" id="startYearInput" name="startYearInput" min="1000" max="9999" />
                            </label>
                            <p className="mt-3">What <strong>day</strong> will you <strong>end</strong> <em>your habit</em>?</p>
                            <label htmlFor="endMonthInput">
                                Month:
                                <input className="form-control" type="number" id="endMonthInput" name="endMonthInput" min="1" max="12" />
                            </label>
                            <label htmlFor="endDateInput">
                                Date:
                                <input className="form-control" type="number" id="endDateInput" name="endDateInput" min="1" max="31" />
                            </label>
                            <label htmlFor="endYearInput">
                                Year:
                                <input className="form-control" type="number" id="endYearInput" name="endYearInput" min="1000" max="9999" />
                            </label>
                            <div className="processNavContainer">
                                <button className="btn btn-outline-primary prevButton mt-3">Previous</button>
                                <button className="btn btn-outline-primary nextButton mt-3">Next</button>
                            </div>
                        </div>
                    </div>
                    <div id="weekdaysChooseCard" className="processBox">
                        <div className="card-body">
                            <h4 className="card-title">Days of the Week</h4>
                            <h6 className="card-subtitle mb-2 text-muted">What days of the week will you commit to learning your new skill?</h6>
                            <p>Select as many as you would like to commit to.</p>
                            <div id="checkboxesContainer">
                                <div>
                                    <input type="checkbox" id="sundayCheckbox" name="sunday" defaultValue="Sunday" />
                                    <label htmlFor="sundayCheckbox">Sunday</label>

                                </div>
                                <div>
                                    <input type="checkbox" id="mondayCheckbox" name="monday" defaultValue="Monday" />
                                    <label htmlFor="mondayCheckbox">Monday</label>

                                </div>
                                <div>
                                    <input type="checkbox" id="tuesdayCheckbox" name="tuesday" defaultValue="Tuesday" />
                                    <label htmlFor="tuesdayCheckbox">Tuesday</label>

                                </div>
                                <div>
                                    <input type="checkbox" id="wednesdayCheckbox" name="wednesday" defaultValue="Wednesday" />
                                    <label htmlFor="wednesdayCheckbox">Wednesday</label>

                                </div>
                                <div>
                                    <input type="checkbox" id="thursdayCheckbox" name="thursday" defaultValue="Thursday" />
                                    <label htmlFor="thursdayCheckbox">Thursday</label>

                                </div>
                                <div>
                                    <input type="checkbox" id="fridayCheckbox" name="friday" defaultValue="Friday" />
                                    <label htmlFor="fridayCheckbox">Friday</label>

                                </div>
                                <div>
                                    <input type="checkbox" id="saturdayCheckbox" name="saturday" defaultValue="Saturday" />
                                    <label htmlFor="saturdayCheckbox">Saturday</label>
                                </div>
                            </div>
                            <div className="processNavContainer">
                                <button className="btn btn-outline-primary prevButton mt-3">Previous</button>
                                <button className="btn btn-outline-primary nextButton mt-3">Next</button>
                            </div>
                        </div>
                    </div>
                    <div id="submitCard" className="processBox">
                        <div className="card-body">
                            <h4 className="card-title">Submit Habit Information</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Review any details you'd like and when you press submit we will create
          your skill-learning habit for you!</h6>
                            <div className="processNavContainer">
                                <button className="btn btn-outline-primary prevButton mt-3">Previous</button>
                                <button id="addHabitSubmitButton" className="btn btn-success mt-3" onClick={this.submit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetUpHabitPage;