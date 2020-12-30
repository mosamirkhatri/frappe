import { Spinner } from "react-bootstrap";
import "../styles/Loading.css";

const Loading = () => {
  return (
    <div className={"overlay"}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
