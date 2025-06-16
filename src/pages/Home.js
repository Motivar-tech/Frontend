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
import Vector from "../assets/images/Vector.png";
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
import React, { useRef, useState } from "react";

let token = localStorage.getItem("motivar-token");

const PartnersSection = styled.section`
  width: 100vw;
  max-width: 100vw;
  background: #FCFCFC;
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PartnersRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 48px;
  margin-top: 6px;
  flex-wrap: wrap;
`;

const PartnerLogo = styled.img`
  width: 80px;
  height: auto;
  max-width: 40vw;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  box-shadow: none;
`;

export default function AppHome() {
  const [activeTab, setActiveTab] = useState("learner"); // State to track active tab

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

  // Fix: Ensure hero section is tall enough and never causes horizontal scroll
  const BackgroundWrapper = styled.div`
    width: 100vw;
    max-width: 100vw;
    min-height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #fff;
    overflow: hidden;
    padding: 0;
    margin: 0;

    &::before {
      content: "";
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: url(${Vector});
      opacity: 1;
      z-index: 0;
    }

    @media (max-width: 900px) {
      min-height: 480px;
      &::before {
        background-size: 600px;
      }
    }
`;

  const SubHeadText = styled.div`
    font-family: Montserrat, sans-serif;
    font-size: 30px;
    width: 80%;
    margin: 0 auto 32px auto;
    padding: 20px 0 0 0;
    text-align: center;
    @media (max-width: 900px) {
      font-size: 1rem;
      width: 98%;
      padding: 10px 0 0 0;
    }
  `;

  const SectionHeadText = styled.div`
    font-family: Montserrat;
    width: 60%;
    font-size: 42px;
    font-weight: 1800;
    line-height: 1.2;
    padding: ${(props) => (props.invert ? "0px" : "0px 0px 0px 50px")};

    @media (max-width: 900px) {
      font-size: 1.7rem;
      padding: 0px;
      text-align: left;
    }
  `;

  const SectionBodyText = styled.div`
    font-family: Montserrat;
    font-size: 20px;
    padding-right: 64px;
    line-height: 1.5;
    font-weight: 400;
    padding: ${(props) =>
      props.invert ? "0px 0px 0px 25px" : "0px 0px 0px 75px"};
    text-align: left;
    width: 70%;

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

  const HeroContainer = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px 32px 24px;
    box-sizing: border-box;
    min-height: 500px;

    @media (max-width: 900px) {
      min-height: 320px;
      padding: 24px 8px 16px 8px;
      max-width: 100vw;
    }
  `;

  const HeroText = styled.div`
    font-family: "Varela", Arial, sans-serif;
    font-size: 90px;
    font-weight: 900;
    text-align: center;
    width: 100%;
    line-height: 1.1;
    margin-bottom: 18px;
    word-break: break-word;
    @media (max-width: 900px) {
      font-size: 40px;
      padding: 0 2vw;
    }
  `;

  // Add this ref at the top of your function
  const testimonialCarouselRef = useRef(null);

  return (
    <>
      <header>
        {/* Nav bar */}
        <AppNavbar />
      </header>

      <main style={{ paddingTop: "109px", maxWidth: "100vw", overflowX: "hidden" }}>
        {/* Tab Switch System */}
        <Container
          fluid
          className="text-center py-2"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <Button
            variant={activeTab === "learner" ? "success" : "outline-success"}
            className="mx-2"
            onClick={() => setActiveTab("learner")}
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              borderRadius: "8px",
              padding: "8px 16px",
              backgroundColor: activeTab === "learner" ? "#00AA87" : "#fff",
              color: activeTab === "learner" ? "#fff" : "#00AA87", 
              border: `2px solid #00AA87`, 
            }}
          >
            Learner
          </Button>
          <Button
            variant={activeTab === "sponsor" ? "success" : "outline-success"}
            className="mx-2"
            onClick={() => setActiveTab("sponsor")}
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              borderRadius: "8px",
              padding: "8px 16px", 
              backgroundColor: activeTab === "sponsor" ? "#00AA87" : "#fff",
              color: activeTab === "sponsor" ? "#fff" : "#00AA87",
              border: `2px solid #00AA87`, 
            }}
          >
            Sponsor
          </Button>
        </Container>

        {/* Hero Section */}
        <Container fluid style={{ padding: 0, maxWidth: "100vw", overflowX: "hidden" }}>
          <BackgroundWrapper>
            <HeroContainer>
              {activeTab === "learner" ? (
                <>
                  {/* Learner Copy */}
                  <HeroText>
                    <TypeAnimation
                      sequence={[
                        "Easily find",
                        2000,
                        "Easily start",
                        2000,
                        "Easily complete",
                        2000,
                      ]}
                      wrapper="span"
                      cursor={false}
                      repeat={Infinity}
                      style={{ color: "#222" }}
                    />
                    <br />
                    online courses you need to&nbsp;
                    <TypeAnimation
                      sequence={["succeed", 2000, "upskill", 2000]}
                      wrapper="span"
                      cursor={false}
                      repeat={Infinity}
                      style={{ color: "#222" }}
                    />
                  </HeroText>
                  <SubHeadText>
                    Whatever you want to learn online, wherever they are hosted.
                    We will help you make the most of the journey.
                  </SubHeadText>
                  <Link to="/user-auth">
                    <Button
                      className="btn btn-secondary text-white btn-lg d-inline-flex justify-content-center align-items-center"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "20px",
                        width: "316px",
                        height: "66px",
                        borderRadius: "8px",
                        boxShadow: "none",
                        border: "none",
                        letterSpacing: "0.5px",
                        minWidth: "316px",
                        minHeight: "66px",
                        maxWidth: "100%",
                      }}
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {/* Sponsor Copy */}
                  <HeroText>
                    <TypeAnimation
                      sequence={[
                        "Help ambitious youths",
                        2000,
                        "Support their dreams",
                        2000,
                        "Make a difference",
                        2000,
                      ]}
                      wrapper="span"
                      cursor={false}
                      repeat={Infinity}
                      style={{ color: "#222" }}
                    />
                  </HeroText>
                  <SubHeadText>
                    Sponsor ambitious, underprivileged youths to pay for online courses
                    they need to succeed. Your support can change lives and create
                    opportunities.
                  </SubHeadText>
                  <Button
                    className="btn btn-secondary text-white btn-lg d-inline-flex justify-content-center align-items-center"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      width: "316px",
                      height: "66px",
                      borderRadius: "8px",
                      boxShadow: "none",
                      border: "none",
                      letterSpacing: "0.5px",
                      minWidth: "316px",
                      minHeight: "66px",
                      maxWidth: "100%",
                    }}
                  >
                    Sponsor Now
                  </Button>
                </>
              )}
            </HeroContainer>
          </BackgroundWrapper>
        </Container>

        {/* Partner start */}
        <PartnersSection>
          <h6 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 0 }}>Partners:</h6>
          <PartnersRow>
            <PartnerLogo src={Pardna} alt="partner" />
            <PartnerLogo src={Padna} alt="partner" />
          </PartnersRow>
        </PartnersSection>
        {/* Partner end */}

        {/* Complete start */}
        <Container fluid style={{ background: "#FFFCF9", padding: "80px 0" }}>
          <Row className="p-5">
            <Col md={7}>
              <p className="h1 pt-5 px-md-4 text-md-start fw-normal">
                <br />
                <strong>
                  <SectionHeadText>
                    Find the perfect online<br/>course for you
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
                    <Button className="btn btn-lg btn-secondary text-white"
                      style={{
                            background: "#43B286",
                            color: "#fff",
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 700,
                            fontSize: "16px",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none"
                          }}>
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
        <Container fluid className="bg-warning" style={{ padding: "40px 0" }}>
          <Row className="align-items-center">
            <Col md={5} className="d-flex justify-content-center">
              <StyledImage
                src={Persons}
                width={"70%"}
                height={"70%"}
                alt="persons"
              />
            </Col>

            <Col md={7}>
              <p className=" h1 px-md-4 text-md-start fw-normal">
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
              <div className="d-flex justify-content-center justify-content-md-start align-items-center gap-3">
                <Link to="/help-learner">
                  <Button className="btn btn-lg btn-secondary text-white"
                  style={{
                        background: "#43B286",
                        color: "#fff",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "16px",
                        padding: "10px 20px",
                        marginLeft: "20px",
                        borderRadius: "8px",
                        border: "none"
                      }}>
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

          <Row className="p-5 pt-5 text-center bg-alt-secondary align-items-center">
            <Col md={6}>
              <p className=" h1 px-md-4 text-md-start fw-normal">
                <br />
                <strong>
                  <SectionHeadText>
                    Ask for help to pay for courses you need but cannot afford
                  </SectionHeadText>
                </strong>
              </p>
              <PaddedWrapper>
                <div className="px-md-4 py-2 d-flex justify-content-center justify-content-md-start align-items-center">
                  <Link to="/help">
                    <Button className="btn btn-lg btn-secondary text-white"
                      style={{
                            background: "#43B286",
                            color: "#fff",
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 700,
                            fontSize: "16px",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none"
                          }}>
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
              <p className=" h1 pt-5 px-md-4 text-md-start fw-normal" style={{width: "70%"}}>
                <br /> <br />
                <strong>
                  Participate in learner communities and turbocharge
                  your learning experience
                </strong>
              </p>
              <p class="h4 px-md-4 text-md-start fw-light" style={{width: "70%"}}>
                Connect with learners like you in your location to share ideas,
                insights, challenges, and wins
              </p>

              <div className="px-4 py-4 d-flex justify-content-center justify-content-md-start align-items-center">
                <Link to="/coming-soon">
                  <Button className="btn btn-lg btn-secondary text-white"
                    style={{
                          background: "#43B286",
                          color: "#fff",
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 700,
                          fontSize: "16px",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          border: "none"
                        }}>
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
        <Container fluid style={{ background: "#F5FFFC", padding: "60px 0" }}>
          <Row className="position-relative justify-content-center align-items-center">
            {/* Left Navigation Button */}
            <div className="position-absolute" style={{ left: "25%", zIndex: "2" }}>
              <button 
                className="d-flex justify-content-center align-items-center"
                style={{ 
                  width: "40px", 
                  height: "40px",
                  background: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
                onClick={() => testimonialCarouselRef.current.prev()}
                aria-label="Previous testimonial"
              >
                <span style={{ 
                  borderTop: "2px solid #43B286",
                  borderLeft: "2px solid #43B286",
                  width: "12px",
                  height: "12px",
                  transform: "rotate(-45deg)",
                  marginLeft: "4px"
                }} />
              </button>
            </div>

            {/* Testimonial Content */}
            <Col md={4} className="px-4">
              <div className="bg-white rounded-4 shadow-sm" style={{ padding: "24px" }}>
                <Carousel 
                  controls={false} 
                  indicators={false}
                  ref={testimonialCarouselRef}
                  interval={null}
                >
                  <Carousel.Item>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ width: "100px" }}>
                        <Image 
                          src={Test} 
                          alt="testimonial"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "50%"
                          }}
                        />
                        <p className="mt-2 mb-0" style={{ 
                          fontFamily: "Montserrat",
                          fontSize: "14px",
                          fontWeight: "500"
                        }}>Yemi, 19</p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: "Montserrat",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          margin: 0
                        }}>
                          "Choosing a course to learn was almost overwhelming, so many options to choose from. Motivar helped make the process seamless. I totally love the course I am currently taking"
                        </p>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ width: "100px" }}>
                        <Image 
                          src={Test} 
                          alt="testimonial"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "50%"
                          }}
                        />
                        <p className="mt-2 mb-0" style={{ 
                          fontFamily: "Montserrat",
                          fontSize: "14px",
                          fontWeight: "500"
                        }}>Ada, 22</p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: "Montserrat",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          margin: 0
                        }}>
                          "I found the perfect course for my career switch. The recommendations were spot on and the process was easy."
                        </p>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ width: "100px" }}>
                        <Image 
                          src={Test} 
                          alt="testimonial"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "50%"
                          }}
                        />
                        <p className="mt-2 mb-0" style={{ 
                          fontFamily: "Montserrat",
                          fontSize: "14px",
                          fontWeight: "500"
                        }}>Sam, 25</p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: "Montserrat",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          margin: 0
                        }}>
                          "Motivar made it easy to connect with sponsors and get the help I needed to pay for my course."
                        </p>
                      </div>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Col>

            {/* Right Navigation Button */}
            <div className="position-absolute" style={{ right: "5%", zIndex: "2" }}>
              <button 
                className="d-flex justify-content-center align-items-center"
                style={{ 
                  width: "40px", 
                  height: "40px",
                  background: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
                onClick={() => testimonialCarouselRef.current.next()}
                aria-label="Next testimonial"
              >
                <span style={{ 
                  borderTop: "2px solid #43B286",
                  borderRight: "2px solid #43B286",
                  width: "12px",
                  height: "12px",
                  transform: "rotate(45deg)",
                  marginRight: "4px"
                }} />
              </button>
            </div>
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
