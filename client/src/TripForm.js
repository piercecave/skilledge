import React, { Component } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import { Link } from "react-router-dom";

const LEVEL_OPTS = [
	"0 - 5.5", 
	"5.5 - 5.8", 
	"5.8 - 5.10", 
	"5.10 - 5.11", 
	"5.11 - 5.12", 
	"5.12 - 5.13", 
	"5.13+"
];
const START_LOC_OPTS = ["Seattle, WA"]
const DISTANCE_OPTS = ["Any", "0 - 50", "50 - 100", "100 - 200", "200+"];
const RATING_OPTS = [1, 2, 3, 4];
const CLIMB_TYPE_OPTS = ["Traditional", "Alpine", "Sport"];

class TripFormPage extends Component {
	componentDidMount() {
		this.reflectFormUpdates();
	}

	reflectFormUpdates() {
		// DROPDOWNS
		["distance"].forEach(flt => {
			let new_val = this.props.filters[flt];
			if (new_val.length === 0) {
				new_val = "Any";
			}
			document.getElementById(flt+"-filter").value = new_val;
		});

		// CHECKBOXES
		["level", "startloc", "rating", "climbType"].forEach(flt => {
			this.props.filters[flt].forEach(opt => {
				let dom = document.getElementById(opt+"-cbox");
				if (!dom) {
					console.log(opt);
				}
				document.getElementById(opt+"-cbox").checked = true;
			});
		});
	}

	render() {
		return (
			<div id="trip-form">
				<h2 className="top-text">Simply fill out the inquiry form below and we'll get your trip planned for you!</h2>
				<p className="top-text">Making it easier to find the perfect weekend trip to the mountains.</p>
				<TripForm inputCallback={this.props.inputCallback} />
	            <Link to="/plan/results">
		            <Button className="form-btn" id="plannerButton" onClick={this.props.fetchCallback} aria-label="planButton">
		            	Search Trips
		            </Button>
		        </Link>
			</div>
		);
	}
}

class TripForm extends Component {
	render() {
		return (
			<Form>
				<TripFormCheckbox name="level" title="Level of Climbing" options={LEVEL_OPTS} inputCallback={this.props.inputCallback} />
				<TripFormCheckbox name="startloc" title="Starting Location" options={START_LOC_OPTS} inputCallback={this.props.inputCallback} />
				<TripFormDropdown name="distance" title="Distance (Miles)" options={DISTANCE_OPTS} inputCallback={this.props.inputCallback} />
				<TripFormCheckbox name="rating" title="Rating in Stars" options={RATING_OPTS} inputCallback={this.props.inputCallback} />
				<TripFormCheckbox name="climbType" title="Climbing Type" options={CLIMB_TYPE_OPTS} inputCallback={this.props.inputCallback} />
			</Form>
		);
	}
}

class TripFormDropdown extends Component {
	render() {
		let options = this.props.options.map(opt => <option value={opt} key={opt}>{opt}</option>);
		return (
			<FormGroup row>
				<Label for={this.props.name} sm={4}>{this.props.title}</Label>
				<Col sm={8}>
					<Input type="select" name={this.props.name} id={this.props.name + '-filter'} 
						onChange={this.props.inputCallback} aria-label={this.props.name}>
	                    {options}
					</Input>
				</Col>
			</FormGroup>
		);
	}
}

class TripFormCheckbox extends Component {
	render() {
		let options = this.props.options.map(opt => {
			return (
				<Col sm={6} key={opt}>
					<FormGroup check inline>
						<Label check>
							<Input type="checkbox" id={opt + '-cbox'} name={this.props.name} value={opt} onChange={this.props.inputCallback} aria-label={this.props.name} />{" "}
							{opt}
						</Label>
					</FormGroup>
				</Col>
			);
		});

		return (
			<FormGroup row>
				<Label sm={4}>{this.props.title}</Label>
					<Col sm={8} className="d-flex align-items-center">
						<Row className="w-100">{options}</Row>
					</Col>
			</FormGroup>
		);
	}
}

export { TripFormPage }