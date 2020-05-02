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
    this.handleSuccess = this.handleSuccess.bind(this);

    this.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    this.state = {
      currentStep: 0,
      selectedEvent: {}
    }
  }

  // componentDidMount() {
  //   this.loadEvents();
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.currentDate !== prevProps.currentDate) {
  //     this.loadEvents();
  //   }
  // }

  // displayError = (error) => {
  //   console.log(error);
  // }

  formatDate = (currentDate) => {
    var newYear = currentDate.getFullYear();
    var newMonth = currentDate.getMonth() + 1;
    var newDate = currentDate.getDate();
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
  }

  // checkStatus = (response) => {
  //   if (response.status >= 200 && response.status < 300) {
  //     return response;
  //   } else {
  //     return Promise.reject(new Error(response.status + ": " + response.statusText));
  //   }
  // }

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
      this.props.eventUpdated();
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
    }, () => {
      this.queryReasons();
      this.props.eventUpdated();
    });
  }

  handleSuccess(event) {
    this.props.eventUpdated();
  }

  render() {

    let eventsToShow = <h5>No events for today!</h5>;

    if (this.props.events && this.props.events.length > 0) {
      eventsToShow = (
        <div>
          <h5>Planned Events:</h5>
          {this.props.events.map((event, index) => (
            <Event key={index} event={event} onFailure={this.handleFailure} onSuccess={this.handleSuccess} eventUpdated={this.props.eventUpdated} />
          ))}
        </div>
      )
    }

    return (
      <div>
        <h3 className="card-header">Record Your Progress!</h3>
        <div className="card-body record-body">
          <div className="eventStepBox">
            <div id="date-pick">
              <button id="prevDateButton" className="btn btn-success" onClick={this.previousDay}><strong>&lt;</strong></button>
              <h4 id="currentDateLabel">{this.formatDate(this.props.currentDate)}</h4>
              <button id="nextDateButton" className="btn btn-success" onClick={this.nextDay}><strong>&gt;</strong></button>
            </div>
            <div id="eventsContainer">
              {eventsToShow}
            </div>
          </div>
          <div className="eventStepBox">
            <FailureReasonsForm event={this.state.selectedEvent} onFinished={this.restore} />
          </div>
        </div>
      </div>
    );
  }
}
export default Record;