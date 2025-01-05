import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 2 },
    { id: 2, name: 'Product 2', price: 15, quantity: 1 },
  ];

  return (
    <div className='container mb-5 p-2'>
      <h4 className="my-4"> All Carts</h4>
      <Row>
        {cartItems.map((item) => (
          <Col xs={12} sm={6} lg={3} className="mb-4" key={item.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                alt={item.name || "Product Image"}
              />
              <Card.Body>
                <Card.Text className="text-center font-weight-bold">
                  {item.name || "Unknown Product"}
                </Card.Text>
                <Card.Text className="text-center text-muted">
                  item.price
                </Card.Text>
                <Card.Text className="text-center">
                  
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cart;
