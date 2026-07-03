import { useState } from "react";

export default function Game() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState([Array<number | null>(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: (string | null)[]) {
    // TODO look into how this works.
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board() {
  // const [squares, setSquares] = useState(Array<string | null>(9).fill(null));
  const winner = calculateWinner(squares);
  let status;

  // React naming conventions for custom prop and function definitions is handleX for the function definition and onX for the props which represent events (onSquareClick).
  function handleClick(i: number) {
    // Prevents a square that has already been clicked from being switched (X to O, O to X).
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    // .slice() without any arguments passed will copy the entire array (if data is primitive. If data is non-primitive it copies by reference, not the actual data).
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onplay(nextSquares);
  }

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );

  function Square({ value, onSquareClick }) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
}

function calculateWinner(squares: number[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // Iterates through each win condition in the lines[] and assigns each index in the nested [] to a, b, and c respectively. Then checks the value of square[a] to see if it's null, X or O is null (squares[a]), then if the values of b and c match a. If so, that player wins.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log("a winner is you!")
      return squares[a];
    }
  }
  return null;
}
