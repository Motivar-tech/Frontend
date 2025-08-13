/* eslint-disable */

import "../App.css";
import "../assets/css/main.css";

import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Image_help from "../assets/images/image_help.png";
import Image from "react-bootstrap/Image";
import SuccessTick from "../assets/images/successTick.png";  
import Logo from "../assets/images/Motivar.svg";
import { BsChevronLeft } from "react-icons/bs";
import AppFooter from "../components/Footer.js";
import { toast } from "react-hot-toast";
import GeneralDataServices from "../Services/GeneralDataServices.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppHelp() {
  const [courseTitle, setCourseTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [priceUnit, setPriceUnit] = useState("NGN");
  const [durationUnit, setDurationUnit] = useState("months");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [motivation, setMotivation] = useState("");
  const [social, setSocial] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [privateEmails, setPrivateEmails] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false );
  const checkboxRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleAddEmailField = () => {
    setPrivateEmails([...privateEmails, ""]);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...privateEmails];
    updatedEmails[index] = value;
    setPrivateEmails(updatedEmails);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setTimeout(() => {
        if (checkboxRef.current) {
          const checkboxRect = checkboxRef.current.getBoundingClientRect();
          setModalPosition({
            top: checkboxRect.bottom + window.scrollY + 10, // Position below the checkbox
            left: checkboxRect.left + window.scrollX, // Align with the checkbox
          });
        }
      }, 0); // Delay to ensure DOM is updated
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      email,
      link,
      course: {
        price: Number(price),
        priceUnit,
        courseTitle,
        duration: Number(duration),
        durationUnit,
        platform,
      },
      motivation,
      account: {
        email,
        password,
      },
      socials: social,
      isPrivate,
      isPublic,
      recipientEmails: privateEmails, // Pass recipient emails
    };

    const token = localStorage.getItem("motivar-token");
    try {
      const response = await GeneralDataServices.RequestHelp(payload, token);
      if (response) {
        setLoading(false);
        toast.success(response.data.message);
        setIsSubmitted(true); // Set the state to show the success screen
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Submission failed");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("motivar-user-role");
    setUserRole(role);

    if (role === "sponsor") {
      navigate("/restricted");
    }
  }, [navigate]);

  if (userRole === "sponsor") {
    return null;
  }

  if (isSubmitted) {
    // Render the success screen
    
    return (
    <div>
      <style>
          {`
            @media (min-width: 768px) {
              .desktop-adjust {
                margin-left: -800px; /* Apply negative margin only on desktop screens */
              }
            }
          `}
        </style>
      <header>
        <Navbar expand="lg" className="bg-body-alt-white" style={{
      paddingTop: "20px",
      paddingBottom: "10px",

    }}>
          <Container className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Link to="/" className="shadow-sm pointer d-flex align-items-center">
                <BsChevronLeft size={24} />
                <span
                  className="ms-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "30px",
                    fontWeight: 500,
                  }}
                >
                </span>
              </Link>
              <span className="h6 mt-2 ms-3" style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "30px",
                    fontWeight: 650,}}>Request for help</span>
            </div>
            <Image src={Logo} style={{ maxHeight: "30px" }} fluid />
          </Container>
        </Navbar>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          flexDirection: "column", // Ensure proper stacking for mobile
        }}
      >
        <div
          className="desktop-adjust"
          style={{
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          <img
            src={SuccessTick}
            alt="Success Tick"
            style={{
              width: "150px",
              height: "150px",
              marginBottom: "20px",
            }}
          />
          <h1
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "80px",
              fontWeight: "bold",
            }}
          >
            Success
          </h1>
          <button
            style={{
              backgroundColor: "#00AA87",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              width: "400px",
              height: "50px",
            }}
            onClick={() => (window.location.href = "/")} // Redirects to home
          >
            GO HOME
          </button>
        </div>

        {/* Conditionally render the image for larger screens */}
        <div className="d-none d-md-block">
          <Image
            src={Image_help}
            alt="Motivar"
            fluid
            style={{
              position: "absolute",
              top: "50%",
              right: "150px",
              transform: "translateY(-50%)",
              borderRadius: "16px",
              objectFit: "cover",
              width: "30%",
              height: "80%",
            }}
          />
        </div>
      </div>
    </div>
  );
  }

  const userFirstName = localStorage.getItem("motivar-user-fname") || "Hi";

  // Add validation logic
  const isFormValid =
    courseTitle.trim() &&
    platform.trim() &&
    link.trim() &&
    price.trim() &&
    duration.trim() &&
    email.trim() &&
    password.trim() &&
    motivation.trim() &&
    social.trim() &&
    (!isPrivate || privateEmails.every((e) => e.trim() !== ""));

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-alt-white" style={{
      paddingTop: "50px",
      paddingBottom: "10px",

    }}>
          <Container className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Link to="/" className="shadow-sm pointer d-flex align-items-center">
                <BsChevronLeft size={24} />
                <span
                  className="ms-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "30px",
                    fontWeight: 500,
                  }}
                >
                </span>
              </Link>
              <span className="h6 mt-2 ms-3" style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "30px",
                    fontWeight: 650,}}>Request for help</span>
            </div>
            <Image src={Logo} style={{ maxHeight: "30px" }} fluid />
          </Container>
        </Navbar>
      </header>

      <main>
        <Container fluid>
          <Row>
            <Col md={6} className="p-5 d-flex flex-column align-items-center">
              <h4
                className="fw-medium mb-4"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {userFirstName}, tell us about your course
              </h4>
              <Form style={{ width: "80%" }}>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >Course Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digital Marketing for Beginners"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#00AA87",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >Platform</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Coursera"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#00AA87",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >Link to Course</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#00AA87",
                    }}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >Price of the Course</Form.Label>
                      <div className="d-flex">
                        <Form.Select
                          value={priceUnit}
                          onChange={(e) => setPriceUnit(e.target.value)}
                          style={{
                            borderRadius: "8px",
                            borderColor: "#00AA87",
                            width: "100px",
                            fontWeight: 500,
                          }}
                          className="me-2"
                        >
                          <option value="NGN">NGN</option>
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                        </Form.Select>
                        <Form.Control
                          type="number"
                          placeholder="e.g. 5000"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          style={{
                            borderRadius: "8px",
                            borderColor: "#00AA87",
                            flex: 1
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >Duration</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="number"
                          placeholder="e.g. 3"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          style={{
                            borderRadius: "8px",
                            borderColor: "#00AA87",
                            flex: 1
                          }}
                        />
                        <Form.Select
                          value={durationUnit}
                          onChange={(e) => setDurationUnit(e.target.value)}
                          style={{
                            borderRadius: "8px",
                            borderColor: "#00AA87",
                            width: "120px"
                          }}
                          className="ms-2"
                        >
                          <option value="months">Months</option>
                          <option value="weeks">Weeks</option>
                        </Form.Select>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>


                <Form.Group className="mb-3">
                  <br/>
                  <p
                  style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "20px",
                      fontWeight: 500,
                    }}> Platform Login Details</p>
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#00AA87",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >Password</Form.Label>
                  <p
                  style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "11px",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}>(Edit your password on the platform  to the specified format)</p>
                  <Form.Control
                    type="password"
                    placeholder="Format: MotivarPay4(Add Fullname)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#00AA87",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >Why do you need this course?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Maximum of 50 words"
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#00AA87",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >Link to any Social Media</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="e.g. https://linkedin.com/in/username"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#00AA87",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Make this request private"
                    checked={isPrivate}
                    onChange={(e) => {
                      handleCheckboxChange(e);
                      setIsPrivate(e.target.checked);
                      setShowModal(e.target.checked);
                    }}
                    ref={checkboxRef} // Attach the ref to the checkbox
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Make this request public"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                </Form.Group>

                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#00AA87",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "none",
                  }}
                  onClick={handleSubmit}
                  disabled={loading || !isFormValid} // Disable if loading or form is invalid
                >
                  {loading ? "SUBMITTING..." : "SUBMIT FORM"}
                </Button>
              </Form>
            </Col>

            <Col md={6} className="d-none d-md-block p-5">
              <Image
                src={Image_help}
                alt="Motivar"
                fluid
                style={{
                  borderRadius: "16px",
                  objectFit: "cover",
                  width: "80%",
                  height: "70%",
                }}
              />
            </Col>
          </Row>
        </Container>
      </main>

      
      {/* Modal */}
      {showModal && (
  <div
    style={{
      position: "absolute",
      top: modalPosition.top,
      left: modalPosition.left,
      width: "383px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      zIndex: 1050,
    }}
  >
    <h6
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        fontWeight: 500,
      }}
    >
      Send request privately
    </h6>
    <p
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "10px",
        fontWeight: 400,
      }}
    >
      Add email(s) below
    </p>
    {privateEmails.map((email, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => handleEmailChange(index, e.target.value)}
          style={{
            borderRadius: "8px",
            borderColor: "#00AA87",
            flex: 1,
          }}
        />
        <Button
          variant="outline-success"
          style={{
            marginLeft: "10px",
            borderColor: "#00AA87",
            color: "#00AA87",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +
        </Button>
      </div>
    ))}
    <Button
      variant="link"
      onClick={handleAddEmailField}
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        color: "#00AA87",
        textDecoration: "none",
        marginBottom: "10px",
      }}
    >
      + Send more
    </Button>
    <Button
      variant="success"
      className="w-100"
      onClick={() => setShowModal(false)}
      style={{
        backgroundColor: "#00AA87",
        border: "none",
        color: "#fff",
        borderRadius: "8px",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "16px",
        fontWeight: 600,
      }}
    >
      DONE
    </Button>
  </div>
)}
    </>
  );
}
