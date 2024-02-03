// bootstrap imports
import { Card } from "react-bootstrap";

function Product({ product, theme }) {
  return (
    <Card className="my-3 p-3 rounded" border={theme}>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`/product/${product._id}`} className={`link-${theme}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
