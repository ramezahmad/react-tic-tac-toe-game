import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

import { WINNING_COMBINATIONS } from './winning_combinations.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O'
      }
      return currentPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].col];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=firstSquareSymbol;
    }

  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      let updatedTurns = [{square:{row: rowIndex, col: colIndex}, player: currentPlayer },...prevTurns];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol='X' isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        {winner&& <p>You won, {winner}</p>}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
