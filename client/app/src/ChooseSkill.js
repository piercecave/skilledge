import React from 'react';
import './ChooseSkill.css';
import { Header } from './Header';
import { Skill } from './Skill';

export class ChooseSkill extends React.Component {

  constructor(props) {
    super(props);

    document.title = 'Choose Skill';

    this.GET_SKILLS_URL = process.env.REACT_APP_BACKEND_URL + "/skills";
    this.ADD_SKILL_URL = process.env.REACT_APP_BACKEND_URL + "/users/skills/";
    this.initChooseSkill = this.initChooseSkill.bind(this);
    this.chooseSkill = this.chooseSkill.bind(this);

    this.state = {
      skills: []
    }
  }

  chooseSkill(skillProps) {
    fetch(this.ADD_SKILL_URL + skillProps.skill.SkillID, {
      method: 'POST',
      credentials: 'include'
    })
      .then(() => {
        window.location.href = '/set_up_habit';
      })
      .catch(this.displayError);
  }

  componentDidMount() {
    this.initChooseSkill();
  }

  initChooseSkill() {
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    fetch(this.GET_SKILLS_URL, {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ skills: response });
      })
      .catch(this.displayError);
  }

  displayError(error) {
    console.log(error);
  }

  id(idName) {
    return document.getElementById(idName);
  }

  idValue(idName) {
    return document.getElementById(idName).value;
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  render() {
    return (
      <div className="ChooseSkill">
        <Header />
        <div id="chooseSkillContainer" className="container">
          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">Choose Skill:</h5>
              <p><em>(We'll help you figure out how next!)</em></p>
              <div id="skillsContainer" className="container my-3">
                {this.state.skills.map((skill, index) => (
                  <Skill key={index} skill={skill} onClick={this.chooseSkill}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ChooseSkill;