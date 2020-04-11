import React from 'react';

export class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.ADD_SKILL_URL = process.env.REACT_APP_BACKEND_URL + "/users/skills/";
        this.chooseSkill = this.chooseSkill.bind(this);
    }

    chooseSkill() {
        fetch(this.ADD_SKILL_URL + this.props.skill.SkillID, {
            method: 'POST',
            credentials: 'include'
        })
            .then(() => {
                window.location.href = '/set_up_habit';
            })
            .catch(this.displayError);
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
                        <button className="btn btn-primary" onClick={this.chooseSkill}>Select</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Skill;