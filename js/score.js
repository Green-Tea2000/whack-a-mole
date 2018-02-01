'use strict';

// An array to push all of our image instances too.
Games.allGames = [];

//USING THE DOM TO ACCESS THE TABLE FROM SCORE.html
var tableId = document.getElementById('tableId');


function Games(name, score) {
  this.name = name;
  this.score = score;
  Games.allGames.push(this);
}

// An array of object, this is how information will look like when it comes from local storage.
// var players = [{"name":"Tyler","score":10},
// {"name":"John","score":30},
// {"name":"Haron","score":50},
// {"name":"Jennifer","score":40},
// {"name":"Patricia","score":10}]

var lsArrayForScoreDisplay = [];

function getArrayFromLocalStorage () {
  lsArrayForScoreDisplay = JSON.parse(localStorage.arrayOfGameObjects);
  console.log(lsArrayForScoreDisplay);
}

function sortArrayFromLocalStorage() {
  lsArrayForScoreDisplay = lsArrayForScoreDisplay.sort(function (a, b) {
    return b.score - a.score;
  });
}


// function getLocalStorage () {
// // show data being pushed to localStorage 
// // localStorage.setItem('Player-Name', JSON.stringify(players));

// //show how to get data from local storage.
//   var tester123 = JSON.parse(localStorage.getItem('Player-Name'));

//   // console.log(tester123);

//   // for (var i in players) {
//   //   new Games(players[i].name, players[i].score)
//   // }

// }


//Put lsArrayForScoreDisplay info in to the table
var trEl;
var tdEl;

function displayScoreTable() {
  trEl = document.createElement('tr');
  tdEl = document.createElement('td');
  tdEl.textContent = 'Player Name';
  trEl.appendChild(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = 'Score';
  trEl.appendChild(tdEl);
  tableId.appendChild(trEl);

  for (var i = 0; i < lsArrayForScoreDisplay.length; i++) {
    trEl = document.createElement('tr');
    tdEl = document.createElement('td');
    tdEl.textContent = lsArrayForScoreDisplay[i].name;
    trEl.appendChild(tdEl);
    console.log('is this running?');

    tdEl = document.createElement('td');
    tdEl.textContent = lsArrayForScoreDisplay[i].score;
    trEl.appendChild(tdEl);

    tableId.appendChild(trEl);
  }
}



// function displayScores () {

//   trEl = document.createElement('tr');
//   tdEl = document.createElement('td');
//   tdEl.textContent = 'hello';
//   tableId.appendChild(trEl);


//   //fill table with username and score info
//   for (var i = 0; i < lsArrayForScoreDisplay.length; i++) {
//     trEl = document.createElement('tr');
//     tdEl = document.createElement('td');

//     tdEl.textContent = lsArrayForScoreDisplay[i].name;
//     trEl.appendChild(tdEl);

//     tdEl = document.createElement('td');
//     tdEl.textContent = lsArrayForScoreDisplay[i].score;
//     trEl.appendChild(tdEl);

//     tableId.appendChild(trEl);
//   }
// }



getArrayFromLocalStorage();
sortArrayFromLocalStorage();
displayScoreTable();
// getLocalStorage();
