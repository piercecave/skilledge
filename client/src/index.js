import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

import App from './App';
import './index.css';

const config = {
    apiKey: "AIzaSyD2vjEqE1R7yABoHIxe_wywbpUs8fsZ0Ec",
    authDomain: "rocktrip-1ad68.firebaseapp.com",
    databaseURL: "https://rocktrip-1ad68.firebaseio.com",
    projectId: "rocktrip-1ad68",
    storageBucket: "rocktrip-1ad68.appspot.com",
    messagingSenderId: "501341083119"
};
firebase.initializeApp(config);

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
	document.getElementById('root')
);
