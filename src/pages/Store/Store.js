import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Stores() {
  const storeData = [
    {
      name: "The Blues",
      address: "500 Terry Francine Street",
      city: "San Francisco, CA 94158",
      phone: "123.456.7890",
      hours: {
        weekday: "Mon-Sat: 10:00am-7:00pm",
        weekend: "Sunday: Closed",
      },
    },
    {
      name: "Mato",
      address: "500 Terry Francine Street",
      city: "San Francisco, CA 94158",
      phone: "123.456.7890",
      hours: {
        weekday: "Mon-Fri: 9:00am-6:00pm",
        weekend: "Sat-Sun: 10:00am-5:00pm",
      },
    },
    {
      name: "City Center",
      address: "500 Terry Francine Street",
      city: "San Francisco, CA 94158",
      phone: "123.456.7890",
      hours: {
        weekday: "Mon-Sat: 10:00am-7:00pm",
        weekend: "Sunday: Closed",
      },
    },
  ];

  return (
    <Container className="mt-5 mb-5">
      <h1 className="">STORES</h1>
      <p className="">Find us in these fine stores:</p>
      <hr />
      <Row className="mt-4">
        {storeData.map((store, index) => (
          <Col md={4} className="mb-4" key={index}>
            <h5>{store.name}</h5>
            <p>
              {store.address}
              <br />
              {store.city}
              <br />
              Phone: {store.phone}
            </p>
            <p>
              {store.hours.weekday}
              <br />
              {store.hours.weekend}
            </p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Stores;
