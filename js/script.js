const startBtn = document.querySelector("#start-button");
const restartBtn = document.querySelector("#restart");

let myGame;

startBtn.addEventListener("click", function () {
  startGame();
});

restartBtn.addEventListener("click", () => {
  restartGame();
});
//Adding the Event Listener for the arrow keys or the W A S D keys

document.addEventListener("keydown", function (e) {
  //Handles the movement of the player
  if (e.key === "ArrowUp" || e.key === "w") {
    myGame.player.directionY = -6;
  }

  if (e.key === "ArrowDown" || e.key === "s") {
    myGame.player.directionY = 6;
  }

  //Player going left and right
  if (e.key === "ArrowLeft" || e.key === "a") {
    myGame.player.directionX = -6;
  }

  if (e.key === "ArrowRight" || e.key === "d") {
    myGame.player.directionX = 6;
  }

  //player shooting clubs
  console.log(e.key);
  if (e.key === " ") {
    myGame.clubs.push(
      new Club(myGame.player.left + 80, myGame.player.top + 60)
    );
  }
});

document.addEventListener("keypress", (e) => {});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "w") {
    myGame.player.directionY = 0;
  }

  if (e.key === "ArrowDown" || e.key === "s") {
    myGame.player.directionY = 0;
  }

  //Player going left and right
  if (e.key === "ArrowLeft" || e.key === "a") {
    myGame.player.directionX = 0;
  }

  if (e.key === "ArrowRight" || e.key === "d") {
    myGame.player.directionX = 0;
  }
});

function startGame() {
  myGame = new Game();
  myGame.start();
}

function restartGame() {
  location.reload();
}
