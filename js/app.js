'use strict'
//USING THE DOM TO ACCESS THE TABLE FROM SCORE.html
var tableId = document.getElementById('tableId');

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