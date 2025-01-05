import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCategories } from "../../api/categoriesApi";
import { getProducts, getProductsByCategoryId } from "../../api/products"; 

function CategoryPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null); 
  const [products, setProducts] = useState([]); 
 

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
        setProducts(productsData);
      } catch (err) {
        console.log(err.message || "Something went wrong while fetching data.");
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <Container className="mt-5 mb-5">
        <>
          <h3 className="mb-4">
            {category ? `${category.name} Products` : "Products"}
          </h3>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col xs={12} sm={6} lg={3} className="mb-4" key={product.id}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.name || "Product Image"}
                    />
                    <Card.Body>
                      <Card.Text className="text-center">
                        {product.name || "Unknown Product"}
                      </Card.Text>
                      <Card.Text className="text-center">
                      {
                           product.price
                       }
                      </Card.Text>
                    </Card.Body>
                  </Card>
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
        </>
    </Container>
  );
}

export default CategoryPage;
