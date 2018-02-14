import React from 'react';
import Square from '../Square';

class Board extends React.Component {

  /**
   *
   */
  constructor() {
    super();

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      gameIsOver: false,
    };
  }

  /**
   *
   * @param squares
   * @returns {*}
   */
  calculateWinner = (squares) => {
    let winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombinations.length; i++) {

      let [s1, s2, s3] = winCombinations[i];

      if (squares[s1] && squares[s1] === squares[s2] && squares[s2] === squares[s3]) {
        return squares[s1];
      }

    }

    return null;
  };

  /**
   *
   * @param i
   * @returns {boolean}
   */
  handleSquareClick = (i) => {
    let squares = [...this.state.squares]; // clones `squares` array in order NOT!!! to work with original one from state

    if (this.calculateWinner(squares) || squares[i]) {
      return false;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    let filledSquares = squares.filter((val) => val);
    let gameIsOver = filledSquares.length === squares.length;

    const state = {squares};

    if (gameIsOver) {

      this.setState({...state, ...{gameIsOver}});
      return false;

    }

    this.setState({...state, ...{xIsNext: !this.state.xIsNext}});

  };

  /**
   *
   * @param i
   * @returns {*}
   */
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onSquareClick={this.handleSquareClick.bind(this, i)} />;
  }

  /**
   *
   * @returns {*}
   */
  render() {
    let winner = this.calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {

      if (this.state.gameIsOver) {
        status = 'Game is Over';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

}

export default Board;

