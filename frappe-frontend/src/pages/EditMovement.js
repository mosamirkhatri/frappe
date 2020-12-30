import { useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, FormLabel, Button, Alert } from "react-bootstrap";
import Select from "react-select";
import Loading from "../components/Loading";

const EditMovement = ({ history, match }) => {
  const [productData, setProductData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [movementData, setMovementData] = useState({
    fromLocation: null,
    toLocation: null,
    productTransfered: null,
    qty: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(200);

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

  const getMovementData = useCallback(async () => {
    await axios
      .get(`product_movement/${match.params.id}`)
      .then((res) => res.data)
      .then((res) => {
        if (res.success === true) {
          const { data } = res;
          setMovementData({
            fromLocation: data.from_location,
            toLocation: data.to_location,
            productTransfered: data.product_id,
            qty: data.qty,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response) {
          setStatus(err.response.status);
        }
      });
  }, [match.params.id]);

  const getData = useCallback(async () => {
    setLoading(true);
    await getProductData();
    await getLocationData();
    await getMovementData();
    setLoading(false);
  }, [getMovementData]);

  useEffect(() => {
    getData();
  }, [getData]);

  const getOptions = (data, identifier) => {
    return data?.map((item) => ({ label: item.name, value: item[identifier] }));
  };

  const locationOptions = getOptions(locationData, "location_id");
  const getLocationValue = (id) =>
    locationOptions.find((item) => item.value === id);

  const productOptions = getOptions(productData, "product_id");
  const getProductValue = (id) =>
    productOptions.find((item) => item.value === id);

  const handleQtyChange = (e) => {
    let newQty = e.target.value;
    setMovementData((movement) => ({ ...movement, qty: newQty }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    let requestBody = {};
    if (movementData.fromLocation !== null) {
      requestBody.from_location = movementData.fromLocation;
    }
    if (movementData.toLocation !== null) {
      requestBody.to_location = movementData.toLocation;
    }
    if (requestBody.from_location === requestBody.to_location) {
      return;
    }
    requestBody.product_id = movementData.productTransfered;
    requestBody.qty = Number(movementData.qty);
    console.log(requestBody);
    try {
      const { data } = await axios.post(
        `/product_movement/edit/${match.params.id}`,
        requestBody
      );
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
      {(status === 404 || status === 400) && <Redirect to={"/notfound"} />}
      <Form.Group className={"my-3"}>
        <FormLabel as={"h3"}>Update Movement</FormLabel>
        {locationData && productData && (
          <>
            <FormLabel>From Location</FormLabel>
            <Select
              options={locationOptions}
              isClearable={true}
              value={getLocationValue(movementData.fromLocation)}
              onChange={(location) =>
                setMovementData((movement) => ({
                  ...movement,
                  fromLocation: location ? location.value : null,
                }))
              }
            />
            <FormLabel className={"mt-1"}>To Location</FormLabel>
            <Select
              options={locationOptions}
              isClearable={true}
              value={getLocationValue(movementData.toLocation)}
              onChange={(location) =>
                setMovementData((movement) => ({
                  ...movement,
                  toLocation: location ? location.value : null,
                }))
              }
            />
            <FormLabel className={"mt-1"}>Product To be transported</FormLabel>
            <Select
              options={productOptions}
              isClearable={true}
              value={getProductValue(movementData.productTransfered)}
              onChange={(product) =>
                setMovementData((movement) => ({
                  ...movement,
                  productTransfered: product ? product.value : null,
                }))
              }
            />
            <FormLabel className={"mt-1"}>Quantity</FormLabel>
            <Form.Control
              size="md"
              type={"number"}
              className={"mb-2"}
              placeholder={"Quantity"}
              value={movementData.qty}
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

export default EditMovement;
