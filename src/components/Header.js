import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container className="d-flex justify-content-end">
        <Button
          variant="outline-dark"
          size="sm"
          onClick={handleLogout}
        >
          Logout
        </Button>

      </Container>
    </Navbar>
  );
};

export default Header;
