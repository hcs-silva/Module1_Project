class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#gameOver-screen");
    this.scoreDisplay = document.querySelector("#score-container");
    this.livesDisplay = document.querySelector("#lives-container");
    this.height = 750;
    this.width = 1500;
    this.player = new Caveman(210, 280, 80, 120, "../Images/caveman.png");
    this.enemies = [];
    this.score = 0;
    // this.life1 = document.querySelector("#life1");
    // this.life2 = document.querySelector("#life2");
    // this.life3 = document.querySelector("#life3");
    // this.lives = [life1, life2, life3];
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.floor(1000 / 60);
  }

  start() {
    this.livesDisplay.innerText = `${this.lives}`;
    this.scoreDisplay.innerText = `${this.score}`;
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
    this.player.move();

    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();
    }
    //this creates the enemies and pushed them into the enemies array
    if (Math.random() > 0.98 && this.enemies.length < 1) {
      this.enemies.push(new Obstacle(this.gameScreen));
    }

    //loop throught the array of enemies and check for colision
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
        if(enemy.sabertooth.left < 100) {
          enemy.sabertooth.remove()
        }
      if (this.player.didColide(enemy)) {
        this.lives--;
        //removes the enemy from the array
        this.enemies.splice(i, 1);
        //removes the enemy visualy from the DOM
        enemy.sabertooth.remove();
        //Updates the lives
        this.livesDisplay.innerText = `${this.lives}`;             
      }
    
    }

    if (this.lives === 0) {
      this.gameIsOver = true;
      this.endGame();
    }
  }

  endGame() {
    this.gameScreen.classList.add("hide");
    this.gameOverScreen.classList.remove("hide");
  }
}
