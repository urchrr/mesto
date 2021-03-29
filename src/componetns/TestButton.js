
const TestButton = (props) => {
  const handleClick = () => {
    console.log(props.item);
  };
  return (
    <button color="primary" onClick={handleClick}>
      {props.message ? props.message : 'Test'}
    </button>
  );
};

export default TestButton;
