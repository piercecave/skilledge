"use strict";

import { Square } from "./elements.js"

export class RivalPaddle extends Square {
    constructor(x, y, xVel, yVel, color, w, h) {
        super(x, y, xVel, yVel, color, w, h);
    }

    setLateralPosition(x) {
        this.x = x - this.width / 2;
    }

    type() {
        return "ENEMY_PADDLE";
    }
}

export class UserPaddle extends Square {
    constructor(x, y, xVel, yVel, color, w, h) {
        super(x, y, xVel, yVel, color, w, h);
        this.dragging = false;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    type() {
        return "PADDLE";
    }
}