// src/components/Navbar.js
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand> */}
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>

        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
