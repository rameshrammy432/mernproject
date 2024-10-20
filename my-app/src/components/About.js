// src/components/About.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import CardGrid from './CardGrid';

const About = () => {
  return (
    <Container>
    <div>
      <h2>About Page</h2>
      <p>Learn more about us on this page.</p>
      <CardGrid />
    </div>
</Container>
  );
};
export default About;
