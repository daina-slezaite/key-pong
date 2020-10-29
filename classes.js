class Bar {
    constructor() {
        this.x = 450;
        this.y = 480;
        this.width = 100;
        this.height = 20;
        this.step = 20;
        this.draw();
    }
    draw() {
        game.ctx.beginPath();
        game.ctx.fillStyle = '#E6137C';
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
        game.ctx.closePath();
    }
    moveRight() {
        if(this.x < canvas.width - bar.width) {
            this.x += this.step;
        }
    }
    moveLeft() {
        if(this.x > 0) {
            this.x -= this.step;
        }
    }
}

class Ball {
    constructor() {
        this.x = this.getRandomStartingPoint(50, canvas.width);
        this.y = this.getRandomStartingPoint(50, 400);
        this.radius = 7;
        this.xDirection = 3;
        this.yDirection = 3;
        this.score = 0;
        this.speed = 1;
        this.draw();
    }
    getRandomStartingPoint(min, max) {
        return Math.random() * (max - min) + min;
    }
    draw() {
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        game.ctx.fillStyle = '#8C52FF';
        game.ctx.fill();
        game.ctx.closePath();
    }
    move() {
        this.x += this.xDirection * this.speed;
        this.y += this.yDirection * this.speed;
        game.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
        if(this.x + this.xDirection > canvas.width - this.radius || this.x + this.xDirection < this.radius) {
            this.xDirection = this.xDirection/-1;
        }
        if (game.getDistance(this.x, this.y) < (this.radius*2)) {
            bounce.volume = "0.2";
            bounce.play();
            this.yDirection = this.yDirection/-1;
            this.score++;
        }
        if(this.y + this.yDirection < this.radius) {
            this.yDirection = this.yDirection/-1; 
        }
        if(this.y + this.yDirection > canvas.height) {
<<<<<<< HEAD
            drop.volume = "0.5";
            drop.play();
            this.stop();
            game.stopCoinGenerator();
=======
            drop.play();
            game.gameOver();
>>>>>>> gh-pages
            setTimeout(() => {
                game.removeCanvas();
            }, 200);
            setTimeout(() => {
                game.ctx.clearRect(0, 0, canvas.width, canvas.height);
                clearInterval(canvasUpdate);
            }, 300);
        }
    }
    stop() {
        this.xDirection = 0;
        this.yDirection = 0;
    }
}

class Game {
    constructor() {
        this.ctx = canvas.getContext('2d');
    }
    updateCanvas() {
        canvasUpdate = setInterval(() => {
            ball.draw();
            ball.move();
            bar.draw();
            this.showScore();
            coinsArr.forEach(coin => {
                coin.draw();
                coin.move();
        })
        }, 15);
    }
    startGame() {
        this.showScore();
        ball.draw();
        bar.draw();
        this.startCoinGenerator();
        coinsArr = [];
    }
    showScore() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${ball.score}`, 15, 30);
    }
    getDistance(x2, y2) {
        function clamp(val, min, max) {
            return Math.max(min, Math.min(max, val));
        }
        
        let closestX = clamp(x2, bar.x, bar.x + bar.width);
        let closestY = clamp(y2, bar.y, bar.y + bar.height);
    
        let xDistance = x2 - closestX;
        let yDistance = y2 - closestY;
    
        return (Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
    startCoinGenerator() {
        this.ctx.globalCompositeOperation='destination-over';
        coinGenerator = setInterval(() => {
            coinsArr.push(new Coin());
        }, 4000);
    }
    stopCoinGenerator() {
        clearInterval(coinGenerator);
    }
    swapInstructionsToCanvas() {
        instructions.remove();
        canvas.id = "canvas";
        canvas.width = 700;
        canvas.height = 500;
        body.appendChild(canvas);
    }
    swapGameOverToInstructions() {
        document.getElementById("game-over-screen").remove();
        body.appendChild(instructions);
    }
    removeCanvas() {
        canvas.remove();
        let gameOverParent = document.createElement('div');
        gameOverParent.id = "game-over-screen";
        let h1Tag = document.createElement('h1');
        h1Tag.innerHTML = "Oh no! So many keys to learn, so little time...";
        let h2Tag = document.createElement('h2');
        h2Tag.innerHTML = `Your final score: ${ball.score}.`;
        let secondPTag = document.createElement('p');
        secondPTag.innerHTML = 'Keep playing and you will get better!';
        let playAgainButton = document.createElement('button');
        playAgainButton.innerHTML = 'Play again';
        playAgainButton.classList.add('restart');
        body.appendChild(gameOverParent);
        gameOverParent.appendChild(h1Tag);
        gameOverParent.appendChild(h2Tag);
        gameOverParent.appendChild(secondPTag);
        gameOverParent.appendChild(playAgainButton);

        let playAgain = document.getElementsByClassName('restart')[0];

        playAgain.addEventListener('click', event => {
            this.swapGameOverToInstructions();
        })
    }
    gameOver() {
        ball.stop();
        this.stopCoinGenerator();
        bounce.pause();
        cMajor.pause();
        dMajor.pause();
        eMajor.pause();
        fMajor.pause();
        gMajor.pause();
        aMajor.pause();
        bMajor.pause();
    }
}

class Coin {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = this.randomX();
        this.y = 0;
        this.dy = 2;
        this.image = this.randomCoin();
        this.draw();
    }
    randomX() {
        return Math.floor(Math.random() * (canvas.width - 50));
    }
    randomCoin() {
        return templateCoins[Math.floor(Math.random()*templateCoins.length)];
    }
    draw() {
        game.ctx.drawImage(this.image, this.x, this.y);
    }
    move() {
        this.y += this.dy;
        if(game.getDistance(this.x, this.y) < this.width) {
            this.takeEffect();
        }
        coinsArr = coinsArr.filter((coin) => {
            return coin.y < canvas.height;
        })
    }
    takeEffect() {
        switch(this.image) {
            case coin1:
                cMajor.volume = "0.5"
                cMajor.play();
                bar.width = 150; 
                setTimeout(() => {
                    bar.width = 100;
                }, 4000);
                break;
            case coin2:
                dMajor.volume = "0.5"
                dMajor.play();
                bar.width = 50; 
                setTimeout(() => {
                    bar.width = 100;
                }, 4000);
                break;
            case coin3:
                eMajor.volume = "0.5"
                eMajor.play();
                ball.radius = 3.5;
                setTimeout(() => {
                    ball.radius = 7;
                }, 4000);
                break;
            case coin4:
                fMajor.volume = "0.5"
                fMajor.play();
                ball.radius = 10;
                setTimeout(() => {
                    ball.radius = 7;
                }, 4000);
                break;
            case coin5:
                gMajor.volume = "0.5"
                gMajor.play();
                ball.speed = 1.4;
                setTimeout(() => {
                    ball.speed = 1;
                }, 3000);
                break;
            case coin6:
                aMajor.volume = "0.5"
                aMajor.play();
                canvas.classList.add("night");
                setTimeout(() => {
                    canvas.classList.remove("night");
                }, 9000);
                break;
            case coin7:
                bMajor.volume = "0.5"
                bMajor.play();
                bar.step = 40;
                setTimeout(() => {
                    bar.step = 20;
                }, 4000);
                break;
        }
    }
}