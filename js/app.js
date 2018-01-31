'use strict';
var numPoints = 0;
var timesDrawn = 0;
var gameLengthLimit = 700;
var raf;
var nIntervId;
var mouseX;
var mouseY;
var arrayX = [25, 120, 250, 450, 500, 700]; // x coordinates of holes and possible mole locations
var arrayY = [25, 170, 250, 50, 350, 100]; // y coordinates of holes and possible mole locations
var randIndex;
var gameSpeed = 900; // how often a new mole is redrawm
var addPlayerUserName = document.getElementById('formPlayerName');
GameRecord.allGames = [];


function loadLocalStoreage() {
  if(!localStorage.getItem('arrayOfGameObjects')){
    console.log('There is no arrayOfGameObjects in local storage');
  } else {
    console.log('arrayOfGameObjects exists');
    var lsArrayForScoreDisplay = JSON.parse(localStorage.arrayOfGameObjects);
    for(var i in lsArrayForScoreDisplay){
      new GameRecord(lsArrayForScoreDisplay[i].name, lsArrayForScoreDisplay[i].score);
    }
    console.log(GameRecord.allGames);
  }
}

//new mole image
var imgMoleDwg = new Image();
imgMoleDwg.src = 'assets/mole_and_hole_pic.png';
imgMoleDwg.alt = 'mole pic';

//hole image
var imgHole = new Image();
imgHole.src = 'assets/hole_pic.png';

//canvas traits
var canvasWidth = 960;
var canvasHeight = 560;

//pic traits
var molePicWidth = 150;
var molePicHeight = 150;
var molePicOffset = 25;

var picWidth = 150;
var picHeight = 150;


// Game constructor
function GameRecord (name, score){
  this.name = name;
  this.score = score;
  GameRecord.allGames.push(this);
  localStorage.arrayOfGameObjects = JSON.stringify(GameRecord.allGames); // put GameRecord.allGames in lcoalstorage
}

/*  beginning of draw function  */
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
function draw() {
  //clear canvas and draw background
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  //draw holes
  for (var i in arrayX){
    drawHole(arrayX[i] + molePicOffset, arrayY[i] + molePicOffset);
  }
  
  //draw point counter
  ctx.font = '28px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('Points: ' + numPoints, 25, 535);
  ctx.fillText('Timer: ' + (gameLengthLimit - timesDrawn), 175, 535);
  
  //draw pic of mole on canvas
  drawMole();
  
  // redraw frame until time is up
  if(timesDrawn < gameLengthLimit){
    raf = window.requestAnimationFrame(draw);
    timesDrawn++;
  } else {
    // cancel setInterval
    clearInterval(nIntervId);
    new GameRecord(JSON.parse(localStorage.localStoragePlayerName), numPoints);
    timesDrawn = 0;
  }
}
/* end of draw function  */


//a timed interval function that changes from Pos to Neg(used in screen indicator)
function intervalFunc(){
  nIntervId = setInterval(newXIndex, gameSpeed);
}

//create random number for index
function newXIndex(){
  randIndex = Math.floor(Math.random() * Math.floor(arrayX.length));
  console.log('new X Index', randIndex);
}

//Display mole on screen if POS Neg indicator is POS
function drawMole(){
  ctx.drawImage(imgMoleDwg, molePicOffset + arrayX[randIndex], molePicOffset + arrayY[randIndex], molePicWidth, molePicHeight);
}

//function to draw hole
function drawHole(x,y){
  ctx.drawImage(imgHole, x, y, picWidth, picHeight);
}

//get cursor Postion
function getCursorPosition(event){
  var rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  // console.log('x: ' + mouseX + ' y: ' + mouseY);
}

//check whether click was inside mole area
function hitOrMiss(){
  if((mouseX >= (molePicOffset + arrayX[randIndex])
  && mouseX <= ((molePicOffset + arrayX[randIndex]) + molePicWidth))
  && (mouseY >= molePicOffset + arrayY[randIndex])
  && mouseY <= (molePicOffset + arrayY[randIndex] + molePicHeight)){
    // console.log('hit');
    numPoints++;
  } else {
    // console.log('miss');
  }
}

// function for players to set their name, stores name in local storeage
function addAPlayerName(event) {
  event.preventDefault();
  console.log(event);

  var playerNameVariable = event.target.playerNameInput.value;
  console.log(playerNameVariable);

  localStorage.setItem('localStoragePlayerName', JSON.stringify(playerNameVariable));
  
  // Function check for username, if exists start game
  //add a playename
  if (localStorage.localStoragePlayerName) {
    // alert('Welcome ' + JSON.parse(localStorage.localStoragePlayerName) + '! Ready to whack some moles???');
    numPoints = 0;
    raf = 0;
    timesDrawn = 0;
    console.log('raf', raf);
    intervalFunc();
    draw();
  } else {
    alert('Please enter a player name to start GameRecord.');
  }
}

// Eventlistener for clicks to run corresponding functions
canvas.addEventListener('click', function(e){
  getCursorPosition(e);
  hitOrMiss();
});

// Event listen for setting user name
addPlayerUserName.addEventListener('submit', addAPlayerName);

loadLocalStoreage();