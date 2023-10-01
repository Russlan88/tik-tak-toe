import React from 'react';
import Square from './Square';

const Board = ({ board, handleSquareClick, winningSquares, winner }) => {
  const renderSquare = position => {
    const isWinningSquare = winningSquares.includes(position);

    return (
      <Square
        value={board[position]}
        onClick={() => handleSquareClick(position)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const renderWinningLine = squares => {
    if (squares.every(square => winningSquares.includes(square))) {
      console.log('Rendering winning line for squares:', squares); // Stampa a console gli indici dei quadrati vincenti
      const style = getWinningLineStyle(squares);
      console.log('Calculated style:', style); // Stampa a console lo stile calcolato
      return <div style={style} className="winning-line" />;
    }
    return null;
  };

  const getWinningLineStyle = winningSquares => {
    if (!winningSquares || winningSquares.length === 0) return {};

    const lineStyle = {
      backgroundColor: winner === 'X' ? 'green' : 'orange', // placeholder colors
      position: 'absolute',
    };

    if (
      winningSquares.includes(0) &&
      winningSquares.includes(1) &&
      winningSquares.includes(2)
    ) {
      // Horizontal Top
      return {
        ...lineStyle,
        top: '50%',
        left: '0',
        right: '0',
        height: '2px',
        transform: 'translateY(-50%)',
      };
    }

    if (
      winningSquares.includes(3) &&
      winningSquares.includes(4) &&
      winningSquares.includes(5)
    ) {
      // Horizontal Middle
      return { ...lineStyle, top: '50%', left: '0', right: '0', height: '2px' };
    }

    if (
      winningSquares.includes(6) &&
      winningSquares.includes(7) &&
      winningSquares.includes(8)
    ) {
      // Horizontal Bottom
      return {
        ...lineStyle,
        bottom: '50%',
        left: '0',
        right: '0',
        height: '2px',
      };
    }

    if (
      winningSquares.includes(0) &&
      winningSquares.includes(3) &&
      winningSquares.includes(6)
    ) {
      // Vertical Left
      return {
        ...lineStyle,
        top: '0',
        // bottom: '0',
        left: '40px',
        width: '2px',
        height: '245px',
        // transform: 'translateY(-50%)',
      };
    }

    if (
      winningSquares.includes(1) &&
      winningSquares.includes(4) &&
      winningSquares.includes(7)
    ) {
      // Vertical Middle
      return {
        ...lineStyle,
        top: '50%',
        bottom: '0',
        left: '50%',
        width: '2px',
        height: '245px',
        transform: 'translateY(-50%)',
      };
    }

    if (
      winningSquares.includes(2) &&
      winningSquares.includes(5) &&
      winningSquares.includes(8)
    ) {
      // Vertical Right
      return {
        ...lineStyle,
        right: '40px',
        bottom: '0px',
        width: '2px',
        height: '245px',
        transform: 'translatex(-50%)',
      };
    }

    if (
      winningSquares.includes(0) &&
      winningSquares.includes(4) &&
      winningSquares.includes(8)
    ) {
      // Diagonal Left-Top to Right-Bottom
      return {
        ...lineStyle,
        width: '2px',
        height: '335px',
        transform: 'rotate(135deg)',
        left: '123px',
        top: '-40px',
      };
    }

    if (
      winningSquares.includes(2) &&
      winningSquares.includes(4) &&
      winningSquares.includes(6)
    ) {
      // Diagonal Right-Top to Left-Bottom
      return {
        ...lineStyle,
        width: '2px',
        height: '370px',
        transform: 'rotate(44deg)',
        right: '123px',
        top: '-141px',
      };
    }

    return {};
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderWinningLine([0, 1, 2])} {/* Horizontal Top */}
        {renderWinningLine([0, 3, 6])} {/* Vertical Left */}
        {renderWinningLine([0, 4, 8])} {/* Diagonal Left-Top to Right-Bottom */}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderWinningLine([3, 4, 5])} {/* Horizontal Middle */}
        {renderWinningLine([1, 4, 7])} {/* Vertical Middle */}
        {renderWinningLine([2, 4, 6])} {/* Diagonal Right-Top to Left-Bottom */}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        {renderWinningLine([6, 7, 8])} {/* Horizontal Bottom */}
        {renderWinningLine([2, 5, 8])} {/* Vertical Right */}
      </div>
    </div>
  );
};

export default Board;
