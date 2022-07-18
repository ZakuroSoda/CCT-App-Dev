// width="800px" height="500px"
//Setup
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

ctx.clearRect(0,0,800,500);
ctx.fillStyle = '#F000000';

var score = 0;
var centerPointWidth = 50;
var centerPointHeight = 50;
ctx.fillRect((canvas.width / 2) - (centerPointWidth / 2), (canvas.height / 2) - (centerPointHeight / 2), centerPointWidth, centerPointHeight);
var xCoordinate = (canvas.width / 2) - (centerPointWidth / 2);
var yCoordinate = (canvas.height / 2) - (centerPointHeight / 2);


function randomRange(min, max){
  return Math.floor((Math.random() * (max - min + 1)) + min);
}
function updateScore(score){
  if (score == undefined){
    console.log("error");
  }
  else {
    document.getElementById("score").innerHTML = "Score: " + score;
  }
}
updateScore(score);

function spawnFruit(x,y){
  ctx.fillStyle = '#00FF00';
  if (x != undefined){
    var xCoordinateFruit = x;
  } else{
    var xCoordinateFruit = randomRange(0,770);
  }
  if (y != undefined){
    var yCoordinateFruit = y;
  } else{
    var yCoordinateFruit = randomRange(0,470);
  }
  ctx.fillRect(xCoordinateFruit,yCoordinateFruit,30,30);
  ctx.fillStyle = '#000000';
  return {
    'xCoordinateFruit': xCoordinateFruit,
    'yCoordinateFruit': yCoordinateFruit
  };
}
let fruitCoordinates = spawnFruit();
function checkEat(playerX, playerY){
  //thanks to https://youtu.be/_MyPLZSGS3s
  if (
    playerX + 50 >= fruitCoordinates.xCoordinateFruit &&
    playerX <= fruitCoordinates.xCoordinateFruit + 30 &&
    playerY + 50 >= fruitCoordinates.yCoordinateFruit &&
    playerY <= fruitCoordinates.yCoordinateFruit + 30
  ){
    score += 1;
    updateScore(score)
    fruitCoordinates = spawnFruit();
  }
}

function spawnBomb(x,y){
  ctx.fillStyle = '#ff0000';
  if (x != undefined){
    var xCoordinateBomb = x;
  } else{
    var xCoordinateBomb = randomRange(0,770);
  }
  if (y != undefined){
    var yCoordinateBomb = y;
  } else{
    var yCoordinateBomb = randomRange(0,470);
  }
  ctx.fillRect(xCoordinateBomb,yCoordinateBomb,30,30);
  ctx.fillStyle = '#000000';
  return {
    'xCoordinateBomb': xCoordinateBomb,
    'yCoordinateBomb': yCoordinateBomb
  };
}
let bombCoordinates = spawnBomb();
function checkBomb(playerX, playerY){
  //thanks to https://youtu.be/_MyPLZSGS3s
  if (
    playerX + 50 >= bombCoordinates.xCoordinateBomb &&
    playerX <= bombCoordinates.xCoordinateBomb + 30 &&
    playerY + 50 >= bombCoordinates.yCoordinateBomb &&
    playerY <= bombCoordinates.yCoordinateBomb + 30
  ){
    if (score <= 0){
      ;
    } else {
      score -= 1;
    }
    updateScore(score)
    bombCoordinates = spawnBomb();
  }
}
function movePaddleRight(){
    //Check for border collision
    if (xCoordinate+50 >= 750){
      ;
    }
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(xCoordinate+50,yCoordinate,centerPointWidth,centerPointHeight);
      xCoordinate += 50;
      checkEat(xCoordinate,yCoordinate);
      checkBomb(xCoordinate,yCoordinate);
    }
}
function movePaddleLeft(){
  //Check for border collision
  if (xCoordinate-50 <= 0){
    ;
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(xCoordinate-50,yCoordinate,centerPointWidth,centerPointHeight);
    xCoordinate -= 50;
    checkEat(xCoordinate,yCoordinate);
    checkBomb(xCoordinate,yCoordinate);
  }
}
function movePaddleUp(){
  if (yCoordinate-50 <= 0){
    ;
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(xCoordinate,yCoordinate-50,centerPointWidth,centerPointHeight);
    yCoordinate -= 50;
    checkEat(xCoordinate,yCoordinate);
    checkBomb(xCoordinate,yCoordinate);
  }
}
function movePaddleDown(){
  if (yCoordinate+50 >= 450){
    ;
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(xCoordinate,yCoordinate+50,centerPointWidth,centerPointHeight);
    yCoordinate += 50;
    checkEat(xCoordinate,yCoordinate);
    checkBomb(xCoordinate,yCoordinate);
  }
}
function controls(){
  document.addEventListener("keypress", function(event) {
    if (event.code == "KeyD") {
      movePaddleRight();
      spawnFruit(fruitCoordinates.xCoordinateFruit, fruitCoordinates.yCoordinateFruit);
      spawnBomb(bombCoordinates.xCoordinateBomb, bombCoordinates.yCoordinateBomb);
    }
  }, true);
  document.addEventListener("keypress", function(event) {
    if (event.code == "KeyA") {
      movePaddleLeft();
      spawnFruit(fruitCoordinates.xCoordinateFruit, fruitCoordinates.yCoordinateFruit);
      spawnBomb(bombCoordinates.xCoordinateBomb, bombCoordinates.yCoordinateBomb);
    }
  }, true);
  document.addEventListener("keypress", function(event) {
    if (event.code == "KeyW") {
      movePaddleUp();
      spawnFruit(fruitCoordinates.xCoordinateFruit, fruitCoordinates.yCoordinateFruit);
      spawnBomb(bombCoordinates.xCoordinateBomb, bombCoordinates.yCoordinateBomb);
    }
  }, true);
  document.addEventListener("keypress", function(event) {
    if (event.code == "KeyS") {
      movePaddleDown();
      spawnFruit(fruitCoordinates.xCoordinateFruit, fruitCoordinates.yCoordinateFruit);
      spawnBomb(bombCoordinates.xCoordinateBomb, bombCoordinates.yCoordinateBomb);
    }
  }, true);
}
controls()

//Timer (stolen from https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/)
function timer(){
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 20;
const ALERT_THRESHOLD = 8;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
  alert(`Your Score: ${score}`);
  location.reload();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
}
timer();