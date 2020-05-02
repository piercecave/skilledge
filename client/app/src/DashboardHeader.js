import React from 'react';
import './DashboardHeader.css';
import ToDoItem from './ToDoItem';

export default class DashboardHeader extends React.Component {

    constructor(props) {
        super(props);
        this.GET_SKILLS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/skills";
        this.GET_HABITS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/habits";

        this.state = {

        };
    }

    componentDidMount() {
        this.loadSkillsData();
        this.loadHabitsData();
    }

    loadSkillsData() {
        fetch(this.GET_SKILLS_FOR_USER_URL, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    currentSkills: responseJSON
                });
            })
            .catch(this.displayError);
    }

    loadHabitsData() {
        fetch(this.GET_HABITS_FOR_USER_URL, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    currentHabits: responseJSON
                });
            })
            .catch(this.displayError);
    }

    toDoItems() {
        let toDoItemElements = [];

        const skillsCreated = this.checkSkillsCreated()
        if (!skillsCreated) {
            toDoItemElements.push((
                <ToDoItem
                    key={3}
                    content={(<span><a href="./choose_skill/">Choose what skill</a> you want to learn!</span>)}
                    complete={false} />
            ));
        }

        const habitsCreated = this.checkHabitsCreated();
        if (!habitsCreated) {
            toDoItemElements.push((
                <ToDoItem
                    key={4}
                    content={(<span><a href="./set_up_habit/">Create a habit</a> so you can start practicing your skill!</span>)}
                    complete={false} />
            ));
        }

        const currentEventsReported = this.checkCurrentEventsReported();
        toDoItemElements.push((
            <ToDoItem
                key={0}
                content={"Reported success or failure for all events today"}
                complete={currentEventsReported} />
        ));

        const sleepReported = this.checkSleepReported();
        toDoItemElements.push((
            <ToDoItem
                key={1}
                content={"Reported your sleep for the day"}
                complete={sleepReported} />
        ));
        
        const moodReported = this.checkMoodReported();
        toDoItemElements.push((
            <ToDoItem
                key={2}
                content={"Reported your overall mood for the day"}
                complete={moodReported} />
        ));

        const allCurrentEventsReported = this.checkAllCurrentEventsReported();
        if (habitsCreated && allCurrentEventsReported) {
            toDoItemElements.push((
                <p key={6}>
                    You completed all of your habits! If you want to learn about how you can practice even better in the future please visit <a href="./charts/">your charts</a>. Also, if you want to plan out another habit to continue learning please <a href="./set_up_habit/">create a new habit</a>! Thank you so much!
                </p>
            ));
        }

        if (skillsCreated && habitsCreated && currentEventsReported && sleepReported && moodReported && !allCurrentEventsReported) {
            toDoItemElements.push((
                <p key={5}>
                    You've completed all the tasks for today! For insights based on your reported data please visit <a href="./charts/">your charts</a>!
                </p>
            ));
        }

        return toDoItemElements;
    }

    checkSkillsCreated() {
        if (this.state.currentSkills && this.state.currentSkills.length === 0) {
            return false;
        } 
        return true;
    }

    checkHabitsCreated() {
        if (this.state.currentHabits && this.state.currentHabits.length === 0) {
            return false;
        } 
        return true;
    }

    checkCurrentEventsReported() {
        let todaysEventsWithNoResultsData = this.props.eventsData;
        if (todaysEventsWithNoResultsData) {
            todaysEventsWithNoResultsData = todaysEventsWithNoResultsData.filter((event) => {
                return event.FormattedEventDate === this.props.currentDate && event.ResultName === "Pending";
            });
            if (todaysEventsWithNoResultsData.length === 0) {
                return true;
            }
        }

        return false;
    }

    checkSleepReported() {
        if (this.props.currentSleepReport.length === 0) {
            return false;
        }
        return true;
    }

    checkMoodReported() {
        if (this.props.currentMoodReport.length === 0) {
            return false;
        }
        return true;
    }

    checkAllCurrentEventsReported() {
        let eventsWithNoResultsData = this.props.eventsData;
        if (eventsWithNoResultsData && eventsWithNoResultsData.length > 0) {
            eventsWithNoResultsData = eventsWithNoResultsData.filter((event) => {
                return event.ResultName === "Pending";
            });
            if (eventsWithNoResultsData.length === 0) {
                return true;
            }
        }

        return false;
    }

    getCurrentEvents() {
        return this.props.eventsData;
    }

    render() {

        // If already filed out, grab current skills from the backend. Function is called 
        // Find the collaspsable portion of userdashboard. Lost in merge. 
        // Pass current date and state of user into dashboard header.
        // Check if user has event was it a success or failure. If they haven't reported yet ask them to. 
        // Repeat this process for sleep and info. 
        //
        // Pierce will grab the individual user skill and habit. 
        // Build out the sleep info.
        // Build out the mood info.
        // Possibilty of adding kitten to the header pane. 

        return (
            <div>
                <div id="accordion">
                    <div className="card-header" id="headingOne">
                        <div className="container-fluid p-0">
                            <div className="row">
                                <div className="col-10 mt-1">
                                    <h3>Hello, {this.props.userInfo.FirstName}</h3>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-link float-right plus-button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        &#10010;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            {this.toDoItems()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}