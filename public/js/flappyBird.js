const flappyBird = {
  fps: 0,
  positionX: 48,
  positionY: 148,
  r: 12,
  width: 34,
  height: 26,
  flyUp: 4.2,
  birdSpeed: 0,
  gameGravity: 0.2,

  flyingAnimation: [
    { sourceX: 276, sourceY: 112 },
    { sourceX: 276, sourceY: 139 },
    { sourceX: 276, sourceY: 164 },
    { sourceX: 276, sourceY: 139 },
  ],

  create: function () {
    let flappyBird = this.flyingAnimation[this.fps];

    ctx.save();
    ctx.translate(this.positionX, this.positionY);
    // ctx.rotate(this.rotation);
    ctx.drawImage(
      flappyBirdImg,
      flappyBird.sourceX,
      flappyBird.sourceY,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    ctx.restore();
  },

  gameUpdate: function () {
    if (gameState.presentState == gameState.startState) {
      this.time = 10;
    } else {
      this.time = 5;
    }

    if (gameFrame % this.time == 0) {
      this.fps += 1;
    } else {
      this.fps += 0;
    }

    this.fps = this.fps % this.flyingAnimation.length;

    if (gameState.presentState == gameState.startState) {
      this.positionY = 150;
    } else {
      this.birdSpeed += this.gameGravity;
      this.positionY += this.birdSpeed;

      if (
        this.positionY + this.height / 2 >=
        gameCanvas.height - gameForeground.height
      ) {
        this.positionY =
          gameCanvas.height - gameForeground.height - this.height / 2;
        if (gameState.presentState == gameState.playState) {
          gameState.presentState = gameState.endState;
        }
      }

      if (this.birdSpeed >= this.flyUp) {
        this.fps = 1;
      }
    }
  },
  resetSpeed: function () {
    this.birdSpeed = 0;
  },
  wingsFlap: function () {
    this.birdSpeed = -this.flyUp;
  },
};
