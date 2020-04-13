import React from 'react';
import './FailureReasonsForm.css';

export class FailureReasonsForm extends React.Component {

  constructor(props) {
    super(props);
    // this.previousDay = this.previousDay.bind(this);
    // this.nextDay = this.nextDay.bind(this);
    // this.queryReasons = this.queryReasons.bind(this);
    // this.restore = this.restore.bind(this);
    
    this.GET_REASONS = process.env.REACT_APP_BACKEND_URL + "/reasons/";
    this.POST_REASONS_FOR_EVENT = process.env.REACT_APP_BACKEND_URL + "/events/:eventid/reasons";

    this.state = {
      events: [],
      currentStep: 0
    }
  }
  
  render() {
    return (
      <div className="FailureReasonsForm">

      </div>
    );
  }
}
export default FailureReasonsForm;