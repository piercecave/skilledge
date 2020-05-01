import React from 'react';
import './DashboardHeader.css';
import ToDoItem from './ToDoItem';

export default class DashboardHeader extends React.Component {

    toDoItems() {
        let toDoItemElements = [];

        toDoItemElements.push((
            <ToDoItem
                key={0}
                content={"Reported success or failure for all events today"}
                complete={this.checkCurrentEventsReported()} />
        ));

        toDoItemElements.push((
            <ToDoItem
                key={1}
                content={"Reported your sleep for the day"}
                complete={this.checkSleepReported()} />
        ));

        toDoItemElements.push((
            <ToDoItem
                key={2}
                content={"Reported your overall mood for the day"}
                complete={this.checkMoodReported()} />
        ));

        return toDoItemElements;
    }

    checkCurrentEventsReported() {
        let todaysEventsWithNoResultsData = this.props.eventsData;
        if (todaysEventsWithNoResultsData) {
            todaysEventsWithNoResultsData = todaysEventsWithNoResultsData.filter((event) => {
                return event.FormattedEventDate === this.props.currentDate && event.ResultID !== 1;
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