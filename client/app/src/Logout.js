import React from 'react';
import './Logout.css';
import { Header } from './Header';

export class Logout extends React.Component {

  constructor(props) {
    super(props);

    document.title = 'Log Out';

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
  
  render() {
    return (
      <div className="Logout">
        <Header />
        <section id="login-form">
          <div className="page-header">
            <h1>Log Out?</h1>
          </div>
          <br />
          <button id="log_out" className="btn btn-primary" onClick={this.initLogOut}>Log Out</button>
          <div id="meta-container" className="card hidden"></div>
        </section>
      </div>
    );
  }
}

export default Logout;