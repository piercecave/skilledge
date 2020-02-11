import React, { Component } from "react";
import { Row } from 'reactstrap';
import { RouteCard } from './RouteCard';

class SavedRoutesPage extends Component {
	render() {
		let routeCards = <h2 className="top-text">{"No trips planned."}</h2>
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



export { SavedRoutesPage }