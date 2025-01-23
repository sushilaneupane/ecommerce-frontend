// ProductCard.js
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = ({ product }) => {
  return (
    <>
    {console.log(product,"asdfghjkl")}
  
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={product.imageUrl || "/image/cardimage.jpg"}
          alt={product.productName || "Product Image"}
        />
        <Card.Body>
          <Card.Text className="text-center">
            {product.productName || "Unknown Product"}
          </Card.Text>
          <Card.Text className="text-center">RS {product.price}</Card.Text>
         
        </Card.Body>
      </Card>
    </Link>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    productName: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
