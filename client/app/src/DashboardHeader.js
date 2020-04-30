import React from 'react';
import './DashboardHeader.css';

export class DashboardHeader extends React.Component {

    render() {

        let optionalHeader = (<div></div>);

        if (this.props.userInfo.FirstName) {
            optionalHeader = (
                <div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2>
                                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Hello, {this.props.userInfo.FirstName}
                                </button>
                            </h2>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <div>
                                    <h2>Record Today</h2>
                                </div>
                                <div>
                                    <h3>Sleep Status</h3>
                                </div>
                                <div>
                                    <h3>Mood Status</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // If already filed out, grab current skills from the backend. Function is called 
        // Find the collaspsable portion of userdashboard. Lost in merge. 
        // Pass current date and state of user into dashboard header.
        // Check if user has event was it a success or failure. If they haven't reported yet ask them to. 
        // Repeat this process for sleep and info. 
        //
        // Pierce will grab the individual user skill and habit. 
        // Build out the sleep info.
        // Build out the mood info.
        // Possibilty of adding kitten to the header pane. 

        return (
            <div>
                {optionalHeader}
            </div>
        );
    }
}

export default DashboardHeader;