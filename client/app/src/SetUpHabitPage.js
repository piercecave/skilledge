import React from 'react';
import './SetUpHabitPage.css';
import { Header } from './Header';

export class SetUpHabitPage extends React.Component {
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
                            <div id="userSkillsContainer"></div>
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
                    {/*}
                        <div id="locationChooseCard" className="processBox">
                            <div className="card-body">
                                <h4 className="card-title">Location</h4>
                                <h6 className="card-subtitle mb-2 text-muted">Knowing where exactly you plan to work makes it easier to get started.
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
                                <label htmlFor="startMonthInput">Month:</label>
                                <input className="form-control" type="number" id="startMonthInput" name="startMonthInput" min="1" max="12">
                                    <label htmlFor="startDateInput">Date:</label>
                                    <input className="form-control" type="number" id="startDateInput" name="startDateInput" min="1" max="31">
                                        <label htmlFor="startYearInput">Year:</label>
                                        <input className="form-control" type="number" id="startYearInput" name="startYearInput" min="1000" max="9999">
                                            <p className="mt-3">What <strong>day</strong> will you <strong>end</strong> <em>your habit</em>?</p>
                                            <label htmlFor="endMonthInput">Month:</label>
                                            <input className="form-control" type="number" id="endMonthInput" name="endMonthInput" min="1" max="12">
                                                <label htmlFor="endDateInput">Date:</label>
                                                <input className="form-control" type="number" id="endDateInput" name="endDateInput" min="1" max="31">
                                                    <label htmlFor="endYearInput">Year:</label>
                                                    <input className="form-control" type="number" id="endYearInput" name="endYearInput" min="1000" max="9999">
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
                                                                <input type="checkbox" id="sundayCheckbox" name="sunday" defaultValue="Sunday">
                                                                    <label htmlFor="sundayCheckbox">Sunday</label>
                                    
                                </div>
                                                                <div>
                                                                    <input type="checkbox" id="mondayCheckbox" name="monday" defaultValue="Monday">
                                                                        <label htmlFor="mondayCheckbox">Monday</label>
                                    
                                </div>
                                                                    <div>
                                                                        <input type="checkbox" id="tuesdayCheckbox" name="tuesday" defaultValue="Tuesday">
                                                                            <label htmlFor="tuesdayCheckbox">Tuesday</label>
                                    
                                </div>
                                                                        <div>
                                                                            <input type="checkbox" id="wednesdayCheckbox" name="wednesday" defaultValue="Wednesday">
                                                                                <label htmlFor="wednesdayCheckbox">Wednesday</label>
                                    
                                </div>
                                                                            <div>
                                                                                <input type="checkbox" id="thursdayCheckbox" name="thursday" defaultValue="Thursday">
                                                                                    <label htmlFor="thursdayCheckbox">Thursday</label>
                                    
                                </div>
                                                                                <div>
                                                                                    <input type="checkbox" id="fridayCheckbox" name="friday" defaultValue="Friday">
                                                                                        <label htmlFor="fridayCheckbox">Friday</label>
                                    
                                </div>
                                                                                    <div>
                                                                                        <input type="checkbox" id="saturdayCheckbox" name="saturday" defaultValue="Saturday">
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
                                                                                        <button id="addHabitSubmitButton" className="btn btn-success mt-3">Submit</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                        */}
                </div>
            </div>
        );
    }
}

export default SetUpHabitPage;