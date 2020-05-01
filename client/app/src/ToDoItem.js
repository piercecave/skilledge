import React from 'react';
import './ToDoItem.css';

export default class ToDoItem extends React.Component {

    getCheckbox() {

        if (this.props.complete) {
            return "\u2611";
        }

        return "\u2610";
    }

    getContent() {
        let contentClasses = "";
        if (this.props.complete) {
            contentClasses = "crossed"
        }
        return (<div><p className={contentClasses}>{this.props.content}</p></div>);
    }

    render() {
        return (
            <div className="mx-4 d-flex">
                <div className="d-inline-block">
                    {this.getCheckbox()}
                </div>
                <div className="d-inline-block ml-3">
                    {this.getContent()}
                </div>
            </div>
        );
    }
}