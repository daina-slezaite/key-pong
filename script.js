let canvas = document.createElement("canvas");
let ctx;
let body = document.querySelector('body');

class Bar {
    constructor() {
        this.x = 450;
        this.y = 480;
        this.width = 100;
        this.height = 15;
        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
    moveRight() {
        if(this.x < canvas.width - bar.width) {
            this.x += 20;
        }
    }
    moveLeft() {
        if(this.x > 0) {
            this.x -= 20;
        }
    }
    
}

let bar;

document.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            bar.moveLeft();
            break;
        case 39:
            bar.moveRight();
            break;
    }
});

class Ball {
    constructor() {
        this.x = 400;
        this.y = 300;
        this.radius = 7;
        this.xDirection = 3;
        this.yDirection = 3;
        this.score = 0;
        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
    move() {
        this.x += this.xDirection;
        this.y += this.yDirection;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
        //if ball hits right canvas wall OR left canvas wall, it will reverse its' direction
        if(this.x + this.xDirection > canvas.width - this.radius || this.x + this.xDirection < this.radius) {
            this.xDirection = this.xDirection/-1;
        }
        //if ball hits bar, it will reverse its' direction
        if (getDistance(this.x, this.y) < (Math.pow(this.radius, 2))) {
            this.yDirection = this.yDirection/-1;
            this.score++;
        }
        //if ball hits canvas top, it will reverse its' direction
        if(this.y + this.yDirection < this.radius) {
            this.yDirection = this.yDirection/-1; 
        }
        //if ball falls down, game over
        if(this.y + this.yDirection > canvas.height) {
            this.stop();
            setTimeout(() => {
                gameOver();
            }, 400);
        }
    }
    stop() {
        this.xDirection = 0;
        this.yDirection = 0;
    }
}

let ball;


// Function that updates the canvas and repaints both the ball and the bar every 10 miliseconds
function moveObjects() {
    ball.move();
    bar.draw();
    showScore();
    requestAnimationFrame(moveObjects);
}

function startGame() {
    showScore();
    ball.draw();
    bar.draw();
}


// Ball + bar collision detection
function getDistance(x2, y2) { //x2 and y2 has to be ball
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
    
    let closestX = clamp(x2, bar.x, bar.x + bar.width);
    let closestY = clamp(y2, bar.y, bar.y + bar.height);

    let xDistance = x2 - closestX;
    let yDistance = y2 - closestY;

    return (Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};



function showScore() {
    ctx.fillStyle = 'black';
    ctx.font = '32px Arial';
    ctx.fillText(`Score: ${ball.score}`, 20, 40);
};



function swapInstructionsToCanvas() {
    let instructions = document.getElementById('opening-screen');
    instructions.remove();
    // canvas = document.createElement("canvas"); iskeliau i virsu
    canvas.id = "canvas"
    canvas.width = 700;
    canvas.height = 500;
    ctx = canvas.getContext('2d');
    // let body = document.querySelector('body'); iskeliau i virsu
    body.appendChild(canvas);
}

const startButton = document.querySelector(".start-game");

startButton.addEventListener('click', event => {
    swapInstructionsToCanvas();
    ball = new Ball();
    bar = new Bar();
    startGame();
    setTimeout(() => {
        moveObjects();
    }, 1000);
})


function gameOver() {
    canvas.remove();
    let gameOverParent = document.createElement('div');
    gameOverParent.id = "game-over-screen";
    let h1Tag = document.createElement('h1');
    h1Tag.innerHTML = 'Game Over';
    let button = document.createElement('button');
    button.innerHTML = 'Play again';
    body.appendChild(gameOverParent);
    gameOverParent.appendChild(h1Tag);
    gameOverParent.appendChild(button);
}