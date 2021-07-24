'use strict';

//Initial declaration
let score, activePlayer, currentScore, playing;

//Variable declaration for Players Score, Current Scores, dice
const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');
const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');
const player = document.querySelector('.player');
const player1Active = document.querySelector('.player--0');
const player2Active = document.querySelector('.player--1');

const dice = document.querySelector('.dice');

// Button Variables
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');

//Player & Score

//init function

const init = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  player1Score.textContent = 0;
  player2Score.textContent = 0;
  currentScore = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;
  dice.src = 'dice-5.png';
  dice.classList.remove('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  playing = true;
  activePlayer = 0;
};

init();

// Switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Active.classList.toggle('player--active');
  player2Active.classList.toggle('player--active');
};

//New Game Function
btnNewGame.addEventListener('click', init);

//Roll Dice Function
btnRollDice.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6 + 1);

    //Display Dice
    dice.src = `dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    if (diceNumber !== 1) {
      //Add dice to current score
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHoldScore.addEventListener('click', function () {
  if (playing) {
    //Adding current score to active players score
    score[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //check if players score is >=100
    if (score[activePlayer] >= 100) {
      dice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
