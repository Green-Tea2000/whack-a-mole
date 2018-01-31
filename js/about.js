'use strict';

var portraits = ['assets/jennifer.png', 'assets/haron.png', 'assets/jose.png', 'assets/tyler.png', 'assets/patricia.png'];

var bioS = document.getElementById('bioS');
var bioH = document.getElementById('bioH');
var bioP = document.getElementById('bioP');

var imgPortraits = [];

//new hole image

var imgHole = new Image();
imgHole.src = 'assets/hole.png';

//canvas traits
var canvasWidth = 960;
var canvasHeight = 560;
var imgSize = 200;
var mouseX;
var mouseY;



//     beginning of draw
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
function draw() {
  // Draw ABOUT US on top of PAGE
  ctx.font = '48px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('ABOUT US ', 380, 50);

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



function checkCursorP(){
  if(mouseX > 125 && mouseX < 275 && mouseY > 126 && mouseY < 273){
    bioH.textContent = 'Haron';
    bioP.textContent = '';

    console.log('hit');
  // }else if (mouseX > 118 && mouseX < 275 && mouseY > 128 && mouseY < 275){
  //   bioH.textContent = 'Patrice';
  //   bioP.textContent = 'I am an aspiring software developer who loves problem-solving and building products that are fun. Before Code Fellows I worked at Bellevue College in the Disability Resource Center. I live in Issaquah with a cat and a dog. I look forward to improving myself through coding.';

    console.log('hit');
  }else{
    console.log('miss');
  }
}

//Eventlistener for clicks to run corresponding functions
canvas.addEventListener('click', function(e){
  getCursorPosition(e);
  checkCursorP();
});



draw();

