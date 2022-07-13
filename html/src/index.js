// width="800px" height="500px"
//Setup
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
ctx.clearRect(0,0,800,500);
ctx.fillStyle = '#F000000';

var centerPointWidth = 50;
var centerPointHeight = 50;
ctx.fillRect((canvas.width / 2) - (centerPointWidth / 2), (canvas.height / 2) - (centerPointHeight / 2), centerPointWidth, centerPointHeight);
let xCoordinate = (canvas.width / 2) - (centerPointWidth / 2);
let yCoordinate = (canvas.height / 2) - (centerPointHeight / 2);

function movePaddleRight(){
    //Check for border collision
    if (xCoordinate+50 >= 750){
      ;
    }
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(xCoordinate+50,yCoordinate,centerPointWidth,centerPointHeight);
      xCoordinate += 50;
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
  }
}

document.addEventListener("keypress", function(event) {
  if (event.code == "KeyD") {
    movePaddleRight();
  }
}, true);
document.addEventListener("keypress", function(event) {
    if (event.code == "KeyA") {
      movePaddleLeft();
    }
}, true);
document.addEventListener("keypress", function(event) {
  if (event.code == "KeyW") {
    movePaddleUp();
  }
}, true);
document.addEventListener("keypress", function(event) {
  if (event.code == "KeyS") {
    movePaddleDown();
  }
}, true);