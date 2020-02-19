"use strict";

import { UserPaddle, RivalPaddle } from './paddles.js';
import { Wall, Ball, PauseButton } from './elements.js';
import { detectCollisions } from './collisions.js';
import { onMouseMove, onMouseClick } from './events.js'

export class Game {

    constructor(window, canvas, context) {
        this.window = window;
        this.canvas = canvas;
        this.context = context;

        this.oldTimeStamp = 0;
        this.isFirstFrame = true;

        this.collidingElements = [];

        this.isPaused = false;

        this.createCollidingElements();

        this.setUpButtons();

        this.setUpEventHandling();
    }

    initGameLoop() {
        this.oldTimeStamp = 0;

        this.window.requestAnimationFrame((timeStamp) => {
            // On the first iteration of our game loop, no time will pass
            this.oldTimeStamp = timeStamp;

            this.gameLoop(timeStamp);
        });
    }

    createCollidingElements() {
        this.userPaddle = new UserPaddle(this.canvas.width / 2 - 50, this.canvas.height - 20, 0, 0, "#ffffff", 100, 10);
        this.rivalPaddle = new RivalPaddle(this.canvas.width / 2 - 50, 10, 0, 0, "#ffffff", 100, 10);
        this.gameBall = new Ball(this.canvas.width / 2 - 12.5, this.canvas.height * .25 - 12.5, 150, 150, "blue", 25, 25);

        this.collidingElements.push(new Wall(5, 5, 0, 0, "#ffffff", 10, this.canvas.height - 10));
        this.collidingElements.push(new Wall(this.canvas.width - 15, 5, 0, 0, "#ffffff", 10, this.canvas.height - 10));
        this.collidingElements.push(this.rivalPaddle);
        this.collidingElements.push(this.userPaddle);
        this.collidingElements.push(this.gameBall);

        this.rivalGoal = new Wall(0, 0, 0, 0, "black", this.canvas.width, 7);
        this.userGoal = new Wall(0, this.canvas.height - 7, 0, 0, "black", this.canvas.width, 7);

        this.collidingElements.push(this.rivalGoal);
        this.collidingElements.push(this.userGoal);
    }

    setUpButtons() {
        this.pauseButton = new PauseButton(this.canvas * .8, 50, '#808080');
    }

    gameLoop(timeStamp) {

        // Calcuate time passed between time stamps
        var secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        if (!this.isPaused) {
            // Update object positions based on how much time has passed
            this.updateObjects(secondsPassed);
            detectCollisions(this.collidingElements);

            // Clear the game canvas
            this.clearCanvas();

            // Draw objects with updated positions to canvas
            this.drawCenterFieldLine();
            this.drawElements();
        }

        // Keep requesting new frames
        this.window.requestAnimationFrame( (newTimeStamp) => {
            this.gameLoop(newTimeStamp);
        });
    }

    drawCenterFieldLine() {
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(5, this.canvas.height / 2 - 2, this.canvas.width - 10, 4);
    }

    updateObjects(secondsPassed) {
        var object;
        for (object of this.collidingElements) {
            object.update(secondsPassed);
            if (object.type() == "ENEMY_PADDLE") {
                object.setLateralPosition(this.gameBall.x);
            }
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawElements() {
        var object;
        for (object of this.collidingElements) {
            object.draw(this.context);
        }
    }

    setUpEventHandling() {
        this.canvas.onclick = (e) => {
            onMouseClick(e, this.canvas, this.userPaddle, this.pauseButton);
        };
        this.canvas.onmousemove = (e) => {
            onMouseMove(e, this.canvas, this.userPaddle);
        };
        // this.canvas.onmouseup = function (e) {
        //   onMouseUp(e, this.canvas, userPaddle);
        // };
        // this.canvas.ontouchmove = function (e) {
        //   onTouchMove(e, this.canvas, userPaddle);
        // };
    }
}