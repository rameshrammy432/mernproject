import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample data array
const cardData = [
  {
    title: 'My Schooling Life',
    text: 'Experience the vibrant schooling life in a village where education meets culture. From morning assemblies to interactive classes, every day is a new adventure. Students engage in community projects, celebrate traditional festivals, and learn the value of sustainability and creativity.',
    imgUrl: 'images/school.jpg',
  },
  {
    title: 'Junior College Life',
    text: 'Discover the dynamic world of junior college where academic excellence meets extracurricular pursuits. Students prepare for higher education while participating in sports, clubs, and community service.',
    imgUrl: 'images/junior.jpg',
  },
  {
    title: 'Engineering Life',
    text: 'Dive into the rigorous and exciting life of engineering students. Balancing challenging coursework with hands-on projects, students innovate and collaborate to solve real-world problems collaborate to solve problems.',
    imgUrl: 'images/engineer.jpg',
  },
  
  {
    title: 'Postgraduate Life',
    text: 'Embark on an advanced academic journey in postgraduate studies. Students engage in specialized research, participate in academic conferences, and contribute to groundbreaking projects in their fields.',
    imgUrl: 'images/mtech.jpg',
  },
 
];

const CardGrid = () => {
  return (
    <Container className="my-4">
      <Row>
        {cardData.map((card, index) => (
          <Col xs={12} sm={6} md={3} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={card.imgUrl} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default CardGrid;
