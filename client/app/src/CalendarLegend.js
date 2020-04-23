import React from 'react';
import './CalendarLegend.css';

export default class CalendarLegend extends React.Component {

    render() {
        return (
            <div className="calendarLegend">
                <p><div className="legend_event_marker"></div> = pending</p>
            </div>
        );
    }
}

