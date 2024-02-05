// bootstrap imports
import { Row, Col } from "react-bootstrap";

// library improts
import axios from "axios";

// component imports
import Product from "../components/Product";

// react imports
import { useEffect, useState } from "react";

function HomeScreen() {
  const [products, setProducts] = useState([]);

  // fetching producst data from backend with axios
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} color={product.theme} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
