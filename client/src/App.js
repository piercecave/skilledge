import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Header } from "./Header"
import { TripFormPage } from "./TripForm";
import { SearchResultsPage } from "./SearchResultsPage";
import { SavedRoutesPage } from "./SavedRoutesPage";
import SignUpView from "./SignUp/SignUpView";
import { HomePage } from "./HomePage";

import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
import "whatwg-fetch";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const URL = "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=47.61&lon=-122.33&maxResults=300&key=200422092-956b2074f7fd4e06c4e26e58c4221ac8";

class App extends Component {
	constructor(props){
		super(props);
		this.initialState = {
			user: null, 
			planned: [], 
			results: [], 
			filters: {
				"level": [], 
				"startloc": [], 
				"distance": "", 
				"rating": [], 
				"climbType": []
			}, 
			errorMessage: null, 
			searched: false
		};
		this.state = this.initialState;
	}

	//Checks to see if User is logged on or not, based on code from problem-set 9
	componentDidMount = () => {
		this.authUnRegFunc = firebase.auth().onAuthStateChanged((user) => {
			this.setState({
				user: user, 
				loading: false
			});

			if (user) {
				this.plannedRef = firebase.database().ref('plannedTrips/'+this.state.user.uid);
				this.plannedRef.on('value', (snapshot) => {
					let plannedDict = snapshot.val();
					if (!plannedDict) {
						this.setState({planned: []});
					} else {
						let plannedTrips = Object.keys(plannedDict).map((key) => plannedDict[key]);
						this.setState({planned: plannedTrips});
					}
				});
			} else {
				this.setState(this.initialState);
			}
		});
	  }

	componentWillUnmount() {
		this.authUnRegFunc();
		this.plannedRef.off();
	}

	//signs up the user based on the given email and password, based on code from problem-set 9
	handleSignUp = (email, password) => {
		this.setState({errorMessage:null});

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch((error) => { 
			this.setState({errorMessage: error.message});
		});
	}

	//sign in the user based on the given email and password
	handleSignIn = (email, password) => {
		this.setState({errorMessage:null});
		
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch((error) => { 
			this.setState({errorMessage: error.message});
		});
	}

	//signs out the user
	handleSignOut = () => {
		this.setState({errorMessage:null});
		
		firebase.auth().signOut()
		.catch((error) => { //report any errors
			this.setState({errorMessage: error.message});
		});
	}

	//calls the API then filters the results
	fetchFilteredRoutes = (e) => {
		fetch(URL) // Send AJAX request
			.then((res) => res.json())
			.then((data) => {
				let climbingLevel = this.state.filters.level.map(lvl => lvl.split(" "));
				let distance = this.state.filters.distance.split(" ");
				let starNumber = this.state.filters.rating;
				let climbType = this.state.filters.climbType;
				let routes = data.routes;

				// Finds the distance between two points
				let distanceFormula = (lat1, lon1, lat2, lon2) => {
					if ((lat1 === lat2) && (lon1 === lon2)) {
						return 0;
					} else {
						let radlat1 = Math.PI * lat1/180;
						let radlat2 = Math.PI * lat2/180;
						let theta = lon1-lon2;
						let radtheta = Math.PI * theta/180;
						let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
						if (dist > 1) {
							dist = 1;
						}
						dist = Math.acos(dist);
						dist = dist * 180/Math.PI;
						dist = dist * 60 * 1.1515;
						return dist;
					}
				}

				// Filter the data that was given by the API based on distance from SEATTLE, star rating, and difficulty
				let resultsWithStatus = routes.filter((rt) => {
					let d = distanceFormula(47.61, -122.33, rt.latitude, rt.longitude);
					let climbingLevelMatches = (climbingLevel.length === 0);

					if (!climbingLevelMatches) {
						let rtLevel = rt.rating.match(/\d+\.\d+/g);
						if (rtLevel) {
							rtLevel = parseFloat(rtLevel[0].split(".").join(""));
							for (let i = 0; i < climbingLevel.length; i++) {
								if (climbingLevel[i][0] === "5.13+" && rtLevel >= 5.13) {
									climbingLevelMatches = true;
									break;
								} else if (climbingLevel[i][0] !== "5.13+") {
									let lower = parseFloat(climbingLevel[i][0].split(".").join(""));
									let upper = parseFloat(climbingLevel[i][2].split(".").join(""));
									if ((climbingLevel[i][0] === "5.13+" && rtLevel >= 5.13) || 
										(rtLevel >= lower && rtLevel < upper)) {
										climbingLevelMatches = true;
										break;
									}
								}
							}
						}
					}
					
					let climbTypeMatches = (climbType.length === 0);
					if (!climbTypeMatches) {
						let typesOfRoute = rt.type.split(", ");
						for (let i = 0; i < typesOfRoute.length; i++) {
							if (climbType.includes(typesOfRoute[i])) {
								climbTypeMatches = true;
								break;
							}
						}
					}

					let otherFiltersMatch = (starNumber.length === 0 || starNumber.includes(rt.stars.toString().split('.')[0])) && 
											(distance[0].length === 0 || (d <= distance[2] && d >= distance[0]) || (distance[0] === "200+" && d >= 200));

					return climbingLevelMatches && climbTypeMatches && otherFiltersMatch;
				});

				// Mark planned routes
				let planned_id = this.state.planned.map(rt => rt.id);
				resultsWithStatus = resultsWithStatus.map(rt => {
					rt.planned = planned_id.includes(rt.id);
					return rt;
				});
		
				this.setState({
					results: resultsWithStatus, 
					searched: true
				});
			});
	}

