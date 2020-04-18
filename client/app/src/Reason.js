import React from 'react';
import './Reason.css';

export class Reason extends React.Component {

    render() {
        return (
            <div>
                <li><strong>{this.props.reason.ReasonName}</strong></li>
            </div>
        );
    }
}
export default Reason;