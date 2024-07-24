import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define your images array here
const images = [
  {
    url: 'images/Banner1.jpg', 
    alt: 'First slide'
  },
  {
    url: 'images/Banner2.png',  
    alt: 'Second slide'
  },
  {
    url: 'images/banner3.webp', 
    alt: 'Third slide'
  }
];

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <ExampleCarouselImage imageUrl={image.url} altText={image.alt} />
          <Carousel.Caption>
            <h3>{image.alt}</h3>
            <p>Example caption text for {image.alt.toLowerCase()}.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
