import '../App.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';

export default function AppNavbar() {
    return (
      <>
     
       <Navbar expand="lg" className="bg-body-alt-white">
         <Container className="py-3">
           <Navbar.Brand href="/"><Image className="logo" src={Logo} style={{maxHeight: '30px' }} fluid/></Navbar.Brand>
           <Navbar.Toggle aria-controls="navbarScroll"/>
           <Navbar.Collapse id="navbarScroll">
           <div className="container">
             <Nav
              className="me-auto my-2 my-lg-0"
              style={{maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/coming-soon">Explore</Nav.Link>
              <Nav.Link href="/coming-soon">Pricing</Nav.Link>
              <NavDropdown title="Community" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/coming-soon">Find learners near you</NavDropdown.Item>
                <NavDropdown.Item href="/coming-soon">
                Find mentors near you
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/coming-soon">
                Join accountability group
                </NavDropdown.Item>
              </NavDropdown>
              {/* <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
            </div>

            <div className="container">
              <Navbar.Brand href="/">
                <Image src={Logo} style={{maxHeight: '100px' }} className="logo-2 " fluid/>
              </Navbar.Brand>
            </div>

            <div className="container d-none d-md-block">
              <Link to="/user-auth">
                <Button variant="outline-secondary" className="btn-lg me-2 d-inline-flex out-btn">Sign in</Button>
              </Link>
              <Link to="/coming-soon">
                <Button className="btn btn-secondary text-white btn-lg me-2 d-inline-flex justify-content-center align-items-center">Get App</Button>
              </Link>
            </div>
              
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
  }
  