// bootstrap imports
import { Row, Col } from "react-bootstrap";

// redux imports
import { useGetProductsQuery } from "../slices/productsApiSlice";

// component imports
import Product from "../components/Product";

function HomeScreen() {
  // fetching producst data from backend with redux
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
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
