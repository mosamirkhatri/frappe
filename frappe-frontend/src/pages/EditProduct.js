import { useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Button, FormLabel, Alert } from "react-bootstrap";
import Loading from "../components/Loading";

const EditProduct = ({ history, match }) => {
  const [data, setData] = useState({ product_id: "", name: "" });
  const [status, setStatus] = useState(200);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getProductData = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`product/${match.params.id}`)
      .then((res) => res.data)
      .then((res) => {
        if (res.success === true) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoading(false);
          setStatus(err.response.status);
        }
      });
  }, [match.params.id]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  const handleNameChange = (e) => {
    let newName = e.target.value;
    setData((oldData) => ({ ...oldData, name: newName }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    let requestData = { name: data.name };
    try {
      const { data } = await axios.post(
        `product/edit/${match.params.id}`,
        requestData
      );
      if (data.success) {
        history.replace("/product");
        return;
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      {(status === 404 || status === 400) && <Redirect to={"/notfound"} />}
      {data.product_id && (
        <Form.Group className={"my-3"}>
          <FormLabel>Update Product</FormLabel>
          <Form.Control
            size="lg"
            type="text"
            className={"mb-2"}
            placeholder="Name"
            value={data.name}
            onChange={handleNameChange}
          />
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Group>
      )}
      {errorMessage && <Alert variant={"danger"}>{errorMessage}</Alert>}
    </>
  );
};

export default EditProduct;
