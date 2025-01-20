// import React from 'react';
// import { Card, Button, Row, Col, Container, Table } from 'react-bootstrap';

// const Favourites = () => {
//   return (
//     <Container className="my-5">
//         <h3 className="p-4 mb-5">Shopping Cart <span>({cartItems?.length} Items)</span></h3>
//         <Table striped bordered hover>
//             <thead>
//                 <tr>
//                     <th>Item Description</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Subtotal</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {cartItems.map((item) => (
//                     <tr key={item.id}>
//                         <td>
//                             <Row className="align-items-center">
//                                 <Col md={2}>
//                                     <Image src="/image/cardimage.jpg" alt="Product" height={75} width={75} rounded />
//                                 </Col>
//                                 <Col md={10} className="p-4">
//                                     <p>{item.productName}</p>
//                                 </Col>
//                             </Row>
//                         </td>
//                         <td>
//                             <Form.Control
//                                 type="number"
//                                 value={item.quantity}
//                                 min="1"
//                                 onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
//                             />
//                         </td>
//                         <td>Rs. {item.price}</td>
//                         <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
//                         <td>
//                             <Button variant="danger"  onClick={() => handleDelete(item.id)}>
//                                 Remove
//                             </Button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//         <div className="d-flex justify-content-between w-100">
//             <h4>Total:</h4>
//             <h4 className="text-end">Rs. {calculateTotal().toFixed(2)}</h4>
//         </div>
//         <div className="mt-3 text-end">
//             <Button variant="success">Checkout</Button>
//         </div>
//         <ToastContainer />
//     </Container>
// );
// }

// export default Favourites;
