// bootstrap imports
import { Container, Row, Col } from "react-bootstrap";

// logo import
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-dark text-light p-4 footer">
      <Container>
        <Row className="text-center">
          <Col>
            <p>
              <img src={logo} alt="logo" className="header-logo" /> Game Shark
            </p>
          </Col>
          <Col>
            <p className="text-uppercase">&copy; 2024 All Right Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
