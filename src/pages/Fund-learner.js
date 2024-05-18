
/* eslint-disable */
import '../App.css';
import '../assets/css/main.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import { BsChevronRight } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";
import Test from '../assets/images/test.png';
import Subtract from '../assets/images/Subtract.png';
import AppFooter from '../components/Footer.js';



export default function AppFundLearner() {

    return (
      <>
      <header>
      <Navbar expand="lg" className="bg-body-alt-white">
         <Container className="py-3">
           <Navbar.Brand href="/"><Image className="" src={Logo} style={{maxHeight: '30px' }} fluid/></Navbar.Brand>
           <Navbar.Toggle aria-controls="navbarScroll"/>
           <Navbar.Collapse id="navbarScroll">


            {/* <div className="container">
              <Navbar.Brand href="/">
                <Image src={Logo} style={{maxHeight: '100px' }} className="logo-2 " fluid/>
              </Navbar.Brand>
            </div> */}

            <div className="container d-flex align-items-center justify-content-end">
            <Link to="/coming-soon" className="pe-5" style={{textDecoration: 'none', color: '#212529'}}>Explore</Link>
            <Link to="/coming-soon" className="pe-5" style={{textDecoration: 'none', color: '#212529'}}>Pricing</Link>
              <Link to="/user-auth">
                <Button variant="outline-secondary" className="btn-lg me-2 d-inline-flex out-btn">Sign in</Button>
              </Link>

            </div>


          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>

      <main>

      <div className="container-fluid bg-info" >
        <Image src={Subtract}  alt="headerImage" fluid />
        <div className="subtract">
          <p className="display-6 fw-medium">
            <TypeAnimation
            sequence={["Support a Learner", 1000, "Fund a Learner's Journey", 1000]}
            speed={50}
            repeat={Infinity}
          />
          </p>
        </div>
        {/* <div className="subtract"><p className="h1 display-4 fw-semibold">Fund a Learner's Journey</p></div> */}
      </div>

      <Container fluid>
      <Row className="p-md-5 pt-3 pb-4 text-start bg-info">
          <Col md={7} >
              <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="&#x1F50D;"
                    className="me-2 justify-content-start"
                    aria-label="Search"
                  />
                  {/* <span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span> */}

                  <Button variant="outline-success" className="d-flex text-black fw-medium">Filter <BsArrowDown className="mt-1 ms-1 " /></Button>
                </Form>
            </Col>

            <Col md={5} className="d-flex pt-3 pt-md-0 justify-content-between justify-content-md-end">
              <div className="pe-md-4">
              <Link to="/coming-soon">
                <Button variant="outline-success" className="text-black">Sponsor Randomly</Button>
              </Link>
              </div>
              <div>
              <Link to="/coming-soon">
                <Button variant="outline-success" className="text-black">Sponsor a large group</Button>
              </Link>
              </div>
            </Col>
        </Row>
      </Container>

      <Container fluid>

        <Row className="px-md-5 pt-5 text-start justify-content-between bg-info pb-4 ">
          <Col className="col-md-6 col-sm-12">
            <Card className="bg-info">
              {/* <Card.Img variant="top" src="../assets/images/test.png" /> */}
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between">
                    <Image src={Test}  alt="image"/>
                      <span className="shadow-sm pointer ms-3"> $70</span>
                  </div>
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Body>
                      <Card.Title className="h4">Michael Yewande</Card.Title>
                      <Card.Text className="h5 fw-normal">
                      Web development - Alt School Africa
                      </Card.Text>
                    </Card.Body>
                      <span className="shadow-sm pointer "> <BsChevronRight /> </span>
                    </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col className="col-md-6 col-sm-12">
            <Card className="bg-info">
              {/* <Card.Img variant="top" src="../assets/images/test.png" /> */}
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between">
                    <Image src={Test}  alt="image"/>
                      <span className="shadow-sm pointer ms-3"> $70</span>
                  </div>
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Body>
                      <Card.Title className="h4">Michael Yewande</Card.Title>
                      <Card.Text className="h5 fw-normal">
                      Web development - Alt School Africa
                      </Card.Text>
                    </Card.Body>
                      <span className="shadow-sm pointer "> <BsChevronRight /> </span>
                    </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="px-md-5 text-start justify-content-between bg-info pb-4 ">
          <Col className="col-md-6 col-sm-12">
            <Card className="bg-info">
              {/* <Card.Img variant="top" src="../assets/images/test.png" /> */}
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between">
                    <Image src={Test}  alt="image"/>
                      <span className="shadow-sm pointer ms-3"> $70</span>
                  </div>
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Body>
                      <Card.Title className="h4">Michael Yewande</Card.Title>
                      <Card.Text className="h5 fw-normal">
                      Web development - Alt School Africa
                      </Card.Text>
                    </Card.Body>
                      <span className="shadow-sm pointer "> <BsChevronRight /> </span>
                    </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col className="col-md-6 col-sm-12">
            <Card className="bg-info">
              {/* <Card.Img variant="top" src="../assets/images/test.png" /> */}
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between">
                    <Image src={Test}  alt="image"/>
                      <span className="shadow-sm pointer ms-3"> $70</span>
                  </div>
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Body>
                      <Card.Title className="h4">Michael Yewande</Card.Title>
                      <Card.Text className="h5 fw-normal">
                      Web development - Alt School Africa
                      </Card.Text>
                    </Card.Body>
                      <span className="shadow-sm pointer "> <BsChevronRight /> </span>
                    </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="px-md-5 text-start justify-content-between bg-info pb-4 ">
          <Col className="col-md-6 col-sm-12">
            <Card className="bg-info">
              {/* <Card.Img variant="top" src="../assets/images/test.png" /> */}
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between">
                    <Image src={Test}  alt="image"/>
                      <span className="shadow-sm pointer ms-3"> $70</span>
                  </div>
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Body>
                      <Card.Title className="h4">Michael Yewande</Card.Title>
                      <Card.Text className="h5 fw-normal">
                      Web development - Alt School Africa
                      </Card.Text>
                    </Card.Body>
                      <span className="shadow-sm pointer "> <BsChevronRight /> </span>
                    </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col className="col-md-6 col-sm-12">
            <Card className="bg-info">
              {/* <Card.Img variant="top" src="../assets/images/test.png" /> */}
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between">
                    <Image src={Test}  alt="image"/>
                      <span className="shadow-sm pointer ms-3"> $70</span>
                  </div>
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={12} >
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Body>
                      <Card.Title className="h4">Michael Yewande</Card.Title>
                      <Card.Text className="h5 fw-normal">
                      Web development - Alt School Africa
                      </Card.Text>
                    </Card.Body>
                      <span className="shadow-sm pointer "> <BsChevronRight /> </span>
                    </div>
                </Col>
              </Row>
            </Card>
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
