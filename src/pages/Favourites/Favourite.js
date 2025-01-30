import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { getWishlistByUserId, deleteWishlist } from "../../api/wishlistApi";
import { ToastContainer, toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setError(err || "Failed to load wishlist items.");
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
      toast.success("Items remove from favourate!");
      navigate("/");
    } catch (error) {
      toast.error(error);
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
            <Col xs={10} sm={6} lg={3} className="mb-4" key={`${item.id}-${index}`}>
              <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                <Card className="h-100 small-card">
                  <Card.Img
                    variant="top"
                    src={item.imageUrl || "/image/cardimage.jpg"}
                    alt={item.productName || "Product Image"}
                    className="small-card-img"
                  />
                  <Card.Body className="p-2">
                    <Card.Text className="text-center small-text">
                      {item.productName || "Unknown Product"}
                    </Card.Text>
                    <Card.Text className="text-center small-text">RS {item.price}</Card.Text>
                  </Card.Body>
                  <button
                    variant="light"
                    size="sm"
                    className="d-flex align-items-center justify-content-center p-1 mb-2 m-2 ms-auto border-0"
                    style={{ width: "22px", height: "22px" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="fas fa-heart text-danger"></i>
                  </button>
                </Card>

              </Link>
            </Col>
          ))}
        </Row>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Favourites;
