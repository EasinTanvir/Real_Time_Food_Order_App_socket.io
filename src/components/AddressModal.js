import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Create_Address } from "../store/actions";

const AddressModal = ({ show, handleClose, handleShow }) => {
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-bold text ">Address Form</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="rounded p-2">
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

                <Button
                  onClick={handleClose}
                  className="mt-3"
                  type="submit"
                  variant="primary"
                >
                  Save & Continue
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressModal;
