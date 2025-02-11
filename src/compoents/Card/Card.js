import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ProductList = ({ products }) => {
    return (
        <Row>
            {products.map((product) => (
                <Col xs={12} sm={6} lg={3} className="mb-4" key={product.id}>
                    <Card className="h-100">
                        <Card.Img
                            variant="top"
                            src={
                                product.images.length > 0
                                  ?  `http://localhost:3001/uploads/${product.images[0].image}`
                                  : "/image/cardimage.jpg"
                              }
                            alt={product.productName || "Product Image"}
                        />
                        <Card.Body>
                            <Card.Text className="text-center">
                                {product.productName || "Unknown Product"}
                            </Card.Text>
                            <Card.Text className="text-center">
                                ${product.price}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;
