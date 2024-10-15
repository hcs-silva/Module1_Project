class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#gameOver-screen");
    this.highScoreDisplay = document.querySelector("#scores");
    this.finalScore = document.querySelector("#currentScore");
    this.scoreDisplay = document.querySelector("#score-container");
    this.livesDisplay = document.querySelector("#lives-container");
    this.name = document.querySelector("#name").value;
    this.height = 750;
    this.width = 1500;
    this.player = new Caveman(210, 280, 80, 120, "images/caveman.png");
    this.enemies = [];
    this.clubs = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.floor(1000 / 60);
    this.throw = new Audio("sounds/Throw.wav");
    this.growl = new Audio("sounds/growl.wav");
    this.ouch = new Audio("sounds/ouch.mp3");
    this.gameOver = new Audio("sounds/gameOver.wav");
  }

  start() {
    this.generateHam()
    this.scoreDisplay.innerText = `${this.score}`;
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.classList.add("hide");
    this.gameScreen.classList.remove("hide");
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  generateHam() {
    //this method creates the image elements for the visual representation of lives
    for (let i = 0; i < this.lives; i++) {
      const hamImg = document.createElement("img");
      hamImg.src = "images/ham.png";
      hamImg.alt = "Cartoony Ham";
      hamImg.classList.add('lives');
      this.livesDisplay.appendChild(hamImg);
    }
  }

  gameLoop() {
    // game logic here
    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);

      const highScoreFromLS = JSON.parse(localStorage.getItem("highScores"));

      if (!highScoreFromLS) {
        //stores the highScores as an array of objects
        localStorage.setItem("highScores", JSON.stringify([{score: this.score, name: this.name}]));
      } else {
        highScoreFromLS.push({score: this.score, name: this.name});
        //sorting the scores
        const highScores = highScoreFromLS.sort((a, b) => b.score - a.score);
        const topThree = highScores.slice(0, 3);
        console.log(topThree)
        localStorage.setItem("highScores", JSON.stringify([...topThree]));

        this.highScoreDisplay.innerHTML = ""
        //Updating the DOM to reflect the 3 top scores
        topThree.forEach((item) => {
          const newLi = document.createElement("li");
          newLi.textContent = ` ${item.name} : ${item.score}`;
          this.highScoreDisplay.appendChild(newLi);
        });
      }
    }
  }

  update() {
    //Update game state here
    this.player.move();
    let counter = 1;
    let currentTarget = 100;
    if (this.score > currentTarget) {
      counter *= 4;
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
          this.growl.play();
          //removes the enemy from the array
          this.enemies.splice(j, 1);

          //removes the enemy and the club from the DOM
          currentEnemy.sabertooth.remove();
          club.club.remove();
          this.score += 40;
        }

        if (!club.didColide(currentEnemy) && club.left > 1700) {
          club.club.remove();
        }
      }
    }
    
   

    

    //loop throught the array of enemies and check for colision
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];

      if (this.player.didColide(enemy)) {
        this.ouch.play();
        this.lives--;
        this.livesDisplay.innerHTML = '';
        this.generateHam();
        //removes the enemy from the array
        this.enemies.splice(i, 1);
        //removes the enemy visualy from the DOM
        enemy.sabertooth.remove();
       
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
    this.scoreDisplay.innerText = `Your score is: ${this.score}`;

    this.finalScore.innerText = `Your final score is: ${this.score}`;

    if (this.lives === 0) {
      this.gameIsOver = true;
      this.endGame();
    }
  }

  endGame() {
    this.gameScreen.classList.add("hide");
    this.gameOverScreen.classList.remove("hide");
    this.gameOver.play();
  }
}
