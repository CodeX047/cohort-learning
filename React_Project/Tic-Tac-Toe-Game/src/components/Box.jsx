import { useState } from "react";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Box = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleBoxClick = (index) => {
    if (winner) return;

    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    if (!newBoard.includes(null)) {
      setWinner("Tie");
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      {winner ? (
        winner === "Tie" ? (
          <p className="text-2xl font-semibold">It's a Tie!</p>
        ) : (
          <p className="text-2xl font-semibold">Player {winner} Wins!</p>
        )
      ) : (
        <p className="text-xl">Current Player: {currentPlayer}</p>
      )}

      <div className="grid grid-cols-3 w-80">
        {board.map((box, index) => (
          <div
            key={index}
            className="
              border-2 border-black
              aspect-square
              flex items-center justify-center
              text-5xl font-bold
              cursor-pointer
              select-none
            "
            onClick={() => handleBoxClick(index)}
          >
            {box}
          </div>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="
          bg-black text-white
          px-5 py-2
          rounded-md
          hover:opacity-80
          transition
        "
      >
        Restart Game
      </button>
    </div>
  );
};

export default Box;
