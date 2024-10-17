class Caveman {
  constructor(left, top, width, height, cavemanImg) {
    this.gameScreen = document.querySelector("#game-screen");
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;

    this.caveman = document.createElement("img");
    this.caveman.style.position = "absolute";
    this.caveman.style.left = `${this.left}px`;
    this.caveman.style.top = `${this.top}px`;
    this.caveman.src = cavemanImg;
    this.caveman.style.height = `${this.height}px`;
    this.caveman.style.width = `${this.width}px`;
    this.gameScreen.appendChild(this.caveman);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 0) {
      this.left = 0;
    }

    if (this.left > 1630) {
      this.left = 1630;
    }

    if (this.top < 0) {
      this.top = 0;
    }

    if (this.top > 630) {
      this.top = 630;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.caveman.style.left = `${this.left}px`;
    this.caveman.style.top = `${this.top}px`;
  }

  didColide(obstacle) {
    const playerRect = this.caveman.getBoundingClientRect();
    const obstacleRect = obstacle.sabertooth.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else return false;
  }

  
}
