import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';

export default function AppHeader() {
    return (

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="p-3">
          <Navbar.Brand href="#"><Image className="logo" src={Logo} fluid/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Explore</Nav.Link>
              <Nav.Link href="#action2">Pricing</Nav.Link>
              <NavDropdown title="Community" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Find learners near you</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                Find mentors near you
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                Join accountability group
                </NavDropdown.Item>
              </NavDropdown>
              {/* <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
            <Image src={Logo} style={{
                marginRight: '250px'
            }} className="logo-2" fluid/>
            <Button variant="outline-primary" className="btn btn-lg me-2 d-inline-flex 
            justify-content-center align-items-center" 
            
                >Sign in</Button>
            <Button className="btn btn-lg btn-secondary me-2 d-inline-flex justify-content-center align-items-center">Get App</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  