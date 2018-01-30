'use strict';

var portraits = ['assets/jennifer.png', 'assets/haron.png', 'assets/jose.png', 'assets/tyler.png', 'assets/patricia.png'];



var imgPortraits = [];

//new hole image

var imgHole = new Image();
imgHole.src = 'assets/hole.png';

//canvas traits
var canvasWidth = 960;
var canvasHeight = 490;
var imgSize = 200;
var mouseX;
var mouseY;



//     beginning of draw
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
function draw() {

  //clear canvas and draw background
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'darkgreen';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //draw five holes
  ctx.drawImage(imgHole, 380, 50, imgSize, imgSize);
  ctx.drawImage(imgHole, 100, 100, imgSize, imgSize);
  ctx.drawImage(imgHole, 660, 100, imgSize, imgSize);
  ctx.drawImage(imgHole, 200, 280, imgSize, imgSize);
  ctx.drawImage(imgHole, 560, 280, imgSize, imgSize);

  //draw portraits on canvas
  drawPortraits();

  //redraw frame
  window.requestAnimationFrame(draw);
}
//       end of draw function

var picOffset = 50;
function drawPortraits(){
  

  
  for (var i in portraits) {
    imgPortraits[i] = new Image();
    imgPortraits[i].src = portraits[i];
  }

  ctx.drawImage(imgPortraits[0], 0, 0, imgSize, imgSize, 380 + picOffset / 2 , 50 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[1], 0, 0, imgSize, imgSize, 100 + picOffset / 2 , 100 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[2], 0, 0, imgSize, imgSize, 660 + picOffset / 2 , 100 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[3], 0, 0, imgSize, imgSize, 200 + picOffset / 2 , 280 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[4], 0, 0, imgSize, imgSize, 560 + picOffset / 2 , 280 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
}

//get cursor Postion
function getCursorPosition(event){
  var rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  console.log('x: ' + mouseX + ' y: ' + mouseY);
}

//check whether click was inside mole area
// function hitOrMiss(){
//   if((mouseX >= (picOffset + imgPortraits[0])
//   && mouseX <= ((picOffset + imgPortraits[0]) + imgSize))
//   && (mouseY >= picOffset)
//   && mouseY <= (picOffset + imgSize)){
//     console.log('hit');
//   } else {
//     console.log('miss');
//   }
// }
function hitOrMiss(){
  if(mouseX > 118 && mouseX < 275 && mouseY > 128 && mouseY < 275){
    console.log('hit');
  } else {
    console.log('miss');
  }
}

//Eventlistener for clicks to run corresponding functions
canvas.addEventListener('click', function(e){
  getCursorPosition(e);
  hitOrMiss();
});



draw();

