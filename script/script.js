let foot = document.querySelector(".foot");
let pitch = document.querySelector(".pitch");
let ball = document.querySelector(".ball");
const goalKeeper = document.querySelector(".goal-keeper");

let modal = document.querySelector(".modal");
let win = document.querySelector(".win");
let loose = document.querySelector(".loose");
let scoreDisplay = document.querySelector(".score");
let constBtn = document.querySelector(".contBtn");
let pcScore = document.querySelector(".pcScore");
let playGameAgainBtn = document.querySelector(".playAgain");

let quitGameBtn = document.querySelector(".quitGame");

let score = 0;
let pc = 0;
let gameCount = 0;

let goalPath = {
  1: { b: 150, l: 180, r: -50 },
  2: { b: 90, l: 180, r: -75 },
  3: { b: 25, l: 180, r: -90 },
  4: { b: 140, l: 398, r: 0 },
  5: { b: 95, l: 398, r: 0 },
  6: { b: 10, l: 380, r: 80 },
  7: { b: 150, l: 610, r: 50 },
  8: { b: 90, l: 610, r: 75 },
  9: { b: 25, l: 610, r: 90 },
};

let ballPath = {
  1: { b: 292, l: 207 },
  2: { b: 200, l: 207 },
  3: { b: 105, l: 207 },
  4: { b: 295, l: 485 },
  5: { b: 200, l: 485 },
  6: { b: 105, l: 485 },
  7: { b: 292, l: 760 },
  8: { b: 200, l: 760 },
  9: { b: 105, l: 760 },
};

function winFunc() {
  win.innerHTML = "You Win";
  playGameAgainBtn.style.display = "block";
  constBtn.style.display = "none";
  gameOver.play();
}

function looseFunc() {
  win.style.display = "none";
  loose.innerHTML = "You Loose";
  loose.style.display = "block";
  playGameAgainBtn.style.display = "block";
  constBtn.style.display = "none";
  gameOver.play();
}

function playAgain() {
  gameOver.load();
  goalSave.load();
  goalSound.load();
  constBtn.innerHTML = "Start Game";
  constBtn.style.display = "block";
  playGameAgainBtn.style.display = "none";
  scoreDisplay.innerHTML = "0";
  scoreDisplay.style.color = "#f12d0b";
  pcScore.innerHTML = "0";
  pcScore.style.color = "#4cd174";
  win.style.display = "none";
  loose.style.display = "none";
  ball.style.cssText = `
  bottom: 10px;
  left: calc(50% - 25px);
  `;

  goalKeeper.style.cssText = `
  bottom: 70px;
  left: calc(50% - 105px);
  `;
  score = 0;
  pc = 0;
  gameCount = 0;

  modal.style.oppacity = "0";
  modal.style.pointerEvents = "none";
  modal.style.zIndex = "-1";

  win.style.display = "none";
  loose.style.display = "none";
  goalSound.load();
}

pitch.addEventListener("mousemove", (e) => {
  (pitch.style.cursor = "none"),
    (foot.style.display = "block"),
    (foot.style.top = `${e.offsetY - 35}px`),
    (foot.style.left = `${e.offsetX - 35}px`);
  foot.style.cssText = `
      display: block;
      top: ${e.offsetY - 35}px;
      left: ${e.offsetX - 35}px;
    `;
});

pitch.addEventListener("mousedown", (e) => {
  foot.style.top = `${e.offsetY - 45}px`;
  foot.style.cssText = `
      display: block;
      top: ${e.offsetY - 35}px;
      left: ${e.offsetX - 35}px;
      transform: rotate(-50deg);
    `;
});
pitch.addEventListener("mouseup", (e) => {
  foot.style.top = `${e.offsetY - 35}px`;
  foot.style.cssText = `
      display: block;
      top: ${e.offsetY - 35}px;
      left: ${e.offsetX - 35}px;
      transform: rotate(0deg);
    `;
});

