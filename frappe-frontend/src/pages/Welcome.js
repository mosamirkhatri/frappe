import { FormLabel } from "react-bootstrap";

const Welcome = () => {
  return (
    <div
      className={"d-flex flex-row justify-content-center align-items-center"}
    >
      <FormLabel as={"h2"} className={"my-5"}>
        Welcome To Inventory Management System
      </FormLabel>
    </div>
  );
};

export default Welcome;
