class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.top = Math.floor(Math.random() * 750);
    this.left = 1600;
    this.width = 100;
    this.height = 150;

    this.sabertooth = document.createElement("img");
    this.sabertooth.style.position = "absolute";
    this.sabertooth.style.left = `${this.left}px`;
    this.sabertooth.style.top = `${this.top}px`;
    this.sabertooth.src = "../Images/diego.png";
    this.sabertooth.style.height = `${this.height}px`;
    this.sabertooth.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.sabertooth);
  }

  updatePosition() {
    this.sabertooth.style.left = `${this.left}px`;
    this.sabertooth.style.top = `${this.top}px`;
  }

  move() {
    if(this.top < 100) {
        this.top = 100
    }

    if(this.top > 600) {
        this.top = 600
    }

    

    if (this.left > 1)
    this.left -= 2;
    this.updatePosition();
  }
}
