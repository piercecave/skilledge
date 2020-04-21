import React from 'react';

export class MoodReporter extends React.Component {

    constructor(props) {
        super(props);
        this.ADD_MOOD_REPORT_URL = process.env.REACT_APP_BACKEND_URL + "/users/mood-reports";
        this.PATCH_MOOD_REPORT_URL = process.env.REACT_APP_BACKEND_URL + "/users/mood-reports";
        this.poor = this.poor.bind(this);
        this.average = this.average.bind(this);
        this.great = this.great.bind(this);
    }

    poor() {
        this.handleReport(1, () => {
            this.props.moodUpdated();
        });
    };

    average() {
        this.handleReport(2, () => {
            this.props.moodUpdated();
        });
    };

    great() {
        this.handleReport(3, () => {
            this.props.moodUpdated();
        });
    };

    handleReport(value, fetchCallback) {
        if (this.props.currentMoodReport.length === 0) {
            this.addReport(value, fetchCallback);
        } else {
            this.editReport(value, fetchCallback)
        }
    }

    addReport(value, fetchCallback) {
        const newReport = {
            moodreportdate: this.props.currentDate,
            moodvalueid: value
        }

        fetch(this.ADD_MOOD_REPORT_URL, {
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
            moodreportid: this.props.currentMoodReport[0].MoodReportID,
            moodvalueid: value
        }

        fetch(this.PATCH_MOOD_REPORT_URL, {
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

        if (this.props.currentMoodReport && this.props.currentMoodReport.length > 0) {
            currentStatus = this.props.currentMoodReport[0].MoodValueName;
        }

        return (
            <div>
                <h3 className="card-header">Mood for {this.props.currentDate}</h3>
                <div className="card-body mood-reporter-body">
                    <div>
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
export default MoodReporter;