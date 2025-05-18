/* eslint-disable */

import "../App.css";
import "../assets/css/main.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Logo from "../assets/images/Motivar.svg";
import CameraIcon from "../assets/Icons/camera.svg";
import PlaneIcon from "../assets/Icons/paper_plane.svg";
import Headphone from "../assets/images/headphone.png";
import Snapback from "../assets/images/snapback.png";
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
import AuthDataServices from "../Services/AuthDataServices.js";

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
  const [profilePicture, setProfilePicture] = useState(null);

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

  const handleSignIn = async () => {
    setLoginLoading(true);
    const payload = {
      email: loginMail,
      password: loginPassword,
    };

    try {
      const response = await AuthDataServices.signIn(payload);
      if (response) {
        setLoginLoading(false);
        toast.success(response.data.message);
        window.location.pathname = "/";
        localStorage.setItem("motivar-token", response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSignUp = async () => {
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
      profilePicture,
    };
    console.log(payload);

    try {
      const response = await AuthDataServices.signUp(payload);
      if (response) {
        setLoading(false);
        setTabIndex(1);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const pickImage = useRef(null);
  const [image, setImage] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);


  const handlePickImage = () => {
    pickImage.current.click();
  };

  const handleSelectImage = (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    setPickedImage(event.target.files[0]);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = () => {
    if (pickedImage == null) {
      return null;
    } else {
      const imageRef = ref(
        getStorage(),
        `profile_image/${pickedImage.name + v4()}`
      );
      const uploadTask = uploadBytesResumable(imageRef, pickedImage);
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
            // setLoading(false);
            setProfilePicture(downloadURL);
          });
        }
      );
    }
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

              <Col md={6} className="align-content-center p-4">
                <div className="row ">
                  <Image src={Logo} style={{ maxHeight: "30px" }} fluid />
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
                    <div className="col-sm-12 col-md-10 d-grid"></div>
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

              <Col md={6} className="align-content-center p-4">
                <div className="row mb-5 pb-5">
                  <Image src={Logo} style={{ maxHeight: "30px" }} fluid />
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
                    <div
                      style={{
                        width: "fit-content",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "12vh",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "gray",
                          borderRadius: "50%",
                          height: "150px",
                          width: "150px",
                          position: "relative",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {image === null ? (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              onClick={handlePickImage}
                              src={CameraIcon}
                              style={{ maxHeight: "50px" }}
                            />
                            <input
                              ref={pickImage}
                              type="file"
                              accept="image/*"
                              onChange={handleSelectImage}
                              style={{ display: "none" }}
                            />
                          </div>
                        ) : (
                          <>
                            <Image
                              src={image}
                              style={{
                                height: "150px",
                                objectFit: "cover",
                                width: "150px",
                                borderRadius: "50%",
                              }}
                            />
                            <div
                              style={{
                                position: "relative",
                              }}
                            >
                              {profilePicture === null && (
                                <Image
                                  src={PlaneIcon}
                                  onClick={handleUploadImage}
                                  style={{
                                    maxHeight: "50px",
                                    position: "absolute",
                                    right: 0,
                                    bottom: -10,
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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
                        <option value="nb">Prefer not to say</option>
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
                          placeholder="patrickobi@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row mb-3 justify-content-center">
                    <div className="col-sm-6 col-md-5">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="********"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-6 col-md-5">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="********"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          isInvalid={!passwordMatch}
                        />
                        {!passwordMatch && (
                          <Form.Control.Feedback type="invalid">
                            Passwords do not match.
                          </Form.Control.Feedback>
                        )}
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

                    <div className="col-sm-8 col-md-7 mb-3">
                      <Form.Label>What is your Goal </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                      >
                        <option>-- select --</option>
                        <option value="learner">Learner</option>
                        <option value="sponsor">Sponsor</option>
                      </Form.Select>
                    </div>
                    <div className="col-sm-12 col-md-10"></div>
                  </div>
                  <div className="row mb-3 mt-5 justify-content-center">
                    <div className="col-sm-12 col-md-10 d-grid">
                      <Button
                        className="btn btn-lg btn-success text-white"
                        onClick={() => {
                          handleSignUp();
                        }}
                        disabled={!passwordMatch}
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
