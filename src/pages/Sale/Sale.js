import React from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SalePage() {
  return (
    <Container className="mt-5">
     
      <Row>
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Sale
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

  
      <Row>
        <Col lg={3} md={4} className="border-end">
          <h5> ＢＲＯＷＳＥ ＢＹ ✨</h5>
          <ul className="list-unstyled">
            <li>
              <a href="./products">All Products</a>
            </li>
            <li>
              <a href="./bestSeller">Best Sellers</a>
            </li>
          </ul>
          <hr />
          <h5>Filter By</h5>
          <Form>
            <Form.Label>Price</Form.Label>
            <Form.Range />
            <div className="d-flex justify-content-between">
              <span>$11.99</span>
              <span>$19.99</span>
            </div>
          </Form>
        </Col>

        <Col lg={9} md={8}>
          <Row className="justify-content-between align-items-center mb-4">
            <Col>
              <h5>Sale</h5>
              <span>6 products</span>
            </Col>
            <Col className="text-end">
              <Form.Select size="sm" className="w-auto d-inline">
                <option> Recommended</option>
                <option>Newest</option>
                <option>Price (High to Low)</option>
                <option>Price (High to Low)</option>
                <option>Name A-Z</option>
                <option>Name Z-A</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Col lg={4} md={6} sm={12} className="mb-4" key={idx}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/200"
                    alt="Product"
                  />
                  <Card.Body>
                    <Card.Title>Product Name</Card.Title>
                    <Card.Text>$19.99</Card.Text>
                  </Card.Body>
                  <div className="position-absolute top-0 start-0 bg-info text-white p-1">
                    Sale
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SalePage;
