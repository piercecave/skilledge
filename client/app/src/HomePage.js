import React from 'react';
import './HomePage.css';
import { Header } from './Header';
import Calendar from './Calendar';
import Record from './Record';

// const BASE_URL = process.env.REACT_APP_BACKEND_URL + "/";

export class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";
        this.previousDay = this.previousDay.bind(this);
        this.nextDay = this.nextDay.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.eventUpdated = this.eventUpdated.bind(this);

        this.state = {
            currentDate: new Date(),
            eventUpdatedSwitch: false,
            eventsData: [],
            eventDates: []
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
        });
    }

    changeDate(newDate) {
        this.setState({
            currentDate: newDate
        })
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
                this.setState({
                    eventsData: responseJSON.map(function (event) {
                        event.FormattedEventDate = event.EventDate.substring(0, 10);
                        return event;
                    }),
                    eventDates: Array.from(responseJSON, event => event.EventDate.substring(0, 10)).filter(this.onlyUnique)
                });
            })
            .catch(this.displayError);
    }

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    eventUpdated() {
        // What we SHOULD do is continue fetching user events data until we see a change in the 
        // response data, with a limit of like 100 fetches
        setTimeout(() => {
            this.loadEvents();
        }, 200);
    }

    render() {
        return (
            <div className="HomePage">
                <Header />
                <div id="componentsContainer" className="container">
                    <div className="row row-cols-1 row-cols-sm-2 mt-4">
                        <div className="col">
                            <div className="card">
                                <Calendar changeDate={this.changeDate} eventsData={this.state.eventsData} eventDates={this.state.eventDates} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <Record currentDate={this.state.currentDate} previousDay={this.previousDay} nextDay={this.nextDay} eventUpdated={this.eventUpdated} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;