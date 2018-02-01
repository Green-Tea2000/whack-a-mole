'use strict';
var numPoints = 0;
var timesDrawn = 0;
var gameLengthLimit = 1500;
var raf;
var nIntervId;
var mouseX;
var mouseY;
var arrayX = [25, 120, 250, 450, 500, 700]; // x coordinates of holes and possible mole locations
var arrayY = [25, 170, 250, 50, 350, 100]; // y coordinates of holes and possible mole locations
var randIndex;
var gameSpeed = 1000; // how often a new mole is redrawm
var addPlayerUserName = document.getElementById('formPlayerName');
GameRecord.allGames = [];
var molesBeenHit = false;
var preloadedArrayForLocalStoreage = [{'name':'allie','score':0},{'name':'tyler','score':6},{'name':'bertha','score':4},{'name':'bertha','score':6},{'name':'jonathan','score':3},{'name':'jonathan','score':11},{'name':'tommy','score':12},{'name':'tommy','score':5},{'name':'galavangian','score':5},{'name':'tuppy','score':5},{'name':'earl tupper','score':5},{'name':'Rudy','score':5},{'name':'Django','score':5}];
var gameOn = false;

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

function loadLocalStoreage() {
  if(!localStorage.getItem('arrayOfGameObjects')){
    console.log('There is no arrayOfGameObjects in local storage');
    for(var i in preloadedArrayForLocalStoreage){
      new GameRecord(preloadedArrayForLocalStoreage[i].name, preloadedArrayForLocalStoreage[i].score);
    }
  } else {
    var lsArrayForScoreDisplay = JSON.parse(localStorage.arrayOfGameObjects);
    for(var j in lsArrayForScoreDisplay){
      new GameRecord(lsArrayForScoreDisplay[j].name, lsArrayForScoreDisplay[j].score);
    }
    var welcomeBackMessage = document.getElementById('welcomeBackMessage');
    welcomeBackMessage.textContent = 'Welcome back ' + JSON.parse(localStorage.localStoragePlayerName) + '!';
  }
}

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
  
  //draw holes
  for (var i in arrayX){
    drawHole(arrayX[i] + molePicOffset, arrayY[i] + molePicOffset);
    console.log('drawHole been called');
  }
  
  //draw point counter
  ctx.font = '28px Merriweather Sans';
  ctx.fillStyle = 'white';
  ctx.fillText('Points: ' + numPoints, 25, 535);
  ctx.fillText('Timer: ' + (gameLengthLimit - timesDrawn), 175, 535);
  
  drawMole();
  // redraw frame until time is up
  if(timesDrawn < gameLengthLimit){
    raf = window.requestAnimationFrame(draw);
    if(gameOn){
      timesDrawn++;
    }
  } else {
    // cancel setInterval
    clearInterval(nIntervId);
    new GameRecord(JSON.parse(localStorage.localStoragePlayerName), numPoints);
    timesDrawn = 0;
    gameOn = false;
  }
/* end of draw function  */
}

//a timed interval function that changes from Pos to Neg(used in screen indicator)
function intervalFunc(){
  nIntervId = setInterval(newXIndex, gameSpeed);
}

//create random number for index
function newXIndex(){
  regenMolesBeenHit();
  randIndex = Math.floor(Math.random() * Math.floor(arrayX.length));
  console.log('new X Index', randIndex);
}

function regenMolesBeenHit () {
  molesBeenHit = false;
}

//Display mole on screen if POS Neg indicator is POS
function drawMole(){
  if(molesBeenHit === true){
    // pic of mole with heart or tears
    ctx.drawImage(imgMoleDwg, molePicOffset + arrayX[randIndex] + molePicWidth / 4, molePicOffset + arrayY[randIndex] + molePicHeight / 3, molePicWidth / 2, molePicHeight / 2);
  } else {
    ctx.drawImage(imgMoleDwg, molePicOffset + arrayX[randIndex], molePicOffset + arrayY[randIndex], molePicWidth, molePicHeight);
  }
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
  && mouseY <= (molePicOffset + arrayY[randIndex] + molePicHeight)
  && molesBeenHit === false){
    numPoints++;
    molesBeenHit = true;
  } else {
    // console.log('miss');
  }
}


// function for players to set their name, stores name in local storeage
function addAPlayerName(event) {
  event.preventDefault();

  var playerNameVariable = event.target.playerNameInput.value;

  localStorage.setItem('localStoragePlayerName', JSON.stringify(playerNameVariable));
  
  // Function check for username, if exists start game
  //add a playename
  if (localStorage.localStoragePlayerName) {
    // alert('Welcome ' + JSON.parse(localStorage.localStoragePlayerName) + '! Ready to whack some moles???');
    numPoints = 0;
    raf = 0;
    timesDrawn = 0;
    intervalFunc();
    draw();
    window.scrollTo(0,document.body.scrollHeight);
    gameOn = true;
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
draw();