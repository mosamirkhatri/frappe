import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import RightAlignedButton from "../components/RightAlignedButton";
import Loading from "../components/Loading";
import { getNameFromId } from "../utils/CommonFunctions";
import penImg from "../images/pen-icon.svg";

const ProductMovementList = ({ history }) => {
  const [movementData, setMovementData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await getProductData();
    await getLocationData();
    await getMovementData();
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

  const getMovementData = async () => {
    await axios
      .get("product_movement/")
      .then((res) => res.data)
      .then((res) => {
        if (res.success === true) {
          setMovementData(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePress = () => {
    history.push("/movement/new");
  };

  const handleEdit = (id) => {
    history.push(`movement/edit/${id}`);
  };

  return (
    <>
      {loading && <Loading />}
      <RightAlignedButton handleClick={handlePress}>
        Add New Movement
      </RightAlignedButton>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Movement ID</th>
            <th>Time</th>
            <th>From Location</th>
            <th>To Location</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {productData &&
            locationData &&
            movementData?.map((movement) => (
              <tr key={movement.movement_id}>
                <td>{movement.movement_id}</td>
                <td>{movement.timestamp}</td>
                <td>
                  {movement.from_location &&
                    getNameFromId(
                      movement.from_location,
                      locationData,
                      "location_id"
                    )}
                </td>
                <td>
                  {movement.to_location &&
                    getNameFromId(
                      movement.to_location,
                      locationData,
                      "location_id"
                    )}
                </td>
                <td>
                  {getNameFromId(
                    movement.product_id,
                    productData,
                    "product_id"
                  )}
                </td>
                <td>{movement.qty}</td>
                <td>
                  <i
                    className={"pointer"}
                    onClick={() => handleEdit(movement.movement_id)}
                  >
                    <img src={penImg} alt={""} />
                  </i>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductMovementList;
