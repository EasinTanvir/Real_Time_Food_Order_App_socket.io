import React from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Fetch_Order_Id, Update_REalTime } from "../store/actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CancelIcon from "@mui/icons-material/Cancel";

import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const SubmitOrderDetails = () => {
  const orderId = useParams().id;
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.errors);
  const { order } = useSelector((state) => state.singleorder);
  const { user } = useSelector((state) => state.auth);
  const { customerInfo } = order;
  const { shippingInfo } = order;
  const {
    itemPrice,
    totalPrice,
    shippingPrice,
    taxPrice,
    isPaid,
    isDelivered,
  } = order;

  useEffect(() => {
    dispatch(Fetch_Order_Id(orderId));
  }, [dispatch, orderId]);

  const cashHandler = () => {};
  const PayHandler = async () => {
    const customerInfos = {
      name: customerInfo.name,
      email: customerInfo.email,
    };
    const shippingInfos = {
      userName: shippingInfo.userName,
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: 555,
      pinCode: 1230,
      method: "Bkash",
      country: shippingInfo.country,
    };

    const recData = {
      orderItems: order?.orderItems,
      deliveryMethod: "Bkash",
      customerInfo: customerInfos,
      shippingInfo: shippingInfos,
      itemPrice,
      totalPrice,
      taxPrice,
      shippingPrice,
    };

    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL +
          `/api/payment/checkout?productid=${orderId}`,
        recData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );

      if (res.data?.length > 30) {
        window.location.replace(res.data);
      } else {
        alert("Checkout failed"); // eslint-disable-line no-alert
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const onSelectHandler = (data) => {
    if (data === "preparation") {
      const preData = {
        data1: "preparation",
        data2: "preparation1",
      };
      dispatch(Update_REalTime(orderId, preData));
      console.log(preData);
    } else if (data === "delivery") {
      const deliveryData = {
        data1: "delivery",
        data2: "delivery1",
      };
      dispatch(Update_REalTime(orderId, deliveryData));
    } else if (data === "complete") {
      const completeData = {
        data1: "complete",
        data2: "complete1",
      };
      dispatch(Update_REalTime(orderId, completeData));
    } else {
      const completeDatas = {
        data1: "place",
        data2: "place1",
      };
      dispatch(Update_REalTime(orderId, completeDatas));
    }
  };
  return (
    <>
      {isLoading ? (
        <div
          style={{ height: "20vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </div>
      ) : (
        <>
          <div>
            <Row className="d-flex justify-content-center">
              <Col md={5}>
                <Card>
                  <Card.Title className="p-2 d-flex justify-content-center">
                    <h3 className="fw-bold text">Customer Details</h3>
                  </Card.Title>
                  <Card.Body>
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>UserName</Col>
                          <Col className="fw-bold" md={6}>
                            {shippingInfo?.userName}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>Email</Col>
                          <Col className="fw-bold" md={6}>
                            {customerInfo?.email}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>Address</Col>
                          <Col className="fw-bold" md={6}>
                            {shippingInfo?.address}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>City</Col>
                          <Col className="fw-bold" md={6}>
                            {shippingInfo?.city}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>Country</Col>
                          <Col className="fw-bold" md={6}>
                            {shippingInfo?.country}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card>
                  <Card.Title className="p-2 d-flex justify-content-center">
                    <h3 className="fw-bold text">Order Summary</h3>
                  </Card.Title>
                  <ListGroup className="rounded border p-1" variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Pizzas</Col>
                        <Col>${itemPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax Price (5%)</Col>
                        <Col>${taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total Price</Col>
                        <Col>
                          $ <span className="fw-bold">{totalPrice}</span>{" "}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="mt-5">
            <Row className="d-flex justify-content-center">
              <Col md={5}>
                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <Row>
                        <Col md={6} className="fw-bold">
                          PayMent Status
                        </Col>
                        <Col md={6}>
                          {isPaid ? (
                            <span className="text-primary">
                              <CheckCircleIcon />
                            </span>
                          ) : (
                            <span className="text-danger">
                              <CancelIcon />
                            </span>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col md={6} className="fw-bold">
                          Delivery Status
                        </Col>
                        <Col md={6}>
                          {isDelivered === "place" ? (
                            <span className="text-primary">
                              <CheckCircleIcon />
                            </span>
                          ) : (
                            <span className="text-danger">
                              <span className="text-danger"> Pending</span>{" "}
                              <AutorenewIcon />
                            </span>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={5}>
                {!isPaid ? (
                  <ListGroup>
                    <ListGroup.Item>
                      <Row className="d-flex justify-content-center">
                        <Button
                          onClick={cashHandler}
                          className="w-75"
                          variant="primary"
                        >
                          Cash On Delivery
                        </Button>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row className="text-center">
                        <Col>
                          <Button
                            onClick={PayHandler}
                            className="w-75"
                            variant="danger"
                          >
                            Pay Now
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                ) : (
                  <>
                    <ListGroup>
                      <ListGroup.Item>
                        <Row className="d-flex justify-content-center">
                          <Col md={6}>
                            <span className="texts fw-bold">
                              Track Delivery Status
                            </span>
                          </Col>
                          <Col md={6}>
                            <Link to={`/myorder/realtime/${orderId}`}>
                              <Button variant="primary">Live Status</Button>
                            </Link>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {user.isAdmin && (
                        <ListGroup.Item>
                          <Row className="d-flex justify-content-center">
                            <Col md={6}>
                              <span className="texts fw-bold text-danger">
                                Update Delivery Status :
                              </span>
                            </Col>
                            <Col md={6}>
                              <Form>
                                <Form.Control
                                  onChange={(e) =>
                                    onSelectHandler(e.target.value)
                                  }
                                  as="select"
                                >
                                  <option>--Select--</option>
                                  <option value="preparation">Confirm</option>
                                  <option value="delivery">Preparation</option>
                                  <option value="complete">Delivery</option>
                                  <option value="success">Complete</option>
                                </Form.Control>
                              </Form>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </>
                )}
              </Col>
            </Row>
          </div>
          <div className="mt-5">
            <h3 className="texts d-flex justify-content-center m-2 fw-bold">
              Order Items
            </h3>
            <hr />

            <Row className="d-flex justify-content-center m-2">
              <Col md={6}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Pizza</th>
                      <th>qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orderItems?.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default SubmitOrderDetails;
