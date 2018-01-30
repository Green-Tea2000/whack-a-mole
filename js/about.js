'use strict';

var portraits = ['assets/jennifer.png', 'assets/haron.png', 'assets/jose.png', 'assets/tyler.png', 'assets/patricia.png'];



var imgPortraits = [];

// an array that stores all Dev pictures.
var imgPortraits = [];

var imgPosition = [];

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


function drawPortraits() {
  var picOffset = 50;

<<<<<<< HEAD

=======
  
>>>>>>> 2186b7f5472ed51b83aa9aa191ca284c5be6a9c6
  for (var i in portraits) {
    imgPortraits[i] = new Image();
    imgPortraits[i].src = portraits[i];
    imgPortraits[i].getI
  }

<<<<<<< HEAD
  ctx.drawImage(imgPortraits[0], 0, 0, imgSize, imgSize, 380 + picOffset / 2, 10 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);

  ctx.drawImage(imgPortraits[1], 0, 0, imgSize, imgSize, 100 + picOffset / 2, 100 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[2], 0, 0, imgSize, imgSize, 660 + picOffset / 2, 100 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[3], 0, 0, imgSize, imgSize, 200 + picOffset / 2, 280 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[4], 0, 0, imgSize, imgSize, 560 + picOffset / 2, 280 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
}

function getPosition(event) {
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  alert("x:" + x + " y:" + y);
}



canvas.addEventListener("mousedown", getPosition, false);

function positionHandler(e) {
  if (e.target.x > 125 || e.target.y < 274) {
    console.log("Your on the money baby!!!");
  }
}
canvas.addEventListener('mousedown',positionHandler)



// need to find the mouse position.

//if mouse position equal any quadernated where the picture are run another function. that displays the paragraph next to the images that was closet to the click.
draw();
=======
  ctx.drawImage(imgPortraits[0], 0, 0, imgSize, imgSize, 380 + picOffset / 2 , 50 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[1], 0, 0, imgSize, imgSize, 100 + picOffset / 2 , 100 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[2], 0, 0, imgSize, imgSize, 660 + picOffset / 2 , 100 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[3], 0, 0, imgSize, imgSize, 200 + picOffset / 2 , 280 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
  ctx.drawImage(imgPortraits[4], 0, 0, imgSize, imgSize, 560 + picOffset / 2 , 280 + picOffset / 2, imgSize - picOffset, imgSize - picOffset);
}

draw();

>>>>>>> 2186b7f5472ed51b83aa9aa191ca284c5be6a9c6
