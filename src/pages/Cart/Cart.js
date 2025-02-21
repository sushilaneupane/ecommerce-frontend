import React, { useState, useEffect } from "react";
import { Container, Button, Image, Row, Col, Form, Card } from "react-bootstrap";
import { getCartsByUserId, updateCart, deleteCart } from "../../api/cartApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!loggedInUser?.id || !token) return;  // Prevents API call if user or token is missing

        const fetchData = async () => {
            try {
                const carts = await getCartsByUserId(loggedInUser.id, token);
                setCartItems(carts);
            } catch (err) {
                console.error("Error fetching cart items:", err.message);
                toast.error("Failed to load cart items.");
            }
        };

        fetchData();
    }, [loggedInUser?.id, token]);

    const handleUpdateCart = async (cartItemId, productId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            const updatedItem = {
                quantity: newQuantity,
                userId: loggedInUser.id,
                productId: productId
            };

            await updateCart(cartItemId, updatedItem, token);
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === cartItemId ? { ...item, quantity: newQuantity } : item
                )
            );
            toast.success("Cart updated successfully");
        } catch (error) {
            toast.error(error.message || "Failed to update cart");
        }
    };

    const handleDelete = async (cartId) => {
        try {
            await deleteCart(cartId, token);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartId));
            toast.success("Item removed from the cart!");
        } catch (err) {
            console.error("Failed to delete cart item:", err.message);
            toast.error("Failed to remove item.");
        }
    };

    const shippingCost = 50;
    const calculateTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container className="my-5">
            <Row>
                <Col md={8}>
                    <Card className="p-3">
                        <h4 className="mb-3">Shopping Cart ({cartItems.length} Items)</h4>
                        {cartItems.length === 0 ? (
                            <p className="text-center text-muted">Your cart is empty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <Card key={item.id} className="mb-3 p-3">
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Image
                                                src={item.image || "/image/cardimage.jpg"} // Use dynamic image if available
                                                alt={item.productName || "Product"}
                                                height={75}
                                                width={75}
                                                rounded
                                            />
                                        </Col>
                                        <Col md={5}>
                                            <p className="mb-1 fw-bold">{item.productName}</p>
                                        </Col>
                                        <Col md={2} className="text-center">
                                            <Form.Control
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) =>
                                                    handleUpdateCart(item.id, item.productId, parseInt(e.target.value) || 1)
                                                }
                                            />
                                        </Col>
                                        <Col md={2} className="text-end fw-bold">
                                            Rs. {item.price}
                                        </Col>
                                        <Col md={1} className="text-end">
                                            <Button variant="light" size="sm" onClick={() => handleDelete(item.id)}>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            ))
                        )}
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3">
                        <h5>Order Summary</h5>
                        <hr />
                        <Row className="mb-2">
                            <Col>Subtotal ({cartItems.length} items)</Col>
                            <Col className="text-end">Rs. {calculateTotal().toFixed(2)}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>Shipping Fee</Col>
                            <Col className="text-end">Rs. {shippingCost.toFixed(2)}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="fw-bold">Total</Col>
                            <Col className="text-end fw-bold">Rs. {(calculateTotal() + shippingCost).toFixed(2)}</Col>
                        </Row>
                        <Button
                            className="w-100 mt-3"
                            variant="success"
                            disabled={cartItems.length === 0}
                            onClick={() => navigate("/Orders")}
                        >
                            Proceed to Checkout ({cartItems.length})
                        </Button>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default ShoppingCart;
