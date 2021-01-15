import "./queen.styles.scss";

const Queen = (props) => (
  <div className='container'>
    <div className={`inner-circle large ${props.team}`}></div>
    <div className='inner-circle small'></div>
  </div>
);

export default Queen;
