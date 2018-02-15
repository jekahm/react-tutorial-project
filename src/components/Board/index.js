import React from 'react';
import Square from '../Square';

class Board extends React.Component {

  /**
   *
   * @param i
   * @returns {*}
   */
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onSquareClick={this.props.onSquareClick.bind(null, i)} />;
  }

  /**
   *
   * @returns {*}
   */
  render() {
    return (
      <div>
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

