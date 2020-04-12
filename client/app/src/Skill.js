import React from 'react';

export class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props);
    }

    displayError(error) {
        console.log(error);
    }

    render() {
        return (
            <div className="Skill">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.skill.SkillName}</h5>
                        <p className="card-text">{this.props.skill.SkillDesc}</p>
                        <button className="btn btn-primary" onClick={this.handleClick}>Select</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Skill;