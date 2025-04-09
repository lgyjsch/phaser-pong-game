import { Scene } from 'phaser';

const WIDTH = 1024;
const HEIGHT = 768;

export class Game extends Scene {
    constructor() {
        super('Game');

        //create variables
        this.ball = null;
        this.leftPaddle = null;
        this.rightPaddle = null;
    }

    preload() {
        // load assets (eg. images)
        this.load.image('background', 'assets/background.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('paddle', 'assets/paddle.png');

    }

    create() {
        // initialize the game
        // this.add.image(x, y, key);
        this.add.image(WIDTH/2, HEIGHT/2, 'background').setScale(0.8,0.8);
        this.ball = this.physics.add.image(WIDTH/2, HEIGHT/2, 'ball').setScale(0.05, 0.05).refreshbody();
        this.ball.setCollideWorldBounds(true); //true => bounce when hit with a boundary
        this.ball.setBounce(1, 1); //maintains full velocity after rebound
        this.leftPaddle = this.add.image(50, 384, "paddle");
        this.rightPaddle = this.add.image(974, 384, "paddle");

        //listen for 'SPACE bar pressed' call startBall function upon press
        this.input.keyboard.on('keydown-SPACE', this.startBall, this);

        //assigns U, D, L, R key to the cursord variable
        this.cursors = this.input.keyboard.createCursorKeys();
        //assigns W/S keys to WASD variable
        this.WASD = this.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S
        });
    }

    update() {
        // game logic

        //leftPaddle movement
        if (this.WASD.up.isDown) {
            this.leftPaddle.y -= 5;
        } 
        else if (this.WASD.down.isDown) {
            this.leftPaddle.y += 5;
        };

        //rightPaddle movement
        if (this.cursors.up.isDown) {
            this.rightPaddle.y -= 5;
        }
        else if (this.WASD.down.isDown) {
            this.rightPaddle.y += 5;
        };
    }

    startBall() {
        // if (not ball in motion), if the ball is not moving.
        // when the game starts, if (not FALSE) = if (TRUE)
        if (!this.ballInMotion) { //check if the ball is not in motion
            this.ball.setVelocity(200, 200);
            this.ballInMotion = true;
        }
    }
}

