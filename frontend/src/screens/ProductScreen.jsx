// rrd imports
import { useParams, Link } from "react-router-dom";

// bootstrap imports
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

// library imports
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Rating from "../components/Rating";

// copmponent imports
import Loader from "../components/Loader";
import Message from "../components/Message";

// redux imports
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

function ProductScreen() {
  // getting product id from quesry string
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

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
          <Link to="/" className={`btn my-3 btn-outline-${product.theme}`}>
            <div className="d-flex">
              Go Back
              <ArrowUturnLeftIcon width={20} />
            </div>
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item variant={product.theme}>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item variant={product.theme}>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant={product.theme}>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item variant={product.theme}>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item variant={product.theme}>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item variant={product.theme}>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stuck"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      variant={product.theme}
                      disabled={product.countInStock === 0}
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
