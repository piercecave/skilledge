"use strict";

export const onMouseDown = (e, gameCanvas, userPaddle, pauseButton) => {
    e.preventDefault();
    e.stopPropagation();

    userPaddle.x = getMousePos(gameCanvas, e).x - (userPaddle.width / 2);
    pauseButton.toggleClick();
}

export const onMouseClick = (e, gameCanvas, userPaddle, pauseButton) => {
    e.preventDefault();
    e.stopPropagation();

    userPaddle.x = getMousePos(gameCanvas, e).x - (userPaddle.width / 2);
    pauseButton.toggleClick();
}

export const onMouseMove = (e, gameCanvas, userPaddle) => {
    e.preventDefault();
    e.stopPropagation();

    userPaddle.x = getMousePos(gameCanvas, e).x - (userPaddle.width / 2);
}

export const onMouseUp = (e, gameCanvas, userPaddle) => {
    e.preventDefault();
    e.stopPropagation();

    userPaddle.x = getMousePos(gameCanvas, e).x - (userPaddle.width / 2);
}

export const onTouchMove = (e, gameCanvas, userPaddle) => {
    e.preventDefault();
    e.stopPropagation();

    userPaddle.x = getTouchPos(gameCanvas, e).x - (userPaddle.width / 2);

}

// Get the position of the mouse relative to the canvas
export function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

// Get the position of the mouse relative to the canvas
export function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.changedTouches[0].clientX - rect.left,
        y: touchEvent.changedTouches[0].clientY - rect.top
    };
}