import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

function Menu() {
  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" className="shadow-sm py-2 border-bottom">
        <Container fluid>
          <Navbar.Brand href="/" className="fw-bold">
            ✧･ﾟMato Craft✧
          </Navbar.Brand>
          <Form className="d-flex w-50 w-md-50 my-2 my-md-0">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary" aria-label="Search">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
          <Nav className="d-none d-md-flex">
            <Nav.Link href="/Login" className="d-flex align-items-center">
              <i className="bi bi-person me-1" aria-hidden="true"></i>
              <span>Log In</span>
            </Nav.Link>
            <Nav.Link href="/favourite" className="d-flex align-items-center">
              <i className="bi bi-heart me-1" aria-hidden="true"></i>
              <span>Favorites</span>
            </Nav.Link>
            <Nav.Link href="/cart" className="d-flex align-items-center">
              <i className="bi bi-cart me-1" aria-hidden="true"></i>
              <span>Cart</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="lg" className="py-2">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products">AllShop</Nav.Link>
              <Nav.Link href="/contact-us">Customer Care</Nav.Link>
              <Nav.Link href="/Store">Store</Nav.Link>
              <NavDropdown title="Makeup Products" id="basic-nav-dropdown">
                {[
                  { href: "#skincare", label: "Skincare Products" },
                  { href: "#lipsticks", label: "Lipsticks" },
                  { href: "#foundations", label: "Foundations" },
                  { href: "#eyeshadow", label: "Eyeshadow" },
                ].map((item, index) => (
                  <NavDropdown.Item key={index} href={item.href}>
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Nav className="d-flex d-md-none mt-3">
              <Nav.Link href="/Login" className="d-flex align-items-center">
                <i className="bi bi-person me-1" aria-hidden="true"></i>
                <span>Log In</span>
              </Nav.Link>
              <Nav.Link href="#favorites" className="d-flex align-items-center">
                <i className="bi bi-heart me-1" aria-hidden="true"></i>
                <span>Favorites</span>
              </Nav.Link>
              <Nav.Link href="#cart" className="d-flex align-items-center">
                <i className="bi bi-cart me-1" aria-hidden="true"></i>
                <span>Cart</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
