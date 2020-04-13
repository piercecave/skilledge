import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="./../">SKILLEDGE</a>

                    <button className="navbar-toggler toggler-example border-0" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent1">

                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="./../">Home<span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="./../sign_up/">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./../log_in/">Log In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./../log_out/">Log Out</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./../choose_skill/">Choose Skill</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./../set_up_habit/">Set Up Habit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./../charts/">Charts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./../gamifying/">Gamifying</a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;