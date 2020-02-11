import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class SignUpView extends Component {

  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined
    }; 
  }

  handleChange = (event) => {
    let field = event.target.name; //which input
    let value = event.target.value; //what value

    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle signUp button
  handleSignUp = (event) => {
    this.props.signUpCallback(this.state.email, this.state.password);
  }

      //handle signIn button
  handleSignIn = (event) => {
    this.props.signInCallback(this.state.email, this.state.password);
  }



  render() {
    return (
      <div className='d-flex justify-content-center flex-column align-items-center'>
        <form className='d-flex flex-column justify-content-center'>
          <div className='user-login d-flex flex-column justify-content-center bg-dark p-3 text-center rounded'>
            <h1>RockTrip</h1>
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="Email"
                className='form-control'
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="Password"
                className='form-control'
                onChange={this.handleChange}
              />
            </label>
          </div>
          <Button tag={Link} to="/trips" className="user-login btn btn-secondary mt-4" onClick={this.handleSignIn} aria-label="signin-btn">
            Sign In
          </Button>
          <Button tag={Link} to="/trips" className="user-login btn btn-secondary mt-4" onClick={this.handleSignUp} aria-label="signup-btn">
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

export default SignUpView;