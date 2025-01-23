import React, { useState, useEffect } from "react";
import { Container, Table, Button, Image, Row, Col, Form } from "react-bootstrap";
import { getCartsByUserId } from "../../api/cartApi";
import { deleteCart } from "../../api/cartApi"; 
import { ToastContainer, toast } from "react-toastify";
import { getWishlistByUserId } from "../../api/wishlistApi";

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carts = await getWishlistByUserId(loggedInUser.id, token);
                setCartItems(carts);
            } catch (err) {
                console.error(err.message || "Something went wrong while fetching data.");
                toast.error("Failed to load cart items.");
            }
        };

        fetchData();
    }, [loggedInUser.id, token]);

    const updateQuantity = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
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

    const calculateTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container className="my-5">
            <h3 className="p-4 mb-5">Shopping Cart <span>({cartItems?.length} Items)</span></h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Image src="/image/cardimage.jpg" alt="Product" height={75} width={75} rounded />
                                    </Col>
                                    <Col md={10} className="p-4">
                                        <p>{item.productName}</p>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                />
                            </td>
                            <td>Rs. {item.price}</td>
                            <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <Button variant="danger"  onClick={() => handleDelete(item.id)}>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between w-100">
                <h4>Total:</h4>
                <h4 className="text-end">Rs. {calculateTotal().toFixed(2)}</h4>
            </div>
            <div className="mt-3 text-end">
                <Button variant="success">Checkout</Button>
            </div>
            <ToastContainer />
        </Container>
    );
}

export default ShoppingCart;
