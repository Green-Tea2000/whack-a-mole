'use strict';
var numPoints = 0;
var timesDrawn = 0;
var gameLengthLimit = 4000;
var raf;
var nIntervId;
var mouseX;
var mouseY;
var arrayX = [25, 120, 250, 450, 500, 700]; // x coordinates of holes and possible mole locations
var arrayY = [25, 170, 250, 50, 350, 100]; // y coordinates of holes and possible mole locations
var randIndex;
var gameSpeed = 2000; // how often a new mole is redrawm
var addPlayerUserName = document.getElementById('formPlayerName');
var newPlayerButtonListener = document.getElementById('new-player');
var playAgainButtonEventListener = document.getElementById('play-again');
GameRecord.allGames = [];
var molesBeenHit = false;
// import audio tag with mole cry
var moleCry = document.getElementById('mole-whacker');
var volumeToggle = document.getElementById('volume');
var preloadedArrayForLocalStoreage = [{'name':'allie','score':0},{'name':'tyler','score':6},{'name':'earl tupper','score':5},{'name':'Rudy','score':5},{'name':'Django','score':5}];
var gameOn = false;
var welcomeBackMessage;
var veteranPlayerDiv;
var newbiePlayerDiv;
var gameStatusMessageToUser;


var cursors = ['apple', 'avocado', 'cherries', 'cheese', 'cupcake', 'grapes', 'hamburger'];
var lastCursor = '';

//new mole image
var imgMoleDwg = new Image();
imgMoleDwg.src = 'assets/hungry_mole_and_hole_pic.png';
imgMoleDwg.alt = 'hungry mole pic';

var imgHappyMoleDwg = new Image();
imgHappyMoleDwg.src = 'assets/mole_and_hole_pic.png';
imgHappyMoleDwg.alt = 'happy mole pic';

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
    // console.log('There is no arrayOfGameObjects in local storage');
    for(var i in preloadedArrayForLocalStoreage){
      new GameRecord(preloadedArrayForLocalStoreage[i].name, preloadedArrayForLocalStoreage[i].score);
    }
  } else {
    GameRecord.allGames = [];
    var lsArrayForScoreDisplay = JSON.parse(localStorage.arrayOfGameObjects);
    for(var j in lsArrayForScoreDisplay){
      new GameRecord(lsArrayForScoreDisplay[j].name, lsArrayForScoreDisplay[j].score);
    }
  }
  if(localStorage.getItem('localStoragePlayerName')){
    // display the veteran player options
    veteranPlayerDiv = document.getElementById('veteran-player-div');
    veteranPlayerDiv.style.display = 'inline-block';
    
    // hide newbie options
    newbiePlayerDiv = document.getElementById('newbie-player-div');
    newbiePlayerDiv.style.display = 'none';
    console.log('newbie player div should be display none');
    
    welcomeBackMessage = document.getElementById('welcomeBackMessage');
    welcomeBackMessage.textContent = 'Welcome back ' + JSON.parse(localStorage.localStoragePlayerName) + '!';
  } else {
    
    // hide veteran player div
    veteranPlayerDiv = document.getElementById('veteran-player-div');
    veteranPlayerDiv.style.display = 'none';
    
    // display newbie options
    newbiePlayerDiv = document.getElementById('newbie-player-div');
    newbiePlayerDiv.style.display = 'inline-block';
    
    welcomeBackMessage = document.getElementById('welcomeBackMessage');
    welcomeBackMessage.textContent = 'Welcome, new mole friend! Enter your name when you are ready to play!';
  }
}

// Game constructor
function GameRecord(name, score) {
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
  for (var i in arrayX) {
    drawHole(arrayX[i] + molePicOffset, arrayY[i] + molePicOffset);
  }
  
  //draw point counter
  ctx.font = '28px Merriweather Sans';
  ctx.fillStyle = 'white';
  ctx.fillText('Points: ' + numPoints, 25, 535);
  ctx.fillText('Timer: ' + (gameLengthLimit - timesDrawn), 175, 535);
  
  //draw pic of mole on canvas
  drawMole();
  
  if (timesDrawn === 0) {
    gameStatusMessageToUser = '';
  } else if (timesDrawn <= 100){
    gameStatusMessageToUser = 'Ready?';
  } else if (timesDrawn <= 300){
    gameStatusMessageToUser = 'Go!';
  } else if (timesDrawn <= 1000){
    gameStatusMessageToUser = 'Level Easy';
  } else if (timesDrawn <= 1200){
    gameStatusMessageToUser = 'Faster!';
  } else if (timesDrawn <= 1800){
    gameStatusMessageToUser = 'Level Medium';
  } else if (timesDrawn <= 2000){
    gameStatusMessageToUser = 'Faster!';
  } else if (timesDrawn <= 3000){
    gameStatusMessageToUser = 'Level Hard';
  } else if (timesDrawn <= 3200){
    gameStatusMessageToUser = 'Faster!';
  } else if (timesDrawn <= 3999){
    gameStatusMessageToUser = 'Level Maniac Mole!';
  } else {
    gameStatusMessageToUser = '';
  }

  ctx.font = '50px Merriweather Sans';
  ctx.fillStyle = 'Black';
  ctx.fillText(gameStatusMessageToUser, 25, 50);

  if (timesDrawn === 1201 || timesDrawn === 2001 || timesDrawn === 3201){
    console.log('Game speed changed to: ', gameSpeed);
    clearInterval(nIntervId);
    gameSpeed -= 500;
    intervalFunc();
  }

  // redraw frame until time is up
  if (timesDrawn < gameLengthLimit) {
    raf = window.requestAnimationFrame(draw);
    if(gameOn){
      timesDrawn++;
    }
  } else {
    // cancel setInterval
    clearInterval(nIntervId);
    new GameRecord(JSON.parse(localStorage.localStoragePlayerName), numPoints);
    timesDrawn = 0;
    gameSpeed = 2000;
    gameOn = false;
    restoreCursor();
  }
/* end of draw function  */
}

