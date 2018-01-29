'use strict'
var numPoints = 0;
var raf;
var mouseX;
var mouseY;
var posNegIndicator = 1;
var nIntervId;


//new mole image
var imgMoleDwg =new Image();
imgMoleDwg.src = 'mole_drawing.png';

//canvas traits
var canvasWidth = 800;
var canvasHeight = 400;

//mole pic traits
var molePicWidth = 100;
var molePicHeight = 150;
var molePicOffset = 25;

//     beginning of draw 
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
function draw() {


  //clear canvas and draw background
  ctx.clearRect(0,0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //draw point counter
  ctx.font = '48px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('Point: ' + numPoints, 25, 375);


  //draw pic of mole on canvas
  drawMole();

  //redraw frame
  raf = window.requestAnimationFrame(draw);
}
//       end of draw function



//a timed interval function that changes from Pos to Neg(used in screen indicator)
function intervalFunc(){
  nIntervId = setInterval(posNegAlternate, 1000);
}


function posNegAlternate(){
  posNegIndicator *= -1;
}

//Display mole on screen if POS Neg indicator is POS
function drawMole(){
  if(posNegIndicator >= 0){
    ctx.drawImage(imgMoleDwg, molePicOffset, molePicOffset, molePicWidth, molePicHeight);
  }
}

//get cursor Postion
function getCursorPosition(event){
  var rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  console.log('x: ' + mouseX + ' y: ' + mouseY);
}


//check whether click was inside mole area
function hitOrMiss(){
  if((mouseX >= molePicOffset && mouseX <= (molePicOffset + molePicWidth))
  && (mouseY >= molePicOffset && mouseY <= (molePicOffset + molePicHeight))
  && (posNegIndicator >= 0)){
    console.log('hit');
    numPoints++;
  }else {
    console.log('miss');
  }
}

//Eventlistener for clicks to run corresponding functions
canvas.addEventListener('click', function(e){
  getCursorPosition(e);
  hitOrMiss();
});
intervalFunc();
draw();


