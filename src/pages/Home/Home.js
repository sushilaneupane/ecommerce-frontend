import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Spinner, Alert, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCategories } from "../../api/categoriesApi";
import { getProducts } from "../../api/productsApi";
import { toast } from "react-toastify";
import { useToast } from "../../ToastContext";
import ProductCard from "../../compoents/Product";

function  Home() {
  const [categories, setCategories] = useState([]);
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [hoveredCategory, setHoveredCategory] = useState(null);
 
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
           <Col xs={12} md={3} className="mb-4">
             <h5> ＢＲＯＷＳＥ ＢＹ ✨</h5>
             <ul className="list-unstyled">
               {categories.map((category) => (
                 <li key={category.id}>
                   <a href="/category">  <Link to={`/category/${category.id}`}>{category.name}</Link></a>
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
               <h3>All Products</h3>
               <span>{products.length} products</span>
               <Form.Select className="w-auto" defaultValue="Recommended">
                 <option value="LowToHigh">Price Low to High</option>
                 <option value="HighToLow">Price High to Low</option>
                 <option value="AZ">Name start from A-Z</option>
                 <option value="Newest">Newest</option>
                 <option value="ZA">Name Z-A</option>
               </Form.Select>
             </div>
 
             <Row>
               {products.map((product) => (
                 <Col xs={12} sm={6} lg={3} className="mb-4" key={product.id}>
                   <a href="product"><Link to={`/product/${product.id}`}>
                     <Card className="h-100">
                       <Card.Img
                         variant="top"
                         src={
                           product.images.length > 0
                             ?  `http://localhost:3001/uploads/${product.images[0].image}`
                             : "/image/cardimage.jpg"
                         }
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
                       </Card.Body>
                     </Card>
                   </Link>
                   </a>
                 </Col>
 
               ))}
             </Row>
 
           </Col>
         </Row>
       )}
     </Container>
   );
 }

export default Home;