//a timed interval function that changes from Pos to Neg(used in screen indicator)
function intervalFunc() {
  nIntervId = setInterval(newXIndex, gameSpeed);
}

//create random number for index
function newXIndex() {
  regenMolesBeenHit();
  randIndex = Math.floor(Math.random() * Math.floor(arrayX.length));
  // console.log('new X Index', randIndex);
}

function regenMolesBeenHit() {
  molesBeenHit = false;
}

//Display mole on screen if POS Neg indicator is POS

function drawMole(){
  if(molesBeenHit === true){
    // pic of happy mole
    ctx.drawImage(imgHappyMoleDwg, molePicOffset + arrayX[randIndex], molePicOffset + arrayY[randIndex], molePicWidth, molePicHeight);

  } else {
    // pic of begging mole
    ctx.drawImage(imgMoleDwg, molePicOffset + arrayX[randIndex], molePicOffset + arrayY[randIndex], molePicWidth, molePicHeight);
  }
}

//function to draw hole
function drawHole(x, y) {
  ctx.drawImage(imgHole, x, y, picWidth, picHeight);
}

//get cursor Postion
function getCursorPosition(event) {
  var rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  // console.log('x: ' + mouseX + ' y: ' + mouseY);
}

//check whether click was inside mole area
function hitOrMiss() {
  if ((mouseX >= (molePicOffset + arrayX[randIndex])
    && mouseX <= ((molePicOffset + arrayX[randIndex]) + molePicWidth))
    && (mouseY >= molePicOffset + arrayY[randIndex])
    && mouseY <= (molePicOffset + arrayY[randIndex] + molePicHeight)
    && molesBeenHit === false) {
    numPoints++;
    molesBeenHit = true;

    changeCursor();

    // plays mole cry.
    moleCry.play();

  } else {
    // console.log('miss');
  }
}


// function for players to set their name, stores name in local storeage
function addAPlayerName(event) {
  event.preventDefault();

  var playerNameVariable = event.target.playerNameInput.value;

  localStorage.setItem('localStoragePlayerName', JSON.stringify(playerNameVariable));

  loadLocalStoreage();
  

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
    changeCursor();
  } else {
    alert('Please enter a player name to start GameRecord.');
  }
}

function hideVetDivAndDisplayNewbieButtons() {
  // hide veteran player div
  veteranPlayerDiv = document.getElementById('veteran-player-div');
  veteranPlayerDiv.style.display = 'none';

  // display newbie options
  newbiePlayerDiv = document.getElementById('newbie-player-div');
  newbiePlayerDiv.style.display = 'inline-block';

  localStorage.removeItem('localStoragePlayerName');
  
  window.location.reload(true);
}

// Event listen for setting user name
addPlayerUserName.addEventListener('submit', addAPlayerName);

//toggle volume on & off. also the image speaker on and off.
function toggleImage() {
  if (moleCry.muted) {
    moleCry.muted = false;
    volumeToggle.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/500px-Speaker_Icon.svg.png';
  } else {
    moleCry.muted = true;
    volumeToggle.src = 'https://cdn2.iconfinder.com/data/icons/picons-essentials/57/music_off-512.png';
    console.log('mute');
  }
}

function changeCursor(){
  var cursorsIndex = Math.floor(Math.random() * cursors.length);
  console.log('lastCursor: ' + lastCursor);
  canvas.removeAttribute('class', lastCursor);
  canvas.setAttribute('class', cursors[cursorsIndex]);
  lastCursor = cursors[cursorsIndex];
}
function restoreCursor(){
  for (var i in cursors){
    canvas.removeAttribute('class', cursors[i]);
  }
}

canvas.addEventListener('click', function(e) {
  getCursorPosition(e);
  hitOrMiss();
});


// function testConsoleLog() {
//   console.log('test');
// }

function turnOnGameOnStartGame() {
  numPoints = 0;
  raf = 0;
  timesDrawn = 0;
  intervalFunc();
  draw();
  window.scrollTo(0,document.body.scrollHeight);
  gameOn = true;
  changeCursor();
}

// Event listen for setting user name
addPlayerUserName.addEventListener('submit', addAPlayerName);

volumeToggle.addEventListener('click', function(e) {
  toggleImage();
});


newPlayerButtonListener.addEventListener('click', hideVetDivAndDisplayNewbieButtons);

playAgainButtonEventListener.addEventListener('click', turnOnGameOnStartGame);

loadLocalStoreage();
draw();