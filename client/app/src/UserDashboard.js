import React from 'react';
import './UserDashboard.css';
import Calendar from './Calendar';
import Record from './Record';
import SleepReporter from './SleepReporter';
import MoodReporter from './MoodReporter';
//import DashboardHeader from './DashboardHeader';
import Game from './Game';

export class UserDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.GET_USER_INFO_URL = process.env.REACT_APP_BACKEND_URL + "/users";

        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";
        this.GET_REASONS_URL = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/reasons";
        this.GET_EVENTS_FOR_DATE_URL = process.env.REACT_APP_BACKEND_URL + "/users/events/:date";
        this.GET_SLEEP_REPORTS_FOR_DATE_URL = process.env.REACT_APP_BACKEND_URL + "/users/sleep-reports/:date";
        this.GET_MOOD_REPORTS_FOR_DATE_URL = process.env.REACT_APP_BACKEND_URL + "/users/mood-reports/:date";

        this.previousDay = this.previousDay.bind(this);
        this.nextDay = this.nextDay.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.eventUpdated = this.eventUpdated.bind(this);
        this.sleepUpdated = this.sleepUpdated.bind(this);
        this.moodUpdated = this.moodUpdated.bind(this);

        this.state = {
            currentDate: new Date(),
            eventUpdatedSwitch: false,
            eventsData: [],
            eventDates: [],
            userInfo: {},
            recordEvents: [],
            currentSleepReport: [],
            currentMoodReport: []
        }
    }

    componentDidMount() {
        this.loadEvents();
    }

    previousDay() {
        var negativeOneDayInMilliseconds = -1 * 24 * 60 * 60 * 1000;
        this.updateCurrentDateBy(negativeOneDayInMilliseconds)
    }

    nextDay() {
        var positiveOneDayInMilliseconds = 24 * 60 * 60 * 1000;
        this.updateCurrentDateBy(positiveOneDayInMilliseconds)
    }

    updateCurrentDateBy(milliseconds) {
        this.setState((prevState) => {
            var newCurrentDate = new Date();
            newCurrentDate.setTime(prevState.currentDate.getTime() + milliseconds);
            return {
                currentDate: newCurrentDate
            }
        }, this.loadEvents);
    }

    changeDate(newDate) {
        this.setState({
            currentDate: newDate
        }, this.loadEventsForCurrentDate)
    }

    loadEvents() {
        fetch(this.GET_EVENTS_FOR_USER_URL, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState(() => {
                    return {
                        eventsData: responseJSON.map(function (event) {
                            event.FormattedEventDate = event.EventDate.substring(0, 10);
                            return event;
                        }),
                        eventDates: Array.from(responseJSON, event => event.EventDate.substring(0, 10)).filter(this.onlyUnique)
                    }
                }, this.loadEventsForCurrentDate);
            })
            .catch(this.displayError);
    }

    loadEventsForCurrentDate() {

        const formatedCurrentDate = this.formatDate(this.state.currentDate);

        fetch(this.GET_EVENTS_FOR_DATE_URL.replace(":date", formatedCurrentDate), {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    recordEvents: responseJSON
                }, this.getAllReasonsForAllEvents);
            })
            .catch(this.displayError);
    }

    loadUserInfo() {
        fetch(this.GET_USER_INFO_URL, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    userInfo: responseJSON[0]
                });
            })
            .catch(this.displayError);
    }

    formatDate = (currentDate) => {
        var newYear = currentDate.getFullYear();
        var newMonth = currentDate.getMonth() + 1;
        var newDate = currentDate.getDate();
        if (newMonth < 10) newMonth = "0" + newMonth;
        if (newDate < 10) newDate = "0" + newDate;
        return newYear + "-" + newMonth + "-" + newDate;
    }

    async getAllReasonsForAllEvents() {
        let newEvents = this.state.recordEvents;
        for (const event of this.state.recordEvents) {
            event.Reasons = await this.fetchReasons(event.EventID);
        }
        this.setState({
            recordEvents: newEvents
        }, this.loadSleepReports);
    }

    async fetchReasons(eventid) {
        return await fetch(this.GET_REASONS_URL.replace(":eventid", eventid), {
            credentials: 'include',
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json()
            })
            .catch(this.displayError);
    }

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    eventUpdated() {
        // setTimeout(() => {
        //     this.loadEvents();
        // }, 100);
        this.loadEvents();
    }

    sleepUpdated() {
        this.loadSleepReports();
    }

    loadSleepReports() {
        const formattedCurrentDate = this.formatDate(this.state.currentDate);

        fetch(this.GET_SLEEP_REPORTS_FOR_DATE_URL.replace(":date", formattedCurrentDate), {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    currentSleepReport: responseJSON
                }, this.loadMoodReports);
            })
            .catch(this.displayError);
    }

    moodUpdated() {
        this.loadMoodReports();
    }

    loadMoodReports() {
        const formattedCurrentDate = this.formatDate(this.state.currentDate);

        fetch(this.GET_MOOD_REPORTS_FOR_DATE_URL.replace(":date", formattedCurrentDate), {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                this.setState({
                    currentMoodReport: responseJSON
                });
            })
            .catch(this.displayError);
    }

    render() {

        return (
            <div id="componentsContainer" className="container">
                {/* <div className="row mt-4">
                    <div className="col-sm">
                        <div className="card">
                            <DashboardHeader userInfo={this.state.userInfo} />
                        </div>
                    </div>
                </div> */}
                <div className="row mt-4">
                    <div className="col-sm">
                        <div className="card">
                            <Calendar changeDate={this.changeDate} eventsData={this.state.eventsData} eventDates={this.state.eventDates} currentDate={this.state.currentDate} />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card record-card">
                            <Record currentDate={this.state.currentDate} events={this.state.recordEvents} previousDay={this.previousDay} nextDay={this.nextDay} eventUpdated={this.eventUpdated} />
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-sm">
                        <div className="card">
                            <Game ref={(gameComponent) => {window.gameComponent = gameComponent}} eventsData={this.state.eventsData} />
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-sm">
                        <div className="card">
                            <SleepReporter currentDate={this.formatDate(this.state.currentDate)} currentSleepReport={this.state.currentSleepReport} sleepUpdated={this.sleepUpdated} />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <MoodReporter currentDate={this.formatDate(this.state.currentDate)} currentMoodReport={this.state.currentMoodReport} moodUpdated={this.moodUpdated} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboard;