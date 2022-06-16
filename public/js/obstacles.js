const obstaclePipe = {
  postionBottom: {
    sourceX: 500,
    sourceY: 0,
  },

  positionTop: {
    sourceX: 552,
    sourceY: 0,
  },
  placement: [],

  width: 55,
  height: 400,
  dX: 2,
  pipesGap: 91,
  yMaxPosition: -149,

  create: function () {
    for (let i = 0; i < this.placement.length; i++) {
      let place = this.placement[i];

      let yTopPosition = place.positionY;
      let yBottomPosition = place.positionY + this.height + this.pipesGap;

      // for bottom obstacle
      ctx.drawImage(
        flappyBirdImg,
        this.postionBottom.sourceX,
        this.postionBottom.sourceY,
        this.width,
        this.height,
        place.positionX,
        yBottomPosition,
        this.width,
        this.height
      );

      //for top obstacle
      ctx.drawImage(
        flappyBirdImg,
        this.positionTop.sourceX,
        this.positionTop.sourceY,
        this.width,
        this.height,
        place.positionX,
        yTopPosition,
        this.width,
        this.height
      );
    }
  },

  gameUpdate: function () {
    if (gameState.presentState !== gameState.playState) return;

    if (gameFrame % 100 == 0) {
      this.placement.push({
        positionX: gameCanvas.width,
        positionY: this.yMaxPosition * (Math.random() + 1),
      });
    }
    for (let i = 0; i < this.placement.length; i++) {
      let place = this.placement[i];

      let yPositionBottomPipe = place.positionY + this.height + this.pipesGap;

      //Checking collision with top obstacle

      if (
        flappyBird.positionX + flappyBird.r > place.positionX &&
        flappyBird.positionX - flappyBird.r < place.positionX + this.width &&
        flappyBird.positionY + flappyBird.r > place.positionY &&
        flappyBird.positionY - flappyBird.r < place.positionY + this.height
      ) {
        gameState.presentState = gameState.endState;
      }
      //Checking collision with bottom obstacle
      if (
        flappyBird.positionX + flappyBird.r > place.positionX &&
        flappyBird.positionX - flappyBird.r < place.positionX + this.width &&
        flappyBird.positionY + flappyBird.r > yPositionBottomPipe &&
        flappyBird.positionY - flappyBird.r < yPositionBottomPipe + this.height
      ) {
        gameState.presentState = gameState.endState;
      }

      /* Moving the pipes to the left. */
      place.positionX -= this.dX;

      //remove from array if the obstacles go beyond canvas
      if (place.positionX + this.width <= 0) {
        this.placement.shift();
        currentScore.num += 1;
        currentScore.highest = Math.max(currentScore.num, currentScore.highest);
        localStorage.setItem("HighScore", currentScore.highest);
      }
    }
  },

  //resetting the pipes placement
  gameReset: function () {
    this.placement = [];
  },
};
