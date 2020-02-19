"use strict";

export class GameElement {
    constructor(x, y, xVel, yVel, color) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.color = color;
    }
}

export class Button {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Square extends GameElement {
    constructor(x, y, xVel, yVel, color, w, h) {
        super(x, y, xVel, yVel, color);

        //Set default width and height
        this.width = w;
        this.height = h;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed) {
        this.x += this.xVel * secondsPassed;
        this.y += this.yVel * secondsPassed;
    }

    getCenter() {
        return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    }
}

export class Wall extends Square {
    constructor(x, y, xVel, yVel, color, w, h) {
        super(x, y, xVel, yVel, color, w, h);

    }

    type() {
        return "WALL";
    }
}

export class Ball extends Square {
    constructor(x, y, xVel, yVel, color, w, h) {
        super(x, y, xVel, yVel, color, w, h);
    }

    draw(context) {
        context.beginPath();
        var center = this.getCenter();
        context.arc(center.x, center.y, this.width / 2, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    }

    type() {
        return "BALL";
    }
}

export class PauseButton {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isClicked = false;
    }

    update(secondsPassed) {
        // do nothing
    }

    draw(context) {
        context.globalAlpha = 0.5;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 8, 30);
        context.fillRect(this.x + 15, this.y, 8, 30);
        context.globalAlpha = 1
    }

    toggleClick() {
        this.isClicked = !this.isClicked;
    }

    type() {
        return "PAUSE_BUTTON";
    }
}