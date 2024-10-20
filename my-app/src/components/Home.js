import React from 'react';
import Container from 'react-bootstrap/Container';
import ControlledCarousel from './Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageGrid from './ImageGrid';


const Home = () => {
  return (
      <div>
        <ControlledCarousel />
        <Container>
          <br></br>
        <ImageGrid />
        </Container>
        <h1>ramesh rammy</h1>
      </div>
  );
};

export default Home;
