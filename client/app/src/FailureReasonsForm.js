import React from 'react';
import './FailureReasonsForm.css';

export class FailureReasonsForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.GET_REASONS = process.env.REACT_APP_BACKEND_URL + "/reasons/";
        this.POST_REASONS_FOR_EVENT = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/reasons";

        this.state = {
            isMotivation: false,
            isTired: false,
            isBusy: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let reasons = [];
        if(this.state.isMotivation) {
            reasons.push({ ReasonID: 1 });
        }
        if(this.state.isTired) {
            reasons.push({ ReasonID: 2 });
        }
        if(this.state.isBusy) {
            reasons.push({ ReasonID: 3 });
        }

        fetch(this.POST_REASONS_FOR_EVENT.replace(":eventid", this.props.event.EventID), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reasons)
        })
            .then(this.checkStatus)
            .then(() => {
                this.props.onFinished();
            })
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="FailureReasonsForm">
                <h3>Setback Cause</h3>
                <p>What prevented you from practicing your skill today?</p>
                <form onSubmit={this.handleSubmit}>
                    <label className="form-check-label">
                        <input name="isMotivation" type="checkbox" checked={this.state.isMotivation}
                            onChange={this.handleInputChange} />
                            Lack of motivation
                    </label>
                    <br />
                    <label className="form-check-label">
                        <input name="isTired" type="checkbox" checked={this.state.isTired}
                            onChange={this.handleInputChange} />
                            Feeling tired today
                    </label >
                    <br />
                    <label className="form-check-label">
                        <input name="isBusy" type="checkbox" checked={this.state.isBusy}
                            onChange={this.handleInputChange} />
                            Had a busy day
                    </label>
                    <br />
                    <input type="submit" value="Submit" className="btn btn-primary" onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}
export default FailureReasonsForm;