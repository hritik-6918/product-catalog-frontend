import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Card.Text>{product.description.substring(0, 50)}...</Card.Text>
        <Button href={`/product/${product._id}`} variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
