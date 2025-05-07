import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setError("⚠️ No authentication token found. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, 
        });

        setUser(response.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err.response?.data || err.message);
        setError(err.response?.data?.error || "⚠️ Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading profile...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <Alert variant="danger">{error}</Alert>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      ) : (
        <Card className="text-center p-4 shadow-sm">
          <Card.Body>
            <h2 className="mb-3">👤 User Profile</h2>
            <p><strong>🆔 Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>📧 Email:</strong> {user?.email}</p>
            <p><strong>📅 Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
            <Button variant="danger" onClick={handleLogout}>🚪 Logout</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Profile;
