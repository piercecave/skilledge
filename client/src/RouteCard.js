import React, { Component } from "react";
import { Row, Col, Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';

class RouteCard extends Component {
	render() {
		let rt = this.props.route;
		let cardHead = <div className="no-image-route">NO IMAGE</div>;
		if (rt.imgMedium.length > 0) {
			cardHead = <CardImg src={rt.imgMedium} alt={"image of "+rt.name} />;
		}

		let btnClass = "cancel-route-btn";
		let btnMsg = "CANCEL";
		if (!rt.planned) {
			btnClass = "plan-route-btn";
			btnMsg = "ADD TO PLAN";
		}

		return (
			<Col md={5} xs={12} xl={4}>
				<Card>
					{cardHead}
					<CardBody>
						<CardTitle className="top-text">{rt.name}</CardTitle>
						<Row>
							<Col xs={4}>Level:</Col>
							<Col xs={8}>{(rt.rating.length === 0) ? "N/A" : rt.rating}</Col>
						</Row>
						<Row>
							<Col xs={4}>Type:</Col>
							<Col xs={8}>{(rt.pitches.length === 0) ? "N/A" : rt.type}</Col>
						</Row>
						<Row>
							<Col xs={4}>Rating:</Col>
							<Col xs={8}>{(rt.stars.length === 0) ? "N/A" : rt.stars}</Col>
						</Row>
						<Row>
							<Col xs={4}>Votes:</Col>
							<Col xs={8}>{(rt.starVotes.length === 0) ? "N/A" : rt.starVotes}</Col>
						</Row>
						<Row>
							<Col xs={4}>Location:</Col>
							<Col xs={8}>{rt.location.slice(0, 2).join(",\r\n")}</Col>
						</Row>
						<Row>
							<Col xs={4}>Lat, Long:</Col>
							<Col xs={8}>{rt.latitude + ", " + rt.longitude}</Col>
						</Row>
						<Row>
							<Col xs={4}>Pitches:</Col>
							<Col xs={8}>{(rt.pitches.length === 0) ? "N/A" : rt.pitches}</Col>
						</Row>
						<Button id={"toggle-"+rt.id} className={btnClass} onClick={this.props.toggleRouteCbf}>{btnMsg}</Button>
					</CardBody>
				</Card>
			</Col>
		)
	}
}

export { RouteCard }