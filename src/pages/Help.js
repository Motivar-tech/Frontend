/* eslint-disable */

import "../App.css";
import "../assets/css/main.css";

import React, { useState } from "react";


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Logo from "../assets/images/Motivar.svg";
import Man from "../assets/images/man.png";
import { BsChevronLeft } from "react-icons/bs";
import AppFooter from "../components/Footer.js";

import { toast } from "react-hot-toast";
import axios from "axios";

export default function AppHelp() {
  const [courseTitle, setCourseTitle] = useState();
  const [platform, setPlatform] = useState();
  const [link, setLink] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [priceUnit, setPriceUnit] = useState('naira');
  const [durationUnit, setDurationUnit] = useState('months');

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [motivation, setMotivation] = useState();
  const [social, setSocial] = useState();
  const [isPrivate, setIsPrivate] = useState(Boolean);

  const [loading, setLoading] = useState(Boolean);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      email,
      link,
      course: {
        price: Number(price),
        courseTitle: courseTitle,
        duration: Number(duration),
        platform: platform,
      },
      motivation,
      account: {
        email: email,
        password: password,
      },
      socials: social,
      isPrivate,
    };

    const token = await localStorage.getItem("motivar-token");
    axios
      .post(
        `https://motivar-sponsor-api-v1.onrender.com/course/request`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
        console.log(error);
      });
  };

  return (
    <>

      <header>
        <Navbar expand="lg" className="bg-body-alt-white">
          <Container className="py-3">
            <div className="container">
              <Navbar.Brand href="/">
                <Image
                  src={Logo}
                  style={{ maxHeight: "30px" }}
                  className=""
                  fluid
                />
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
                <span className="shadow-sm pointer">
                  {" "}
                  <BsChevronLeft />{" "}
                </span>
              </Link>
              <span className="h6 mt-2 ms-3">Request for help</span>
            </div>
          </Row>
        </Container>

        <Container fluid>
          <Row className="ps-md-5 text-start">
            <Col md={6} className="p-4 p-md-0">
              <p className="h4 py-4 ps-4 fw-medium">
                Tell us about your course
              </p>
              <Form className="ps-md-4 p-sm-5">
                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Course Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Graphic design"
                        value={courseTitle}
                        onChange={(e) => {
                          setCourseTitle(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Platform</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name of the platform the course is on"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Link to Course</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="Graphic design"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6 col-md-5">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Price of the Course</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="number"
                          placeholder=""
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <Form.Control
                          as="select"
                          value={priceUnit}
                          onChange={(e) => setPriceUnit(e.target.value)}
                          className="ms-2"
                        >
                          <option value="naira">Naira</option>
                          <option value="dollars">Dollars</option>
                          <option value="pounds">Pounds</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-sm-6 col-md-5">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Duration</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="number"
                          placeholder=""
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                        <Form.Control
                          as="select"
                          value={durationUnit}
                          onChange={(e) => setDurationUnit(e.target.value)}
                          className="ms-2"
                        >
                          <option value="months">Months</option>
                          <option value="weeks">Weeks</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <strong>Platform login details</strong>
                      </Form.Label>
                      <br />
                      <small className=""> *Email</small>
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      <Form.Label>
                        Password{" "}
                        <small>
                          (Edit your password on the platform to the specified
                          format)
                        </small>
                      </Form.Label>
                      <br />
                      <Form.Control
                        type="password"
                        placeholder="Format: MotivarPay4(Add Fullname)"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Short Motivation Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Link to any Social media</Form.Label>
                      <br />
                      <Form.Control
                        type="url"
                        placeholder=""
                        value={social}
                        onChange={(e) => setSocial(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3 align-items-center align-content-center">
                  <div className="col-sm-12">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="Private Request"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            value={isPrivate}
                            checked={() => setIsPrivate(true)}
                          />
                          <Form.Check
                            inline
                            label="Public Request"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            value={isPrivate}
                            checked={() => setIsPrivate(false)}
                          />
                        </div>
                      ))}
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 col-md-10 d-grid">
                    <Button
                      className="btn btn-lg btn-secondary text-white "
                      onClick={() => handleSubmit()}
                    >
                      {loading ? "Loading..." : "SUBMIT FORM"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>

            <Col md={6}>
              <Image fluid className="d-none d-md-block" src={Man} alt="man" />
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
