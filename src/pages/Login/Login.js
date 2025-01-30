import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginUser } from "../../api/usersApi";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await LoginUser(loginData);
      if (response.status === 200) {
        const token = response.data.data.token;
        const user = response.data.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(response.data.message); 
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!"); 
    }
  };
  return (
    <Container className="py-5 mb-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3 p-2">
              <Col>
                <Form.Group controlId="validationEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 p-2">
              <Col>
                <Form.Group controlId="validationPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password *"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="w-100 primary">
              Login
            </Button>
            <div className="p-3">
              Don't have an account? <a href="/register">Sign Up</a>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default LoginForm;
