import React from 'react';
import './ChooseSkill.css';
import { Header } from './Header';

export class ChooseSkill extends React.Component {

  constructor(props) {
    super(props);
    this.GET_SKILLS_URL = process.env.REACT_APP_BACKEND_URL + "/skills";
    this.ADD_SKILL_URL = process.env.REACT_APP_BACKEND_URL + "/users/skills/";
    this.initChooseSkill = this.initChooseSkill.bind(this);
  }

  initChooseSkill() {
    this.checkAuthenticated();
  };

  checkAuthenticated() {
    fetch(this.GET_SKILLS_URL, {
      credentials: 'include'
    })
      .then(this.displayResult)
      .catch(this.displayError);
  }

  async displayResult(response) {
    const responseJSON = await response.json();
    console.log(responseJSON);

    const skillsContainer = document.getElementById('skillsContainer');

    for (const skill of responseJSON) {

      // Create card
      const skillCard = document.createElement("div");
      skillCard.classList.add("card", "my-3");
      skillsContainer.appendChild(skillCard);
      // Create card body
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      skillCard.appendChild(cardBody);
      // Create label
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = skill.SkillName;
      cardBody.appendChild(cardTitle);
      // Create action
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerText = skill.SkillDesc;
      cardBody.appendChild(cardText);
      // Create submit button
      const skillButton = document.createElement("button");
      skillButton.classList.add("btn", "btn-primary");
      skillButton.innerText = "Select";
      cardBody.appendChild(skillButton);

      skillButton.onclick = () => {
        fetch(this.ADD_SKILL_URL + skill.SkillID, {
          method: 'POST',
          credentials: 'include'
        })
          .then((response) => {
            skillButton.setAttribute("disabled", "n/a");
            window.location.href = '/set_up_habit';
          })
          .catch(this.displayError);
      };
    }
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
              <div id="skillsContainer" className="container my-3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ChooseSkill;