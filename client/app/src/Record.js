import React from 'react';
import './Record.css';

export class Record extends React.Component {

  constructor(props) {
    super(props);
    this.previousDay = this.previousDay.bind(this);
    this.nextDay = this.nextDay.bind(this);

    this.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.GET_EVENTS_FOR_DATE_URL = process.env.REACT_APP_BACKEND_URL + "/users/events/:date";
    this.SET_RESULT_URL = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/result";
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
      .then(this.createEventCards)
      .catch(this.displayError);
  }

  createEventCards = (responseJSON) => {

    const eventsContainer = document.getElementById("eventsContainer");
    eventsContainer.innerHTML = "";

    for (const event of responseJSON) {

      // Create card
      const eventCard = document.createElement("div");
      eventCard.classList.add("card");
      eventsContainer.appendChild(eventCard);
      // Create card body
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      eventCard.appendChild(cardBody);
      // Create label
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = event.SkillName;
      cardBody.appendChild(cardTitle);
      // Create action
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerText = event.HabitAction;
      cardBody.appendChild(cardText);
      // Create success button
      const successButton = document.createElement("button");
      successButton.classList.add("btn", "btn-primary", "mr-1");
      successButton.innerText = "Success";
      this.configureSuccessButton(event, successButton);
      cardBody.appendChild(successButton);
      // Create failure button
      const failureButton = document.createElement("button");
      failureButton.classList.add("btn", "btn-danger");
      failureButton.innerText = "Not today";
      this.configureFailureButton(event, failureButton);
      cardBody.appendChild(failureButton);
    }
  }

  configureSuccessButton = (event, successButton) => {

    successButton.onclick = () => {

      const newResult = {
        resultid: 1
      }

      fetch(this.SET_RESULT_URL.replace(":eventid", event.EventID), {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newResult)
      })
        .then(this.checkStatus)
        .then(this.props.eventUpdated())
        .catch(this.displayError);
    };
  }

  configureFailureButton = (event, failureButton) => {

    failureButton.onclick = () => {

      const newResult = {
        resultid: 2
      }

      fetch(this.SET_RESULT_URL.replace(":eventid", event.EventID), {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newResult)
      })
        .then(this.checkStatus)
        .then(this.props.eventUpdated())
        .catch(this.displayError);
    };
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

  render() {
    return (
      <div className="card-body">
        <h5 className="card-title">Record Your Progress!</h5>
        <div id="date-pick">
          <button id="prevDateButton" className="btn btn-success" onClick={this.previousDay}><strong>&lt;</strong></button>
          <h4 id="currentDateLabel">{this.formatDate(this.props.currentDate)}</h4>
          <button id="nextDateButton" className="btn btn-success" onClick={this.nextDay}><strong>&gt;</strong></button>
        </div>
        <div id="eventsContainer"></div>
      </div>
    );
  }
}
export default Record;