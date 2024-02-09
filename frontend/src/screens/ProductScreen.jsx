// rrd imports
import { useParams, Link, useNavigate } from "react-router-dom";

// react imports
import { useState } from "react";

// bootstrap imports
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from "react-bootstrap";

// library imports
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Rating from "../components/Rating";

// copmponent imports
import Loader from "../components/Loader";
import Message from "../components/Message";

// redux imports
import { useDispatch } from "react-redux";

// slice imports
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

function ProductScreen() {
  // getting product id from quesry string
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // keep qty in the component state
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

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

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      variant={product.theme}
                      disabled={product.countInStock === 0}
                      type="button"
                      onClick={addToCartHandler}
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
