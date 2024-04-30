import "../App.css";
import "../assets/css/main.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Logo from "../assets/images/Motivar.svg";
import { BsChevronRight } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Test from "../assets/images/test.png";
import Subtract from "../assets/images/Subtract.png";
import AppFooter from "../components/Footer.js";
import axios from "axios";

// start donate modal
function DonateRandomly(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="grid-example">
        <Container className="p-4">
          <Row className="justify-content-center align-items-center g-0">
            <Col xs={12} md={4}>
              <Image src={Test} alt="image" />
            </Col>
            <Col xs={6} md={4}>
              <p className="h2">
                {props?.requests[props?.index]?.user?.fullName}
              </p>
            </Col>
            <Col xs={6} md={4} className="d-flex justify-content-md-end">
              <p
                className=" h4 fw-lighter shadow-sm "
                style={{
                  borderColor: "#11d99a",
                  borderStyle: "solid",
                  borderWidth: "thin",
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  width: "55px",
                  height: "55px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                ${props?.requests[props?.index]?.course?.price}{" "}
              </p>
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={12}>
              <p className="h6 fw-lighter text-secondary pt-5">
                {" "}
                Course Title:
              </p>
              <p className="h6 fw-normal">
                {" "}
                {props?.requests[props?.index]?.course?.courseTitle}{" "}
                <BsArrowUpRightCircle
                  className="ps-1"
                  style={{ color: "#11d99a" }}
                />{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={12}>
              <p className="h6 fw-lighter text-secondary pt-3"> Platform:</p>
              <p className="h6 fw-normal ">
                {" "}
                {props?.requests[props?.index]?.course?.platform}{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={12}>
              <p className="h6 fw-lighter text-secondary pt-3">
                {" "}
                Motivation Message:
              </p>
              <p className="h6 fw-normal ">
                {props?.requests[props?.index]?.motivation}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={8}>
              <p className="h6 fw-lighter text-secondary pt-3">
                {" "}
                Course platform login details:
              </p>
              <p className="h6 fw-normal">
                {" "}
                {props?.requests[props?.index]?.account?.email}{" "}
              </p>
            </Col>

            <Col xs={6} md={4}>
              <p className="h6 fw-lighter text-secondary pt-3 text-white">
                Password
              </p>
              <p className="h6 fw-normal">
                {" "}
                {props?.requests[props?.index]?.account?.password}
              </p>
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={12}>
              <p className="h6 fw-lighter text-secondary pt-3">
                {" "}
                Social media:
              </p>
              <p className="h6 fw-normal ">
                {" "}
                {props?.requests[props?.index]?.socials}
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button className="btn-secondary text-white">Sponsor</Button>
      </Modal.Footer>
    </Modal>
  );
}

// end donate modal

// start meet learner modal
function MeetLearner(props) {
  // anonymous declaration
  const [modalShowIII, setModalShowIII] = useState(false);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <p className="h4 text-center fw-medium">
          Would you like to <br />
          meet the learner or be <br />
          stay anonymous
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button className="btn-secondary text-white">Meet Learner</Button>
        <Button
          onClick={() => setModalShowIII(true)}
          className="btn-secondary text-white"
        >
          Anonymous
        </Button>
        <Anonymous show={modalShowIII} onHide={() => setModalShowIII(false)} />
      </Modal.Footer>
    </Modal>
  );
}

//end  meet learner modal

// start anonymous modal
function Anonymous(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="h4 text-center fw-medium">Add proof of payment</p>
        <Button className="btn-secondary text-white">Meet Learner</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-secondary text-white">Complete</Button>
      </Modal.Footer>
    </Modal>
  );
}

//end  anonymous modal

export default function AppHelpLearner() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowII, setModalShowII] = useState(false);

  const [requests, setRequests] = useState([]);
  const [index, setIndex] = useState();

  useEffect(() => {
    axios
      .get(`https://motivar-sponsor-api-v1.onrender.com/course/get`)
      .then((res) => {
        console.log(res.data.data);
        setRequests(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-alt-white">
          <Container className="py-3">
            <Navbar.Brand href="/">
              <Image className="" src={Logo} fluid />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              {/* <div className="container">
              <Navbar.Brand href="/">
                <Image src={Logo} style={{maxHeight: '100px' }} className="logo-2 " fluid/>
              </Navbar.Brand>
            </div> */}

              <div className="container d-flex align-items-center justify-content-end">
                <Link
                  to="/coming-soon"
                  className="pe-5"
                  style={{ textDecoration: "none", color: "#212529" }}
                >
                  Explore
                </Link>
                <Link
                  to="/coming-soon"
                  className="pe-5"
                  style={{ textDecoration: "none", color: "#212529" }}
                >
                  Pricing
                </Link>
                <Link to="/user-auth">
                  <Button
                    variant="outline-secondary"
                    className="btn-lg me-2 d-inline-flex out-btn"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        <div className="container-fluid bg-info">
          <Image src={Subtract} alt="headerImage" fluid />
          <div className="subtract">
            <p className="h1 display-4 fw-semibold">Help a Learner's Journey</p>
          </div>
        </div>

        <Container fluid>
          <Row className="p-md-5 pt-3 pb-4 text-start bg-info">
            <Col md={7}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="&#x1F50D;"
                  className="me-2 justify-content-start"
                  aria-label="Search"
                />
                <Button
                  variant="outline-success"
                  className="d-flex text-black fw-medium"
                >
                  Filter <BsArrowDown className="mt-1 ms-1 " />
                </Button>
              </Form>
            </Col>

            <Col
              md={5}
              className="d-flex pt-3 pt-md-0 justify-content-between justify-content-md-end"
            >
              <div className="pe-md-4">
                <Button
                  variant="outline-success"
                  className="text-black"
                  style={{ whiteSpace: "noWrap" }}
                  onClick={() => setModalShow(true)}
                >
                  Donate Randomly
                </Button>
                <DonateRandomly
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  index={index}
                  requests={requests}
                />
              </div>
              <div>
                <Button
                  variant="outline-success"
                  className="text-black"
                  style={{ whiteSpace: "noWrap" }}
                  onClick={() => setModalShowII(true)}
                >
                  Support a lot of learners
                </Button>
                <MeetLearner
                  show={modalShowII}
                  onHide={() => setModalShowII(false)}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row className="px-md-5 pt-5 text-start justify-content-between bg-info pb-4">
            {requests.length > 0 &&
              requests.map((item, index) => (
                <Col key={index} className="col-md-6 col-sm-12">
                  <Card className="bg-info">
                    <Row className="p-3">
                      <Col md={12}>
                        <div className="d-flex justify-content-between">
                          <Image src={Test} alt="image" />
                          <span className="shadow-sm pointer ms-3">
                            {" "}
                            ${item?.course?.price}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row className="p-3">
                      <Col md={12}>
                        <div className="d-flex justify-content-between align-items-center">
                          <Card.Body>
                            <Card.Title className="h4">
                              {item?.user?.fullName}
                            </Card.Title>
                            <Card.Text className="h5 fw-normal">
                              {item?.course?.courseTitle}
                            </Card.Text>
                          </Card.Body>
                          <span
                            className="shadow-sm pointer "
                            onClick={() => {
                              setModalShow(true);
                              setIndex(index);
                            }}
                          >
                            {" "}
                            <BsChevronRight />{" "}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </main>
      <footer>
        <AppFooter />
      </footer>
    </>
  );
}
