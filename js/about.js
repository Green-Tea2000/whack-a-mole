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


//     beginning of draw
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
function draw() {

  //clear canvas and draw background
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'green';
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


function drawPortraits(){
  var picOffset = 50;

  
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

draw();

