/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the finalScore (defaults to : 10 points) on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, lastRolls;

const btnRoll = document.querySelector(".btn-roll"),
  btnHold = document.querySelector(".btn-hold"),
  dice1Img = document.querySelector(".dice1"),
  dice2Img = document.querySelector(".dice2"),
  btnNew = document.querySelector(".btn-new"),
  finalScore = document.querySelector(".final-score");

init();

btnRoll.addEventListener("click", e => {
  if (gamePlaying) {
    var number1 = Math.round(Math.random() * 5) + 1;
    var number2 = Math.round(Math.random() * 5) + 1;

    
    changeVisibility(dice1Img, "block");
    changeVisibility(dice2Img, "block");
    dice1Img.src = `img/dice-${number1}.png`;
    dice2Img.src = `img/dice-${number2}.png`;

    lastRolls[activePlayer][0] = number1;
    lastRolls[activePlayer][1] = number2;

    if ((number1 === 6 || number2 === 6) && lastRolls[activePlayer] === 6) {
      roundScore = 0;
      scores[activePlayer] = 0;

      document.querySelector(`#current-${activePlayer}`).textContent = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = 0;

      switchPlayer();
    } else if (number1 === 1 || number2 === 1) {
      document.querySelector(`#current-${activePlayer}`).textContent = 0;
      changeVisibility(dice1Img, "none");
      changeVisibility(dice2Img, "none");
      switchPlayer();
    } else {
        roundScore +=   number1 + number2;

        document.querySelector(
          `#current-${activePlayer}`
        ).textContent = roundScore;
      }
    }
    
    e.preventDefault();
  });

btnHold.addEventListener("click", e => {
  if (gamePlaying) {
    document.querySelector(`#current-${activePlayer}`).textContent = 0;

    let apScore = document.querySelector(`#score-${activePlayer}`);

    scores[activePlayer] += roundScore;

    apScore.textContent = scores[activePlayer];

    if (scores[activePlayer] >= finalScoreValue) {
      gamePlaying = false;
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");

      document.querySelector(`#name-${activePlayer}`).textContent = "WINNER!";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");

      changeVisibility(dice1Img, "none");
      changeVisibility(dice2Img, "none");
    } else {
      switchPlayer();
    }
  }
  e.preventDefault();
});
btnNew.addEventListener("click", e => {
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove("winner");

  document.querySelector(
    `#name-${activePlayer}`
  ).textContent = `PLAYER ${activePlayer + 1}`;

  document.querySelector(`#score-0`).textContent = 0;
  document.querySelector(`#score-1`).textContent = 0;
  document.querySelector(`#current-0`).textContent = 0;
  document.querySelector(`#current-1`).textContent = 0;

  init();

  document.querySelector(`.player-0-panel`).classList.add("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  e.preventDefault();
});
finalScore.addEventListener("keyup", () => {
  finalScoreValue = finalScore.value;
});

function switchPlayer() {
  roundScore = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove("active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add("active");
}
function changeVisibility(element, vis) {
  element.style.display = vis;
}
function init() {
  scores = [0, 0];
  lastRolls = [[0, 0], [0, 0]];


  // undefined, 0 , null or "" are COERCED to false
  if (!finalScore.value) {
    finalScoreValue = 10;
  } else {
    finalScoreValue = finalScore.value;
  }
  roundScore = 0;
  activePlayer = 0; // 0 is the first player
  gamePlaying = true;

  
  changeVisibility(dice1Img, "none");
  changeVisibility(dice2Img, "none");
}
