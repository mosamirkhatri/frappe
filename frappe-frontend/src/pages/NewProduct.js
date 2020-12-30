import { useState } from "react";
import axios from "axios";
import { Form, Button, FormLabel, Alert } from "react-bootstrap";
import Loading from "../components/Loading";

const NewProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    let newName = e.target.value;
    setName(newName);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let requestData = { name: name };
    try {
      const { data } = await axios.post("product/new", requestData);
      if (data.success) {
        history.replace("/product");
        return;
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Form.Group className={"my-3"}>
        <FormLabel>New Product</FormLabel>
        <Form.Control
          size="lg"
          type="text"
          className={"mb-2"}
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Group>
      {errorMessage && <Alert variant={"danger"}>{errorMessage}</Alert>}
    </>
  );
};

export default NewProduct;
