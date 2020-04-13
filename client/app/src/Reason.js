import React from 'react';
import './Reason.css';

export class Reason extends React.Component {

    render() {
        return (
            <div className="card record-card">
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.reason.ReasonName}
                    </h5>
                    <div className="card-text">
                        <p>
                            {this.props.reason.ReasonDesc}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Reason;