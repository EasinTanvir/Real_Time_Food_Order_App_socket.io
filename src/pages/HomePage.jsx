import React, { useEffect } from "react";
import Banner from "../components/Banner";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Add_Cart, Fetch_Pizzas } from "../store/actions";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector((state) => state.errors);
  const { pizza } = useSelector((state) => state.pizzas);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(Fetch_Pizzas());
  }, [dispatch]);

  const onAddCardHandler = (data) => {
    if (user.token) {
      dispatch(Add_Cart(data));
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="w-100">
      <div className="banners">
        <Banner />
      </div>
      <div className="homepage">
        <div>
          <h3 className="fw-bold tesxt">All Pizzas</h3>
          {isLoading ? (
            <div
              style={{ height: "20vh" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner />
            </div>
          ) : (
            <Row className="mt-5 ">
              {pizza.map((item) => (
                <Col className="mb-5" key={item._id} lg={3} md={4} sm={12}>
                  <Card>
                    <Card.Body className=" d-flex flex-column align-items-center">
                      <img
                        className="body-img mb-3"
                        src="/assests/pizza.png"
                        alt=""
                      />
                      <h3 className="fw-bold tesxt-1 mb-1">{item.name}</h3>
                      <p>{item.size}</p>
                      <div className="d-flex btn-items w-100 justify-content-between mt-3">
                        <span className="fw-bold"> ${item.price}</span>
                        <button onClick={() => onAddCardHandler(item)}>
                          + Add
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
