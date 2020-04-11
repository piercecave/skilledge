import React from 'react';
// import './HomePage.css';
import { Header } from './Header'; 

export class ChooseSkill extends React.Component {
    render() {
        return (
            <div className="ChooseSkill">
                <Header />
                {renderScreen()}
            </div>
        );
    }
}

function renderScreen() {
    return (
        <body>
  <div id="main_nav"></div>
  <main>
    <div id="chooseSkillContainer" class="container">
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">Choose Skill:</h5>
          <p><em>(We'll help you figure out how next!)</em></p>
          <div id="skillsContainer" class="container my-3"></div>
        </div>
      </div>
    </div>
  </main>
</body>
    )
}

export default ChooseSkill;