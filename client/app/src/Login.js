import React from 'react';
import { Header } from './Header';
import './Login.css';

export class Login extends React.Component {

  constructor(props) {
    super(props);

    document.title = 'Log In';

    this.BASE_URL = process.env.REACT_APP_BACKEND_URL + "/sessions";
    this.initLogin = this.initLogin.bind(this);
  }

  initLogin(event) {
    event.preventDefault();
    this.authenticate();
  };

  authenticate() {
    const user = {
      email: this.idValue('Email'),
      password: this.idValue('Password'),
    }
    fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
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
    alert("Login Failed:\nEmail or Password is incorrect")  // notify user login has failed
    console.log(error);
    // const metaContainer = this.id('meta-container');
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
      <div className="Login" >
        <Header activeLink="Log In" />
        <section id="login-form">
          <div className="page-header">
            <h1>Sign In</h1>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input type="Email" className="form-control" id="Email" placeholder="Enter email" required />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input type="Password" className="form-control" id="Password" placeholder="Enter password" required />
            </div>
            <button id="submit" className="btn btn-primary" onClick={this.initLogin}>Submit</button>
          </form>
          <a id="create-account" href="./../sign_up/">Create an account</a>
          <div id="meta-container" className="hidden card"></div>
        </section>
      </div>
    );
  }
}
export default Login;