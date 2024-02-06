// bootstrap imports
import { Row, Col } from "react-bootstrap";

// redux imports
import { useGetProductsQuery } from "../slices/productsApiSlice";

// component imports
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  // fetching producst data from backend with redux
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {" "}
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} color={product.theme} />
              </Col>
            ))}
          </Row>{" "}
        </>
      )}
    </>
  );
}

export default HomeScreen;
