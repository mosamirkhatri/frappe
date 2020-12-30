import { Table } from "react-bootstrap";

const CustomTable = ({ children, headingOne, headingTwo }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{headingOne}</th>
          <th>{headingTwo}</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default CustomTable;
