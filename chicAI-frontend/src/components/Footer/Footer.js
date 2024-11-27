import { Container, Row, Nav } from 'react-bootstrap'
import './Footer.css'

function Footer() {
    return(
        <footer>
        <Container className='Footer' fluid>
            <Row>
            <div className="footer-content text-white">
                <div className='mx-5'>
                <h6>&copy; CtrlAltDelete </h6>
                <p>All rights reserved.</p>
                </div>

            <div className='links footer-content'>
                <Nav className="flex-column fs-9 footer-links">
                <Nav.Link href="#settings" className='text-white'>Settings </Nav.Link>
                <Nav.Link href="#" className='text-white'>Terms of Service </Nav.Link>
                <Nav.Link href="#" className='text-white'>Privacy Policy</Nav.Link>
                </Nav>
            </div>

            <div className='contact-us flex-column'>
                <h6> Contact Us! </h6>
                <p>mailus@gmail.com</p>
                <p>Phone: +1 (888)888 8888</p>
            </div>
      </div> 

      </Row>
        </Container>
        </footer>
    )
}

export default Footer