pitch.addEventListener("click", (e) => {
  foot.style.transform.rotate = "0deg";

  let randNumGoal = parseInt(Math.random() * 9);
  let randNumBall = parseInt(Math.random() * 9);

  if (
    e.offsetX >= 455 &&
    e.offsetX <= 500 &&
    e.offsetY >= 520 &&
    e.offsetY <= 570
  ) {
    ballSound.play();

    ball.style.cssText = `
      bottom: ${ballPath[randNumBall + 1].b}px;
      left: ${ballPath[randNumBall + 1].l}px;
      width: 30px;
    `;

    goalKeeper.style.cssText = `
      bottom: ${goalPath[randNumGoal + 1].b}px;
      left: ${goalPath[randNumGoal + 1].l}px;
      transform: rotate(${goalPath[randNumGoal + 1].r}deg);
    `;

    if (randNumBall + 1 !== randNumGoal + 1) {
      if (randNumGoal + 1 == 4 && randNumBall + 1 == 5) {
        setTimeout(() => {
          goalSave.play();
        }, 300);
        win.style.display = "none";
        loose.style.display = "block";
        gameCount += 1;
        pc += 1;
        pcScore.innerHTML = pc;
        pcScore.style.color = "#f12d0b";
        setTimeout(() => {
          modal.style.display = "flex";
          modal.style.oppacity = "1";
          modal.style.pointerEvents = "all";
          modal.style.zIndex = "500";
          constBtn.innerHTML = "Continue";
          constBtn.style.display = "block";
          quitGameBtn.style.display = "block";
          foot.style.height = "0";
          foot.style.width = "0";
        }, 500);
        if (gameCount >= 5) {
          setTimeout(() => {
            constBtn.style.display = "none";
          }, 501);
          if (score > pc) {
            winFunc();
          } else {
            looseFunc();
          }
        }
        return false;
      }
      // stadiumSound.load();
      goalSound.play();
      score += 1;
      gameCount += 1;
      scoreDisplay.innerHTML = score;
      if (score > 0) {
        scoreDisplay.style.color = "#4cd174";
      }
      win.style.display = "block";
      if (gameCount >= 5 && score > pc) {
        winFunc();
      }
    } else {
      if (gameCount >= 4 && score < pc) {
        looseFunc();
      }
      setTimeout(() => {
        goalSave.play();
      }, 300);
      loose.style.display = "block";
      gameCount += 1;
      pc += 1;
      pcScore.innerHTML = pc;
      pcScore.style.color = "#f12d0b";
    }

    setTimeout(() => {
      modal.style.display = "flex";
      modal.style.oppacity = "1";
      modal.style.pointerEvents = "all";
      modal.style.zIndex = "500";
      constBtn.innerHTML = "Continue";
      foot.style.height = "0";
      foot.style.width = "0";
    }, 500);
  }
});

const continueGame = () => {
  // stadiumSound.play();
  ball.style.cssText = `
  bottom: 10px;
  left: calc(50% - 25px);
  `;

  goalKeeper.style.cssText = `
  bottom: 70px;
  left: calc(50% - 105px);
  `;

  modal.style.oppacity = "0";
  modal.style.pointerEvents = "none";
  modal.style.zIndex = "-1";

  win.style.display = "none";
  loose.style.display = "none";
  goalSound.load();
};

// x: 455 - 500
// y 520 - 570

// Enter game

let enterGameDisplay = document.querySelector(".enterGame");

let startDisplay = document.querySelector(".startDisplay");

let intRun = 0;

const enterGame = () => {
  enterGameDisplay.style.display = "none";
  uefaAudio.play();
  if (intRun == 0) {
    setInterval(() => {
      let randImgNum = 1 + parseInt(Math.random() * 30);
      startDisplay.style.backgroundImage = `url("./img/slideShowImgs/img-${randImgNum}.jpg")`;
    }, 1000);
    ++intRun;
  }
};

const exitGame = () => {
  enterGameDisplay.style.display = "flex";
  uefaAudio.load();
};

const startGame = () => {
  startDisplay.style.display = "none";
  uefaAudio.load();
};

const quitGame = () => {
  playGameAgainBtn.style.display = "none";
  constBtn.style.display = "block";
  startDisplay.style.display = "flex";
  uefaAudio.play();
  gameOver.load();
  goalSave.load();
  goalSound.load();
  constBtn.innerHTML = "Start Game";
  scoreDisplay.innerHTML = "0";
  scoreDisplay.style.color = "#f12d0b";
  pcScore.innerHTML = "0";
  pcScore.style.color = "#4cd174";
  win.style.display = "none";
  loose.style.display = "none";
  ball.style.cssText = `
  bottom: 10px;
  left: calc(50% - 25px);
  `;

  goalKeeper.style.cssText = `
  bottom: 70px;
  left: calc(50% - 105px);
  `;
  score = 0;
  pc = 0;
  gameCount = 0;
};
