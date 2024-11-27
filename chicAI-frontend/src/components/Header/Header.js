import './Header.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { IoHeartCircleOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

function Header() {
  return (
    <Container className='flex-column Header' fluid>
      <Nav expand="lg" className="header-content">
            <Nav.Link className="favorites-icon" href="#favorites"><IoHeartCircleOutline style={{ color: 'white' }}/></Nav.Link>
            <NavDropdown className="user-icon" title={<FaUser style={{ color: 'white' }}/>} id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#action/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
  );
}

export default Header;
