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
import { BsChevronLeft } from "react-icons/bs";
import AppFooter from "../components/Footer.js";

import { toast } from "react-hot-toast";
import GeneralDataServices from "../Services/GeneralDataServices.js";

export default function AppHelp() {
  const [courseTitle, setCourseTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [priceUnit, setPriceUnit] = useState("naira");
  const [durationUnit, setDurationUnit] = useState("months");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [motivation, setMotivation] = useState("");
  const [social, setSocial] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [loading, setLoading] = useState(false);

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
    };

    const token = localStorage.getItem("motivar-token");
    try {
      const response = await GeneralDataServices.RequestHelp(payload, token);
      if (response) {
        setLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Submission failed");
    }
  };

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-alt-white">
          <Container className="py-3">
            <Navbar.Brand href="/">
              <Image src={Logo} style={{ maxHeight: "30px" }} fluid />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container fluid>
          <Row className="ps-md-5 text-start">
            <div className="ps-5 d-flex align-items-center">
              <Link to="/">
                <span className="shadow-sm pointer">
                  <BsChevronLeft />
                </span>
              </Link>
              <span className="h6 mt-2 ms-3">Request for help</span>
            </div>
          </Row>
        </Container>

        <Container fluid>
          <Row className="ps-md-5 text-start">
            <Col md={6} className="p-4 p-md-0">
              <p className="h4 py-4 ps-4 fw-medium">Tell us about your course</p>
              <Form className="ps-md-4 p-sm-5">
                {/* Course Title */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Label>Course Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Graphic design"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </Form.Group>

                {/* Platform */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Label>Platform</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name of the platform the course is on"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  />
                </Form.Group>

                {/* Link */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Label>Link to Course</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3 col-md-5">
                  <Form.Label>Price of the Course</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Form.Select
                      value={priceUnit}
                      onChange={(e) => setPriceUnit(e.target.value)}
                      className="ms-2"
                    >
                      <option value="naira">Naira</option>
                      <option value="dollars">Dollars</option>
                      <option value="pounds">Pounds</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                {/* Duration */}
                <Form.Group className="mb-3 col-md-5">
                  <Form.Label>Duration</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                    <Form.Select
                      value={durationUnit}
                      onChange={(e) => setDurationUnit(e.target.value)}
                      className="ms-2"
                    >
                      <option value="months">Months</option>
                      <option value="weeks">Weeks</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Label>
                    <strong>Platform login details</strong>
                    <br />
                    <small>*Email</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Label>
                    Password{" "}
                    <small>
                      (Edit your password on the platform to the specified
                      format)
                    </small>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Format: MotivarPay4(Add Fullname)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/* Motivation */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Label>Short Motivation Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                  />
                </Form.Group>

                {/* Social */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Label>Link to any Social media</Form.Label>
                  <Form.Control
                    type="url"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                  />
                </Form.Group>

                {/* Private */}
                <Form.Group className="mb-3 col-md-10">
                  <Form.Check
                    type="checkbox"
                    label="Make this request private"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>

      <AppFooter />
    </>
  );
}
