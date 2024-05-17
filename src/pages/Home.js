/* eslint-disable */

import "../App.css";
import "../assets/css/main.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import AppNavbar from "../components/Navbar.js";
import AppFooter from "../components/Footer.js";

import Image from "react-bootstrap/Image";
import Sketch1 from "../assets/images/sketch1.png";
import Sketch2 from "../assets/images/sketch2.png";
import Pardna from "../assets/images/pardna.png";
import Faces from "../assets/images/faces.png";
import Persons from "../assets/images/persons.png";
import Stu from "../assets/images/stu.png";
import Group from "../assets/images/group.png";
import Test from "../assets/images/test.png";
import { BsArrowLeftCircle } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";

export default function AppHome() {
  // text transition starts

  // text transition end

  return (
    <>
      <header>
        {/* Nav bar */}
        <AppNavbar />
      </header>

      <main>
        {/* Hero start */}
        <Container fluid>
          <Row className="header-text text-center">
            <Col className="offset-md-2 col-md-8">
              <div>
                <p className="h1 lead display-4 fw-medium ">
                  <br />
                  <br />
                  The <em>easiest</em> way to{" "}
                  <span>
                    <TypeAnimation
                      sequence={["find", 3000, "start", 3000, "complete", 3000]}
                      speed={50}
                      repeat={Infinity}
                    />{" "}
                  </span>
                </p>
                <p className="lead display-4 fw-medium">online courses</p>
                {/* <Image className="curve img-fluid" src={Curve} alt="highlight"/> */}

                <div className="container d-block d-md-none pt-2">
                  <Link to="/user-auth">
                    <Button variant="outline-secondary" className="btn-lg me-2 d-inline-flex out-btn">Sign in</Button>
                  </Link>
                  <Link to="/coming-soon">
                    <Button className="btn btn-secondary text-white btn-lg me-2 d-inline-flex justify-content-center align-items-center">Get App</Button>
                  </Link>
                </div>

              </div>
            </Col>
          </Row>
          <Row className="text-center gx-0">
            <Col className="">
              <Image fluid src={Sketch2} alt="sketch" />
            </Col>
            <Col className="d-none d-md-block">
              <Image fluid src={Sketch1} alt="sketch" />
            </Col>
          </Row>
        </Container>
        {/* Hero end  */}

        {/* Partner start */}
        {/* <Container fluid>
          <Row className="partners">
            <Col className="col-sm-2 ">
              <h6 className="">Partners:</h6>
            </Col>
            <Col className="col-sm-2 ">
              <Image fluid src={Pardna} alt="partner" />
            </Col>
          </Row>
        </Container> */}
        {/* Partner end */}

        {/* Complete start */}
        <Container fluid>
          <Row className="p-5">
            <Col md={7}>
              <p className=" h1 pt-5 px-md-4 text-md-start fw-normal">
                <br /> <br />
                <strong>Complete online courses you need to succeed</strong>
              </p>
              <p class="h4 px-md-4 text-md-start fw-light">
                Whatever you want to learn online, wherever they are hosted. We
                will help you make the most of the journey.
              </p>
              <div className="px-4 py-4 d-flex justify-content-center justify-content-md-start align-items-center">
                <Link to="/user-auth">
                  <Button className="btn btn-lg btn-secondary text-white">
                    Get Started
                  </Button>
                </Link>
                <span className="shadow-sm pointer ms-3">
                  {" "}
                  <BsArrowLeftCircle className="spin" />{" "}
                </span>
              </div>
            </Col>
            <Col md={5}>
              <Image fluid src={Faces} alt="faces" />
            </Col>
          </Row>
        </Container>
        {/* Complete end */}

        {/* Sponsor start */}
        <Container fluid className="bg-warning">
          <Row className="p-5 text-center">
            <Col md={5}>
              <Image fluid src={Persons} alt="persons" />
            </Col>

            <Col md={7}>
              <p className=" h1 pt-5 px-md-4 text-md-start fw-normal">
                <br /> <br />
                <strong>
                  Help a learner pay for online courses they need and can't
                  afford
                </strong>
              </p>
              <p class="h4 px-4 text-md-start fw-light">
                Lots of young people want and need online courses to upskill and
                improve their knowledge, but unfortunately cannot afford them.
              </p>
              <div className="px-md-4 py-4 d-flex justify-content-center justify-content-md-start align-items-center">
                <Link to="/help-learner">
                  <Button className="btn btn-lg btn-secondary text-white">
                    Sponsor a learner
                  </Button>
                </Link>
                <span className="shadow-sm pointer ms-3">
                  {" "}
                  <BsArrowLeftCircle className="spin" />{" "}
                </span>
              </div>
            </Col>
          </Row>

          <Row className="p-5 pt-5 text-center bg-alt-secondary">
            <Col md={6}>
              <p className=" h1 pt-5 px-md-4 text-md-start fw-normal">
                <br /> <br />
                <strong>
                  Ask for help to pay for courses you need but cannot afford
                </strong>
              </p>
              <div className="px-md-4 py-4 d-flex justify-content-center justify-content-md-start align-items-center">
                <Link to="/help">
                  <Button className="btn btn-lg btn-secondary text-white">
                    Request for help
                  </Button>
                </Link>
                <span className="shadow-sm pointer ms-3">
                  {" "}
                  <BsArrowLeftCircle className="spin" />{" "}
                </span>
              </div>
            </Col>
            <Col md={6}>
              <Image fluid src={Stu} alt="persons" />
            </Col>
          </Row>
        </Container>
        {/* Sponsor end */}

        {/* Participate start */}
        <Container fluid>
          <Row className="p-5 text-center bg-dark">
            <Col md={5}>
              <Image fluid src={Group} alt="group" className="pt-4" />
            </Col>

            <Col md={7}>
              <p className=" h1 pt-5 px-md-4 text-md-start fw-normal">
                <br /> <br />
                <strong>
                  Participate in learner <br></br>communities and turbocharge
                  your learning experience
                </strong>
              </p>
              <p class="h4 px-md-4 text-md-start fw-light">
                Connect with learners like you in your location to share ideas,
                insights, challenges, and wins
              </p>

              <div className="px-4 py-4 d-flex justify-content-center justify-content-md-start align-items-center">
                <Link to="/coming-soon">
                  <Button className="btn btn-lg btn-secondary text-white">
                    Get Started
                  </Button>
                </Link>
                <span className="shadow-sm pointer ms-3">
                  {" "}
                  <BsArrowLeftCircle className="spin" />{" "}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Participate end */}

        {/* Testimonial start */}

        <Container fluid>
          <Row className="p-5 bg-info">
            <Col className="col-sm-12 col-md-6 offset-md-3 bg-light">
              <Row className="p-2 shadow-sm text-dark rounded">
                <Carousel>
                  {/* <Carousel.Item className="p-3 d-md-flex text-center">
                                    <div className="col-md-4 col-sm-12">
                                        <div class="caption">Yemi, 19</div>
                                        <Image fluid src={Test} alt="testimonial" />
                                    </div>
                                    <div className="col-md-8 col-sm-12 text-md-start mt-3 ">
                                        <div className="text-black d-sm-block">
                                           <p>
                                                "Choosing a course to learn was almost overwhelming,
                                                so many options to choose from, Motivar helped make the process seamless.
                                                I totally love the course I'm currently taking."

                                            </p>
                                        </div>
                                    </div>
                                </Carousel.Item> */}
                  <Carousel.Item>
                    <Row className="p-2 align-items-center">
                      <div className="col-md-4 text-black ">
                        <div className="container">
                          <Image fluid src={Test} alt="testimonial" />
                          <p>Yemi, 19</p>
                        </div>
                      </div>
                      <div className="col-md-8 text-black text-md-start mb-2">
                        <div className="container">
                          "Choosing a course to learn was almost overwhelming,
                          so many options to choose from, Motivar helped make
                          the process seamless. I totally love the course I'm
                          currently taking."
                        </div>
                      </div>
                    </Row>
                  </Carousel.Item>
                </Carousel>
              </Row>
            </Col>
          </Row>
        </Container>

        {/* Testimonial end */}

        {/* Newsletter start */}
        <Container fluid>
          <Row className="p-5 text-white">
            <Col className="col-sm-12 col-md-8 offset-md-2">
              <Row className="p-3 bg-success rounded">
                <Form className="p-2 d-md-flex">
                  <div className="col-md-6 col-sm-12 text-md-start">
                    <h5>
                      <strong>Get updates</strong>
                    </h5>
                    <p>
                      Not ready to start learning? Get updates of news,
                      releases, and amazing stuffs you would love
                    </p>
                  </div>
                  <div className="col-md-3 col-sm-12 pt-3">
                    <Form.Group className="" controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-3 col-sm-12 pt-3">
                    <Link to="/coming-soon">
                      <Button
                        className="btn btn-md btn-secondary text-white"
                        type="button"
                      >
                        Join newsletter
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Row>
            </Col>
          </Row>
        </Container>
        {/* Newsletter end */}
      </main>

      {/* Footer start */}

      <AppFooter />
      {/* Footer end */}
    </>
  );
}
