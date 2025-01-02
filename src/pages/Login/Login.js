
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

   
    setError("");

  
    console.log("Form submitted with: ", { username, password });
  };

  return (
    <Container className="mt-3 mb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h3 className="text-center mb-4">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

          
            <Button variant="primary" type="submit" className="w-100  justify-content center mb-3">
              Login
            </Button>
            <div className="d-flex">
           
            <span className="text-start m-4"> Dont have account? <a href="/register"> Sign Up</a></span>
            <span className=" text-end m-2"> <a href="/register"> Forget Password</a></span>
            </div>
            <div className="text-center">or</div>

          <div className="d-flex">
          <span className="w-100 mb-2">
              <i className="bi bi-google me-2"></i>Login with Google
            </span>
            <span className="w-100 ">
              <i className="bi bi-facebook me-2"></i>Login with Facebook
            </span>
          </div>
         
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
