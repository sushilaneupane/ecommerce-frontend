import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { getWishlistByUserId, deleteWishlist } from "../../api/wishlistApi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUser = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedInUser || !token) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        const wishlist = await getWishlistByUserId(loggedInUser.id, token);
        setWishlistItems(wishlist);
      } catch (err) {
        setError(err.message || "Failed to load wishlist items.");
        toast.error("Failed to load wishlist items.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedInUser?.id, token]);

  const handleDelete = async (wishlistId) => {
    try {
      await deleteWishlist(wishlistId, token);
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== wishlistId));
      toast.success("Item removed from the wishlist!");
    } catch (err) {
      toast.error("Failed to remove item.");
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {wishlistItems.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <Row>
          {wishlistItems.map((item, index) => (
            <Col xs={12} sm={6} lg={3} className="mb-4" key={`${item.id}-${index}`}>
              <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={item.imageUrl || "/image/cardimage.jpg"}
                    alt={item.productName || "Product Image"}
                  />
                  <Card.Body>
                    <Card.Text className="text-center">
                      {item.productName || "Unknown Product"}
                    </Card.Text>
                    <Card.Text className="text-center">RS {item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              <button
                className="btn btn-danger mt-2 w-100"
                onClick={() => handleDelete(item.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </Col>
          ))}
        </Row>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Favourites;
