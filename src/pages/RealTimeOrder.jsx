import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import CircleIcon from "@mui/icons-material/Circle";
import CheckIcon from "@mui/icons-material/Check";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Spinners from "../components/Spinners";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useRef } from "react";
import { useState } from "react";
import apis from "../store/apis";
import { useToast } from "@chakra-ui/react";

const RealTimeOrder = () => {
  const toast = useToast();
  const [result, setResult] = useState();

  const orderId = useParams().id;

  const { user } = useSelector((state) => state.auth);
  const socketRef = useRef();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("working");
      socket.on("message", (recdata) => {
        if (recdata) {
          setResult(recdata.delivery);
        }
      });
    });
    if (user?.token && result !== undefined && result !== "place") {
      toast({
        title: "Live Status",
        description: `Your order is ready for ${result}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    if (result === "place") {
      toast({
        title: "Congratulations",
        description: `Your order has been ${result} successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    return () => {
      socket.removeAllListeners();
    };
  }, [result, toast, user]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apis.get(`/api/orders/${orderId}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      setResult(data?.isDelivered);
    };
    fetchData();
  }, [orderId, user]);
  return (
    <div className="h-100h d-flex flex-column justify-content-center align-items-center">
      <h1
        style={{ fontSize: "30px", fontWeight: "bolder" }}
        className="texts mb-5"
      >
        Track Your Delivery Status
      </h1>
      <hr />

      <div className="d-flex gap-4 align-items-center">
        <CircleIcon style={{ fontSize: "18px" }} />
        <Button style={{ width: "200px" }} disabled={true} variant="dark">
          <span className="d-flex gap-4">
            <span>
              <FilterFramesIcon />
            </span>
            <span>Order Placed</span>
          </span>
        </Button>
      </div>

      <span className="ms-4 mt-2">
        <ArrowDownwardIcon style={{ fontSize: "40px" }} />
      </span>

      <div className="d-flex gap-4 align-items-center mt-1">
        <CircleIcon style={{ fontSize: "18px" }} />
        <Button
          disabled={result === "confirm" ? false : true}
          style={{ width: "200px" }}
          variant={result === "confirm" ? "primary" : "dark"}
        >
          <span className="d-flex gap-4">
            <span>
              <CheckIcon />
            </span>
            <span>Confirmation</span>
            {result === "confirm" && (
              <span>
                <Spinners />
              </span>
            )}
          </span>
        </Button>
      </div>

      <span className="ms-4 mt-2">
        <ArrowDownwardIcon style={{ fontSize: "40px" }} />
      </span>
      <div className="d-flex gap-4 align-items-center mt-1">
        <CircleIcon style={{ fontSize: "18px" }} />
        <Button
          disabled={result === "preparation" ? false : true}
          style={{ width: "200px" }}
          variant={result === "preparation" ? "primary" : "dark"}
        >
          <span className="d-flex gap-4">
            <span>
              <LocalPizzaIcon />
            </span>
            <span>Preparation</span>
            {result === "preparation" && (
              <span>
                <Spinners />
              </span>
            )}
          </span>
        </Button>
      </div>
      <span className="ms-4 mt-2">
        <ArrowDownwardIcon style={{ fontSize: "40px" }} />
      </span>
      <div className="d-flex gap-4 align-items-center mt-1">
        <CircleIcon style={{ fontSize: "18px" }} />
        <Button
          disabled={result === "delivery" ? false : true}
          style={{ width: "200px" }}
          variant={result === "delivery" ? "primary" : "dark"}
        >
          <span className="d-flex gap-4">
            <span>
              <LocalShippingIcon />
            </span>
            <span>Out For Delivery</span>
            {result === "delivery" && (
              <span>
                <Spinners />
              </span>
            )}
          </span>
        </Button>
      </div>
      <span className="ms-4 mt-2">
        <ArrowDownwardIcon style={{ fontSize: "40px" }} />
      </span>
      <div className="d-flex gap-4 align-items-center mt-1">
        <CircleIcon style={{ fontSize: "18px" }} />
        <Button
          disabled={result === "complete" ? false : true}
          style={{ width: "200px" }}
          variant={result === "complete" ? "primary" : "dark"}
        >
          <span className="d-flex gap-4">
            <span>
              <TagFacesIcon />
            </span>
            <span>Complete</span>
            {result === "complete" && (
              <span>
                <Spinners />
              </span>
            )}
          </span>
        </Button>
      </div>

      {result === "place" && (
        <div className="mt-3">
          <h2
            style={{ fontSize: "25px", fontWeight: "bolder" }}
            className="texts text-danger ms-3"
          >
            Your order has been Delivered.Thanks for your orders
          </h2>
        </div>
      )}
    </div>
  );
};

export default RealTimeOrder;
