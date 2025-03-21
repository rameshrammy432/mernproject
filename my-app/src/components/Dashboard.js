import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <Container className="mt-5">
      <h2>Welcome to Dashboard</h2>
      <p>This is your secure area after login.</p>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
