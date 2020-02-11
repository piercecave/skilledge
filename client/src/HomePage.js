import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <div>
                <div className='m-4' id="homePageDiv">
                    <h1 className='display-4'>Find and Plan your Rock Climbing Trips</h1>
                    <p>Use our application to search for climbing within the Seattle area. Using different filters
                        you can easily find a climbing trip that will suit you needs! Once you found a trip that you
                        know you want to try, add it to your plan so you have a record of all the trails you want to try.
                    </p>
                    <div id="buttonContainer">
                        <Link className='btn btn-light' to='/plan'>Get Started!</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export { HomePage }