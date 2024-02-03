// bootstrap imports
import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";

// react imports
import { useState } from "react";

// library imports
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <header>
      <Navbar expand="lg" className="mb-3 px-5" variant="dark" bg="dark">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex">
            <img src="./images/logo.png" alt="logo" className="header-logo" />
            Game Shark
          </Navbar.Brand>
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
                <Nav.Link href="#action1">Features</Nav.Link>
                <Nav.Link href="#action2">New</Nav.Link>
                <Nav.Link href="#action2">
                  <ShoppingCartIcon width={20} />
                  Cart
                </Nav.Link>
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
                <Button variant="outline-danger me-2">Login</Button>
                <Button variant="outline-danger">Sign Up</Button>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
