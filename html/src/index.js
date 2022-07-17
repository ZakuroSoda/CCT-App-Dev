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
fruitCoordinates = spawnFruit();
function checkEat(playerX, playerY){
  ; //in progress
}
function updateScore(score){
    if (score == undefined){
      console.log("error");
    }
    else {
      document.getElementById("score").innerHTML = "Score: " + score;
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
      score += 1;
      updateScore(score);
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
    score += 1;
    updateScore(score);
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
    score += 1;
    updateScore(score);
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
    score += 1;
    updateScore(score);
  }
}
function controls(){
  document.addEventListener("keypress", function(event) {
    if (event.code == "KeyD" || event.keycode == "ArrowRight") {
      movePaddleRight();
    }
  }, true);
  document.addEventListener("keypress", function(event) {
      if (event.code == "KeyA" || event.code == "ArrowLeft") {
        movePaddleLeft();
      }
  }, true);
  document.addEventListener("keypress", function(event) {
    if (event.code == "KeyW" || event.code == "ArrowUp") {
      movePaddleUp();
    }
  }, true);
  document.addEventListener("keypress", function(event) {
    if (event.code == "KeyS" || event.code == "ArrowDown") {
      movePaddleDown();
    }
  }, true);
}

controls()