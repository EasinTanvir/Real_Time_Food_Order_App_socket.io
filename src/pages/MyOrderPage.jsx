import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Orders } from "../store/actions";
import { Spinner } from "@chakra-ui/react";

const MyOrderPage = () => {
  const { order } = useSelector((state) => state.orders);
  const { isLoading, isError } = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Fetch_Orders());
  }, [dispatch]);

  return (
    <div>
      <h2 className="texts text-center mb-4">All Orders</h2>
      <hr />
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
            {" "}
            {order.map((item) => (
              <Card key={item._id}>
                <Container>
                  <div className="d-flex justify-content-between p-2">
                    <div>
                      <span
                        style={{ fontSize: "20px" }}
                        className="texts fw-bold"
                      >
                        Orders Items
                      </span>
                    </div>
                    <div>
                      <Link to={`/myorder/details/${item._id}`}>
                        <Button variant="primary">View Details </Button>
                      </Link>
                    </div>
                  </div>
                </Container>
                {item?.orderItems.map((final) => (
                  <Card.Body key={final._id}>
                    <div className="d-flex gap-2 align-items-center">
                      <div>
                        <img
                          className="order-image"
                          src="/assests/pizza.png"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="texts">{final.name}</span>
                        <span>
                          Qty : <span className="fw-bold">{final.qty}</span>{" "}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                ))}
              </Card>
            ))}
          </>
        )}
      </>
    </div>
  );
};

export default MyOrderPage;
