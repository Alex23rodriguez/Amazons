import { Component } from "react";

import "./board.styles.scss";
import Square from "../square/square.component";

import { createDiagonalsDict } from "../../utils/utils.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      queens: [
        [60, 69, 93, 96],
        [3, 6, 30, 39],
      ],
      arrows: [],
      selected: undefined,
      canMove: [],
      highlight: [],
    };
    this.diagonalsDict = createDiagonalsDict(this.props.size);
  }

  calculateMoves(index, qns) {
    qns = qns || this.state.queens;
    let size = this.props.size;
    let ans = [];
    let diagonals = this.diagonalsDict[index];
    for (let dir of Object.keys(diagonals)) {
      let temp = [];
      for (let i of diagonals[dir]) {
        if (i < index) {
          // before
          if (
            qns[0].includes(i) ||
            qns[1].includes(i) ||
            this.state.arrows.includes(i)
          ) {
            temp = [];
          } else {
            temp.push(i);
          }
        } else if (i > index) {
          //after
          if (
            qns[0].includes(i) ||
            qns[1].includes(i) ||
            this.state.arrows.includes(i)
          ) {
            break;
          } else {
            temp.push(i);
          }
        }
      }
      ans = ans.concat(temp);
    }
    return ans;
  }

  makeClickHandler = (i) => () => {
    this.setState(({ turn, queens, arrows, selected, canMove, highlight }) => {
      // click on queen
      if (queens[turn].includes(i) && highlight.length !== 2) {
        return {
          selected: i,
          canMove: this.calculateMoves(i, queens),
          highlight: [i],
        };
      } // click on canMove
      if (canMove.includes(i) && selected !== undefined) {
        let q = Array.from(queens[turn]).filter((j) => j !== selected);
        q.push(i);
        let qns = turn === 0 ? [q, queens[1]] : [queens[0], q];
        return {
          queens: qns,
          selected: undefined,
          canMove: this.calculateMoves(i, qns),
          highlight: [selected, i],
        };
      } // place arrow
      if (canMove.includes(i) && selected === undefined) {
        let h = Array.from(highlight);
        h.push(i);
        return {
          arrows: arrows.concat(i),
          canMove: [],
          turn: 1 - turn,
          highlight: h,
        };
      }
    });
  };

  render() {
    let squares = [];
    for (var i = 0; i < this.props.size * this.props.size; i++) {
      squares.push(
        <Square
          key={i}
          color={
            (this.state.highlight.includes(i) ? "H" : "") +
            ((i + Math.floor(i / this.props.size)) % 2)
          }
          queen={
            this.state.queens[0].includes(i)
              ? 1
              : this.state.queens[1].includes(i)
              ? 2
              : 0
          }
          arrow={this.state.arrows.includes(i) ? true : false}
          handleClick={this.makeClickHandler(i)}
          canMove={this.state.canMove.includes(i) ? true : false}
        />
      );
    }
    return <div className='board'>{squares}</div>;
  }
}

export default Board;
