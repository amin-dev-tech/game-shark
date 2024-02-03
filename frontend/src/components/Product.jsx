// bootstrap imports
import { Card } from "react-bootstrap";

// rrd imports
import { Link } from "react-router-dom";

// component imports
import Rating from "./Rating";

function Product({ product, color }) {
  return (
    <Card className="my-3 p-3 rounded" border={color}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className={`link-${color}`}>
          <Card.Title className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
