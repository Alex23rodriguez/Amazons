import { Component } from "react";

import "./board.styles.scss";
import Square from "../square/square.component";

class Board extends Component {
  constructor(props) {
    super();
    console.log(props.size);
    this.state = {
      size: parseInt(props.size),
    };
  }

  render() {
    let squares = [];
    for (var i = 0; i < this.state.size * this.state.size; i++) {
      squares.push(
        <Square
          key={i}
          color={(i + Math.floor(i / this.state.size)) % 2}
          queen
        />
      );
    }
    return <div className='board'>{squares}</div>;
  }
}

export default Board;
