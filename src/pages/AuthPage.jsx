import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Create_User, Sign_In } from "../store/actions";
import { Spinner } from "@chakra-ui/react";

const AuthPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.errors);
  const [isSignIn, setIsSignIn] = useState(false);
  const [input, setInput] = useState({ userName: "", email: "", password: "" });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const recData = {
      userName: input.userName,
      email: input.email,
      password: input.password,
    };
    const logInData = {
      userName: input.email,
      password: input.password,
    };
    if (isSignIn) {
      dispatch(Create_User(recData));
    } else {
      dispatch(Sign_In(logInData));
    }
  };

  return (
    <div className="auth">
      <div className="main">
        <Card className="border border-primary rounded p-2">
          <Card.Title>
            <h1 className="text">{isSignIn ? "SignUp" : "SignIn"}</h1>
          </Card.Title>
          <Card.Body>
            <Form onSubmit={onSubmitHandler}>
              {isSignIn && (
                <Form.Group className="mt-2">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    onChange={onChangeHandler}
                    name="userName"
                    placeholder="type username"
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={onChangeHandler}
                  name="email"
                  placeholder="type email"
                  required
                  type="email"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={onChangeHandler}
                  name="password"
                  placeholder="type password"
                  required
                  type="password"
                />
              </Form.Group>
              <Button className="mt-2" type="submit" variant="primary">
                {!isLoading ? (
                  <>{isSignIn ? "Register" : "Submit"} </>
                ) : (
                  <Spinner />
                )}
              </Button>
              {isError && (
                <div>
                  <p className="text-danger">{isError}</p>
                </div>
              )}
              <div className="text-center mt-3">
                <Button onClick={() => setIsSignIn(!isSignIn)} variant="danger">
                  {!isSignIn ? "Swich to SignUp" : "Swich to SignIn"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
