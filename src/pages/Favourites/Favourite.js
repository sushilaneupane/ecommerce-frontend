import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Favourites = () => {
  const favoritesItems = [
    { id: 1, name: 'Item 1', description: 'This is a favourite item.' },
    { id: 2, name: 'Item 2', description: 'This is another favourite item.' },
  ];

  return (
    <div className="mb-5 container">
      <h2>Favourites</h2>
      <Row>
        {favoritesItems.map((product) => (
          <Col xs={12} sm={6} lg={3} className="mb-4" key={product.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                alt={product.productName || "Product Image"}
              />
              <Card.Body>
                <Card.Text className="text-center">
                  {product.productName || "Unknown Product"}
                </Card.Text>
                <Card.Text className="text-center">
                  {
                    product.price
                  }
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </div >
  );
};

export default Favourites;
