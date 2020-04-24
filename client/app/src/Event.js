import React from 'react';
import Reason from './Reason';
import './Event.css';

export class Event extends React.Component {

    constructor(props) {
        super(props);
        this.SET_RESULT_URL = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/result";
        this.failure = this.failure.bind(this);
        this.success = this.success.bind(this);

        this.state = {
            reasons: []
        }
    }

    success() {
        const newResult = {
            resultid: 1
        }

        this.handleResult(newResult, () => {
            this.props.eventUpdated(this.props.event);
            this.props.onSuccess();
            if (window.gameComponent) {
                window.gameComponent.startJumping();
            }
        });
    };

    failure() {
        const newResult = {
            resultid: 2
        }

        this.handleResult(newResult, () => {
            this.props.eventUpdated(this.props.event);
            this.props.onFailure(this.props.event);
            if (window.gameComponent) {
                window.gameComponent.startPlayDead();
            }
        });
    }

    handleResult(newResult, fetchCallback) {

        fetch(this.SET_RESULT_URL.replace(":eventid", this.props.event.EventID), {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResult)
        })
            .then(this.checkStatus)
            .then(fetchCallback)
            .catch(this.displayError);
    }

    displayError = (error) => {
        console.log(error);
    }

    checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    render() {
        let reasonsList = [];
        if (this.props.event.Reasons && this.props.event.Reasons.length > 0) {
            reasonsList = (<div><h6>Notes for improvement:</h6>
                                <ul>
                                    {this.props.event.Reasons.map((reason, index) => (
                                        <Reason key={index} reason={reason} />
                                    ))}
                                </ul>
                            </div>)
        }

        return (
            <div className="card record-card">
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.event.SkillName}
                    </h5>
                    <div className="card-text">
                        <p>
                            Status: {this.props.event.ResultName}<br />
                            Action: {this.props.event.HabitAction}<br />
                            Time: {this.props.event.HabitTime}<br />
                            Location: {this.props.event.HabitLocation}
                        </p>
                    </div>
                    {reasonsList}
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