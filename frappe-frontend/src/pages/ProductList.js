import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CustomTable from "../components/CustomTable";
import RightAlignedButton from "../components/RightAlignedButton";
import Loading from "../components/Loading";
import penImg from "../images/pen-icon.svg";

const ProductList = ({ history }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProductData = useCallback(() => {
    setLoading(true);
    axios
      .get("product/")
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
    getProductData();
  }, [getProductData]);

  const handlePress = () => {
    history.push("/product/new");
  };

  const handleEdit = (product_id) => {
    history.push(`product/edit/${product_id}`);
  };

  return (
    <>
      {loading && <Loading />}
      <RightAlignedButton handleClick={handlePress}>
        Add New Product
      </RightAlignedButton>
      <CustomTable headingOne={"Product ID"} headingTwo={"Name"}>
        {data?.map((product) => (
          <tr key={product.product_id}>
            <td>{product.product_id}</td>
            <td>{product.name}</td>
            <td>
              <i
                className={"pointer"}
                onClick={() => handleEdit(product.product_id)}
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

export default ProductList;
