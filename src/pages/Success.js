
/* eslint-disable */
import '../App.css';
import '../assets/css/main.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import Man from '../assets/images/man.png';
import Check from '../assets/images/check.png';
import { BsChevronLeft } from "react-icons/bs";
import AppFooter from '../components/Footer.js';



export default function AppSuccess() {

    return (
      <>
      <header>
      <Navbar expand="lg" className="bg-body-alt-white">
         <Container className="py-3">
           <div className="container">
              <Navbar.Brand href="/">
                <Image src={Logo} style={{maxHeight: '100px' }} className="logo-2 " fluid/>
              </Navbar.Brand>
            </div>
        </Container>
      </Navbar>
      </header>

      <main>

      <Container fluid>
          <Row className="ps-5 text-start">
            <div className="ps-5 d-flex align-items-center">
            <Link to="/">
              <span className="shadow-sm pointer"> <BsChevronLeft  /> </span>
            </Link>
            <span className="h6 mt-2 ms-3">Request for help</span>
          </div>
        </Row>
      </Container>

      <Container fluid>
        <Row className="p-5 text-center">
            <Col md={6} className="justify-content-center align-content-center align-items-center">
            <Image fluid src={Check} alt="check"/>
                <h1 className="mb-5">Success</h1>
                <div className="row">
                    {/* <div className="col-sm-12">
                        <Button className="btn btn-md btn-secondary text-white" type="button"><Link to="/" style={{color: 'white', textDecoration: 'none'}}>GO HOME</Link></Button>

                     </div> */}
                     <div className="col-sm-12 offset-md-2 col-md-8 d-grid">
                        <Button className="btn btn-lg btn-secondary text-white ">GO HOME</Button>
                    </div>
                </div>
            </Col>

            <Col md={6} >
                <Image fluid className="d-none d-md-block" src={Man} alt="man"/>
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