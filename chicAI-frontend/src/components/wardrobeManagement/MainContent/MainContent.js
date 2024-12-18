import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';
import { Container, Row, Col, Card, Modal, Button, Form, Stack, Spinner } from 'react-bootstrap';
import axios from 'axios';


const API_BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

function MainContent({ userId }) {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    tags: '',
    color: '',
    pattern: '',
    style: '',
    image: null,
  });

  // Fetch data from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/outfits/wardrobe?userId=${userId}`) // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        setWardrobeItems(data); // Store the fetched wardrobe items in state
      })
      .catch((error) => console.error('Error fetching wardrobe items:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.tags || !formData.image) {
      alert('Name, Type, Tags, and Image are required fields.');
      return;
    }
    setLoading(true);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('type', formData.type);
    payload.append('tags', formData.tags);
    payload.append('color', formData.color);
    payload.append('pattern', formData.pattern);
    payload.append('style', formData.style);
    payload.append('userId', userId);

    if (formData.image) {
      payload.append('image', formData.image);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/wardrobe/add`, payload);
      const newItem = {
        ...formData,
        _id: response.data.itemId,
        imageUrl: response.data.imageUrl,
      };

      setWardrobeItems([...wardrobeItems, { ...newItem, tags: Array.isArray(formData.tags) ? formData.tags : formData.tags.split(',').map(tag => tag.trim()) }]);
      setShowModal(false);
      setFormData({ name: '', type: '', tags: '', color: '', pattern: '', style: '', image: null });
    } catch (error) {
      console.error('Error adding wardrobe item:', error);
    } finally {
      setLoading(false);
    }
  };
  // Group wardrobe items by type
  const groupedItems = wardrobeItems.reduce((acc, item) => {
    const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});


  return (
    <Container className="wardrobe-management-content" fluid>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Add New Wardrobe Item
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Wardrobe Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="type" className="mt-2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="tags" className="mt-2">
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="mt-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="color" className="mt-2">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" name="color" value={formData.color} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="pattern" className="mt-2">
              <Form.Label>Pattern</Form.Label>
              <Form.Control
                type="text"
                name="pattern"
                value={formData.pattern}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="style" className="mt-2">
              <Form.Label>Style</Form.Label>
              <Form.Control type="text" name="style" value={formData.style} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Add Item'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Stack gap={3} className="wardrobe-management-content-stack">
        {/* Iterate over grouped items */}
        {Object.keys(groupedItems).map((type) => (
          <div key={type} className="p-2">
            {type} {/* Display item type as header */}

            {/* Horizontal Grid for each type */}
            <Row className="wardrobe-items-row" xs={1} sm={2} md={3} lg={4} xl={5} gap={3}>
              {/* Render the items of the current type */}
              {groupedItems[type].map((item) => (
                <Col key={item._id} className="wardrobe-item-col">
                  <Card className="wardrobe-management-card">
                    <Link
                      to="/details"
                      state={{
                        item: item.name,
                        img: `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${item._id}.jpg`,
                        _id: item._id,
                        tags: item.tags || [],
                        style: item.style,
                        color: item.color,
                        pattern: item.pattern,
                        laundryStatus: item.laundryStatus,
                      }}
                    >
                      <Card.Img variant="top" src={`https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${item._id}.jpg` || '/dummy-sweater.png'} />
                      <Card.Body>
                        <Card.Text>{item.name}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Stack>
    </Container>
  );
}

export default MainContent;