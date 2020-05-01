import React from 'react';
import './ToDoItem.css';

export default class ToDoItem extends React.Component {

    getCheckbox() {

        if (this.props.complete) {
            return (
                <div className="d-inline">
                    &#9745;
                </div>
            );
        }

        return (
            <div className="d-inline">
                &#9744;
            </div>
        );
    }

    render() {
        return (
            <div className="mx-4">
                {this.getCheckbox()}
                <div className="d-inline ml-2">
                    {this.props.content}
                </div>
            </div>
        );
    }
}