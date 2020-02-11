import React, { Component } from "react";
import { Row } from 'reactstrap';
import { RouteCard } from './RouteCard';

class SearchResultsPage extends Component {
	render() {
		let msg = "Please search for routes through the Plan Trips page."
		if (this.props.searched) {
			msg = "No routes matching given filters found!";
		}

		let routeCards = <h2 className="top-text">{msg}</h2>
		if (this.props.routes.length > 0) {
			routeCards = this.props.routes.map(rt => <RouteCard route={rt} key={rt.id} toggleRouteCbf={this.props.toggleRouteCbf} />);
		}
		
		return (
			<Row id="rock-routes">
				{routeCards}
			</Row>
		);
	}
}

export { SearchResultsPage }