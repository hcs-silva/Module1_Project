class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#gameOver-screen");
    this.scoreDisplay = document.querySelector("#score span");
    this.height = 750;
    this.width = 1500;
    this.player = new Caveman(210, 280, 80, 120, "../Images/caveman.png");
    this.enemies = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.floor(1000 / 60);
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.classList.add("hide");
    this.gameScreen.classList.remove("hide");
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    // game logic here
    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    //Update game state here

    //this.scoreDisplay.innerText = this.score;
    this.player.move();
  }
}
