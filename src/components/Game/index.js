import React from 'react';
import Board from "../Board";

class Game extends React.Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
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
    //let history = this.state.history;
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = [...current.squares]; // clones `squares` array in order NOT!!! to work with original one from state

    if (this.calculateWinner(squares) || squares[i]) {
      return false;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    let filledSquares = squares.filter((val) => val);
    let gameIsOver = filledSquares.length === squares.length;

    const state = {
      history: history.concat([{
        squares
      }])
    };

    if (gameIsOver) {

      this.setState({...state, ...{gameIsOver}});
      return false;

    }

    this.setState({
      ...state,
      ...{
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length
      }
    });
  };

  /**
   *
   * @param stepIndex
   */
  handleStepClick = (stepIndex) => {
    console.log('Step # => ', stepIndex);
    this.setState({
      stepNumber: stepIndex,
      xIsNext: (stepIndex % 2) === 0
    })
  };

  /**
   *
   * @returns {*}
   */
  render() {
    let history = this.state.history;
    let current = history[this.state.stepNumber];
    let winner = this.calculateWinner(current.squares);
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

    let userSteps = history.map((stepData, stepIndex) => {
      let desc = stepIndex ? `Go to step #${stepIndex}` : 'Go to Game Start';

      return (
        <li key={stepIndex}>
          <button onClick={this.handleStepClick.bind(this, stepIndex)}>{desc}</button>
        </li>
      )
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares = {current.squares} onSquareClick = {this.handleSquareClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{userSteps}</ol>
        </div>
      </div>
    );
  }

}

export default Game;

