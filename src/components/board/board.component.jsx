import { Component } from "react";

import "./board.styles.scss";
import Square from "../square/square.component";

class Board extends Component {
  constructor(props) {
    super();
    this.state = {
      size: props.size,
      queens1: [60, 69, 93, 96],
      queens2: [3, 6, 30, 39],
      arrows: [],
    };
  }

  render() {
    let squares = [];
    for (var i = 0; i < this.state.size * this.state.size; i++) {
      squares.push(
        <Square
          key={i}
          color={(i + Math.floor(i / this.state.size)) % 2}
          queen={
            this.state.queens1.includes(i)
              ? 1
              : this.state.queens2.includes(i)
              ? 2
              : 0
          }
          arrow={this.state.arrows.includes(i) ? true : false}
        />
      );
    }
    return <div className='board'>{squares}</div>;
  }
}

export default Board;
