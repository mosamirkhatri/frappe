import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Form, FormLabel, Button, Alert } from "react-bootstrap";
import Select from "react-select";
import Loading from "../components/Loading";

const NewMovement = ({ history }) => {
  const [productData, setProductData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [productTransfered, setProductTransfered] = useState(null);
  const [qty, setQty] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await getProductData();
    await getLocationData();
    setLoading(false);
  }, []);

  const getProductData = async () => {
    await axios
      .get("product/")
      .then((res) => res.data)
      .then((res) => {
        if (res.success === true) {
          setProductData(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const getLocationData = async () => {
    await axios
      .get("location/")
      .then((res) => res.data)
      .then((res) => {
        if (res.success === true) {
          setLocationData(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const getOptions = (data, identifier) => {
    return data.map((item) => ({ label: item.name, value: item[identifier] }));
  };

  const handleQtyChange = (e) => {
    let newQty = e.target.value;
    setQty(newQty);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let requestBody = {};
    if (fromLocation !== null) {
      requestBody.from_location = fromLocation.value;
    }
    if (toLocation !== null) {
      requestBody.to_location = toLocation.value;
    }
    if (requestBody.from_location === requestBody.to_location) {
      setErrorMessage("To and From Location Cannot be Same");
      setLoading(false);
      return;
    }
    requestBody.product_id = productTransfered.value;
    requestBody.qty = Number(qty);
    console.log(requestBody);
    try {
      const { data } = await axios.post("/product_movement/new", requestBody);
      if (data.success) {
        history.replace("/movement");
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
      <Form.Group className={"my-3"}>
        <FormLabel as={"h3"}>New Movement</FormLabel>
        {locationData && (
          <>
            <FormLabel>From Location</FormLabel>
            <Select
              options={getOptions(locationData, "location_id")}
              isClearable={true}
              value={fromLocation}
              onChange={(location) => setFromLocation(location)}
            />
            <FormLabel className={"mt-1"}>To Location</FormLabel>
            <Select
              options={getOptions(locationData, "location_id")}
              isClearable={true}
              value={toLocation}
              onChange={(location) => setToLocation(location)}
            />
            <FormLabel className={"mt-1"}>Product To be transported</FormLabel>
            <Select
              options={getOptions(productData, "product_id")}
              isClearable={true}
              value={productTransfered}
              onChange={(product) => setProductTransfered(product)}
            />
            <FormLabel className={"mt-1"}>Quantity</FormLabel>
            <Form.Control
              size="md"
              type={"number"}
              className={"mb-2"}
              placeholder={"Quantity"}
              value={qty}
              onChange={handleQtyChange}
              min={1}
            />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            {errorMessage && (
              <Alert className={"my-2"} variant={"danger"}>
                {errorMessage}
              </Alert>
            )}
          </>
        )}
      </Form.Group>
    </>
  );
};

export default NewMovement;
