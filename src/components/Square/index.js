import React from 'react';

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Square = (props) => (<button className="square" onClick={props.onSquareClick}> {props.value} </button>);

export default Square;
