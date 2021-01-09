import "./queen.styles.scss";

const Queen = (props) => (
  <div className='container'>
    <div className={`centered-circle large ${props.team}`}></div>
    <div className='centered-circle small'></div>
  </div>
);

export default Queen;
