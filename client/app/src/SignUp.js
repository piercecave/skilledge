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

export default SignUp;