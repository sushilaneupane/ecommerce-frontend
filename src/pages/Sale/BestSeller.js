import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCategories } from "../../api/categoriesApi";
import { getProducts } from "../../api/productsApi";

function BestSeller() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(categoriesData);
        setProducts(productsData.data);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Row>
          <Col lg={3} md={4} className="border-end">
                   <h5> ＢＲＯＷＳＥ ＢＹ ✨</h5>
                   <ul className="list-unstyled">
                     <li>
                       <a href="./products">All Products</a>
                     </li>
                     <li>
                       <a href="./sale">Sale</a>
                     </li>

                   </ul>
                   <hr />
                   <h5>Filter By</h5>
                   <Form>
                     <Form.Label>Price</Form.Label>
                     <Form.Range />
                     <div className="d-flex justify-content-between">
                       <span>$11.99</span>
                       <span>$19.99</span>
                     </div>
                   </Form>
                 </Col>

          <Col xs={12} md={9}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Best Seller</h3>
              <span>{products.length} products</span>
              <Form.Select className="w-auto" defaultValue="Recommended">
              <option> Recommended</option>
                <option>Newest</option>
                <option>Price (High to Low)</option>
                <option>Price (High to Low)</option>
                <option>Name A-Z</option>
                <option>Name Z-A</option>
              </Form.Select>
            </div>

            <Row>
              {products.map((product) => (
                <Col xs={12} sm={6} lg={3} className="mb-4" key={product.id}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/150"
                      alt={product.productName || "Product Image"}
                    />
                    <Card.Body>
                      <Card.Text className="text-center">
                        {product.productName || "Unknown Product"}
                      </Card.Text>
                      <Card.Text className="text-center">
                        {
                           product.price
                        }
                      </Card.Text>
                      <span className="badge bg-danger text-white">Best Seller</span>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BestSeller;
