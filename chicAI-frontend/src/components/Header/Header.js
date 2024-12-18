import './Header.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { IoHeartCircleOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { useAuth } from "@clerk/clerk-react";

function Header() {

  const { signOut } = useAuth(); // Access the signOut function

  const handleLogout = async () => {
    try {
      await signOut(); // Log out the user
      window.location.href = "/"; // Redirect to homepage after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Container className='flex-column Header' fluid>
      <Nav expand="lg" className="header-content">
        <div>
          <Nav.Link className="favorites-icon" href="#favorites">
            <IoHeartCircleOutline style={{ color: 'white' }} />
          </Nav.Link>
          
          <NavDropdown className="user-icon" title={<FaUser style={{ color: 'white' }} />} id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/settings">Settings</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Nav>
    </Container>
  );
}

export default Header;
