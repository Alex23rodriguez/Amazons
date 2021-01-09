import "./square.styles.scss";

import Queen from "../queen/queen.component";
import Arrow from "../arrow/arrow.component";

const Square = (props) => (
  <div className={"square color" + props.color}>
    {props.queen ? <Arrow /> : null}
  </div>
);

export default Square;