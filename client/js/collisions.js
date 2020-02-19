"use strict";

export const detectCollisions = (gameElements) => {

    var object1, object2;

    for (var object of gameElements) {
        object.isColliding = false;
    }

    for (var i = 0; i < gameElements.length; i++) {
        object1 = gameElements[i];

        for (var j = i + 1; j < gameElements.length; j++) {
            object2 = gameElements[j];

            if (rectIntersect(object1, object2)) {
                object1.isColliding = true;
                object2.isColliding = true;

                if (object1.type() == "WALL" || object2.type() == "WALL") {
                    if (object1.type() == "BALL") {
                        object1.xVel = object1.xVel * -1;
                    } else if (object2.type() == "BALL") {
                        object2.xVel = object2.xVel * -1;
                    }
                } else if (isPaddle(object1) || isPaddle(object2)) {
                    if (object1.type() == "BALL") {
                        object1.yVel = object1.yVel * -1;
                    } else if (object2.type() == "BALL") {
                        object2.yVel = object2.yVel * -1;
                    }
                }
            }
        }
    }
}

const isPaddle = (GameElement) => {
    if (GameElement.type() == "PADDLE" || GameElement.type() == "ENEMY_PADDLE") {
        return true;
    }
    return false;
}

const rectIntersect = (object1, object2) => {
    if (object2.x > object1.width + object1.x || object1.x > object2.width + object2.x || object1.y > object2.height + object2.y || object2.y > object1.height + object1.y) {
        return false;
    }
    return true;
}