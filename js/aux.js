'use strict';
// //Add Player Name and Send to LOCAL STORAGE Event
// var addPlayerUserName = document.getElementById('formPlayerName');

// function addAPlayerName(event) {
//   event.preventDefault();
//   console.log(event);

//   var playerNameVariable = event.target.playerNameInput.value;
//   console.log(playerNameVariable);

//   localStorage.setItem('localStoragePlayerName', JSON.stringify(playerNameVariable));

//   if (localStorage.localStoragePlayerName) {
//     alert('Welcome ' + JSON.parse(localStorage.localStoragePlayerName) + '! Ready to whack some moles???');

//   }
// }
// addPlayerUserName.addEventListener('submit', addAPlayerName);





//Event Listener for Score Page "back to game" button
// var buttonBackToGame = document.getElementById('leaveScorePage').onclick;

// function backToGame(event) {
//   console.log(event);
//   location.href = "whack-a-mole/index.html";
// }

// buttonBackToGame.addEventListener('click', backToGame);





{/* <button id="myButton" class="float-left submit-button" >Home</button>

<script type="text/javascript">
    document.getElementById("myButton").onclick = function () {
        location.href = "www.yoursite.com";
    };
</script> */}


// // 1. Create the button
// var button = document.createElement("button");
// button.innerHTML = "Do Something";

// // 2. Append somewhere
// var body = document.getElementsByTagName("body")[0];
// body.appendChild(button);

// // 3. Add event handler
// button.addEventListener ("click", function() {
//   alert("did something");
// });