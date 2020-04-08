import React from 'react';
import logo from './logo.svg';
import './HomePage.css';

export class Header extends React.Component {
    render() {
        return (
            <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="./../">SKILLEDGE</a>

                <button class="navbar-toggler toggler-example border-0" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent1">

                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="./../">Home<span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="./../sign_up/">Sign Up</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../log_in/">Log In</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../log_out/">Log Out</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../choose_skill/">Choose Skill</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../set_up_habit/">Set Up Habit</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../record/">Record</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../calendar/">Calendar</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../charts/">Charts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./../gamifying/">Gamifying</a>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;