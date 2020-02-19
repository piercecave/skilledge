
"use strict";

/*

REQUIRED
 - pausing
 - reset ball button
 - Make bars for detecting scores
 - React to a score

 - restrict paddle movement
 - randomize movement of ball
 - Make enemy a.i.

OPTIONAL
 - Maintain aspect ratio
 - less choppy collision detections

*/

import { Game } from './js/game.js'

window.addEventListener("load", () => {
  initPongGame();
});

const initPongGame = () => {

  var gameCanvas = document.getElementById("game_canvas");
  const nav = document.getElementById("navbar");

  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight - nav.offsetHeight;
  var context = gameCanvas.getContext('2d');

  var game = new Game(window, gameCanvas, context);

  game.initGameLoop();
}