import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light border-top py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">About Us</h5>
            <p>
            PurelyPick is one of the best modern-generation e-commerce platforms, offering a wide range of products to meet every need. Established in 2024 by Sushila Neupane, PurelyPick is renowned for its customer-friendly approach and seamless shopping experience. With a commitment to quality and convenience, PurelyPick has become a trusted destination for shoppers looking for variety and value.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#shop" className="text-decoration-none text-dark">
                  Shop
                </a>
              </li>
              <li>
                <a href="#customer-care" className="text-decoration-none text-dark">
                  Customer Care
                </a>
              </li>
              <li>
                <a href="#store" className="text-decoration-none text-dark">
                  Store
                </a>
              </li>
              <li>
                <a href="#sale" className="text-decoration-none text-dark">
                  Sale
                </a>
              </li>
              <li>
                <a href="#makeup-products" className="text-decoration-none text-dark">
                  Makeup Products
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold">Contact Us</h5>
            <p>Email: PurelyPick2024@example.com</p>
            <p>Phone: 9863476766</p>
            <h5 className="fw-bold">Follow Us</h5>
            <div>
              <a
                href="#facebook"
                className="text-decoration-none me-3 text-dark"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#instagram"
                className="text-decoration-none me-3 text-dark"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="#twitter"
                className="text-decoration-none text-dark"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p className="mb-0">&copy; 2024 PurelyPick. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
