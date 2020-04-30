import React from 'react';
import './CalendarLegend.css';

export default class CalendarLegend extends React.Component {

    render() {
        return (
            <div className="calendarLegend">
                <div className="legend_event_marker"></div> <b>= Success&emsp;</b>
                <div className="legend_event_marker2"></div> <b>= Fail&emsp;</b>
                <div className="legend_event_marker3"></div> <b>= Pending&emsp;</b>
            </div>
        );
    }
}

