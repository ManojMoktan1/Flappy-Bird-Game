const gameCanvas = document.getElementById("canvas");
const ctx = gameCanvas.getContext("2d");
gameCanvas.width = 320;
gameCanvas.height = 480;

const flappyBirdImg = new Image();
flappyBirdImg.src = "images/flappy-bird.png";

let gameFrame = 0;

const playButton = {
  positionX: 119,
  positionY: 262,
  width: 100,
  height: 30,
};

const gameState = {
  presentState: 0,
  startState: 0,
  playState: 1,
  endState: 2,
};

document.addEventListener("keyup", function (e) {
  if (gameState.presentState === gameState.playState) {
    if (e.key == " ") {
      if (flappyBird.positionY - flappyBird.r <= 0) return;
      flappyBird.wingsFlap();
    }
  }
});

gameCanvas.addEventListener("click", function (e) {
  if (gameState.presentState === gameState.startState) {
    gameState.presentState = gameState.playState;
  }
  if (gameState.presentState === gameState.playState) {
    if (flappyBird.positionY - flappyBird.r <= 0) return;
    flappyBird.wingsFlap();
  }
  if (gameState.presentState === gameState.endState) {
    let rectangle = gameCanvas.getBoundingClientRect();
    let pressX = e.clientX - rectangle.left;
    let pressY = e.clientY - rectangle.top;

    if (
      pressX >= playButton.positionX &&
      pressX <= playButton.positionX + playButton.width &&
      pressY >= playButton.positionY &&
      pressY <= playButton.positionY + playButton.height
    ) {
      obstaclePipe.gameReset();
      flappyBird.resetSpeed();
      currentScore.gameReset();
      gameState.presentState = gameState.startState;
    }
  }
});

const gameForeground = {
  width: 224,
  height: 112,
  positionX: 0,
  positionY: gameCanvas.height - 112,
  sourceX: 276,
  sourceY: 0,

  dX: 2,

  create: function () {
    ctx.drawImage(
      flappyBirdImg,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );

    ctx.drawImage(
      flappyBirdImg,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.positionX + this.width,
      this.positionY,
      this.width,
      this.height
    );
  },

  gameUpdate: function () {
    if (gameState.presentState == gameState.playState) {
      this.positionX = (this.positionX - this.dX) % (this.width / 2);
    }
  },
};

const gameBackground = {
  width: 275,
  height: 226,
  positionX: 0,
  positionY: gameCanvas.height - 226,
  sourceX: 0,
  sourceY: 0,

  create: function () {
    ctx.drawImage(
      flappyBirdImg,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );

    ctx.drawImage(
      flappyBirdImg,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.positionX + this.width,
      this.positionY,
      this.width,
      this.height
    );
  },
};

//Start Screen
const startState = {
  width: 173,
  height: 152,
  positionX: gameCanvas.width / 2 - 173 / 2,
  positionY: 80,
  sourceX: 0,
  sourceY: 228,

  create: function () {
    if (gameState.presentState == gameState.startState) {
      ctx.drawImage(
        flappyBirdImg,
        this.sourceX,
        this.sourceY,
        this.width,
        this.height,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    }
  },
};

// End Screen
const gameOver = {
  sourceX: 175,
  sourceY: 228,
  width: 225,
  height: 202,
  positionX: gameCanvas.width / 2 - 220 / 2,
  positionY: 90,

  create: function () {
    if (gameState.presentState == gameState.endState) {
      ctx.drawImage(
        flappyBirdImg,
        this.sourceX,
        this.sourceY,
        this.width,
        this.height,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    }
  },
};

//for showing scores
const currentScore = {
  highest: parseInt(localStorage.getItem("HighScore")) || 0,
  num: 0,

  create: function () {
    ctx.fillStyle = "#white";
    ctx.strokeStyle = "#black";
    if (gameState.presentState == gameState.endState) {
      ctx.font = "20px Sans-Serif";
      ctx.fillText(this.num, 235, 182);
      ctx.strokeText(this.num, 235, 182);
      ctx.fillText(this.highest, 235, 225);
      ctx.strokeText(this.highest, 235, 225);
    } else if (gameState.presentState == gameState.playState) {
      ctx.font = "30px Sans-Serif";
      ctx.lineWidth = 1.5;
      ctx.fillText(this.num, gameCanvas.width / 2, 40);
      ctx.strokeText(this.num, gameCanvas.width / 2, 40);
    }
  },

  gameReset: function () {
    this.num = 0;
  },
};

const create = () => {
  ctx.fillStyle = "#DEB887";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  gameBackground.create();
  obstaclePipe.create();
  gameForeground.create();
  flappyBird.create();
  startState.create();
  gameOver.create();
  currentScore.create();
};

const gameUpdate = () => {
  flappyBird.gameUpdate();
  gameForeground.gameUpdate();
  obstaclePipe.gameUpdate();
};

const startGame = () => {
  gameUpdate();
  create();
  gameFrame++;
  requestAnimationFrame(startGame);
};
startGame();
