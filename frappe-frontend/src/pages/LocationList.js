import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CustomTable from "../components/CustomTable";
import RightAlignedButton from "../components/RightAlignedButton";
import Loading from "../components/Loading";
import penImg from "../images/pen-icon.svg";

const LocationList = ({ history }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocationData = useCallback(() => {
    setLoading(true);
    axios
      .get("location/")
      .then((res) => res.data)
      .then((res) => {
        if (res.success === true) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getLocationData();
  }, [getLocationData]);

  const handlePress = () => {
    history.push("/location/new");
  };

  const handleEdit = (product_id) => {
    history.push(`location/edit/${product_id}`);
  };

  return (
    <>
      {loading && <Loading />}
      <RightAlignedButton handleClick={handlePress}>
        Add New Location
      </RightAlignedButton>
      <CustomTable headingOne={"Location ID"} headingTwo={"Name"}>
        {data?.map((location) => (
          <tr key={location.location_id}>
            <td>{location.location_id}</td>
            <td>{location.name}</td>
            <td>
              <i
                className={"pointer"}
                onClick={() => handleEdit(location.location_id)}
              >
                <img src={penImg} alt={""} />
              </i>
            </td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default LocationList;
