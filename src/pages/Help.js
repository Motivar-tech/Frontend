import '../App.css';
import '../assets/css/main.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import Man from '../assets/images/man.png';
import { BsChevronLeft } from "react-icons/bs";
import AppFooter from '../components/Footer.js';



export default function AppHelp() {

    return (
      <>
      <header>
      <Navbar expand="lg" className="bg-body-alt-white">
         <Container className="py-3">
           <div className="container">
              <Navbar.Brand href="/">
                <Image src={Logo} style={{maxHeight: '100px' }} className="" fluid/>
              </Navbar.Brand>
            </div>
        </Container>
      </Navbar>
      </header>

      <main>

      <Container fluid>
          <Row className="ps-md-5 text-start">
            <div className="ps-5 d-flex align-items-center">
            <Link to="/">
              <span className="shadow-sm pointer"> <BsChevronLeft  /> </span>
            </Link>
            <span className="h6 mt-2 ms-3">Request for help</span>
          </div>
        </Row>
      </Container>

      <Container fluid>
        <Row className="ps-md-5 text-start">
            <Col md={6}>
                <p className="h4 py-4 ps-4 fw-medium" >
                    Tell us about your course
                </p>
                <Form className="ps-md-4 p-sm-5">
                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control type="text" placeholder="Graphic design" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Platform</Form.Label>
                        <Form.Control type="text" placeholder="Name of the platform the course is on" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Link to Course</Form.Label>
                        <Form.Control type="url" placeholder="Graphic design" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-6 col-md-5">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Price of the Course</Form.Label>
                        <Form.Control type="number" placeholder="" />
                      </Form.Group>
                    </div>

                    <div className="col-sm-6 col-md-5">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="number" placeholder="" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label><strong>Platform login details</strong></Form.Label><br/>
                        <small className=""> *Email</small>
                        <Form.Control type="text" placeholder="" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password <small>(Edit your password on the platform to the specified format)</small></Form.Label><br/>
                        <Form.Control type="password" placeholder="Format: MotivarPay4(Add Fullname)" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Short Motivation Message</Form.Label>
                        <Form.Control as="textarea" rows={4} />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Link to any Social media</Form.Label><br/>
                        <Form.Control type="url" placeholder="" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3 align-items-center align-content-center">
                    <div className="col-sm-12">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      {['checkbox'].map((type) => (
                          <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                              inline
                              label="Private Request"
                              name="group1"
                              type={type}
                              id={`inline-${type}-1`}
                            />
                            <Form.Check
                              inline
                              label="Public Request"
                              name="group1"
                              type={type}
                              id={`inline-${type}-2`}
                            />
                            
                          </div>
                        ))}
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-12 col-md-10 d-grid">
                        <Button className="btn btn-lg btn-secondary text-white ">SUBMIT FORM</Button>
                    </div>
                  </div>


                </Form>
                

            </Col>

            <Col md={6}>
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