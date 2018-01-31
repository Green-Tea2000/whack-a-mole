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
var canvasHeight = 500;
var imgSize = 200;
var mouseX;
var mouseY;



//     beginning of draw
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
function draw() {
 

  //clear canvas and draw background
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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
//end of draw function

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


//Checks Cursor Position and renders ABOUT ME section
function checkCursorP(){
  if(mouseX > 125 && mouseX < 275 && mouseY > 126 && mouseY < 273){
    bioH.textContent = 'Haron Yunis';
    bioP.textContent = 'A software developer who\'s in love with javascript and the design of web applications. Seattle native, Go Hawks!';
    console.log('hit');

  }else if (mouseX > 225 && mouseX < 370 && mouseY > 306 && mouseY < 455){
    bioH.textContent = 'Tyler Fishbone';
    bioP.textContent = 'In a previous life I used rapid prototyping technologies to bring over 1,000 client projects (as well as a kickstarter)\
    to life. I now develop powerful and easy to use software to enrich the lives of humans all over the globe.';
    console.log('hit');

  }else if (mouseX > 405 && mouseX < 550 && mouseY > 76 && mouseY < 224){
    bioH.textContent = 'Jennifer Piper';
    bioP.textContent = 'I love code, design, user experience, and how they fit together to make websites and apps that are functional and beautiful.\
    I\'m at Code Fellows to level up my development skills before moving on to my next adventure.';
    console.log('hit');

  }else if (mouseX > 584 && mouseX < 731 && mouseY > 306 && mouseY < 453){
    bioH.textContent = 'Patricia Raftery';
    bioP.textContent = 'I am an aspiring software developer who loves problem-solving and building products that are fun. Before Code Fellows\
    I worked at Bellevue College in the Disability Resource Center. I live in Issaquah with a cat and a dog. I look forward\
    to improving myself through coding.';
    console.log('hit');

  }else if (mouseX > 685 && mouseX < 830 && mouseY > 127 && mouseY < 272){
    bioH.textContent = 'Jose Reyes';
    bioP.textContent = 'Thank you for visiting my section; My name is Jose Reyes, I\'m a Geospatial Analyst DoD Contractor. I\'m an aspiring\
    Data Scientist and in hopes of completing the 401 Python course which will serve as a platform into a new career.';
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

