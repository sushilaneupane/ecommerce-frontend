import React, { useState, useEffect } from "react";
import { getProductsById } from "../../api/productsApi";
import { Container, Row, Col, Breadcrumb, Form, Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createCart } from "../../api/cartApi";
import { toast } from "react-toastify";
import { getWishlistByUserId, createWishlist } from "../../api/wishlistApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductImageSlider from  "../../compoents/Carousel/ProductCarousel"
import ProductCarousel from "../../compoents/Carousel/ProductCarousel";

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({
        quantity: "1",
    });
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));

        try {
            const data = {
                ...formData,
                productId: productId,
                userId: user.id,
            };

            await createCart(data, token);
            toast.success("Cart added successfully");
            navigate("/cart");
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    const handleAddToFavourites = async () => {
        try {
            const data = {
                userId: loggedInUser.id,
                productId: productId,
            };
            await createWishlist(data, token);
            toast.success("Added to favourites!");
            navigate("/favourite");
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
                   {product.images && product.images.length > 0 ? (
                    <ProductCarousel product={product}/>
                   ) : (
                     <img
                       className="img-fluid border"
                       src="/image/cardimage.jpg"
                       alt="Default Product"
                     />
                   )}
                 </Col>
               
                <Col md={6}>
                    <h4>{product.productName || "Product Name"}</h4>
                    <p className="text-danger">
                        <span className="text-muted">Rs {product.price || "0"}</span>
                    </p>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 w-25">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name="quantity"
                                value={formData.quantity}
                                type="number"
                                min="1"
                                defaultValue="1"
                            />
                        </Form.Group>

                        <div className="mb-3 d-flex gap-5">
                            <Button type="submit" variant="success" className="d-flex align-items-center">
                                Add to Cart <i className="bi bi-cart ms-2" aria-hidden="true"></i>
                            </Button>

                            <Button onClick={handleAddToFavourites} variant="light" className="d-flex align-items-center">
                                <i className="fas fa-heart"></i>
                            </Button>
                        </div>
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
