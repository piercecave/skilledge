import React from 'react';
import './ChartsPage.css';
import { Header } from './Header';
import SuccessRateVsTimeChart from './SuccessRateVsTimeChart';
import CommonReasonsForFailureChart from './CommonReasonsForFailureChart';
import SleepOverTimeChart from './SleepOverTimeChart';
import MoodOverTimeChart from './MoodOverTimeChart';
// import MultipleFeaturesOverTimeChart from './MultipleFeaturesOverTimeChart';

export class ChartsPage extends React.Component {

    constructor(props) {
        super(props);

        document.title = 'Charts';

        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";

        this.state = {
            currentDate: new Date(),
            eventsData: []
        }
    }

    // componentDidMount() {
    //     // this.loadEvents();
    //     window.addEventListener("resize", this.updateDimensions.bind(this));
    // }

    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.updateDimensions.bind(this));
    // }

    // updateDimensions() {
    //     this.setState({
    //         chartWidth: 600,
    //         chartHeight: 480
    //     });
    // }

    loadEvents() {

        fetch(this.GET_EVENTS_FOR_USER_URL, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                console.log(responseJSON)
                this.setState({
                    eventsData: responseJSON
                });
            })
            .catch(this.displayError);
    }

    displayError(error) {
        console.log(error);
    }

    formatDateForDB(currentDate) {
        var newYear = currentDate.getFullYear();
        var newMonth = currentDate.getMonth() + 1;
        var newDate = currentDate.getDate();
        if (newMonth < 10) newMonth = "0" + newMonth;
        if (newDate < 10) newDate = "0" + newDate;
        return newYear + "-" + newMonth + "-" + newDate;
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    render() {
        return (
            <div className="CalendarPage">
                <Header activeLink="Charts"/>
                <div id="successRateChartContainer" className="container">
                    <div className="card  my-3">
                        <SuccessRateVsTimeChart />
                    </div>
                    <div className="card  my-3">
                        <CommonReasonsForFailureChart />
                    </div>
                    <div className="card  my-3">
                        <SleepOverTimeChart />
                    </div>
                    <div className="card  my-3">
                        <MoodOverTimeChart />
                    </div>
                    {/* <div className="card  my-3">
                        <MultipleFeaturesOverTimeChart />
                    </div> */}
                </div>
            </div>
        );
    }
}

export default ChartsPage;