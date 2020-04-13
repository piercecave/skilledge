import React from 'react';
import './WelcomePotentialUser.css';

export class WelcomePotentialUser extends React.Component {
    
    render() {

        return (
            <div className="HomePage">
                <div id="componentsContainer" className="container">
                    <div className="row row-cols-1 mt-4">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Welcome to Skilledge!</h2>
                                    <p className="card-text">
                                        We are all about helping you learn new skills. 
                                        Through the science of implementation intentions and unique data insights, our behavior change solution will get you closer to accomplishing your goals.
                                    </p>
                                    <p className="card-text">
                                        Want to get started? <a href="./sign_up/"><strong>Sign up!</strong></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WelcomePotentialUser;