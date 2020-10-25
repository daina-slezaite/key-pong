let bar;

let ball;

let canvas = document.createElement("canvas");

let coinGenerator;

let game = new Game();

let body = document.querySelector('body');

let startButton = document.querySelector(".start-game");

let coin1 = new Image();
coin1.src = "./images/Element1.png"

let coin2 = new Image();
coin2.src = "./images/Element2.png"

let coin3 = new Image();
coin3.src = "./images/Element3.png"

let coin4 = new Image();
coin4.src = "./images/Element4.png"

let templateCoins = [coin1, coin2, coin3, coin4];
let coinsArr = [];

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

