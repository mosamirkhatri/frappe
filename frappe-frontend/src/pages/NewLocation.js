import { useState } from "react";
import axios from "axios";
import { Form, Button, FormLabel, Alert } from "react-bootstrap";
import Loading from "../components/Loading";

const NewLocation = ({ history }) => {
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
      const { data } = await axios.post("location/new", requestData);
      if (data.success) {
        // setLoading(false);
        history.replace("/location");
        return;
      } else {
        console.log(data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      if (error.response) {
        const { response } = error;
        setErrorMessage(response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Form.Group className={"my-3"}>
        <FormLabel>New Location</FormLabel>
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

export default NewLocation;
