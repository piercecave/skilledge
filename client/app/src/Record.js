import React from 'react';
// import './HomePage.css';
import { Header } from './Header'; 

export class Record extends React.Component {
    render() {
        return (
            <div className="Record">
                <Header />
                Test: { showRecord() }
            </div>
        );
    }
}

function showRecord() {
    return (
<body>
  <div id="main_nav"></div>
  <main>
    <div id="recordContainer" class="container">
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">Record Your Progress!</h5>
          <div id="date-pick" style="display: flex; justify-content: center; align-items: center;">
            <button id="prevDateButton" class="btn btn-success"
              style="display: inline-block; padding-bottom: .6rem;"><strong>&lt;</strong></button>
            <h4 id="currentDateLabel" style="display: inline-block; margin: 1em; ">Current Day</h4>
            <button id="nextDateButton" class="btn btn-success"
              style="display: inline-block; padding-bottom: .6rem;"><strong>&gt;</strong></button>
          </div>
          <div id="eventsContainer"></div>
        </div>
      </div>
    </div>
  </main>
</body>
    )
}

export default Record;