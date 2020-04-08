import React from 'react';
import './HomePage.css';
import { Header } from './Header'; 

export class HomePage extends React.Component {
    render() {
        return (
            <div className="HomePage">
                <Header />
                Test: { returnsString() }
            </div>
        );
    }
}

function returnsString() {
    return "hi";
}

export default HomePage;