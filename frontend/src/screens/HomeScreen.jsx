// bootstrap imports
import { Row, Col } from "react-bootstrap";

// data import
import products from "../../data/products";

// component imports
import Product from "../components/Product";

function HomeScreen() {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} color={product.theme} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default HomeScreen;
