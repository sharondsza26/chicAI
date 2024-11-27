import './NavigationBar.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Container className='NavigationBar flex-column'>
      <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Toggle style={{ borderColor: 'white' }} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navigation-content text-white">
            <Nav.Link as={Link} to="/home" style={{ color: 'white' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/wardrobe-management" style={{ color: 'white' }}>Wardrobe Management</Nav.Link>
            <Nav.Link as={Link} to="/laundry" style={{ color: 'white' }}>Laundry</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </Container>
  );
}

export default NavigationBar;
