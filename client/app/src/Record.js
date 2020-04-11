import React from 'react';
import './Record.css';
import { Header } from './Header';

export class Record extends React.Component {

  constructor(props) {
    super(props);

    document.title='Record Progress';

    this.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.GET_EVENTS_FOR_DATE_URL = process.env.REACT_APP_BACKEND_URL + "/users/events/:date";
    this.SET_RESULT_URL = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/result";
    // this.previous = this.previous.bind(this);

    this.state = {
      currentDate: new Date()
    }
  }

  componentDidMount() {
    // Check for date query
    const urlParams = new URLSearchParams(window.location.search);
    const userProvidedDate = urlParams.get('date');

    var editCurrentDate = this.state.currentDate;
    var formattedDate = "";

    if (userProvidedDate) {
      editCurrentDate = new Date(userProvidedDate + "T06:00:00Z")
      formattedDate = this.formatDateForDB(editCurrentDate);
    } else {
      formattedDate = this.formatLocalDateForDB(editCurrentDate);
    }

    this.setState({
      currentDate: editCurrentDate
    }, this.initRecordPage(formattedDate));
  }

  initRecordPage(formattedDate) {
    document.getElementById("currentDateLabel").innerText = formattedDate;
    this.loadEvents(formattedDate);
    this.configureDatePickers();
  }

  loadEvents = (currentDate) => {

    fetch(this.GET_EVENTS_FOR_DATE_URL.replace(":date", currentDate), {
      credentials: 'include'
    })
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then(this.createEventCards)
      .catch(this.displayError);
  }

  configureDatePickers = () => {
    var prevDateButton = document.getElementById("prevDateButton");

    prevDateButton.onclick = () => {
      var dateOffset = (24 * 60 * 60 * 1000) * 1;

      this.setState((prevState) => {
        var newCurrentDate = new Date();
        newCurrentDate.setTime(prevState.currentDate.getTime() - dateOffset);
        return {
          currentDate: newCurrentDate
        }
      }, () => {
        var formattedDate = this.formatDateForDB(this.state.currentDate);
        document.getElementById("currentDateLabel").innerText = formattedDate;
        this.loadEvents(formattedDate);
      });
    }

    var nextDateButton = document.getElementById("nextDateButton");

    nextDateButton.onclick = () => {
      var dateOffset = (24 * 60 * 60 * 1000) * 1;

      this.setState((prevState) => {
        var newCurrentDate = new Date();
        newCurrentDate.setTime(prevState.currentDate.getTime() + dateOffset);
        return {
          currentDate: newCurrentDate
        }
      }, () => {
        var formattedDate = this.formatDateForDB(this.state.currentDate);
        document.getElementById("currentDateLabel").innerText = formattedDate;
        this.loadEvents(formattedDate);
      });
    }
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
        .then(function () {
          window.location.href = '/calendar';
        })
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
        .then(function () {
          window.location.href = '/calendar';
        })
        .catch(this.displayError);
    };
  }

  displayError = (error) => {
    console.log(error);
  }

  formatDateForDB = (currentDate) => {
    var newYear = currentDate.getUTCFullYear();
    var newMonth = currentDate.getUTCMonth() + 1;
    var newDate = currentDate.getUTCDate();
    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
    return newYear + "-" + newMonth + "-" + newDate;
  }

  formatLocalDateForDB = (currentDate) => {
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

  render() {
    return (
      <div className="Record">
        <Header />
        <div id="recordContainer" className="container">
          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">Record Your Progress!</h5>
              <div id="date-pick">
                <button id="prevDateButton" className="btn btn-success"><strong>&lt;</strong></button>
                <h4 id="currentDateLabel">Current Day</h4>
                <button id="nextDateButton" className="btn btn-success"><strong>&gt;</strong></button>
              </div>
              <div id="eventsContainer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Record;