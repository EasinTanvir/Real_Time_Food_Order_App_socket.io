import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const [onCashonDelivery, setOnCashDeliver] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.add);
  const { userName, email, address: address1, city, country } = address;

  const newCart = { ...cart };
  const addDicimal = (price) => {
    return (Math.round(price * 100) / 100).toFixed(2);
  };
  newCart.totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
  newCart.tax = Number(addDicimal(newCart.totalPrice * 0.05));
  newCart.shipping = Number(10);
  newCart.amounts = Number(
    addDicimal(newCart.totalPrice + newCart.shipping + newCart.tax)
  );

  const cashHandler = () => {
    setOnCashDeliver("Cash On Delivery");
  };
  const PayHandler = async () => {
    const customerInfo = {
      name: user.userName,
      email: user.email,
    };
    const shippingInfo = {
      userName,
      address: address1,
      city,
      state: 555,
      pinCode: 1230,
      method: "Bkash",
      country,
    };

    const recData = {
      orderItems: cart,
      deliveryMethod: "Bkash",
      customerInfo,
      shippingInfo: shippingInfo,
      itemPrice: Number(newCart.totalPrice),
      totalPrice: Number(newCart.amounts),
      taxPrice: Number(newCart.tax),
      shippingPrice: Number(newCart.shipping),
    };
    console.log(recData);

    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/payment/checkout",
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

  return (
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
                      {userName}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>Email</Col>
                    <Col className="fw-bold" md={6}>
                      {email}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>Address</Col>
                    <Col className="fw-bold" md={6}>
                      {address1}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>City</Col>
                    <Col className="fw-bold" md={6}>
                      {city}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>Country</Col>
                    <Col className="fw-bold" md={6}>
                      {country}
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
                  <Col>${newCart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${newCart.shipping}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price (5%)</Col>
                  <Col>${newCart.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>
                    $ <span className="fw-bold">{newCart.amounts}</span>{" "}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="d-flex fw-bold justify-content-center">
                  Select a Payment Method
                </Row>
              </ListGroup.Item>
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
