'use strict'


// An array to push all of our image instances too.
Games.allGames = []

//USING THE DOM TO ACCESS THE TABLE FROM SCORE.html
var tableId = document.getElementById('tableId');


function Games(name, score) {
  this.name = name;
  this.score = score
  Games.allGames.push(this);
}

// An array of object, this is how information will look like when it comes from local storage.
var players = [{"name":"Tyler","score":10},
{"name":"John","score":30},
{"name":"Haron","score":50},
{"name":"Jennifer","score":40},
{"name":"Patricia","score":10}]

function getLocalStorage () {
// show data being pushed to localStorage 
localStorage.setItem('Player-Name', JSON.stringify(players));

//show how to get data from local storage.
var tester123 = JSON.parse(localStorage.getItem('Player-Name'));

console.log(tester123);

for (var i in players) {
  new Games(players[i].name, players[i].score)
  }

}

function ScoreTableHeader() {
  // Creating the table header which consist of GAMES, SCORES & LEVEL REACHED
  var thEl = document.createElement('th');
  var thEl2 = document.createElement('th');
  // var thEl3 = document.createElement('th');
  
  // GIVING EACH th ELEMENT CONTENT
  thEl.textContent = 'Games'
  thEl2.textContent = 'Score';
  // thEl3.textContent = 'Level Reached';

  // APPENDING th ELEMENT TO THE TABLE
  tableId.appendChild(thEl)
  tableId.appendChild(thEl2);
  // tableId.appendChild(thEl3);
}




ScoreTableHeader();
getLocalStorage();