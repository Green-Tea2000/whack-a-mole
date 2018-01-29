'use strict';

var addPlayerUserName = document.getElementById('formPlayerName');


//Add Player Name and Send to LOCAL STORAGE Event
function addAPlayerName(event) {
  event.preventDefault();
  console.log(event);

  var playerNameVariable = event.target.playerNameInput.value;
  console.log(playerNameVariable);

  localStorage.setItem('localStoragePlayerName', JSON.stringify(playerNameVariable));

  if (localStorage.localStoragePlayerName) {
    alert('Ready to whack some moles???');

  }
}

addPlayerUserName.addEventListener('submit', addAPlayerName);