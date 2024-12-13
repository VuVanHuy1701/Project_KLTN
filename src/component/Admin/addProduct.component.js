import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  Modal,
  ModalBody,
  Container,
  Row,
  Col,
  Label,
} from 'reactstrap';
import './Css/ProductForm.css';

function InsertPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cate: "",
    img: null,
  });

  const product = location.state ? location.state.product : null; // Get product data if available

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        cate: product.cate || "",
        img: null, // Để trống vì file upload xử lý riêng
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("cate", formData.cate);
      formDataToSubmit.append("img", formData.img);

      const response = product
        ? await axios.put(`http://localhost:5000/products/product/update/${product._id}`, formDataToSubmit, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post("http://localhost:5000/products", formDataToSubmit, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      setModalMessage(product ? "Product updated successfully!" : "Product added successfully!");
    } catch (error) {
      setModalMessage("Failed to add or update product. Please try again.");
    } finally {
      setModal(true);
    }
  };

  const closeModal = () => {
    setModal(false);
    navigate("/admin"); // Redirect to admin page
  };

  return (
    <div className="section section-signup">
      <Container>
        <Row>
          <Card className="card-signup">
            <Form onSubmit={handleSubmit} className="form">
              <CardHeader className="text-center">
                <h3>{product ? "Edit Product" : "Add Product"}</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6">
                    <Label for="name">Name:</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label for="price">Price:</Label>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label for="cate">Category:</Label>
                    <Input
                      type="text"
                      name="cate"
                      value={formData.cate}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label for="img">Image:</Label>
                    <Input
                      type="file"
                      name="img"
                      onChange={handleFileChange}
                    />
                    
                  </Col>
                  
                </Row>
                
              </CardBody>
              <CardFooter className="text-center">
                <Button color="info" type="submit">
                  {product ? "Update Product" : "Submit"}
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Row>
        {product && product.img && (
                      <div className='img-edit'>
                        <img
                          src={`http://localhost:5000/uploads/${product.img}`}
                          alt={product.name}
                         
                        />
                      </div>
                    )}
      </Container>
      <Modal toggle={closeModal} isOpen={modal}>
        <ModalBody>{modalMessage}</ModalBody>
        <Button color="link" onClick={closeModal}> 
          Close
        </Button>
      </Modal>
    </div>
  );
}

export default InsertPage;
