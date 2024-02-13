// bootstrap imports
import {
  Container,
  Badge,
  Navbar,
  Nav,
  Offcanvas,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";

// react imports
import { useState } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

// rrb imports
import { LinkContainer } from "react-router-bootstrap";

// rrd imports
import { useNavigate } from "react-router-dom";

// library imports
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

// logo import
import logo from "../assets/logo.png";

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // access cart comming from the store
  const { cartItems } = useSelector((state) => state.cart);

  // access user comming from the store
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // handling the hamburger menue while in mobile mode
  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <header>
      <Navbar expand="lg" className="mb-3 px-5" variant="dark" bg="dark">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex">
              <img src={logo} alt="logo" className="header-logo" />
              Game Shark
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-$lg`}
            onClick={handleExpand}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-$lg`}
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton onClick={handleExpand}>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1 pe-3 ">
                <LinkContainer to="/features">
                  <Nav.Link>Features</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/new">
                  <Nav.Link>New</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <ShoppingCartIcon width={20} />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg="danger" style={{ marginLeft: "5px" }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  id="search"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light me-2">Search</Button>
              </Form>
              <div className={isExpanded ? "mt-3" : ""}>
                {userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id="username"
                    className="btn btn-outline-success me-2"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Button variant="outline-danger me-2">Login</Button>
                  </LinkContainer>
                )}

                <LinkContainer to="/register">
                  <Button variant="outline-danger">Register</Button>
                </LinkContainer>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
