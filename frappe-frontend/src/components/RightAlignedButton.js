import { Button } from "react-bootstrap";

const RightAlignedButton = ({ children, handleClick }) => {
  return (
    <div className={"my-2 d-flex flex-row justify-content-end"}>
      <Button variant="secondary" className={"mr-2"} onClick={handleClick}>
        {children}
      </Button>
    </div>
  );
};

export default RightAlignedButton;
