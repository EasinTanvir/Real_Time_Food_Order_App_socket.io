import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Admin_Orders } from "../store/actions";
import Table from "react-bootstrap/Table";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import moment from "moment";
import { Spinner } from "@chakra-ui/react";

const AdminPannel = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.errors);
  const { order } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(Fetch_Admin_Orders());
  }, [dispatch]);

  return (
    <div>
      <h4 className="texts d-flex justify-content-center mb-2">All tems</h4>
      <hr />
      {isLoading ? (
        <div
          style={{ height: "20vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </div>
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Total Items</th>
                  <th>IsPaid</th>
                  <th>IsDelivered</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {order.map((item) => (
                  <tr key={item._id}>
                    <td>{item?.customerInfo?.name}</td>
                    <td>{item?.customerInfo?.email}</td>
                    <td>{moment(item?.createdAt).fromNow()}</td>
                    <td>{item?.orderItems?.length}</td>
                    <td>
                      {item?.isPaid ? (
                        <CheckIcon />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {item?.isDelivered === "place" ? (
                        <CheckIcon />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </td>

                    <td className="text-center">
                      <Link to={`/myorder/details/${item._id}`}>
                        <Button variant="danger">Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdminPannel;
