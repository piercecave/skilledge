import React from 'react';
import './HomePage.css';
import { Header } from './Header'; 

const BASE_URL = "http://localhost:3002/";

export class HomePage extends React.Component {
    render() {
        return (
            <div className="HomePage">
                <Header />
                Test: { returnsString() }
                { checkAuthenticated() } 
            </div>
        );
    }
}

function returnsString() {
    return "hi";
}

const checkAuthenticated = () => {
    fetch(BASE_URL, {
        credentials: 'include'
    })
        .then(displayResult)
        .catch();
}

const displayResult = async (response) => {
    let p = document.createElement("p");
    p.innerText = await response.text();
    console.log("Response: " + p.innerText);
    document.body.appendChild(p);
}

export default HomePage;