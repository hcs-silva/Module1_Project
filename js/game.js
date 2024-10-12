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
    this.clubs = [];
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
    let counter = 1;
    let currentTarget = 100;
    if (this.score > currentTarget) {
      counter *= 4
      currentTarget += 150;
    }

    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();
    }
    //this creates the enemies and pushes them into the enemies array
    if (Math.random() > 0.98 && this.enemies.length < counter) {
      this.enemies.push(new Obstacle(this.gameScreen));
    }

    //this loops throught the clubs array and moves all the clubs
    for (let i = 0; i < this.clubs.length; i++) {
      const club = this.clubs[i];
      club.move();

      //this checks for colision of the current club with the current enemy
      for (let j = 0; j < this.enemies.length; j++) {
        const currentEnemy = this.enemies[j];
        if (club.didColide(currentEnemy)) {
          //removes the enemy from the array
          this.enemies.splice(j, 1);
          
          //removes the enemy and the club from the DOM
          currentEnemy.sabertooth.remove();
          club.club.remove();
          this.score += 40;
        } 

        if( !club.didColide(currentEnemy) && club.left > 1700) {
            club.club.remove()
        }
      }
    }

    //loop throught the array of enemies and check for colision
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];

      if (this.player.didColide(enemy)) {
        this.lives--;
        //removes the enemy from the array
        this.enemies.splice(i, 1);
        //removes the enemy visualy from the DOM
        enemy.sabertooth.remove();
        //Updates the lives
        this.livesDisplay.innerText = `${this.lives}`;
      } else if (!this.player.didColide(enemy)) {
        //if the player didnt colide with the enemy, it is removed from the screen when the enemy left property equals 100
        if (enemy.left < 100) {
          this.score += 10;

          this.enemies.splice(i, 1);
          enemy.sabertooth.remove();
        }
      }
    }
    //this updates the score
    this.scoreDisplay.innerText = `${this.score}`;

 

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
