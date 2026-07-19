/* eslint-disable */

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
import Vector from "../assets/images/Vector.png";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Logo from "../assets/images/Motivar.svg";
import { BsChevronDown } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import Test from "../assets/images/test.png";
import AppFooter from "../components/Footer.js";
import { Buffer } from "buffer";

import ArrowLeft from "../assets/Icons/arrow-left.svg";

import toast from "react-hot-toast";
import GeneralDataServices from "../Services/GeneralDataServices.js";


const handleScheduleClick = async (email, name, id, price, unit, requestId) => {
  const title = encodeURIComponent(`Motivar - Sponsor Meetup with ${name}`);
  const details = encodeURIComponent(
    `Hello, ${name}. We will be meeting to discuss your interest in the course sponsorship you requested on Motivar!. Please do well to be available within the set time. Thanks!`
  );
  const invitee = encodeURIComponent(email);

  const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&details=${details}&add=${invitee}&conference=hangouts`;

  window.open(url, "_blank");

  const payload = { name, id, price, unit, email, requestId};
  await GeneralDataServices.notifyMeetingSchedule(payload);
};

function LearnerDetailsModal({ show, onHide, learner }) {
  const [proceed, setProceed] = useState(false);
  const router = useNavigate();

  const handleMeetLearner = async (name, email, id, price, unit, requestId) => {
    handleScheduleClick(email, name, id, price, unit, requestId);
    try {
      router(
        `/sponsor-status?state=meet&learner=${encodeURIComponent(
          name
        )}&id=${encodeURIComponent(id)}&price=${encodeURIComponent(
          price
        )}&unit=${encodeURIComponent(unit)}&requestID=${encodeURIComponent(
          requestId
        )}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayAsAnnonymous = async (name, id, price, unit, requestId) => {
    try {
      router(
        `/sponsor-status?state=pay&learner=${encodeURIComponent(
          name
        )}&id=${encodeURIComponent(id)}&price=${encodeURIComponent(
          price
        )}&unit=${encodeURIComponent(unit)}&requestID=${encodeURIComponent(
          requestId
        )}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Helper to check and format links
  const formatLink = (url) => {
    if (!url || url === "N/A") return "N/A";
    const hasProtocol = /^https?:\/\//i.test(url);
    return hasProtocol ? url : `https://${url}`;
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ borderBottom: "none" }}></Modal.Header>
      {!proceed && (
        <Modal.Body
          style={{ backgroundColor: "#F4FFF8", borderRadius: "16px" }}
        >
          <Container>
            <Row className="text-center">
              <Col>
                <Image
                  src={
                    learner?.learner?.userId?.profilePicture?.data
                      ? `data:${
                          learner?.learner?.userId?.profilePicture?.contentType
                        };base64,${Buffer.from(
                          learner?.learner?.userId?.profilePicture?.data.data
                        ).toString("base64")}`
                      : Test
                  }
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                  alt="Profile"
                />
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <h5
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {learner?.learner?.userId?.fullName}
                </h5>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "14px",
                    color: "#6C757D",
                  }}
                >
                  {learner?.socials || "N/A"}
                </p>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16px",
                    color: "#6C757D",
                  }}
                >
                  {learner?.course?.courseTitle} - {learner?.course?.platform}
                </p>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "14px",
                    color: "#6C757D",
                  }}
                >
                  {learner?.link || "N/A"}
                </p>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "14px",
                    color: "#6C757D",
                  }}
                >
                  Duration: {learner?.course?.duration || "N/A"}{" "}
                  {learner?.course?.durationUnit || ""}
                </p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Why I need this course:
                </p>
                <textarea
                  readOnly
                  value={learner?.motivation || ""}
                  style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid #11D99A",
                    borderRadius: "8px",
                    padding: "10px",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                />
              </Col>
            </Row>
            <Row className="text-center mt-4">
              <Col>
                <Button
                  style={{
                    backgroundColor: "#00AA87",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0px 20px",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16px",
                    fontWeight: "bold",
                    width: "133px",
                    height: "37px",
                  }}
                  onClick={() => {
                    setProceed(true);
                    // Add sponsor functionality here
                    // onHide();
                  }}
                >
                  Sponsor
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      )}

      {proceed && (
        <Modal.Body style={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }}>
          <Container>
            <Row className="text-center">
              <Col></Col>
            </Row>
            <Row className="text-center">
              <Col style={{}}>
                <h5
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "bolder",
                    fontSize: "38px",
                    width: "75%",
                    margin: "auto",
                  }}
                >
                  Sponsor {learner?.learner?.userId?.fullName} for{" "}
                  {learner?.course?.priceUnit === "NGN"
                    ? "₦"
                    : learner?.course?.priceUnit === "USD"
                    ? "$"
                    : learner?.course?.priceUnit === "GBP"
                    ? "£"
                    : "#"}
                  {learner?.course?.price?.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                  })}
                </h5>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "14px",
                    color: "#6C757D",
                  }}
                ></p>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16px",
                    color: "#6C757D",
                  }}
                ></p>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "20px",
                    color: "#6C757D",
                    width: "80%",
                    margin: "2vh auto 2vh auto",
                  }}
                >
                  How would you like to to proceed with your sponsorship?
                </p>
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "center" }}>
                <div
                  onClick={() =>
                    handleMeetLearner(
                      learner?.learner?.userId?.fullName,
                      learner?.learner?.userId?.email,
                      learner?.learner?.userId?._id,
                      learner?.course?.price,
                      learner?.course?.priceUnit,
                      learner?._id
                    )
                  }
                  style={{
                    borderRadius: "16px",
                    padding: "15px",
                    width: "85%",
                    backgroundColor: "#005846",
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: "18px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    margin: "auto",
                    cursor: "pointer",
                  }}
                >
                  Meet the learner via virtual meeting
                </div>

                <div
                  onClick={() => {
                    handlePayAsAnnonymous(
                      learner?.learner?.userId?.fullName,
                      learner?.learner?.userId?._id,
                      learner?.course?.price,
                      learner?.course?.priceUnit,
                      learner?._id
                    );
                    localStorage.setItem("requestID", learner?._id);
                  }}
                  style={{
                    borderRadius: "16px",
                    padding: "15px",
                    width: "85%",
                    backgroundColor: "#CDCDCD",
                    color: "#000000",
                    textAlign: "center",
                    fontSize: "18px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    margin: "2vh auto 2vh auto",
                    cursor: "pointer",
                  }}
                >
                  Stay Annonymous
                </div>
              </Col>
            </Row>
            <Row className="text-center mt-4">
              <Col>
                <p
                  onClick={() => setProceed(false)}
                  style={{
                    width: "80%",
                    margin: "2vh auto 2vh auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={ArrowLeft}
                    style={{
                      objectFit: "center",
                      height: "20px",
                      width: "30px",
                    }}
                  />
                  <div>
                    <h6
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "#00AA87",
                        fontSize: "16px",
                        padding: "5px",
                      }}
                    >
                      Go Back
                    </h6>
                  </div>
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      )}
    </Modal>
  );
}

