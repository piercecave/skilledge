import React from 'react';
import './Event.css';

export class Event extends React.Component {

    constructor(props) {
        super(props);
        this.SET_RESULT_URL = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/result";
        this.failure = this.failure.bind(this);
        this.success = this.success.bind(this);
    }

    success() {

        const newResult = {
            resultid: 1
        }

        fetch(this.SET_RESULT_URL.replace(":eventid", this.props.event.EventID), {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResult)
        })
            .then(this.checkStatus)
            .then(this.props.eventUpdated(this.props.event))
            .catch(this.displayError);
    };

    failure() {

        const newResult = {
            resultid: 2
        }

        fetch(this.SET_RESULT_URL.replace(":eventid", this.props.event.EventID), {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResult)
        })
            .then(this.checkStatus)
            .then(this.props.onFailure(this.props.event))
            .catch(this.displayError);

    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.event.SkillName}
                    </h5>
                    <p className="card-text">
                        {this.props.event.HabitAction}
                    </p>
                    <button className="btn btn-primary mr-1" onClick={this.success}>
                        Success
                    </button>
                    <button className="btn btn-danger" onClick={this.failure}>
                        Not today
                    </button>
                </div>
            </div>
        );
    }
}
export default Event;