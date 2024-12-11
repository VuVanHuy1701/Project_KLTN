import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
} from "reactstrap";
import "./ProductForm.css";

function InsertPage() {
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cate: "",
    img: null,
  });

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

      const response = await axios.post("http://localhost:5000/products", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setModalMessage("Product added successfully!");
    } catch (error) {
      setModalMessage("Failed to add product. Please try again.");
    } finally {
      setModal(true);
    }
  };
  
const navigate = useNavigate(); // Initialize navigate
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
                <h3>Add Product</h3>
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
                      required
                    />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-center">
                <Button color="info" type="submit">
                  Submit
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Row>
      </Container>
      <Modal toggle={closeModal} isOpen={modal}>
        <ModalBody>{modalMessage}</ModalBody>
        <Button color="link" onClick={closeModal} > 
          Close
        </Button>
      </Modal>
    </div>
  );
}

export default InsertPage;
