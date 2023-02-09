import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";

import { Add_Cart, Remove_Cart } from "../store/actions";
import AddressModal from "../components/AddressModal";

const CartPage = () => {
  const { address } = useSelector((state) => state.add);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { cart } = useSelector((state) => state.carts);

  const newCart = { ...cart };
  const addDicimal = (price) => {
    return (Math.round(price * 100) / 100).toFixed(2);
  };

  const onChangeQty = (item, qty) => {
    const numQty = Number(qty);
    dispatch(Add_Cart(item, numQty));
  };

  newCart.totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
  newCart.tax = Number(addDicimal(newCart.totalPrice * 0.05));
  newCart.shipping = Number(10);
  newCart.amounts = Number(
    addDicimal(newCart.totalPrice + newCart.shipping + newCart.tax)
  );

  const onDeleteHandler = (data) => {
    dispatch(Remove_Cart(data));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {cart.length === 0 ? (
        <div className="w-100 d-flex justify-content-center">
          <Button variant="danger">You Cart is Empty</Button>
        </div>
      ) : (
        <>
          {" "}
          <div className="mt-4 mb-5">
            <h1 className="li-items mb-4">All Orders</h1>
            {cart.map((item) => (
              <Card className="mt-2" key={item._id}>
                <Row>
                  <Col lg={4}>
                    <Card className="p-2">
                      <div className="d-flex align-items-center gap-5">
                        <div className="l-cart">
                          <img src="/assests/pizza.png" alt="" />
                        </div>
                        <div>
                          <h5 className="fw-bold">{item.name}</h5>
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card className="d-flex flex-row gap-5 h-100 justify-content-center align-items-center">
                      <div>
                        <Form.Select
                          onChange={(e) => onChangeQty(item, e.target.value)}
                        >
                          <option value="1">--Select--</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3 </option>
                          <option value="4">4 </option>
                          <option value="5">5 </option>
                          <option value="6">6 </option>
                          <option value="7">7 </option>
                          <option value="8">8 </option>
                        </Form.Select>
                      </div>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card className="d-flex flex-row gap-5 h-100 justify-content-center align-items-center">
                      <span className="fw-bold">
                        {" "}
                        {item.qty}*{item.price}
                      </span>
                      <span
                        onClick={() => onDeleteHandler(item)}
                        style={{ cursor: "pointer", color: "red" }}
                      >
                        <DeleteIcon />
                      </span>
                    </Card>
                  </Col>
                </Row>
              </Card>
            ))}
            <Row className="mt-5 d-flex justify-content-center">
              <Col lg={6}>
                {!address?.userName && (
                  <Card>
                    <Card.Title>
                      <h4 className="text mt-2">Please Add Your Address</h4>
                    </Card.Title>
                    <Card.Body className="d-flex justify-content-center">
                      <Button variant="danger" onClick={handleShow}>
                        Add Address
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </Col>
              <Col lg={4}>
                <Card>
                  <ListGroup className="rounded border p-1" variant="flush">
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
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
                    {/* <ListGroup.Item>
                      <Row className="d-flex fw-bold justify-content-center">
                        Select a Payment Method
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row className="d-flex justify-content-center">
                        <Button variant="primary">Cash On Delivery</Button>
                      </Row>
                    </ListGroup.Item> */}
                    <ListGroup.Item>
                      <Row>
                        {address?.userName ? (
                          <Link
                            className="p-2"
                            style={{ textDecoration: "none", color: "white" }}
                            to="/order"
                          >
                            <Button
                              disabled={address?.userName ? false : true}
                              variant="dark"
                              className="w-100 d-flex justify-content-center"
                            >
                              Place Order
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            disabled={true}
                            variant="dark"
                            className="w-100 p-2 d-flex justify-content-center"
                          >
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to="/order"
                            >
                              Place Order
                            </Link>
                          </Button>
                        )}
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
      <AddressModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

export default CartPage;
