// bootstrap imports
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="page-footer bg-dark text-light p-5">
      <Container>
        <Row className="text-center">
          <Col>
            <p>
              <img src="./images/logo.png" alt="logo" className="header-logo" />
              Game Shark
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
