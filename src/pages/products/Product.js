import React from 'react';
import { Container, Row, Col, Breadcrumb, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = () => {
    return (
        <Container className="mt-4 mb-5">
            <Breadcrumb>
                <Breadcrumb.Item href="/" className="text-decoration-none">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="products">All Products</Breadcrumb.Item>
                <Breadcrumb.Item active>Product Name</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
                <Col md={6}>
                    <img
                        src="./src/image/cardimage.jpg"
                        alt="Product"
                        className="img-fluid border"
                    />
                </Col>
                <Col md={6}>
                    <h4>Product Name</h4>
                    <p className="text-danger">
                        <span className="text-muted ">Rs 500</span>
                    </p>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Color:</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    name="color"
                                    label="Black"
                                    defaultChecked
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3 w-50">
                            <Form.Label>Size:</Form.Label>
                            <Form.Select>
                                <option value="S">Small</option>
                                <option value="M">Medium</option>
                                <option value="L">Large</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 w-25">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number" min="1" defaultValue="1" />
                        </Form.Group>

                        <div className="mb-3 d-flex gap-4">
                            <a href="/favourite">
                                <Button variant="success" className="d-flex align-items-center">
                                    Add to Favourites <i className="bi bi-heart ms-2" aria-hidden="true"></i>
                                </Button>
                            </a>
                            <a href="/cart">
                                <Button variant="success" className="d-flex align-items-center">
                                    Add to Cart <i className="bi bi-cart ms-2" aria-hidden="true"></i>
                                </Button>
                            </a>
                        </div>


                        <a href='/buy'>
                            <div className="mb-3">
                                <Button variant="danger">Buy Now</Button>
                            </div>
                        </a>
                    </Form>

                    <div className="mb-3">
                        <h5>Product Info</h5>
                        <p>
                            I'm a product detail. I'm a great place to add more information about your
                            product such as sizing, material, care, and cleaning instructions.
                        </p>
                    </div>

                    <div>
                        <h5>Return and Refund Policy</h5>
                        <p>
                            I'm a Return and Refund policy. I'm a great place to let your customers know
                            what to do in case they are dissatisfied with their purchase.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