	updateFilters = (e) => {
		let filters = this.state.filters;
		let name = e.target.getAttribute("name");
		let new_value = (e.target.value === "Any") ? "" : e.target.value;

		if (name === "distance") {
			filters[name] = new_value;
		} else if (filters[name].includes(new_value)) {
			filters[name] = filters[name].filter(v => v !== new_value);
		} else {
			filters[name].push(new_value);
		}
		this.setState({filters: filters});
	}

	toggleRoute = (e) => {
		e.preventDefault();

		let route_id = e.target.id.split("-")[1];
		let planned_id = this.state.planned.map(rt => rt.id.toString());
		let plannedRef = firebase.database().ref('plannedTrips').child(this.state.user.uid);

		let status = planned_id.includes(route_id);
		let newPlanned = this.state.planned;
		let newResults = this.state.results.map(rt => {
			if (rt.id.toString() === route_id) {
				rt.planned = !status;
			}
			return rt;
		});

		if (status) {
			newPlanned = newPlanned.filter(rt => rt.id.toString() !== route_id);
		} else {
			let newRoute = this.state.results.filter(rt => rt.id.toString() === route_id)[0];
			newPlanned.push(newRoute);
		}

		this.setState({
			planned: newPlanned, 
			results: newResults
		});

		newPlanned = newPlanned.reduce((obj, item) => {
			obj[item.id] = item;
			return obj;
		}, {});
		plannedRef.set(newPlanned)
			.catch(error => this.setState({errorMessage: error.message}));
	}

	render() {
		let renderTripFormPage = (routerProps) => {
			return <TripFormPage {...routerProps} filters={this.state.filters} inputCallback={this.updateFilters} fetchCallback={this.fetchFilteredRoutes} />
		};

		let renderResultsPage = (routerProps) => {
			return <SearchResultsPage {...routerProps} routes={this.state.results} searched={this.state.searched} toggleRouteCbf={this.toggleRoute} />
		};

		let renderSavedPage = (routerProps) => {
			let plannedRoutes = Object.keys(this.state.planned).map((key) => this.state.planned[key]);
			return <SavedRoutesPage {...routerProps} routes={plannedRoutes} toggleRouteCbf={this.toggleRoute} />
		};

		let returnedContent = null;

		if(!this.state.user) {
			returnedContent = (
				<main>
					<SignUpView
						signUpCallback={this.handleSignUp} 
						signInCallback={this.handleSignIn} 
						/>
				</main>
			);
		} else {
			returnedContent = (
				<main>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/plan" render={renderTripFormPage} />
						<Route path="/plan/results" render={renderResultsPage} />
						<Route path="/trips" render={renderSavedPage} />
						<Redirect to="/" />
					</Switch>
				</main>
			);
		}

		return (
			<div>
				<div>
					{this.state.errorMessage &&
						<p className="alert alert-danger">{this.state.errorMessage}</p>
					}
				</div>
				<Header user={this.state.user} logoutCbf={this.handleSignOut} />
				{returnedContent}
				<footer id="footer" className="text-center py-2">
					<div className="my-1">
						Email: <a href="mailto:ethan.toth.al@gmail.com">ethan.toth.al@gmail.com</a>
						<br />
						&copy; 2019 Ethan Toth, Ian Callender, Vincent Widjaya
					</div>
				</footer>
			</div>
		)
	}
}

export default App;
