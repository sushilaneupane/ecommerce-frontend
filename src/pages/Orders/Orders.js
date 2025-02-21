import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { getAddressByUserId } from "../../api/addressApi";
import { toast } from "react-toastify";
import { createAddress } from "../../api/addressApi";

const CheckoutPage = () => {
  const [addressFound, setAddressFound] = useState();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    zone: "",
    address: "",
  });

  
    const provincesWithDistricts = {
      Koshi: ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"],
      Madhesh: ["Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", "Saptari", "Sarlahi", "Siraha"],
      Bagmati: ["Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kathmandu", "Kavrepalanchok", "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"],
      Gandaki: ["Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun"],
      Lumbini: ["Arghakhanchi", "Banke", "Bardiya", "Dang", "Gulmi", "Kapilvastu", "Parasi", "Palpa", "Pyuthan", "Rolpa", "Rukum East", "Rupandehi"],
      Karnali: ["Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu", "Rukum West", "Salyan", "Surkhet"],
      Sudurpashchim: ["Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", "Darchula", "Doti", "Kailali", "Kanchanpur"]
    };
  
    const [selectedProvince, setSelectedProvince] = useState(formData.province || "");
  
    const handleProvinceChange = (e) => {
      const { value } = e.target;
      setSelectedProvince(value);
      setFormData((prevData) => ({
        ...prevData,
        province: value,
        district: "" 
      }));
    };

  useEffect(() => {
    if (!loggedInUser?.id || !token) return;

    const fetchData = async () => {
      try {
        const carts = await getAddressByUserId(loggedInUser.id, token);
        if (carts) {
          setAddressFound(carts);
        }
      } catch (err) {
        console.error("Error fetching address:", err.message);
      }
    };

    fetchData();
  }, [loggedInUser?.id, token]);

  const products = [
    {
      id: 1,
      name: "Electric Hot Water",
      price: 282,
      quantity: 2,
      imageUrl: "https://via.placeholder.com/100x100",
    },
    {
      id: 2,
      name: "Reusable Gel Ice Pack",
      price: 200,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100x100",
    },
  ];

  const totalQuantity = products.reduce((acc, item) => acc + item.quantity, 0);
  const itemsTotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const grandTotal = itemsTotal + deliveryFee;

  const handleEditAddress = () => {
    setAddressFound(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!loggedInUser || !loggedInUser.id) {
      toast.error("User is not logged in.");
      return;
    }
  
    try {
      const data = { ...formData,
         userId: loggedInUser.id 
        };
      const response = await createAddress(data, token);
  
      if (response) {
        setAddressFound(true);
        toast.success("User address saved!");
      }
    } catch (error) {
      toast.error("Failed to save. Please check your credentials or try again later.");
    }
  };
  
  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          {addressFound ? (
            <>
              <Card className="p-4 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Shipping Address</h4>
                  <Button variant="link" onClick={handleEditAddress}>
                    Edit
                  </Button>
                </div>
                <hr />
                <p>
                  <strong>Name:</strong> {addressFound.firstName}
                </p>
                <p>
                  <strong>Address:</strong> {addressFound.fullAddress}
                </p>
                <p>
                  <strong>Province:</strong> {addressFound.province}
                </p>
                <p>
                  <strong>District:</strong> {addressFound.district}
                </p>
                <p>
                  <strong>Phone:</strong> {addressFound.phone}
                </p>
              </Card>

              {products.map((product) => (
                <Card className="p-4 mb-3" key={product.id}>
                  <Row>
                    <Col md={2}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={10}>
                      <h6 className="mb-1">{product.name}</h6>
                      <p className="mb-1">
                        Rs. {product.price}{" "}
                      </p>
                      <p className="mb-0">Qty: {product.quantity}</p>
                    </Col>
                  </Row>
                </Card>
              ))}
            </>
          ) : (
            <Card className="p-4">
              <h4>Delivery Information</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="p-3">
                    <Form.Group controlId="validationProvince">
                      <Form.Label>Province</Form.Label>
                      <Form.Select
                        name="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        required
                      >
                        <option value="">Select Province *</option>
                        {Object.keys(provincesWithDistricts).map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please provide your province.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row>
                  <Col md={6} className="p-3">
                    <Form.Group controlId="validationDistrict">
                      <Form.Label>District</Form.Label>
                      <Form.Select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        disabled={!selectedProvince} // Disable if no province is selected
                      >
                        <option value="">Select district *</option>
                        {selectedProvince &&
                          provincesWithDistricts[selectedProvince].map((district, index) => (
                            <option key={index} value={district}>
                              {district}
                            </option>
                          ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please provide your district.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zone</Form.Label>
                      <Form.Control type="text"
                        name="zone"
                        placeholder="Zone *"
                        value={formData.zone}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your Zone.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text"
                        name="address"
                        placeholder="Address *"
                        value={formData.address}
                        onChange={handleChange}
                        required />
                      <Form.Control.Feedback type="invalid">
                        Please provide your address.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card>
          )}
        </Col>

        <Col md={4}>
          <Card className="p-4">
            <h6>Invoice and Contact Info</h6>
            <Button variant="link" className="p-0">
              Edit
            </Button>
            <hr />
            <h5>Order Summary</h5>
            <p>
              Items Total ({totalQuantity} Item{totalQuantity > 1 ? "s" : ""}):{" "}
              <strong>Rs. {itemsTotal}</strong>
            </p>
            <p>
              Delivery Fee: <strong>Rs. {deliveryFee}</strong>
            </p>
            <h5>
              Total: <strong className="text-danger">Rs. {grandTotal}</strong>
            </h5>
            <p>All taxes included</p>
            <Button variant="secondary" className="w-100" disabled>
              Proceed to Pay
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default CheckoutPage;
