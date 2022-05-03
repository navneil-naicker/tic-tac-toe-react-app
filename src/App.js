import React, { useState } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Board(){
  const [cells, setCells] = useState(Array(9).fill(''));
  const [turns, setTurns] = useState("X");
  const [winner, setWinner] = useState("None");
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
  ];
  
  function test(index){
    let items = [...cells];
    if(items[index] === '' && winner === "None"){
      items[index] = turns;
      setCells(items);
      for(let i = 0; i < patterns.length; i++){
        const [a, b, c] = patterns[i];
        if(items[a] && items[b] && items[c] && items[a] === items[b] && items[b] === items[c]){
          setWinner(turns);
        } else {
          setTurns(turns === "X"? "O": "X");
        }
      }
    }
  }

  function Reset(){
    console.log("test");
    setCells(Array(9).fill(''));
    setTurns("X");
    setWinner("None");
  }
  
  function Square(props) {
    return (
      <div className="square" style={squareStyle} onClick={() => test(props.value)}>{ cells[props.value] }</div>
    );
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{ turns }</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{ winner }</span></div>
      <button style={buttonStyle} onClick={() => Reset()}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value="0" />
          <Square value="1" />
          <Square value="2" />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value="3" />
          <Square value="4" />
          <Square value="5" />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value="6" />
          <Square value="7" />
          <Square value="8" />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
