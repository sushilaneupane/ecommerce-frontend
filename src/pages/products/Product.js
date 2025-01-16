import React, { useState, useEffect } from 'react';
import { getProductsById } from "../../api/productsApi";
import { Container, Row, Col, Breadcrumb, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link } from "react-router-dom";
import{createCart}from "../../api/cartApi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({
        quantity: "",
    })
    const navigate = useNavigate();
    



    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(productId);
                const productsData = await getProductsById(productId);
                setProduct(productsData);
            } catch (err) {
                console.log(err.message || "Something went wrong while fetching data.");
            }
        };
        fetchData();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
 const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));        

        const data = {
            ...formData,
            productId: productId,
            userId: user.id
        }
        console.log(data, token, "both")
        try {
            const response = await createCart(data, token);
            if (response) {
                toast.success("card added  sucessfully")
                // setTimeout(() => navigate("/cart"), 500);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <Container className="mt-4 mb-5">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="text-decoration-none">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
                    All Products
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{product.productName || "Product Name"}</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
                <Col md={6}>
                    <img
                        src={product.image || "/image/cardimage.jpg"} // Dynamically load image
                        alt="Product"
                        className="img-fluid border"
                    />
                </Col>
                <Col md={6}>
                    <h4>{product.productName || "Product Name"}</h4>
                    <p className="text-danger">
                        <span className="text-muted ">Rs {product.price || "0"}</span>
                    </p>

                    <Form onSubmit={handleSubmit}>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Color:</Form.Label>
                            <div>
                                <Form.Check type="radio" name="color" label="Black" defaultChecked />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3 w-50">
                            <Form.Label>Size:</Form.Label>
                            <Form.Select>
                                <option value="S">Small</option>
                                <option value="M">Medium</option>
                                <option value="L">Large</option>
                            </Form.Select>
                        </Form.Group> */}

                        <Form.Group className="mb-3 w-25">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control onChange={handleChange} name='quantity' value={formData.quantity} type="number" min="1" defaultValue="1" />
                        </Form.Group>

                        <div className="mb-3 d-flex gap-4">
                            {/* <Link to="/favourite">
                                <Button variant="success" className="d-flex align-items-center">
                                    Add to Favourites <i className="bi bi-heart ms-2" aria-hidden="true"></i>
                                </Button>
                            </Link> */}
                                <Button type='submit' variant="success" className="d-flex align-items-center">
                                    Add to Cart <i className="bi bi-cart ms-2" aria-hidden="true"></i>
                                </Button>
                        </div>

                        {/* <Link to="/buy">
                            <div className="mb-3">
                                <Button variant="danger">Buy Now</Button>
                            </div>
                        </Link> */}
                    </Form>

                    <div className="mb-3">
                        <h5>Product Info</h5>
                        <p>{product.description || "No description available."}</p>
                    </div>

                    <div>
                        <h5>Return and Refund Policy</h5>
                        <p>
                            I'm a Return and Refund policy. I'm a great place to let your customers know
                            what to do in case they are dissatisfied with their purchase.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
