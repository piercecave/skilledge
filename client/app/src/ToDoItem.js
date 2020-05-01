import React from 'react';
import './ToDoItem.css';

export default class ToDoItem extends React.Component {

    getCheckbox() {

        if (this.props.complete) {
            return "\u2611";
        }

        return "\u2610";
    }

    render() {
        return (
            <div className="mx-4 d-flex">
                <div className="d-inline-block">
                    {this.getCheckbox()}
                </div>
                <div className="d-inline-block ml-2">
                    {this.props.content}
                </div>
            </div>
        );
    }
}