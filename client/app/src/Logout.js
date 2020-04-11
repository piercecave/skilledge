import React from 'react';
import './Logout.css';
import { Header } from './Header';

export class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.BASE_URL = process.env.REACT_APP_BACKEND_URL + "/sessions";
    this.initLogOut = this.initLogOut.bind(this);
  }

  initLogOut(event) {
    event.preventDefault();
    this.logOut();
  }

  logOut() {
    fetch(this.BASE_URL, {
      method: 'DELETE',
      credentials: 'include'
    }).then(this.checkStatus)
      .then(this.redirect)
      .catch(this.displayError)
  }

  redirect() {
    window.location = "./../";
  }

  displayError(error) {
    // Retrieve container for displaying error
    console.log(error);
  }

  id(idName) {
    return document.getElementById(idName);
  }

  idValue(idName) {
    return document.getElementById(idName).value;
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  getAuthToken() {
    let nameEQ = "auth=";
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) == 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  render() {
    return (
      <div className="Logout">
        <Header />
        <section id="login-form">
          <div class="page-header">
            <h1>Log Out?</h1>
          </div>
          <br />
          <button id="log_out" class="btn btn-primary" onClick={this.initLogOut}>Log Out</button>
          <div id="meta-container" class="card hidden"></div>
        </section>
      </div>
    );
  }
}

export default Logout;