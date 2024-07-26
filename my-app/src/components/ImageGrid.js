import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Make sure to import your CSS file

// Sample images array
const images = [
  { url: 'images/image1.jpg', alt: 'Image 1' },
  { url: 'images/image2.jpg', alt: 'Image 2' },
  { url: 'images/image3.jpg', alt: 'Image 3' },
  { url: 'images/image4.jpg', alt: 'Image 4' },
  { url: 'images/image5.jpg', alt: 'Image 5' },
  { url: 'images/image6.jpg', alt: 'Image 6' },
];

const ImageGrid = () => {
  return (
    <Container>
      <Row>
        {images.map((image, index) => (
          <Col xs={12} sm={6} md={4} key={index} className="mb-4">
            <img src={image.url} alt={image.alt} className="img-fluid rounded-img" style={{ maxWidth: '350px' }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageGrid;
