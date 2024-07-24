import React from 'react';
import PropTypes from 'prop-types';

const ExampleCarouselImage = ({ imageUrl, altText }) => {
  const style = {
    width: '100%',
    height: '400px',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return <div style={style} aria-label={altText}></div>;
};

ExampleCarouselImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;
