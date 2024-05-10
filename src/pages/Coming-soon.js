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
         <Container className="py-3">
           <Navbar.Brand href="/"><Image className="logo" src={Logo} style={{maxHeight: '30px' }} fluid/></Navbar.Brand>
           <Navbar.Toggle aria-controls="navbarScroll" />
           <Navbar.Collapse id="navbarScroll">
           <div className="container">
             <Nav
              className="me-auto my-2 my-lg-0"
              style={{maxHeight: '100px' }}
              navbarScroll
            >
                <a style={{textDecoration: 'none', color: '#212529'}} href="https://medium.com/@mayorjaid/announcing-motivar-b1d13d8ef6fa">About</a>
              </Nav>
              
            </div>

            <div className="container">
              <Navbar.Brand href="/">
                <Image src={Logo} style={{maxHeight: '30px' }} className="logo-2 " fluid/>
              </Navbar.Brand>
            </div>

            <div className="container d-flex justify-content-md-end">
              
              <Link to="/">
                <Button className="btn btn-pry btn-lg btn-secondary text-white me-2 d-inline-flex justify-content-center align-items-center">Go Home</Button>
              </Link>
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