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
import Pardna from "../assets/images/padna.svg";
import Padna from "../assets/images/pardna.svg";
import Faces from "../assets/images/faces.svg";
import Persons from "../assets/images/persons.svg";
import Stu from "../assets/images/stu.png";
import Group from "../assets/images/group.png";
import Test from "../assets/images/test.png";
import { BsArrowLeftCircle } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";

import styled from "styled-components";
import { StyledImage } from "../components/images.js";
import Accordion from "../components/accordion/accordion.js";

let token = localStorage.getItem("motivar-token");

export default function AppHome() {
  const HeadText = styled.div`
    width: 65%;
    margin: auto;
    font-weight: 900;
    font-size: 3.5rem;
    padding: 30px 0px 30px 0px;

    @media (max-width: 900px) {
      width: 85%;
      font-size: 2rem;
    }
  `;

  const BackgroundWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 50vh;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${Sketch1});
      background-size: center;
      background-position: center;
      opacity: 0.3;
      z-index: 0;
    }

    > * {
      position: relative;
      z-index: 1;
    }
  `;

  const SubHeadText = styled.div`
    font-size: 1.5rem;
    width: 60%;
    margin: auto;
    padding: 20px 0px 20px 0px;

    @media (max-width: 900px) {
      font-size: 0.8rem;
      width: 90%;
    }
  `;

  const SectionHeadText = styled.div`
    font-family: Montserrat;
    font-size: 2.3rem;
    font-weight: 800;
    padding: ${(props) => (props.invert ? "0px" : "0px 0px 0px 50px")};

    @media (max-width: 900px) {
      font-size: 1.7rem;
      padding: 0px;
      text-align: left;
    }
  `;

  const SectionBodyText = styled.div`
    font-family: Montserrat;
    font-size: 1.3rem;
    padding: ${(props) =>
      props.invert ? "0px 0px 0px 25px" : "0px 0px 0px 75px"};
    text-align: left;
    width: 90%;

    @media (max-width: 900px) {
      font-size: 0.7rem;
      padding: 0px;
      width: 100%;
    }
  `;

  const PaddedWrapper = styled.div`
    width: 100%;
    padding: 0px 0px 0px 50px;

    @media (max-width: 900px) {
      padding: 0px;
    }
  `;

  return (
    <>
      <header>
        {/* Nav bar */}
        <AppNavbar />
      </header>

      <main>
        {/* Hero start */}
        <Container fluid>
          <BackgroundWrapper>
            <Row className="header-text text-center">
              <Col className="offset-md-2 col-md-8">
                <div>
                  <HeadText>
                    Easily find
                    <br /> online courses you need to succeed
                  </HeadText>
                  <div className="container d-block d-md-none pt-2">
                    {token ? (
                      ""
                    ) : (
                      <Link to="/user-auth">
                        <Button
                          variant="outline-secondary"
                          className="btn-lg me-2 d-inline-flex out-btn"
                        >
                          Sign in
                        </Button>
                      </Link>
                    )}
                    {token ? (
                      ""
                    ) : (
                      <Link to="/coming-soon">
                        <Button className="btn btn-secondary text-white btn-lg me-2 d-inline-flex justify-content-center align-items-center">
                          Get App
                        </Button>
                      </Link>
                    )}
                  </div>

                  <SubHeadText>
                    Whatever you want to learn online, wherever they are hosted.
                    We will help you make the most of the journey
                  </SubHeadText>

                  <Button className="btn btn-secondary text-white btn-lg me-2 d-inline-flex justify-content-center align-items-center">
                    Get Started
                  </Button>
                </div>
              </Col>
            </Row>
          </BackgroundWrapper>
        </Container>
        {/* Hero end  */}

        {/* Partner start */}
        <Container fluid>
          <Row className="partners">
            <Col className="col-sm-4 ">
              <h6 className="">Partners:</h6>
            </Col>
            <Col className="col-sm-2 ">
              <StyledImage
                width={"40%"}
                height={"40%"}
                src={Pardna}
                alt="partner"
              />
            </Col>
            <Col className="col-sm-2 ">
              <StyledImage
                width={"40%"}
                height={"40%"}
                src={Padna}
                alt="partner"
              />
            </Col>
          </Row>
        </Container>
        {/* Partner end */}

        {/* Complete start */}
        <Container fluid>
          <Row className="p-5">
            <Col md={7}>
              <p className="h1 pt-5 px-md-4 text-md-start fw-normal">
                <br />
                <strong>
                  <SectionHeadText>
                    Find the Perfect Online Course for You
                  </SectionHeadText>
                </strong>
              </p>
              <SectionBodyText>
                Take our psychometric test to discover personalized course
                recommendations that match your unique abilities, learning style
                and goals.
              </SectionBodyText>

              <PaddedWrapper>
                <div className="px-4 py-4 d-flex justify-content-center justify-content-md-start align-items-center">
                  <a
                    href="https://motivar-recommender.onrender.com/test/personality/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="btn btn-lg btn-secondary text-white">
                      Get Started
                    </Button>
                  </a>
                  <span className="shadow-sm pointer ms-3">
                    <BsArrowLeftCircle className="spin" />{" "}
                  </span>
                </div>
              </PaddedWrapper>
            </Col>
            <Col md={5}>
              <StyledImage
                width={"80%"}
                height={"100%"}
                src={Faces}
                alt="faces"
              />
            </Col>
          </Row>
        </Container>
        {/* Complete end */}

        {/* Sponsor start */}
        <Container fluid className="bg-warning">
          <Row className="p-5 text-center">
            <Col md={5}>
              <StyledImage
                src={Persons}
                width={"70%"}
                height={"70%"}
                alt="persons"
              />
            </Col>

            <Col md={7}>
              <p className=" h1 pt-5 px-md-4 text-md-start fw-normal">
                <br />
                <strong>
                  <SectionHeadText invert>
                    Help a learner pay for online courses they need and can't
                    afford
                  </SectionHeadText>
                </strong>
              </p>
              {/* <SectionBodyText invert>
                Lots of young people want and need online courses to upskill and
                improve their knowledge, but unfortunately cannot afford them.
              </SectionBodyText> */}
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
                  <SectionHeadText>
                    Ask for help to pay for courses you need but cannot afford
                  </SectionHeadText>
                </strong>
              </p>
              <PaddedWrapper>
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
              </PaddedWrapper>
            </Col>
            <Col md={6}>
              <StyledImage
                width={"80%"}
                height={"80%"}
                src={Stu}
                alt="persons"
              />
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
                  <Carousel.Item>
                    <Row className="p-2 align-items-center">
                      <div className="col-md-4 text-black ">
                        <div className="container">
                          <Image fluid src={Test} alt="testimonial" />
                          <p>Paul, 23</p>
                        </div>
                      </div>
                      <div className="col-md-8 text-black text-md-start mb-2">
                        <div className="container">
                          "I was completely lost in a sea of courses when I
                          stumbled upon Motivar. Their platform was a lifesaver!
                          It helped me narrow down my options and find the
                          perfect course that aligned with my goals. I'm
                          thrilled with my choice and can't wait to see where
                          this new skill takes me!"
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

        {/* FAQS start */}
        <SectionBodyText style={{ width: "100%", textAlign: "center", fontWeight: 900, padding: '20px 0px 20px 0px' }}>
          FAQs
        </SectionBodyText>
        <Accordion />

        {/* FAQS end */}

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
                    <p style={{ width: "80%" }}>
                      Recieve information, new releases and much more directly
                      to your inbox
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
