import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ALL_REMOVE" });
    localStorage.removeItem("carts");
  }, [dispatch]);
  return (
    <div
      style={{ height: "70vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Button variant="primary">Congratulations your Payment Successful</Button>
    </div>
  );
};

export default PaymentSuccess;
