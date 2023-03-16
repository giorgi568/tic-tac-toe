const tableModule = (() => {
  let table = [];
  table.length = 9;
  const cells = document.querySelectorAll('.cell');
  const cellsArray = [...cells];
  let playerOne;
  let playerTwo;
  let count;
  return {
    table,
    cellsArray,
    playerOne,
    playerTwo,
    count,
  };
})();
const player = (playerName, marker) => {
  getMarker = () => {
    if (Math.random() <= 0.5) {
      return 'O';
    } else {
      return 'X';
    }
  };
  marker = marker || getMarker();
  return {
    playerName,
    marker,
  };
};

function displayTable() {
  for (let i = 0; i < tableModule.table.length; i++) {
    if (tableModule.table[i] === 'X') {
      tableModule.cellsArray[i].style.backgroundImage =
        "url('icons/close_FILL0_wght400_GRAD0_opsz48.svg')";
    } else if (tableModule.table[i] === 'O') {
      tableModule.cellsArray[i].style.backgroundImage =
        'url(icons/radio_button_unchecked_FILL0_wght400_GRAD0_opsz48.svg)';
    } else {
      tableModule.cellsArray[i].style.backgroundImage = '';
    }
  }
}
// displayTable();

function getPlayers(e) {
  e.preventDefault();
  const playerOneInput = document.querySelector('#first_player');
  const playerTwoInput = document.querySelector('#second_player');
  const playerNames = document.querySelector('.playerNames');
  const playerNames2 = document.querySelector('.playerNames2');
  const whoStarts = document.querySelector('.whoStarts');
  const computerOrHuman = document.querySelector('#computerOrHuman');

  if (computerOrHuman.value === 'Computer') {
    // console.log(5);
    playerOneName = playerOneInput.value;
    tableModule.playerOne = player(playerOneName);
    playerTwoName = 'Computer';
    // return;
  } else {
    playerTwoName = playerTwoInput.value;
  }

  playerOneName = playerOneInput.value;
  tableModule.playerOne = player(playerOneName);
  // let playerTwo;
  playerNames.textContent = `first player name is ${tableModule.playerOne.playerName}, his marker is ${tableModule.playerOne.marker}`;
  // twoplayers.push(playerOne);
  if (tableModule.playerOne.marker === 'X') {
    tableModule.playerTwo = player(playerTwoName, 'O');
    // twoplayers.push(playerTwo);
    playerNames2.textContent = `second player name is ${tableModule.playerTwo.playerName}, his marker is ${tableModule.playerTwo.marker}`;
    whoStarts.textContent = `${tableModule.playerOne.playerName} starts!`;
  } else {
    tableModule.playerTwo = player(playerTwoName, 'X');
    // twoplayers.push(playerTwo);
    playerNames2.textContent = `second player name is ${tableModule.playerTwo.playerName}, his marker is ${tableModule.playerTwo.marker}`;
    whoStarts.textContent = `${tableModule.playerTwo.playerName} starts!`;
  }
  // console.log(1 ,playerOne, playerTwo);
  startGame();
}


