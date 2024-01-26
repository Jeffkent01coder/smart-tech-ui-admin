import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [features, setFeatures] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleFeatureChange = (e) => {
    setFeatures(e.target.value);
  };

  const handleFileChange = (e) => {
    setFileList([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', category_id);
    formData.append('features', features);

    fileList.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('http://your-api-url/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
      } else {
        const data = await response.json();
        // Handle error, maybe show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, maybe show an error message
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Create Product</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter product description" onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Enter product price" onChange={(e) => setPrice(e.target.value)} />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category ID</Form.Label>
              <Form.Control type="text" placeholder="Enter category ID" onChange={(e) => setCategoryId(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="features">
              <Form.Label>Features</Form.Label>
              <Form.Control type="text" placeholder="Enter product features (comma-separated)" onChange={handleFeatureChange} />
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.File multiple onChange={handleFileChange} />
            </Form.Group>

            <Button type="submit">Create Product</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;

