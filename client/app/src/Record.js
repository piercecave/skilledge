import React from 'react';
import './Record.css';
import Event from './Event';
import FailureReasonsForm from './FailureReasonsForm';
import anime from 'animejs/lib/anime.es';

export class Record extends React.Component {

  constructor(props) {
    super(props);
    this.previousDay = this.previousDay.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.queryReasons = this.queryReasons.bind(this);
    this.restore = this.restore.bind(this);
    this.handleFailure = this.handleFailure.bind(this);

    this.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.GET_EVENTS_FOR_DATE_URL = process.env.REACT_APP_BACKEND_URL + "/users/events/:date";

    this.state = {
      events: [],
      currentStep: 0,
      selectedEvent: {}
    }
  }

  componentDidMount() {
    this.loadEvents();
  }

  componentDidUpdate() {
    this.loadEvents();
  }

  loadEvents() {

    const formatedCurrentDate = this.formatDate(this.props.currentDate);

    fetch(this.GET_EVENTS_FOR_DATE_URL.replace(":date", formatedCurrentDate), {
      credentials: 'include'
    })
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        this.setState({
          events: responseJSON
        });
      })
      .catch(this.displayError);
  }

  displayError = (error) => {
    console.log(error);
  }

  formatDate = (currentDate) => {
    var newYear = currentDate.getFullYear();
    var newMonth = currentDate.getMonth() + 1;
    var newDate = currentDate.getDate();
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
  }

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  previousDay() {
    this.props.previousDay();
  }

  nextDay() {
    this.props.nextDay();
  }

  queryReasons() {
    this.setState({
      currentStep: 1
    }, () => {
      this.setProcessStep();
    });
  }

  restore() {
    this.setState({
      currentStep: 0
    }, () => {
      this.setProcessStep();
    });
  }

  setProcessStep() {

    var cardsXPosition = this.state.currentStep * -1 * 112.5;

    return anime({
      targets: '.eventStepBox',
      // Properties 
      translateX: cardsXPosition + "%",
      // Property Parameters
      duration: 500,
      easing: 'linear',
      // Animation Parameters
    });
  }

  handleFailure(event) {
    this.setState({
      selectedEvent: event
    }, this.queryReasons);
  }

  render() {
    return (
      <div className="card-body record-body">
        <div className="eventStepBox">
          <h3 className="card-title">Record Your Progress!</h3>
          <div id="date-pick">
            <button id="prevDateButton" className="btn btn-success" onClick={this.previousDay}><strong>&lt;</strong></button>
            <h4 id="currentDateLabel">{this.formatDate(this.props.currentDate)}</h4>
            <button id="nextDateButton" className="btn btn-success" onClick={this.nextDay}><strong>&gt;</strong></button>
          </div>
          <div id="eventsContainer">
            {this.state.events.map((event, index) => (
              <Event key={index} event={event} onFailure={this.handleFailure} eventUpdated={this.props.eventUpdated} />
            ))}
            <button onClick={this.queryReasons}>x</button>
          </div>
        </div>
        <div className="eventStepBox">
          <FailureReasonsForm event={this.state.selectedEvent} onFinished={this.restore}/>
        </div>
      </div>
    );
  }
}
export default Record;