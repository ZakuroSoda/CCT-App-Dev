// width="800px" height="500px"
//Setup
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
ctx.clearRect(0,0,800,500);
ctx.fillStyle = '#F000000';

ctx.fillRect(100,100,100,100);
let xCoordinate = 100;
let yCoordinate = 100;
function movePaddleRight(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(xCoordinate+100,100,100,100);
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      movePaddleRight();
    }
  });