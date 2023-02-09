import Spinner from "react-bootstrap/Spinner";

function Spinners() {
  return (
    <Spinner size="sm" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Spinners;
