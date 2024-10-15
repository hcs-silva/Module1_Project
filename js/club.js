class Club {
  constructor(left, top) {
    this.gameScreen = document.querySelector("#game-screen");
    this.left = left;
    this.top = top;
    this.height = 40;
    this.width = 40;

    //creating the club element
    this.club = document.createElement("img");
    this.club.style.position = "absolute";
    this.club.style.left = `${this.left}px`;
    this.club.style.top = `${this.top}px`;
    this.club.src = "../images/club.png";
    this.club.style.height = `${this.height}px`;
    this.club.style.width = `${this.width}px`;
    this.club.classList.add("rotate");
    this.gameScreen.appendChild(this.club);
  }

  move() {
    this.left += 12;
    this.updatePosition();
  }

  updatePosition() {
    this.club.style.left = `${this.left}px`;
    this.club.style.top = `${this.top}px`;
  }

  didColide(obstacle) {
    const clubRect = this.club.getBoundingClientRect();
    const obstacleRect = obstacle.sabertooth.getBoundingClientRect();

    if (
      clubRect.left < obstacleRect.right &&
      clubRect.right > obstacleRect.left &&
      clubRect.top < obstacleRect.bottom &&
      clubRect.bottom > obstacleRect.top
    ) {
      return true;
    } else return false;
  }
}
