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
var holeSize = 195;
var imgSize0 = 180;
var imgSize1 = 180;
var imgSize2 = 180;
var imgSize3 = 180;
var imgSize4 = 180;
var mouseX;
var mouseY;



////////////////////BEGINNING OF DRAW 
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
function draw() {

  //clear canvas and draw background
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  //draw five holes
  ctx.drawImage(imgHole, 380, 50, holeSize, holeSize);
  ctx.drawImage(imgHole, 100, 100, holeSize, holeSize);
  ctx.drawImage(imgHole, 660, 100, holeSize, holeSize);
  ctx.drawImage(imgHole, 200, 280, holeSize, holeSize);
  ctx.drawImage(imgHole, 560, 280, holeSize, holeSize);

  //draw portraits on canvas
  drawPortraits();

  //redraw frame
  window.requestAnimationFrame(draw);
}
///////////////////END OF DRAW FUNCTION


//Draw Portraits function
var picOffset = 50;
function drawPortraits(){
  
  for (var i in portraits) {
    imgPortraits[i] = new Image();
    imgPortraits[i].src = portraits[i];
  }
  ctx.drawImage(imgPortraits[0], 0, 0, imgSize0, imgSize0, 380 + picOffset / 2 , 50 + picOffset / 2, imgSize0 - picOffset, imgSize0 - picOffset);
  ctx.drawImage(imgPortraits[1], 0, 0, imgSize1, imgSize1, 105 + picOffset / 2 , 100 + picOffset / 2, imgSize1 - picOffset, imgSize1 - picOffset);
  ctx.drawImage(imgPortraits[2], 0, 0, imgSize2, imgSize2, 660 + picOffset / 2 , 100 + picOffset / 2, imgSize2 - picOffset, imgSize2 - picOffset);
  ctx.drawImage(imgPortraits[3], 0, 0, imgSize3, imgSize3, 205 + picOffset / 2 , 280 + picOffset / 2, imgSize3 - picOffset, imgSize3 - picOffset);
  ctx.drawImage(imgPortraits[4], 0, 0, imgSize4, imgSize4, 560 + picOffset / 2 , 280 + picOffset / 2, imgSize4 - picOffset, imgSize4 - picOffset);
}

//Expands the size of images once mouse hovers-over
function imgExpander(){
  if(mouseX > 125 && mouseX < 275 && mouseY > 126 && mouseY < 273 && imgSize1 < 500){
    imgSize1 += 10;
  }else if (mouseX > 125 && mouseX < 275 && mouseY > 126 && mouseY < 273 && imgSize1 === 500) {
    imgSize1 = 500;
  }else if(mouseX > 225 && mouseX < 370 && mouseY > 306 && mouseY < 455 && imgSize3 < 500){
    imgSize3 += 10;
  }else if (mouseX > 225 && mouseX < 370 && mouseY > 306 && mouseY < 455 && imgSize3 === 500) {
    imgSize3 = 500;
  }else if(mouseX > 405 && mouseX < 550 && mouseY > 76 && mouseY < 224 && imgSize0 < 500){
    imgSize0 += 10;
  }else if (mouseX > 405 && mouseX < 550 && mouseY > 76 && mouseY < 224 && imgSize0 === 500) {
    imgSize0 = 500;
  }else if(mouseX > 584 && mouseX < 731 && mouseY > 306 && mouseY < 453 && imgSize4 < 500){
    imgSize4 += 10;
  }else if (mouseX > 584 && mouseX < 731 && mouseY > 306 && mouseY < 453 && imgSize4 === 500) {
    imgSize4 = 500;
  }else if(mouseX > 685 && mouseX < 830 && mouseY > 127 && mouseY < 272 && imgSize2 < 500){
    imgSize2 += 10;
  }else if (mouseX > 685 && mouseX < 830 && mouseY > 127 && mouseY < 272 && imgSize2 === 500) {
    imgSize2 = 500;
  }else{
    imgSize0 = 180;
    imgSize1 = 180;
    imgSize2 = 180;
    imgSize3 = 180;
    imgSize4 = 180;
  }
}



//get cursor Postion
function getCursorPosition(event){
  var rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  console.log('x: ' + mouseX + ' y: ' + mouseY);
}


//Checks Cursor Position and renders ABOUT ME section
function displayBio(){
  if(mouseX > 125 && mouseX < 275 && mouseY > 126 && mouseY < 273){
    bioH.textContent = 'Haron Yunis';
    bioP.textContent = 'Aspiring software developer who\'s in love with javascript and the design of web applications. I specialize in UI development and applying creative solutions to enhance user experience. A Seattle native, Go Hawks! Github: https://github.com/haronYunis Linkedin: https://www.linkedin.com/in/haron-yunis/' ;
    console.log('hit');

  }else if (mouseX > 225 && mouseX < 370 && mouseY > 306 && mouseY < 455){
    bioH.textContent = 'Tyler Fishbone';
    bioP.textContent = 'In a previous life I used rapid prototyping technologies to bring over 1,000 client projects (as well as a kickstarter)\
    to life. I now develop powerful and easy to use software to enrich the lives of humans all over the globe. Github: https://github.com/tyler-fishbone Linkedin: https://www.linkedin.com/in/tylerfishbone/ ';
    console.log('hit');

  }else if (mouseX > 405 && mouseX < 550 && mouseY > 76 && mouseY < 224){
    bioH.textContent = 'Jennifer Piper';
    bioP.textContent = 'I love code, design, user experience, and how they fit together to make websites and apps that are functional and beautiful.\
    I\'m at Code Fellows to level up my development skills before moving on to my next adventure.  Github: https://github.com/jenwill Linkedin: https://www.linkedin.com/in/jennifer-williams-piper/';
    console.log('hit');

  }else if (mouseX > 584 && mouseX < 731 && mouseY > 306 && mouseY < 453){
    bioH.textContent = 'Patricia Raftery';
    bioP.textContent = 'I am an aspiring software developer who loves problem-solving and building products that are fun. Before Code Fellows\
    I worked at Bellevue College in the Disability Resource Center. I live in Issaquah with a cat and a dog. I look forward\
    to improving myself through coding. Github: https://github.com/Patricia888 Linkedin: https://www.linkedin.com/in/patricia-raftery/';
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
  displayBio();
});

canvas.addEventListener('mousemove', function(e){
  getCursorPosition(e);
  imgExpander();
});

draw();