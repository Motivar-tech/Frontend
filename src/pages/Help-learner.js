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

import { storage } from "../firebase.js";
// import {
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   getStorage,
// } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import GeneralDataServices from "../Services/GeneralDataServices.js";

const handleLogout = () => {
  localStorage.removeItem("motivar-token");
  window.location.href = "/";
};

// start donate modal
function DonateRandomly(props) {
  const handlePaymentIntent = async () => {
    let token = await localStorage.getItem("motivar-token");
    try {
      const res = await GeneralDataServices.InitiatePayment(
        props?.requests[props?.index]?._id,
        token
      );
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="grid-example">
        {/* {console.log(props?.requests[props?.index]?.user?.profilePicture)} */}
        <Container className="p-4">
          <Row className="justify-content-center align-items-center g-0">
            <Col xs={12} md={4}>
              <Image
                src={
                  props?.requests[props?.index]?.user?.profilePicture
                    ? props?.requests[props?.index]?.user?.profilePicture
                    : Test
                }
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                alt="image"
              />
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
                  // borderColor: "#11d99a",
                  // borderStyle: "solid",
                  // borderWidth: "thin",
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
                {props?.requests[props?.index]?.course?.priceUnit === "naira"
                  ? "N"
                  : props?.requests[props?.index]?.course?.priceUnit ===
                    "dollars"
                  ? "$"
                  : "£"}
                {props?.requests[props?.index]?.course?.price}{" "}
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
                  style={{ color: "#11d99a", cursor: "pointer" }}
                  onClick={() => {
                    const url = props?.requests[props?.index]?.link;
                    //const fullUrl = url.startsWith('http') ? url : `https://www.${url}`;

                    window.open(url, "_blank");
                  }}
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
        <Button
          className="btn-secondary text-white"
          onClick={() => {
            props.showQuest();
            const url = props?.requests[props?.index]?.link;
            window.open(url, "_blank");
            handlePaymentIntent();
          }}
        >
          Sponsor
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// end donate modal

// start meet learner modal
function MeetLearner(props) {
  // anonymous declaration
  const [modalShowIII, setModalShowIII] = useState(false);
  const [meetLearner, setShowMeetLearner] = useState(Boolean);

  const [link, setLink] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const handleMeetLearner = async (time, date, link) => {
    // console.log(time, date, link);
    const token = await localStorage.getItem("motivar-token");
    const payload = { time: time, date: date, link: link };
    try {
      const response = await GeneralDataServices.MeetLearner(
        props.requests._id,
        payload,
        token
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {meetLearner === true ? (
        <>
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <p className="h2 text-center">Meet Learner</p>
            </Modal.Header>
            <Modal.Body>
              <p className="text-left">
                Create a meeting link, on google meet <br />
                add the meeting link here and schedule a meeting time with the
                learner
              </p>
              <p style={{ marginVertical: 10 }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ width: "25%" }}>Meet Link</label>
                  <input
                    placeholder="Enter Meet Link..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    style={{
                      paddingHorizontal: 10,
                      border: "1px solid grey",
                      paddingVertical: 15,
                      width: "70%",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ width: "25%" }}>
                    Meeting Date (DD/MM/YYYY)
                  </label>
                  <input
                    placeholder="What day do you want to meet?..."
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      paddingHorizontal: 10,
                      border: "1px solid grey",
                      paddingVertical: 15,
                      width: "70%",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ width: "25%" }}>Meeting Time (HH/MM)</label>
                  <input
                    placeholder="What time do you want to meet?..."
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{
                      paddingHorizontal: 10,
                      border: "1px solid grey",
                      paddingVertical: 15,
                      width: "70%",
                    }}
                  />
                </div>
              </p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button
                className="btn-secondary text-white"
                onClick={() => {
                  // setShowMeetLearner(false);
                  handleMeetLearner(time, date, link);
                  setModalShowIII(true);
                }}
              >
                Done
              </Button>
              {/* <Button
                onClick={() => setModalShowIII(true)}
                className="btn-secondary text-white"
              >
                Anonymous
              </Button> */}
              <Anonymous
                show={modalShowIII}
                onHide={() => setModalShowIII(false)}
                requestID={props?.requests?._id}
              />
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          {" "}
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
              <Button
                className="btn-secondary text-white"
                onClick={() => {
                  setShowMeetLearner(true);
                }}
              >
                Meet Learner
              </Button>
              <Button
                onClick={() => setModalShowIII(true)}
                className="btn-secondary text-white"
              >
                Anonymous
              </Button>
              <Anonymous
                show={modalShowIII}
                onHide={() => setModalShowIII(false)}
                requestID={props?.requests?._id}
              />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

//end  meet learner modal

// start anonymous modal
function Anonymous(props) {
  const [pickFile, setPickFile] = useState(null);
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(Boolean);

  const uploadFile = () => {
    setLoading(true);
    if (pickFile == null) {
      return null;
    } else {
      const imageRef = ref(
        getStorage(),
        `payment-proof/${pickFile.name + v4()}`
      );
      const uploadTask = uploadBytesResumable(imageRef, pickFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress) + "% ");
          switch (snapshot.state) {
            case "paused":
              // setUploadStatus("Paused");
              break;
            case "running":
              // setUploadStatus("Uploading...");
              break;
          }
        },
        (error) => {
          alert("Sorry, upload denied at the moment, Please try again later!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setLoading(false);
            setPicture(downloadURL);
          });
        }
      );
    }
  };

  const handlePictureChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddProofPayment = async () => {
    const token = await localStorage.getItem("motivar-token");
    try {
      const res = await GeneralDataServices.AddProof(
        props.requestID,
        { link: picture },
        token
      );
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
        <p className="h4 text-center fw-medium">Add Proof of Payment</p>
        <input
          onChange={(e) => {
            handlePictureChange(e);
            setPickFile(e.target.files[0]);
          }}
          // ref={pick}
          type="file"
          accept="image/*"
        />
        <br />
        <Button
          className="btn-secondary text-white"
          onClick={() => uploadFile()}
        >
          Upload Proof
        </Button>
      </Modal.Body>
      <Modal.Footer>
        {loading === false && picture && (
          <Button
            className="btn-secondary text-white"
            onClick={() => handleAddProofPayment()}
          >
            Complete
          </Button>
        )}
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

  return (
    <>
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
                <Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline-secondary"
                    className="btn-lg me-2 d-inline-flex out-btn"
                  >
                    Log Out
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
            <p className="display-6 fw-medium">Help a Learner's Journey</p>
          </div>
          {/* <div className="subtract"><p className="h1 display-4 fw-semibold">Help a Learner's Journey</p></div> */}
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
                  showQuest={() => setModalShowII(true)}
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
                  // index={index}
                  requests={requests[index]}
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
                          <Image
                            src={
                              item?.user?.profilePicture
                                ? item?.user?.profilePicture
                                : Test
                            }
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                            alt="image"
                          />
                          {/* <span className="shadow-sm pointer ms-3"> */}{" "}
                          {item?.course?.priceUnit === "naira"
                            ? "N"
                            : item?.course?.priceUnit === "dollars"
                            ? "$"
                            : "£"}
                          {item?.course?.price}
                          {/* </span> */}
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
