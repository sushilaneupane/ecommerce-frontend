import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
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
            <div className="d-flex align-items-center" onClick={handleLogout}>
              <i className="bi bi-person me-1" aria-hidden="true"></i>
              <span style={{ cursor: "pointer" }}>
                {isLoggedIn ? "Logout" : "Login"}
              </span>
            </div>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
