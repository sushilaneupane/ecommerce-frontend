import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCategories } from "../../api/categoriesApi";
import { getProductsByCategoryId } from "../../api/productsApi";

function CategoryPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProductsByCategoryId(categoryId),
        ]);

        const selectedCategory = categoriesData.find(
          (cat) => cat.id === parseInt(categoryId)
        );

        if (!selectedCategory) {
          throw new Error("Category not found.");
        }

        setCategory(selectedCategory);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <Container className="mt-5 mb-5 text-center">
        <Spinner animation="border" />
        <p>Loading categories and products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 mb-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col xs={12} md={3} className="mb-4">
          <h5>ＢＲＯＷＳＥ ＢＹ ✨</h5>
          <ul className="list-unstyled">
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/category/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>

          <h5 className="mt-4">Filter by</h5>
          <Form>
            <Form.Group controlId="priceRange">
              <Form.Label>Price</Form.Label>
              <Form.Range min={25} max={400} />
              <div className="d-flex justify-content-between">
                <span>25.00</span>
                <span>400.00</span>
              </div>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Model</Form.Label>
              <Form.Select>
                <option>Select Model</option>
                <option>Model A</option>
                <option>Model B</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Size</Form.Label>
              <Form.Select>
                <option>Select Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>

        <Col xs={12} md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{category?.name || "All Products"}</h3>
            <span>{products.length} products</span>
            <Form.Select className="w-auto" defaultValue="Price Low to High">
              <option value="LowToHigh">Price Low to High</option>
              <option value="HighToLow">Price High to Low</option>
              <option value="AZ">Name A-Z</option>
              <option value="ZA">Name Z-A</option>
              <option value="Newest">Newest</option>
            </Form.Select>
          </div>

          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col xs={12} sm={6} lg={3} className="mb-4" key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={product.image || "/image/cardimage.jpg"}
                        alt={product.name || "Product Image"}
                      />
                      <Card.Body>
                        <Card.Text className="text-center">
                          {product.name || "Unknown Product"}
                        </Card.Text>
                        <Card.Text className="text-center">
                          {product.price}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <Col>
                <Alert variant="info" className="text-center">
                  No products available in this category.
                </Alert>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryPage;
