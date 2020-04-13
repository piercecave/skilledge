import React from 'react';
import './HomePage.css';
import { Header } from './Header';
import UserDashboard from './UserDashboard';
import WelcomePotentialUser from './WelcomePotentialUser';

export class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.GET_LOGGED_IN_STATUS = process.env.REACT_APP_BACKEND_URL + "/";
        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";

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
            .catch(this.displayError);
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let homeContent;

        if (isLoggedIn) {
            homeContent = <UserDashboard />;
        } else {
            homeContent = <WelcomePotentialUser />;
        }

        return (
            <div className="HomePage">
                <Header />
                {homeContent}
            </div>
        );
    }
}

export default HomePage;