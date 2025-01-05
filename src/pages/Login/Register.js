import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Container className="py-5 mb-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3 p-2">
                            <Col>
                                <Form.Group controlId="validationFirstName">
                                    <Form.Label className="visually-hidden">First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name *" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your first name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="validationLastName">
                                    <Form.Label className="visually-hidden">Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name *" required />
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
                                    <Form.Control type="email" placeholder="Email *" required />
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
                                        <Form.Control type="Password" placeholder="Password *" required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3 p-2">
                            <Col>
                                <Form.Group controlId="validationPhone">
                                    <Form.Label className="visually-hidden">Phone</Form.Label>
                                    <Form.Control type="tel" placeholder="Phone (977) *" required />
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
        </Container>
    );
}

export default RegisterForm;