function startGame() {
  tableModule.count = 0;
  const winner = document.querySelector('.winner');
  // starting out fresh each time
  tableModule.table = [];
  tableModule.table.length = 9;
  displayTable();
  winner.textContent = '';

  if (computerOrHuman.value === 'Computer') {
    if (tableModule.count % 2 === 0) {
      if (tableModule.playerTwo.marker === 'X') {
        computerMove();
        // console.log(1);
        // tableModule.count++;
      }
    } 
    // else {
    //   if (tableModule.playerTwo.marker = 'O') {
    //     computerMove();
    //     tableModule.count++;
    //   }
    // }
  }
  // console.log(playerOne, playerTwo);
  for (let i = 0; i < tableModule.cellsArray.length; i++) {
    tableModule.cellsArray[i].addEventListener(
      'click',
      () => {

        // let isFilled;
        // if(tableModule.table[i] === ''){
        //   console.log(5);
        //   return;
        // }

        
        if (gameHasEnded()) {
          // console.log("usbeufbs");
          return;
        }
        if (computerOrHuman.value === 'Human') {
          if (tableModule.count % 2 === 0) {
            if (tableModule.table[i] !== 'O') {
              tableModule.table[i] = 'X';
              tableModule.count++;
            }
          } else {
            if (tableModule.table[i] !== 'X') {
              tableModule.table[i] = 'O';
              tableModule.count++;
            }
          }
        } else {
          // if (tableModule.count % 2 === 0) {
          //   if (tableModule.playerOne.marker === 'X') {
          //     tableModule.table[i] = 'X';
          //     tableModule.count++;
          //   } 
          // } else {
          //   if (tableModule.playerOne.marker === 'O') {
          //     tableModule.table[i] = 'O';
          //     tableModule.count++;
          //   } 
          // }
          if(tableModule.playerOne.marker === 'O') {
            if(tableModule.table[i] === undefined) {
              tableModule.table[i] = 'O';
              computerMove();
              // console.log(2);
            }
          } else {
            if(tableModule.table[i] === undefined) {
              tableModule.table[i] = 'X';
              computerMove();
              // console.log(3);
            }
          }
        }
        // console.log(tableModule.count);
        // console.log(tableModule.table);

        // if(winner.textContent.length !== 0){
        //   count = 0;
        // }
        // console.log(tableModule.count);
        gameHasEnded(tableModule.count);
        // console.log(tableModule.cellsArray);
        displayTable();
        // console.log(playerOne, playerTwo);
        checkIfGameIsOver();
      },
      { once: true }
    );
  }
}
function gameHasEnded(count) {
  const winner = document.querySelector('.winner');
  // console.log(count);
  if (count >= 9) {
    winner.textContent = 'Its A Draw';
    return true;
  } else {
    count++;
  }
  if (winner.textContent === '') {
    // console.log(count);
    return false;
  } else {
    // console.log(count);
    return true;
  }
}
// console.log(gameHasEnded());
function checkIfGameIsOver() {
  // console.log(twoplayers);
  if (
    (tableModule.table[0] === 'X' &&
      tableModule.table[1] === 'X' &&
      tableModule.table[2] === 'X') ||
    (tableModule.table[3] === 'X' &&
      tableModule.table[4] === 'X' &&
      tableModule.table[5] === 'X') ||
    (tableModule.table[6] === 'X' &&
      tableModule.table[7] === 'X' &&
      tableModule.table[8] === 'X') ||
    (tableModule.table[0] === 'X' &&
      tableModule.table[3] === 'X' &&
      tableModule.table[6] === 'X') ||
    (tableModule.table[1] === 'X' &&
      tableModule.table[4] === 'X' &&
      tableModule.table[7] === 'X') ||
    (tableModule.table[2] === 'X' &&
      tableModule.table[5] === 'X' &&
      tableModule.table[8] === 'X') ||
    (tableModule.table[0] === 'X' &&
      tableModule.table[4] === 'X' &&
      tableModule.table[8] === 'X') ||
    (tableModule.table[2] === 'X' &&
      tableModule.table[4] === 'X' &&
      tableModule.table[6] === 'X')
  ) {
    const winner = document.querySelector('.winner');
    if (tableModule.playerOne.marker === 'X') {
      winner.textContent = `winner is ${tableModule.playerOne.playerName}`;
    } else {
      winner.textContent = `winner is ${tableModule.playerTwo.playerName}`;
    }
    return true;
  }

  if (
    (tableModule.table[0] === 'O' &&
      tableModule.table[1] === 'O' &&
      tableModule.table[2] === 'O') ||
    (tableModule.table[3] === 'O' &&
      tableModule.table[4] === 'O' &&
      tableModule.table[5] === 'O') ||
    (tableModule.table[6] === 'O' &&
      tableModule.table[7] === 'O' &&
      tableModule.table[8] === 'O') ||
    (tableModule.table[0] === 'O' &&
      tableModule.table[3] === 'O' &&
      tableModule.table[6] === 'O') ||
    (tableModule.table[1] === 'O' &&
      tableModule.table[4] === 'O' &&
      tableModule.table[7] === 'O') ||
    (tableModule.table[2] === 'O' &&
      tableModule.table[5] === 'O' &&
      tableModule.table[8] === 'O') ||
    (tableModule.table[0] === 'O' &&
      tableModule.table[4] === 'O' &&
      tableModule.table[8] === 'O') ||
    (tableModule.table[2] === 'O' &&
      tableModule.table[4] === 'O' &&
      tableModule.table[6] === 'O')
  ) {
    const winner = document.querySelector('.winner');
    if (tableModule.playerOne.marker === 'O') {
      winner.textContent = `winner is ${tableModule.playerOne.playerName}`;
    } else {
      winner.textContent = `winner is ${tableModule.playerTwo.playerName}`;
    }
    return true;
  }
}
// console.log(tableModule.table[5]);

function getRandomIndex(empties) {
  i = Math.floor(Math.random() * empties.length);
  return empties[i];
}


function computerMove() {
  if(checkIfGameIsOver()){
    return;
  }
  let empties = [];
  for(let i=0; i<tableModule.table.length; i++){
    if (!tableModule.table[i]) {
      empties.push(i);
    }
  }
  // console.log(empties);

  j = getRandomIndex(empties);

  if (tableModule.table[j] === undefined) {
    tableModule.table[j] = tableModule.playerTwo.marker;
    displayTable();
  } 
  // else {
  //   computerMove();
  // }
}
// computerMove();

// startGame();
const btn = document.querySelector('#btn');
btn.addEventListener('click', getPlayers);

const computerOrHuman = document.querySelector('#computerOrHuman');
computerOrHuman.addEventListener('change', () => {
  const secondPlayer = document.querySelector('#two');
  const firstPlayerLabel = document.querySelector('#first_player_label');
  if (computerOrHuman.value === 'Computer') {
    secondPlayer.setAttribute('disabled', '');
    firstPlayerLabel.textContent = 'Enter Your Name:';
  } else if (computerOrHuman.value === 'Human') {
    secondPlayer.removeAttribute('disabled');
    firstPlayerLabel.textContent = 'Enter Name For First Player:';
  }
});