function SponsorGroupModal({ show, onHide, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [targetGroup, setTargetGroup] = useState("");
  const [targetTrack, setTargetTrack] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onSubmit({ amount, targetGroup, targetTrack, note });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sponsor a Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Number of Learners to Sponsor</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target group</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Women in Tech, Undergraduates"
              value={targetGroup}
              onChange={(e) => setTargetGroup(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target learning track</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Web Development, Data Science"
              value={targetTrack}
              onChange={(e) => setTargetTrack(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Extra note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Any extra note to add"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AppHelpLearner() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowII, setModalShowII] = useState(false);

  const [requests, setRequests] = useState([]);
  const [index, setIndex] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    setFilteredRequests(requests);
  }, [requests]);

  const handleFilter = () => {
    const filtered = requests.filter((req) => {
      const keyword = searchTerm.trim().toLowerCase();
      if (!keyword) return true;
      return (
        req.course.courseTitle?.toLowerCase().includes(keyword) ||
        req.course.platform?.toLowerCase().includes(keyword) ||
        req.motivation?.toLowerCase().includes(keyword) ||
        req.socials?.toLowerCase().includes(keyword)
      );
    });
    setFilteredRequests(filtered);
  };

  const fetchRequests = async () => {
    try {
      const res = await GeneralDataServices.GetRequests();
      if (res) {
        setRequests(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const [currentText, setCurrentText] = useState("Fund a Learner's Journey");

  useEffect(() => {
    const textAlternator = setInterval(() => {
      setCurrentText((prevText) =>
        prevText === "Fund a Learner's Journey"
          ? "Support a Learner Today"
          : "Fund a Learner's Journey"
      );
    }, 3000);

    return () => clearInterval(textAlternator);
  }, []);

  const [showSponsorGroupModal, setShowSponsorGroupModal] = useState(false);

  const handleSponsorGroupSubmit = (data) => {
    toast.success("Group sponsorship submitted!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <Navbar expand="lg" className="bg-body-alt-white">
          <Container className="py-3">
            <Navbar.Brand href="/">
              <Image
                className=""
                src={Logo}
                style={{ maxHeight: "30px" }}
                fluid
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <div className="container d-flex align-items-center justify-content-end">
                <NavDropdown
                  title="Programs"
                  id="programs-dropdown"
                  style={{ color: "#222", marginRight: "24px" }} // Add margin here
                >
                  <NavDropdown.Item as={Link} to="/coming-soon">
                    DAP
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/coming-soon">
                    DigiAccess
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Community"
                  id="community-dropdown"
                  style={{ color: "#222" }}
                >
                  <NavDropdown.Item as={Link} to="/coming-soon">
                    Become a Mentor
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline-secondary"
                    className="btn-lg me-2 d-inline-flex out-btn"
                  >
                    Log Out
                  </Button>
                </Link> */}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main style={{ flex: 1 }}>
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${Vector})`,
            opacity: 1,
            backgroundColor: "#11D99A",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "90%",
            height: "120px",
            borderRadius: "16px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "50px",
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
              margin: 0,
            }}
          >
            {currentText}
          </p>
        </div>

        <Container fluid style={{ margin: "0 auto" }}>
          <Row className="p-md-5 pt-3 pb-4 text-start">
            <Col md={7}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="🔍 Filter by keyword"
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #11D99A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                />
                <Button
                  variant="outline-success"
                  className="d-flex align-items-center text-black fw-medium"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #11D99A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  onClick={handleFilter}
                >
                  Filter <BsArrowDown className="ms-1" />
                </Button>
              </Form>
            </Col>
            <Col
              md={5}
              className="d-flex pt-3 pt-md-0 justify-content-between justify-content-md-end"
            >
              <Button
                variant="outline-success"
                className="text-black fw-medium"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #11D99A",
                  fontFamily: "Montserrat, sans-serif",
                  whiteSpace: "nowrap",
                  width: "40%",
                }}
                onClick={() => {
                  if (requests.length > 0) {
                    const randomIndex = Math.floor(
                      Math.random() * requests.length
                    );
                    setIndex(randomIndex);
                    setModalShow(true);
                  } else {
                    toast.error("No learners available to sponsor.");
                  }
                }}
              >
                Sponsor randomly
              </Button>
              <Button
                variant="outline-success"
                className="text-black fw-medium ms-3"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #11D99A",
                  fontFamily: "Montserrat, sans-serif",
                  whiteSpace: "nowrap",
                  width: "60%",
                }}
                onClick={() => setShowSponsorGroupModal(true)}
              >
                Sponsor a group
              </Button>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row className="px-md-5 pt-5 justify-content-start">
            {filteredRequests.length > 0 &&
              filteredRequests.map((item, index) => (
                <Col key={index} md={6} lg={5} xl={4} className="mb-4">
                  <Card
                    className="shadow-sm"
                    style={{
                      border: "1px solid #11D99A",
                      borderRadius: "6px",
                      backgroundColor: "#F4FFF8",
                      padding: "20px",
                    }}
                  >
                    <div style={{ display: "flex", width: "100%" }}>
                      {/* Left Column: Image stacked ON TOP of User Info/Course */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column", // Stacks image and text block vertically
                          flexGrow: 1, // Takes available horizontal space
                          marginRight: "15px", // Space before the right column
                        }}
                      >
                        <Image
                          src={
                            item?.learner?.userId?.profilePicture?.data
                              ? `data:${
                                  item?.learner?.userId?.profilePicture
                                    ?.contentType
                                };base64,${Buffer.from(
                                  item?.learner?.userId?.profilePicture?.data
                                    .data
                                ).toString("base64")}`
                              : Test
                          }
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginBottom: "10px",
                          }}
                          alt="Profile"
                        />
                        {/* Text block (Name + Course) - directly under image */}
                        <div>
                          <Card.Title
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: "20px",
                              fontWeight: "bold",
                              marginBottom: "4px",
                              textAlign: "left",
                              color: "#333",
                            }}
                          >
                            {item?.learner?.userId?.fullName}
                          </Card.Title>
                          <Card.Text
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: "16px",
                              color: "#555",
                              textAlign: "left",
                            }}
                          >
                            {item?.course?.courseTitle} -{" "}
                            {item?.course?.platform}
                          </Card.Text>
                        </div>
                      </div>

                      {/* Right Column: Price (top) + Arrow (bottom) */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between", // Pushes price to its top, arrow to its bottom
                          alignItems: "flex-end", // Aligns price/arrow to the right edge of this column
                          minWidth: "60px", // Give it some minimum width
                        }}
                      >
                        {/* Price */}
                        <div
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #11D99A",
                            borderRadius: "6px",
                            padding: "5px 12px",
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#11D99A",
                            display: "inline-block",
                          }}
                        >
                          {item?.course?.priceUnit === "NGN"
                            ? "₦"
                            : item?.course?.priceUnit === "USD"
                            ? "$"
                            : item?.course?.priceUnit === "GBP"
                            ? "£"
                            : "#"}
                          {item?.course?.price}
                        </div>

                        {/* Downward Arrow */}
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          }}
                          onClick={() => {
                            setModalShow(true);
                            setIndex(index);
                          }}
                        >
                          <BsChevronDown
                            style={{
                              color: "#11D99A",
                              fontSize: "20px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
          {/* Modal */}
          {index !== undefined && (
            <LearnerDetailsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              learner={requests[index]}
            />
          )}
        </Container>
        <SponsorGroupModal
          show={showSponsorGroupModal}
          onHide={() => setShowSponsorGroupModal(false)}
          onSubmit={handleSponsorGroupSubmit}
        />
      </main>
      <AppFooter />
    </div>
  );
}
