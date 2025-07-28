import '../App.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AppFooter from '../components/Footer.js';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import Character from '../assets/images/Character.svg';


export default function AppComing() {

      return (
        <>
        <header>
        <Navbar expand="lg" className="bg-body-alt-white">
  <Container fluid className="py-3 px-4">
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <div className="w-100 d-flex align-items-center justify-content-between" style={{ minWidth: 0 }}>
        {/* Left: About link */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Nav>
            <a
              style={{
                textDecoration: 'none',
                color: '#212529',
                fontWeight: 500,
                fontSize: "16px",
                marginLeft: 0
              }}
              href="https://medium.com/@mayorjaid/announcing-motivar-b1d13d8ef6fa"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
          </Nav>
        </div>

        {/* Center: Logo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <Navbar.Brand href="/" className="mx-auto">
            <Image src={Logo} style={{ maxHeight: '30px' }} className="logo-2" fluid />
          </Navbar.Brand>
        </div>

        {/* Right: Go Home button */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Link to="/">
            <Button className="btn btn-pry btn-lg btn-secondary text-white d-inline-flex justify-content-center align-items-center">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </header>

        <main>
        
        <Container fluid>
                <Row className=" text-center">
                   <Col className="offset-md-3 col-md-6 col-sm-12">
                       <p className="lead display-5 pt-5 px-4">
                           We are still building for you!
                        </p>
                        <h6 class="px-3 pb-2">Take our survey to join the waitlist and we will let you know immediately we are live.</h6>
                       
                       <div className="pt-2">
                            <a href="https://forms.office.com/r/XU3YRXEV2C">
                                <button className="btn btn-lg btn-secondary text-white">Take survey</button>
                            </a>
                       </div>
                                             
                    </Col>
                </Row>
                <Row className=" text-center">
                    <Col className="text-center p-5">
                        <div className="offset-md-3 col-md-6 col-sm-12 p-5">
                        <Image fluid src={Character} alt="soon"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
        <footer>
            <AppFooter />
        </footer>
        </>
    );
}