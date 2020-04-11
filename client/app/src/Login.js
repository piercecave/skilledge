import React from 'react';
// import './HomePage.css';
import { Header } from './Header'; 

export class Login extends React.Component {
    render() {
        return (
            <div className="Login">
                <Header />
                {renderScreen()}
            </div>
        );
    }
}

function renderScreen() {
    return (
    <body>
  <div id="main_nav"></div>
  <main>
    <section id="login-form">
      <div class="page-header">
        <h1>Sign In</h1>
      </div>
      <form>
        <div class="form-group">
          <label for="Email">Email</label>
          <input type="Email" class="form-control" id="Email" placeholder="Enter email" required/>
        </div>
        <div class="form-group">
          <label for="Password">Password</label>
          <input type="Password" class="form-control" id="Password" placeholder="Enter password" required/>
        </div>
        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
      </form>
      <a id="create-account" href="./../sign_up/">Create an account</a>
      <div id="meta-container" class="card hidden"></div>
    </section>
  </main>
</body>
    )
}

export default Login;