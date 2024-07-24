import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: ramesh.kondru77@gmail.com</p>
            <p>Phone: 9573188698</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-white me-2">
              <i className="fab fa-facebook-f"></i> facebook
            </a>
            <a href="https://twitter.com" className="text-white me-2">
              <i className="fab fa-twitter"></i> twitter
            </a>
            <a href="https://instagram.com" className="text-white me-2">
              <i className="fab fa-instagram"></i>instagram
            </a>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
