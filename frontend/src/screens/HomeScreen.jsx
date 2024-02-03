// bootstrap imports
import { Row, Col } from "react-bootstrap";

// data import
import products from "../../data/products";

// component imports
import Product from "../components/Product";

// react imports

function HomeScreen() {
  const colors = ["primary", "secondary", "success", "danger"];

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, index) => {
          let theme = colors[index % colors.length];
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} theme={theme} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default HomeScreen;
