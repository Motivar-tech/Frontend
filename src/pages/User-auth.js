import "../App.css";
import "../assets/css/main.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Logo from "../assets/images/Motivar.svg";
import Headphone from "../assets/images/headphone.png";
import Snapback from "../assets/images/snapback.png";

import axios from "axios";
import toast from "react-hot-toast";

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
        window.location.pathname = "/"
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
      phoneNumber
    };
    console.log(payload);
    axios
      .post(`https://motivar-sponsor-api-v1.onrender.com/user/onboard`, payload)
      .then((res) => {
        setLoading(false);
        setTabIndex(1);
        toast.success(res.data.message)
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
      {tabIndex === 1 && (
        <main>
          <Container fluid>
            <Row className="text-start">
              <Col md={6}>
                <Image
                  fluid
                  className="d-none d-md-block"
                  src={Headphone}
                  alt="man"
                />
              </Col>

              <Col md={6} className="align-content-center p-sm-5">
                <div className="row mb-5 pb-5">
                  <Image src={Logo} style={{ maxHeight: "50px" }} fluid />
                </div>

                <div className="row mb-5 mt-5 pt-5 justify-content-center">
                  <div className="col-sm-6 col-md-5 d-grid">
                    <Button
                      className="btn btn-lg btn-success text-white "
                      onClick={() => setTabIndex(1)}
                    >
                      Sign in
                    </Button>
                  </div>
                  <div className="col-sm-6 col-md-5 d-grid">
                    <Button
                      variant="outline-success"
                      className="btn btn-lg"
                      onClick={() => setTabIndex(2)}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>

                <Form>
                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          value={loginMail}
                          onChange={(e) => setLoginMail(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-5 justify-content-center">
                    <div className="col-sm-12 col-md-10">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="********"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3 mt-5 justify-content-center">
                    <div className="col-sm-12 col-md-10 d-grid">
                      <Button
                        className="btn btn-lg btn-secondary text-white "
                        onClick={() => handleSignIn()}
                      >
                        {loginloading ? "Loading... " : "Sign in"}
                      </Button>
                    </div>
                  </div>

                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-12 col-md-10 d-grid">
                      <Button className="btn btn-lg btn-secondary text-white ">
                        Sign in with
                      </Button>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </main>
      )}

      {/* Sign up tab */}

      {tabIndex === 2 && (
        <main>
          <Container fluid>
            <Row className="text-start">
              <Col md={6}>
                <Image
                  fluid
                  className="d-none d-md-block"
                  src={Snapback}
                  alt="man"
                />
              </Col>

              <Col md={6} className="align-content-center p-sm-5">
                <div className="row mb-5 pb-5">
                  <Image src={Logo} style={{ maxHeight: "50px" }} fluid />
                </div>

                <div className="row mb-5 mt-5 pt-5 justify-content-center">
                  <div className="col-sm-6 col-md-5 d-grid">
                    <Button
                      variant="outline-success"
                      className="btn btn-lg"
                      onClick={() => setTabIndex(1)}
                    >
                      Sign in
                    </Button>
                  </div>
                  <div className="col-sm-6 col-md-5 d-grid">
                    <Button
                      className="btn btn-lg btn-success text-white "
                      onClick={() => setTabIndex(2)}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>

                <Form>
                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-6 col-md-5">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>First Name </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Jane"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
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
                      </Form.Select>
                    </div>

                    <div className="col-sm-8 col-md-7">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="patricksean@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
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
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
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
                        <option value="Nigeria">Nigeria</option>
                        <option value="Gambia">Gambia</option>
                      </Form.Select>
                    </div>

                    <div className="col-sm-8 col-md-7 mb-3">
                      <Form.Label>What is your Goal </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                      >
                        <option>-- select --</option>
                        <option value="Learner">Learner</option>
                        <option value="Sponsor">Sponsor</option>
                      </Form.Select>
                    </div>
                    <div className="col-sm-12 col-md-10">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Phone Number </Form.Label>
                      <Form.Control
                        aria-label="Default select example"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  </div>


                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-12 col-md-10">
                      <p>
                        By clicking 'Submit', I acknowledge and understand that
                        my personal information may be collected and used as
                        described in Motivar's privacy policy
                      </p>
                    </div>
                  </div>

                  <div className="row mb-3 mt-5 justify-content-center">
                    <div className="col-sm-12 col-md-10 d-grid">
                      <Button
                        className="btn btn-lg btn-secondary text-white "
                        onClick={() => {
                          handleSignUp();
                        }}
                      >
                        {loading ? "Loading... " : "Sign up"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </main>
      )}
    </>
  );
}
