'use strict';
// //Add Player Name and Send to LOCAL STORAGE Event
var addPlayerUserName = document.getElementById('formPlayerName');

function addAPlayerName(event) {
  event.preventDefault();
  console.log(event);

  var playerNameVariable = event.target.playerNameInput.value;
  console.log(playerNameVariable);

  localStorage.setItem('localStoragePlayerName', JSON.stringify(playerNameVariable));

  if (localStorage.localStoragePlayerName) {
    alert('Welcome ' + JSON.parse(localStorage.localStoragePlayerName) + '! Ready to whack some moles???');

  }
}
addPlayerUserName.addEventListener('submit', addAPlayerName);



//Event Listener for Score Page "back to game" button
var buttonBackToGame = document.getElementById('leaveScorePage');

function backToGame(event) {
  console.log(event);
  var 
}

buttonBackToGame.addEventListener('click', backToGame);