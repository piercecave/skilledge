import React from 'react';
// import './HomePage.css';
import { Header } from './Header'; 

export class SetUpHabitPage extends React.Component {
    render() {
        return (
            <div className="SetUpHabitPage">
                <Header />
                Test: { returnsString() }
            </div>
        );
    }
}

function returnsString() {
    return "yo";
}

export default SetUpHabitPage;