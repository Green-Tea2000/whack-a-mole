'use strict';
var numPoints = 0;
var timesDrawn = 0;
var gameLengthLimit = 600;
var raf = 0;
var mouseX;
var mouseY;
// var posNegIndicator = 1;
var nIntervId;
var arrayX = [0, 250, 500];
var randIndex;
var gameSpeed = 1000;

//new mole image
var imgMoleDwg = new Image();
imgMoleDwg.src = 'assets/mole_drawing.png';

//canvas traits
var canvasWidth = 800;
var canvasHeight = 400;

//mole pic traits
var molePicWidth = 100;
var molePicHeight = 150;
var molePicOffset = 25;

// Game.allGames array - needs eventually to check if local storage of this exists and if so set this equal to that.
Game.allGames = [];

// Game constructor
function Game (name, score){
  this.name = name;
  this.score = score;
  Game.allGames.push(this);
}

// put Game.allGames in lcoalstorage


//     beginning of draw 
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
function draw() {
  //clear canvas and draw background
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //draw point counter
  ctx.font = '48px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('Points: ' + numPoints, 25, 275);

  ctx.font = '48px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('Timer: ' + timesDrawn, 25, 375);

  //draw pic of mole on canvas
  drawMole();

  // // check if time is up
  // checkIfTimeIsUp();

  //redraw frame
  if(raf < 300){
    raf = window.requestAnimationFrame(draw);
  } else {
    new Game(localStorage.localStoragePlayerName, numPoints);
  }
}
//       end of draw function


//a timed interval function that changes from Pos to Neg(used in screen indicator)
function intervalFunc(){
  nIntervId = setInterval(newXIndex, gameSpeed);
}

//create random number for index
function newXIndex(){
  randIndex = Math.floor(Math.random() * Math.floor(arrayX.length));
}

//Display mole on screen if POS Neg indicator is POS
function drawMole(){
  ctx.drawImage(imgMoleDwg, molePicOffset + arrayX[randIndex], molePicOffset, molePicWidth, molePicHeight);
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
  if((mouseX >= (molePicOffset + arrayX[randIndex])
  && mouseX <= ((molePicOffset + arrayX[randIndex]) + molePicWidth))
  && (mouseY >= molePicOffset)
  && mouseY <= (molePicOffset + molePicHeight)){
    console.log('hit');
    numPoints++;
  } else {
    console.log('miss');
  }
}

//Eventlistener for clicks to run corresponding functions
canvas.addEventListener('click', function(e){
  getCursorPosition(e);
  hitOrMiss();
});

//when timer reaches certian limit stop user from being able to get more points
// Option.1 remove event listener
// O2. change event listener
// O3. establish var ifTime <

intervalFunc();

// draw canvas on page load
draw();
    

// function checkIfTimeIsUp() {
//   // if(timesDrawn === gameLengthLimit){
//   if(raf === 300){

//   }
//     console.log('raf', raf);
//     window.clearInterval(nIntervId);
//     window.cancelAnimationFrame(raf);
//     console.log(nIntervId);
//     new Game(localStorage.localStoragePlayerName, numPoints);
//     // console.log('just made an object: ' + Game.allGames);
//   } else {
//     timesDrawn++;
//   }
// }