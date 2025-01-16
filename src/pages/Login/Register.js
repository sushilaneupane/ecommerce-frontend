import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUsers } from "../../api/usersApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    })

    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ...formData,
            role: "USER"
        }
        try {
            const response = await createUsers(data);
            if (response) {
                toast.success("user created ")
                setTimeout(() => navigate("/login"), 5000);
            }
        } catch (error) {
            toast.error("Failed to create. Please check your credentials or try again later.");
        }
    };



    return (
        <Container className="py-5 mb-5">
            <Row className="justify-content-center">
            {responseMessage && <Alert variant="info">{responseMessage}</Alert>}
                <Col md={6}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3 p-2">
                            <Col>
                                <Form.Group controlId="validationFirstName">
                                    <Form.Label className="visually-hidden">First Name</Form.Label>
                                    <Form.Control type="text"
                                        name="firstName"
                                        placeholder="First Name *"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your first name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="validationLastName">
                                    <Form.Label className="visually-hidden">Last Name</Form.Label>
                                    <Form.Control type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name *" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your last name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3 p-2">
                            <Col>
                                <Form.Group controlId="validationEmail">
                                    <Form.Label className="visually-hidden">Email</Form.Label>
                                    <Form.Control type="email"
                                     placeholder="Email *"
                                     name="email"
                                     value={formData.email}
                                     onChange={handleChange}
                                     required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3 p-2">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="visually-hidden">Password</Form.Label>
                                    <Form.Control type="Password"
                                        placeholder="Password *"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3 p-2">
                            <Col>
                                <Form.Group controlId="validationPhone">
                                    <Form.Label className="visually-hidden">Phone</Form.Label>
                                    <Form.Control type="tel"
                                    placeholder="Phone (977) *"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid phone number.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Button type="submit" className="w-100 primary">
                            Register
                        </Button>
                        
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default RegisterForm;
