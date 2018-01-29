'use strict';

var playerName = document.getElementById('player-Name-Input');
var addPlayerButton = document.getElementById('addPlayer');
console.log(playerName);


//Add Player Name and Send to LOCAL STORAGE Event
function addAPlayerName(event) {
  event.preventDefault();

  localStorage.setItem('localStoragePlayerName', JSON.stringify(playerName));

  console.log(playerName);
  if (localStorage.localStoragePlayerName) {
    alert('Ready to whack some moles???');

  }
}

addPlayerButton.addEventListener('click', addAPlayerName);

localStorage.dog = 'demi';
localStorage.test = playerName;