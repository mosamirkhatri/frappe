import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Loading from "../components/Loading";
import { getNameFromId } from "../utils/CommonFunctions";

const Report = () => {
  const [reportData, setReportData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await getProductData();
    await getLocationData();
    await getReportData();
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

  const getReportData = async () => {
    await axios
      .get("report/")
      .then((res) => res.data)
      .then((res) => {
        if (res.success === true) {
          setReportData(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {loading && <Loading />}

      <Table className={"my-3"} striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Location</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productData &&
            locationData &&
            reportData?.map((report) => (
              <tr key={report.product_id + report.location_id}>
                <td>
                  {report.product_id &&
                    getNameFromId(report.product_id, productData, "product_id")}
                </td>
                <td>
                  {report.location_id &&
                    getNameFromId(
                      report.location_id,
                      locationData,
                      "location_id"
                    )}
                </td>
                <td>{report.qty}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Report;
