import '../App.css';
import '../assets/css/main.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import Headphone from '../assets/images/headphone.png';
import Snapback from '../assets/images/snapback.png';
import AppFooter from '../components/Footer.js';



export default function AppAuth() {

  const [tabIndex, setTabIndex] = useState(1);

    return (
      <>
      {
            tabIndex === 1 && (
              <main>

              <Container fluid>
                <Row className="text-start">
        
                    <Col md={6} >
                        <Image fluid className="d-none d-md-block" src={Headphone} alt="man"/>
                    </Col>
        
                    <Col md={6} className="align-content-center p-sm-5">
                      
                        <div className="row mb-5 pb-5">
                            <Image src={Logo} style={{maxHeight: '50px' }}  fluid/>
                        </div>
        
                        <div className="row mb-5 mt-5 pt-5 justify-content-center">
                          <div className="col-sm-6 col-md-5 d-grid">
                              <Button className="btn btn-lg btn-success text-white " onClick={() => setTabIndex(1)}>Sign in</Button>
                          </div>
                          <div className="col-sm-6 col-md-5 d-grid">
                              <Button variant="outline-success" className="btn btn-lg" onClick={() => setTabIndex(2)}>Sign up</Button>
                          </div>
                        </div>
                        
                        <Form>
                          
                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-12 col-md-10">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Email/Username </Form.Label>
                                <Form.Control type="text" placeholder="" />
                              </Form.Group>
                            </div>
                          </div>
        
                          <div className="row mb-5 justify-content-center">
                            <div className="col-sm-12 col-md-10">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password </Form.Label>
                                <Form.Control type="password" placeholder="" />
                              </Form.Group>
                            </div>
                          </div>
        
                         
                          <div className="row mb-3 mt-5 justify-content-center">
                            <div className="col-sm-12 col-md-10 d-grid">
                                <Button className="btn btn-lg btn-secondary text-white ">Sign in</Button>
                            </div>
                          </div>
        
                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-12 col-md-10 d-grid">
                                <Button className="btn btn-lg btn-secondary text-white ">Sign in with</Button>
                            </div>
                          </div>
        
        
                        </Form>
                        
        
                    </Col>
        
                    
                </Row>
              </Container>
              
              </main>
            )
        }

{/* Sign up tab */}
        
        {
            tabIndex === 2 && (
              <main>

              <Container fluid>
                <Row className="text-start">
        
                    <Col md={6} >
                        <Image fluid className="d-none d-md-block" src={Snapback} alt="man"/>
                    </Col>
        
                    <Col md={6} className="align-content-center p-sm-5">
                      
                        <div className="row mb-5 pb-5">
                            <Image src={Logo} style={{maxHeight: '50px' }}  fluid/>
                        </div>
        
                        <div className="row mb-5 mt-5 pt-5 justify-content-center">
                          <div className="col-sm-6 col-md-5 d-grid">
                              <Button variant="outline-success" className="btn btn-lg"  onClick={() => setTabIndex(1)}>Sign in</Button>
                          </div>
                          <div className="col-sm-6 col-md-5 d-grid">
                              <Button className="btn btn-lg btn-success text-white " onClick={() => setTabIndex(2)}>Sign up</Button>
                          </div>
                        </div>
                        
                        <Form>
                          
                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-6 col-md-5">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>First Name </Form.Label>
                                <Form.Control type="text" placeholder="Gabriel" />
                              </Form.Group>
                            </div>

                            <div className="col-sm-6 col-md-5">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Last Name </Form.Label>
                                <Form.Control type="text" placeholder="Olusesan" />
                              </Form.Group>
                            </div>
                          </div>

                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-4 col-md-3">
                            <Form.Label>Gender </Form.Label>
                            <Form.Select aria-label="Default select example">
                              <option>-- select --</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </Form.Select>
                            </div>

                            <div className="col-sm-8 col-md-7">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Email Address</Form.Label>
                                <Form.Control type="text" placeholder="patricksean@gmail.com" />
                              </Form.Group>
                            </div>
                          </div>

                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-5 col-md-4">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Date of birth </Form.Label>
                                <Form.Control type="date" placeholder="" />
                              </Form.Group>
                            </div>

                            <div className="col-sm-7 col-md-6">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label className="text-white">xx </Form.Label>
                                <Form.Control type="text" placeholder="" />
                              </Form.Group>
                            </div>
                          </div>


                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-4 col-md-3">
                            <Form.Label>Country </Form.Label>
                            <Form.Select aria-label="Default select example">
                              <option>-- select --</option>
                              <option value="">Nigeria</option>
                              <option value="">Gambia</option>
                            </Form.Select>
                            </div>

                            <div className="col-sm-8 col-md-7">
                            <Form.Label>What is your Goal </Form.Label>
                            <Form.Select aria-label="Default select example">
                              <option>-- select --</option>
                              <option value="">Goal</option>
                              <option value="">Goal II</option>
                            </Form.Select>
                            </div>
                          </div>

                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-12 col-md-10">
                              <p>By clicking 'Submit', I acknowledge and understand
                                 that my personal information may be collected and used as 
                                 described in Motivar's privacy policy
                              </p>
                            </div>
                          </div>
                          
                          <div className="row mb-3 mt-5 justify-content-center">
                            <div className="col-sm-12 col-md-10 d-grid">
                                <Button className="btn btn-lg btn-secondary text-white ">Sign in</Button>
                            </div>
                          </div>
        
                         
        
        
                        </Form>
                        
        
                    </Col>
        
                    
                </Row>
              </Container>
              
              </main>
            )
        }
      



      <footer>
          <AppFooter />
      </footer>
      </>
  );
}