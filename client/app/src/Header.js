import React from 'react';

export class Header extends React.Component {

    constructor(props) {
        super(props);
        this.GET_LOGGED_IN_STATUS = process.env.REACT_APP_BACKEND_URL + "/";

        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        this.checkIsLoggedIn();
    }

    checkIsLoggedIn() {
        fetch(this.GET_LOGGED_IN_STATUS, {
            credentials: 'include'
        })
            .then(this.checkStatus)
            .then(async (response) => {
                const isLoggedIn = await response.text();
                if (isLoggedIn === "I heard you bruh.") {
                    this.setState({
                        isLoggedIn: true
                    });
                }
            })
            .catch(this.handleError);
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    handleError(error) {
        // console.log(error);
    }

    renderLinks() {
        let userManagementLinks = [];

        if (this.state.isLoggedIn) {
            userManagementLinks.push(this.renderLink("./../log_out/", "Log Out", 7));
        } else {
            userManagementLinks.push(this.renderLink("./../log_in/", "Log In", 6));
            userManagementLinks.push(this.renderLink("./../sign_up/", "Sign Up", 5));
        }

        return (
            <ul className="navbar-nav ml-auto">
                {this.renderLink("./../", "Home", 1)}
                {this.renderLink("./../choose_skill/", "Choose Skill", 2)}
                {this.renderLink("./../set_up_habit/", "Set Up Habit", 3)}
                {this.renderLink("./../charts/", "Charts", 4)}
                {userManagementLinks}
            </ul>
        );
    }

    renderLink(linkHref, linkText, uniqueKey) {
        if (linkText === this.props.activeLink) {
            return (
                <li className="nav-item active" key={uniqueKey}>
                    <a className="nav-link" href={linkHref}>{linkText}<span className="sr-only">(current)</span></a>
                </li>
            );
        } else {
            return (
                <li className="nav-item" key={uniqueKey}>
                    <a className="nav-link" href={linkHref}>{linkText}</a>
                </li>
            );
        }
    }

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
                        {this.renderLinks()}
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;