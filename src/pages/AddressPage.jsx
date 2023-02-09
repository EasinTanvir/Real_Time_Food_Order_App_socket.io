import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Create_Address } from "../store/actions";

const AddressPage = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.add);
  const { userName, email, address: address1, city, country } = address;
  const [input, setInput] = useState({
    userName: userName,
    email: email,
    address: address1,
    city: city,
    country: country,
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const recData = {
      userName: input.userName,
      email: input.email,
      address: input.address,
      city: input.city,
      country: input.country,
    };
    dispatch(Create_Address(recData));
  };
  return (
    <>
      <div className="auth-2">
        <div className="main">
          <Card className="rounded p-2">
            <Card.Title className="d-flex justify-content-center">
              <span className="fw-bold text ">Address Form</span>
            </Card.Title>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mt-2">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    value={input.userName}
                    onChange={onChangeHandler}
                    name="userName"
                    placeholder="type username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={input.email}
                    onChange={onChangeHandler}
                    name="email"
                    placeholder="type email"
                    required
                    type="email"
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={input.address}
                    onChange={onChangeHandler}
                    name="address"
                    placeholder="type address"
                    required
                    type="text"
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={input.city}
                    onChange={onChangeHandler}
                    name="city"
                    placeholder="type city"
                    required
                    type="text"
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    value={input.country}
                    onChange={onChangeHandler}
                    name="country"
                    placeholder="type country"
                    required
                    type="text"
                  />
                </Form.Group>
                <Link to="/order">
                  <Button className="mt-3" type="submit" variant="primary">
                    Save & Continue
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
