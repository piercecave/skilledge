import React from 'react';
// import './HomePage.css';
import { Header } from './Header';

export class SignUp extends React.Component {
    render() {
        return (
            <div className="SignUp">
                <Header />
                Test: { signSheet() }
            </div>
        );
    }
}

function signSheet() {
return (
<body>
    <div id="main_nav"></div>
        <main>
            <section id="create-account-form">
            <div class="page-header">
                <h1>Create New Account</h1>
            </div>
      <form>
        <div class="form-group">
          <label for="FirstName">First Name</label>
          <input type="FirstName" class="form-control" id="FirstName" placeholder="Enter first name" required/>
        </div>
        <div class="form-group">
          <label for="LastName">Last Name</label>
          <input type="LastName" class="form-control" id="LastName" placeholder="Enter last name" required/>
        </div>
        <div class="form-group">
          <label for="Email">Email</label>
          <input type="Email" class="form-control" id="Email" placeholder="Enter email" required/>
        </div>
        <div class="form-group">
          <label for="UserName">Username</label>
          <input type="UserName" class="form-control" id="UserName" placeholder="Enter username" required/>
        </div>
        <div class="form-group">
          <label for="Password">Password</label>
          <input type="Password" class="form-control" id="Password" placeholder="Enter password" required/>
        </div>
        <div class="form-group">
          <label for="PasswordConf">Password Confirmation</label>
          <input type="Password" class="form-control" id="PasswordConf" placeholder="Enter password confirmation" required/>
        </div>
        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div id="meta-container" class="card hidden"></div>
    </section>
  </main>
</body>
);
}

(function () {
  
    const BASE_URL = "https://api.skilledge.site/users";
  
    /**
     *  Functions that will be called once the window is loaded
     *  Submit button will get click event listener and call fetchUrlSummary
     */
    
  
    const createUser = () => {
      const newUser = {
        firstName: idValue('FirstName'),
        lastName: idValue('LastName'),
        email: idValue('Email'),
        userName: idValue('UserName'),
        password: idValue('Password'),
        passwordConf: idValue('PasswordConf')
      }
      fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
        },
        body: JSON.stringify(newUser),
        credentials: 'include'
      }).then(checkStatus)
        .then(redirect)
        .catch(displayError)
    }
  
    const redirect = () => {
      window.location = "../index.html";
    }
  
    /**
     * Function to handle the result of an unsuccessful fetch call
     * @param {Object} error - Error resulting from unsuccesful fetch call 
     */
    const displayError = (error) => {
      // Retrieve container for displaying error
      const metaContainer = id('meta-container');
      if (metaContainer.classList.contains("hidden")) {
        metaContainer.classList.remove("hidden");
      }
      metaContainer.innerHTML = "";
  
      // Render error
      const errorMsg = document.createElement('h2');
      errorMsg.classList.add("error-msg");
      errorMsg.textContent = error;
      metaContainer.appendChild(errorMsg);
    }
  
    /* ------------------------------ Helper Functions  ------------------------------ */
  
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {String} idName HTML element ID.
     * @returns {Object} DOM object associated with ID.
     */
    const id = (idName) => {
      return document.getElementById(idName);
    }
  
    const idValue = (idName) => {
      return document.getElementById(idName).value;
    }
  
    /**
     * Helper function to return the response's result text if successful, otherwise
     * returns the rejected Promise result with an error status and corresponding text
     * @param {Object} response Response to check for success/error
     * @returns {Object} Valid result text if response was successful, otherwise rejected
     *                   Promise result
     */
    const checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
      }
    }
  
    const getAuthToken = () => {
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
  
  })();

export default SignUp;