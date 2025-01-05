import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomerCareForm() {
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
    <Container className="py-5">
      <div className="mb-4">
        <Row className="">
          <Col xs={12} md={6} className="">
            <h4 className="fw-normal">CUSTOMER CARE</h4>
            <p className="">
              Customer Care at Mato Craft:<br />
              Join the Mato Craft family effortlessly with our Customer Registration Form! Sign up to access exclusive updates, special offers, and connect with our unique crafts. Just fill in your details, set a password, and submit the form.
              Need help? Our customer care team is always here to assist. Let's craft something beautiful together! 🌟
            </p>
          </Col>
        </Row>
        <hr />
      </div>

      <Row className="justify-content-center">
       
        <Col md={6} className="mb-4">
          <div>
            <p className="fw-bold">Have any questions or concerns?</p>
            <p>We’re always ready to help!</p>
            <p>
              Call us at: <strong>9863476766</strong>
            </p>
            <p>
              Or send us an email to: <br />
              <strong>sushilaneupane2001@gmail.com</strong>
            </p>
          </div>
        </Col>

      
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
            <Row className="mb-3 p-2">
              <Col>
                <Form.Group controlId="validationMessage">
                  <Form.Label className="visually-hidden">Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Message" />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="w-100 primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerCareForm;
