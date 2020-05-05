import React from 'react';
import './SignUp.css';
import { Header } from './Header';

export class SignUp extends React.Component {

  constructor(props) {
    super(props);

    document.title = 'Sign Up';

    this.BASE_URL = process.env.REACT_APP_BACKEND_URL + "/users";
    this.initSignUp = this.initSignUp.bind(this);
  }

  initSignUp(event) {
    event.preventDefault();
    this.createUser();
  };

  createUser() {
    const newUser = {
      firstName: this.idValue('FirstName'),
      lastName: this.idValue('LastName'),
      email: this.idValue('Email'),
      userName: this.idValue('UserName'),
      password: this.idValue('Password'),
      passwordConf: this.idValue('PasswordConf')
    }
    fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser),
      credentials: 'include'
    }).then(this.checkStatus)
      .then(this.redirect)
      .catch(this.displayError);
  }

  redirect() {
    window.location = "./../";
  }

  displayError(error) {
    // Retrieve container for displaying error
    alert("Invalid response(s) ")
    console.log(error);
    // const metaContainer = id('meta-container');
    // if (metaContainer.classList.contains("hidden")) {
    //   metaContainer.classList.remove("hidden");
    // }
    // metaContainer.innerHTML = "";

    // // Render error
    // const errorMsg = document.createElement('h2');
    // errorMsg.classList.add("error-msg");
    // errorMsg.textContent = error;
    // metaContainer.appendChild(errorMsg);
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
      <div className="SignUp">
        <Header activeLink="Sign Up" />
        <section id="create-account-form">
          <div className="page-header">
            <h1>Create New Account</h1>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="FirstName">First Name</label>
              <input type="FirstName" className="form-control" id="FirstName" placeholder="Enter first name" required />
            </div>
            <div className="form-group">
              <label htmlFor="LastName">Last Name</label>
              <input type="LastName" className="form-control" id="LastName" placeholder="Enter last name" required />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input type="Email" className="form-control" id="Email" placeholder="Enter email" required />
            </div>
            <div className="form-group">
              <label htmlFor="UserName">Username</label>
              <input type="UserName" className="form-control" id="UserName" placeholder="Enter username" required />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input type="Password" className="form-control" id="Password" placeholder="Enter a password of at least 6 characters" required />
            </div>
            <div className="form-group">
              <label htmlFor="PasswordConf">Password Confirmation</label>
              <input type="Password" className="form-control" id="PasswordConf" placeholder="Enter password confirmation" required />
            </div>
            <button id="submit" type="submit" className="btn btn-primary" onClick={this.initSignUp}>Submit</button>
          </form>
          <div id="meta-container" className="card hidden"></div>
        </section>
      </div>
    );
  }
}
export default SignUp;