import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Log_Out } from "../store/actions";

const Navbars = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);
  const logOutHandler = () => {
    dispatch(Log_Out());
    localStorage.removeItem("myuser");
  };
  return (
    <Navbar className="fixed-top" variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand className="text-white li-items" as={Link} to="/">
          <div className="items d-flex align-items-center">
            <img src="/assests/logo.png" alt="" />
            <span className="titles">Pizza</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold d-flex gap-2">
            <Nav.Link className="text-white li-items" as={Link} to="/">
              Menu
            </Nav.Link>
            <Nav.Link className="text-white li-items" as={Link} to="/">
              Offers
            </Nav.Link>
            {user.token && (
              <Nav.Link className="text-white li-items" as={Link} to="/myorder">
                MyOrders
              </Nav.Link>
            )}
            {user?.isAdmin && (
              <Nav.Link className="text-white li-items" as={Link} to="/admin">
                AdminPannel
              </Nav.Link>
            )}

            {!user.token && (
              <Nav.Link className="text-white li-items" as={Link} to="/auth">
                LogIn
              </Nav.Link>
            )}

            <Nav.Link className="text-white li-items" as={Link} to="/cart">
              <span className="icons1">
                <span>
                  <ShoppingCartIcon />
                </span>
                <span className="icons2" style={{ color: "white" }}>
                  {cart.length}
                </span>
              </span>
            </Nav.Link>
            {user.token && (
              <Button onClick={logOutHandler} className="text-white li-items">
                LogOut
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
