import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import {
	Col, 
	Collapse, 
	Navbar, 
	NavbarToggler, 
	Nav, 
	NavItem } from "reactstrap";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		let menubar = (!this.props.user) ? null : (
			<Col xs={4} md={6} className="text-right">
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink exact to="/" className="nav-link" activeClassName="activeLink">
								Home
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/plan" className="nav-link" activeClassName="activeLink">
								Plan Trips
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/trips" className="nav-link" activeClassName="activeLink">
								My Trips
							</NavLink>
						</NavItem>
						<NavItem className="mx-4">
							<button className="btn btn-warning h-100 w-100" onClick={this.props.logoutCbf}>
				        		Log Out
				      		</button>
				      	</NavItem>
					</Nav>
				</Collapse>
			</Col>
      	);

		return (
			<header id="header" className="jumbotron jumbotron-fluid py-3">
				<Navbar dark expand="md" className="d-flex justify-content-between">
					<Col xs={6}>
						<NavLink exact to="/" className="navbar-brand"><h1>RockTrip</h1></NavLink>
					</Col>
					{menubar}
					<Col xs={2} className="text-right">
						<NavbarToggler id="navbar-toggler" onClick={() => this.toggle()} />
					</Col>
				</Navbar>
			</header>
		);
	}
}

export { Header }