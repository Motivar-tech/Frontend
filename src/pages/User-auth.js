/* eslint-disable */

import "../App.css";
import "../assets/css/main.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import Headphone from '../assets/images/headphone.png';
import Snapback from '../assets/images/snapback.png';
import AppFooter from '../components/Footer.js';



export default function AppAuth() {
  const [tabIndex, setTabIndex] = useState(1);

  const [loginMail, setLoginMail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginloading, setLoginLoading] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [country, setCountry] = useState();
  const [gender, setGender] = useState();
  const [dateofbirth, setDOB] = useState();
  const [goal, setGoal] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordMatch, setPasswordMatch] = useState(true);

  const AfricanCountries = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Democratic Republic of the Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Ivory Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Republic of the Congo",
    "Rwanda",
    "São Tomé and Príncipe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ];

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSignIn = () => {
    setLoginLoading(true);
    const payload = {
      email: loginMail,
      password: loginPassword,
    };
    axios
      .post(`https://motivar-sponsor-api-v1.onrender.com/user/auth`, payload)
      .then((res) => {
        setLoginLoading(false);
        console.log(res.data.data);
        toast.success(res.data.message);
        window.location.pathname = "/";
        localStorage.setItem("motivar-token", res.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
        setLoginLoading(false);
      });
  };

  const handleSignUp = () => {
    setLoading(true);
    const payload = {
      email,
      password,
      fullName: `${firstName} ${lastName}`,
      country,
      gender,
      dateofbirth,
      goal,
      phoneNumber,
    };
    console.log(payload);
    axios
      .post(`https://motivar-sponsor-api-v1.onrender.com/user/onboard`, payload)
      .then((res) => {
        setLoading(false);
        setTabIndex(1);
        toast.success(res.data.message);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

    return (
      <>
      {
            tabIndex === 1 && (
              <main>
                <Container
                  fluid
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    background: "#fff",
                    minHeight: "100vh",
                    height: "100vh",
                    overflow: "hidden",
                    padding: 0,
                  }}
                >
                  <Row className="w-100 h-100" style={{ minHeight: "100vh" }}>
                    {/* Left: Image */}
                    <Col
                      md={6}
                      className="d-none d-md-flex align-items-center justify-content-center"
                      style={{ height: "100vh" }}
                    >
                      <div
                        style={{
                          height: "90vh",
                          width: "75%",
                          margin: "auto",
                          borderRadius: "32px",
                          overflow: "hidden",
                          background: "#f8f8f8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={Headphone}
                          alt="Sign in visual"
                          fluid
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Col>

                    {/* Right: Form */}
                    <Col
                      md={6}
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "100vh" }}
                    >
                      <div className="w-100" style={{ maxWidth: 420 }}>
                        {/* Logo */}
                        <div className="text-center mb-4">
                          <Image
                            src={Logo}
                            alt="Motivar Logo"
                            style={{ maxHeight: 50 }}
                            fluid
                          />
                        </div>

                        {/* Tab Buttons */}
                        <div className="d-flex justify-content-center mb-4">
                          <Button
                            className="me-2"
                            style={{
                              background: "#59b49a",
                              border: "1px solid #59b49a",
                              color: "#fff",
                              borderRadius: "8px 0 0 8px",
                              fontWeight: 500,
                              width: "140px",
                            }}
                            onClick={() => setTabIndex(1)}
                          >
                            Sign in
                          </Button>
                          <Button
                            variant="outline-success"
                            style={{
                              border: "1px solid #59b49a",
                              color: "#59b49a",
                              background: "#fff",
                              borderRadius: "0 8px 8px 0",
                              fontWeight: 500,
                              width: "140px",
                            }}
                            onClick={() => setTabIndex(2)}
                          >
                            Sign up
                          </Button>
                        </div>

                        {/* Sign In Form */}
                        <Form className="mb-4">
                          <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email/Username</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Email"
                              value={loginMail}
                              onChange={(e) => setLoginMail(e.target.value)}
                              style={{ borderRadius: 8, padding: "0.9rem 1rem" }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-4" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="e.g patricksean@gmail.com"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              style={{ borderRadius: 8, padding: "0.9rem 1rem" }}
                            />
                          </Form.Group>
                          <Button
                            className="w-100 mb-3"
                            style={{
                              background: "#59b49a",
                              border: "none",
                              borderRadius: 8,
                              fontWeight: 500,
                              fontSize: "1.1rem",
                              padding: "0.9rem",
                            }}
                            onClick={handleSignIn}
                            disabled={loginloading}
                          >
                            {loginloading ? "Signing in..." : "Sign in"}
                          </Button>
                        </Form>

                        {/* Or Continue With */}
                        <div className="text-center mb-2" style={{ color: "#888" }}>
                          Or Continue With
                        </div>
                        <div className="text-center">
                          <Button
                            variant="outline-secondary"
                            style={{
                              borderRadius: "50%",
                              width: 48,
                              height: 48,
                              padding: 0,
                              border: "1px solid #e0e0e0",
                              background: "#fff",
                            }}
                          >
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                              alt="Google"
                              style={{ width: 28, height: 28 }}
                            />
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </main>
            )
        }

{/* Sign up tab */}

        {
            tabIndex === 2 && (
              <main>

              <Container fluid>
                <Row className="text-start">

                    <Col md={6} >
                        <Image fluid className="d-none d-md-block" src={Snapback} alt="man"/>
                    </Col>

                    <Col md={6} className="align-content-center p-sm-5">

                        <div className="row mb-5 pb-5">
                            <Image src={Logo} style={{maxHeight: '50px' }}  fluid/>
                        </div>

                        <div className="row mb-5 mt-5 pt-5 justify-content-center">
                          <div className="col-sm-6 col-md-5 d-grid">
                              <Button variant="outline-success" className="btn btn-lg"  onClick={() => setTabIndex(1)}>Sign in</Button>
                          </div>
                          <div className="col-sm-6 col-md-5 d-grid">
                              <Button className="btn btn-lg btn-success text-white " onClick={() => setTabIndex(2)}>Sign up</Button>
                          </div>
                        </div>

                        <Form>

                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-6 col-md-5">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>First Name </Form.Label>
                                <Form.Control type="text" placeholder="Gabriel" />
                              </Form.Group>
                            </div>

                    <div className="col-sm-6 col-md-5">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-4 col-md-3">
                      <Form.Label>Gender </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option>-- select --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nb">Prefer not to say</option>
                      </Form.Select>
                    </div>

                            <div className="col-sm-8 col-md-7">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Email Address</Form.Label>
                                <Form.Control type="text" placeholder="patricksean@gmail.com" />
                              </Form.Group>
                            </div>
                          </div>

                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-5 col-md-4">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Date of birth </Form.Label>
                        <Form.Control
                          type="date"
                          placeholder=""
                          value={dateofbirth}
                          onChange={(e) => setDOB(e.target.value)}
                        />
                      </Form.Group>
                    </div>

                            <div className="col-sm-7 col-md-6">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label className="text-white">xx </Form.Label>
                                <Form.Control type="text" placeholder="" />
                              </Form.Group>
                            </div>
                          </div>


                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-4 col-md-3">
                      <Form.Label>Country </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option>-- select --</option>
                        {AfricanCountries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                            <div className="col-sm-8 col-md-7">
                            <Form.Label>What is your Goal </Form.Label>
                            <Form.Select aria-label="Default select example">
                              <option>-- select --</option>
                              <option value="">Goal</option>
                              <option value="">Goal II</option>
                            </Form.Select>
                            </div>
                          </div>

                          <div className="row mb-3 justify-content-center">
                            <div className="col-sm-12 col-md-10">
                              <p>By clicking 'Submit', I acknowledge and understand
                                 that my personal information may be collected and used as
                                 described in Motivar's privacy policy
                              </p>
                            </div>
                          </div>

                          <div className="row mb-3 mt-5 justify-content-center">
                            <div className="col-sm-12 col-md-10 d-grid">
                                <Button className="btn btn-lg btn-secondary text-white ">Sign in</Button>
                            </div>
                          </div>




                        </Form>


                    </Col>


                </Row>
              </Container>

              </main>
            )
        }




      
      </>
  );
}
