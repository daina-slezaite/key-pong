let bar;

let ball;

let canvas = document.createElement("canvas");

let coinGenerator;

let game = new Game();

let body = document.querySelector('body');

let startButton = document.querySelector(".start-game");

let instructions = document.getElementById('opening-screen');

let coin1 = new Image();
coin1.src = "./images/piano-c.svg"

let coin2 = new Image();
coin2.src = "./images/piano-d.svg"

let coin3 = new Image();
coin3.src = "./images/piano-e.svg"

let coin4 = new Image();
coin4.src = "./images/piano-f.svg"

let coin5 = new Image();
coin5.src = "./images/piano-g.svg"

let coin6 = new Image();
coin6.src = "./images/piano-a.svg"

let coin7 = new Image();
coin7.src = "./images/piano-h.svg"

let templateCoins = [coin1, coin2, coin3, coin4, coin5, coin6, coin7];
let coinsArr = [];

let bounce = new Audio();
bounce.src = "./sounds/bounce.mp3"

let drop = new Audio();
drop.src = "./sounds/drop.mp3"

let cMajor = new Audio();
cMajor.src = "./sounds/C-major.wav"

let dMajor = new Audio();
dMajor.src = "./sounds/D-major.wav"

let eMajor = new Audio();
eMajor.src = "./sounds/E-major.wav"

let fMajor = new Audio();
fMajor.src = "./sounds/F-major.wav"

let gMajor = new Audio();
gMajor.src = "./sounds/G-major.wav"

let aMajor = new Audio();
aMajor.src = "./sounds/A-major.wav"

let bMajor = new Audio();
bMajor = "./sounds/B-major.wav"

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

startButton.addEventListener('click', event => {
    game.swapInstructionsToCanvas();
    ball = new Ball();
    bar = new Bar();
    game.startGame();
    setTimeout(() => {
        game.updateCanvas();
    }, 1000);
})
