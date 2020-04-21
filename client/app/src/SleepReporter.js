import React from 'react';

export class SleepReporter extends React.Component {

    constructor(props) {
        super(props);
        this.ADD_SLEEP_REPORT_URL = process.env.REACT_APP_BACKEND_URL + "/users/sleep-reports";
        this.PATCH_SLEEP_REPORT_URL = process.env.REACT_APP_BACKEND_URL + "/users/sleep-reports";
        this.poor = this.poor.bind(this);
        this.average = this.average.bind(this);
        this.great = this.great.bind(this);
    }

    poor() {
        this.handleReport(1, () => {
            this.props.sleepUpdated();
        });
    };

    average() {
        this.handleReport(2, () => {
            this.props.sleepUpdated();
        });
    };

    great() {
        this.handleReport(3, () => {
            this.props.sleepUpdated();
        });
    };

    handleReport(value, fetchCallback) {
        if (this.props.currentSleepReport.length === 0) {
            this.addReport(value, fetchCallback);
        } else {
            this.editReport(value, fetchCallback)
        }
    }

    addReport(value, fetchCallback) {
        const newReport = {
            sleepreportdate: this.props.currentDate,
            sleepvalueid: value
        }

        fetch(this.ADD_SLEEP_REPORT_URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReport)
        })
            .then(this.checkStatus)
            .then(fetchCallback)
            .catch(this.displayError);
    }

    editReport(value, fetchCallback) {
        const updatedReport = {
            sleepreportid: this.props.currentSleepReport[0].SleepReportID,
            sleepvalueid: value
        }

        fetch(this.PATCH_SLEEP_REPORT_URL, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedReport)
        })
            .then(this.checkStatus)
            .then(fetchCallback)
            .catch(this.displayError);
    }

    render() {

        let currentStatus = "Pending";

        if (this.props.currentSleepReport && this.props.currentSleepReport.length > 0) {
            currentStatus = this.props.currentSleepReport[0].SleepValueName;
        }

        return (
            <div>
                <h3 className="card-header">Sleep for {this.props.currentDate}</h3>
                <div className="card-body sleep-reporter-body">
                    <div className="eventStepBox">
                        <div className="card-text">
                            <p>
                                Current Status: {currentStatus}<br />
                            </p>
                        </div>
                        <div>
                            <button className="btn btn-danger mr-1" onClick={this.poor}>
                                Poor
                            </button>
                            <button className="btn btn-primary mr-1" onClick={this.average}>
                                Average
                            </button>
                            <button className="btn btn-success mr-1" onClick={this.great}>
                                Great
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SleepReporter;