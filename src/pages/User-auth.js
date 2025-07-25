/* eslint-disable */

import "../App.css";
import "../assets/css/main.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { GoogleLogin } from '@react-oauth/google';

import { useRef, useState } from "react";
import Logo from "../assets/images/Motivar.svg";
import CameraIcon from "../assets/Icons/camera.svg";
import PlaneIcon from "../assets/Icons/paper_plane.svg";
import Headphone from "../assets/images/headphone.png";
import Snapback from "../assets/images/snapback.png";
import Image_fx from "../assets/images/image_fx.png";
import Image_tab from "../assets/images/image_tab.png";
import G_icon from "../assets/images/g_icon.png";

import AppFooter from "../components/Footer.js";
import { FaEdit } from "react-icons/fa"; // Edit icon import
import { storage } from "../firebase.js";
import { v4 } from "uuid";

import axios from "axios";
import { toast } from "react-hot-toast";

import AuthDataServices from "../Services/AuthDataServices.js";

export default function AppAuth() {
  const [tabIndex, setTabIndex] = useState(1);

  const [loginMail, setLoginMail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginloading, setLoginLoading] = useState(false);

  const [signUpLoading, setSignUpLoading] = useState(false);


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [country, setCountry] = useState();
  const [gender, setGender] = useState();
  const [dateofbirth, setDOB] = useState();
  const [goal, setGoal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef();

  const [formErrors, setFormErrors] = useState({}); // State to track form errors

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

    // Basic validation
    if (!loginMail || !loginPassword) {
      toast.error("Please enter both email and password");
      setLoginLoading(false);
      return;
    }

    const payload = {
      email: loginMail,
      password: loginPassword,
    };

    // Timeout helper
    const timeoutPromise = (ms) =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out. Please try again.")), ms)
      );

    try {
      // 10 seconds timeout for sign in
      const response = await Promise.race([
        AuthDataServices.signIn(payload),
        timeoutPromise(20000),
      ]);
      if (response) {
        toast.success(response.data.message);
        localStorage.setItem("motivar-token", response.data.data.token);
        localStorage.setItem("motivar-user-role", response.data.data.role);
        localStorage.setItem("motivar-user-fname", response.data.data.firstName);
        window.location.pathname = "/dashboard";
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Sign in failed. Please try again.";
      toast.error(errorMessage);
      setLoginLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoginLoading(true);
    try {
      const response = await AuthDataServices.googleLogin({ 
        token: credentialResponse.credential 
      });

      if (response) {
        if (response.data.message === 'Complete registration') {
          toast.success("Authentication successful! Please complete your profile.");
          // Store temp data and redirect to complete profile
          localStorage.setItem("temp-google-data", JSON.stringify(response.data));
          window.location.pathname = `/complete-profile`;
        } else {
          toast.success(response.data.message);
          localStorage.setItem("motivar-token", response.data.data.token);
          localStorage.setItem("motivar-user-role", response.data.data.role);
          localStorage.setItem("motivar-user-fname", response.data.data.firstName);
          window.location.pathname = "/dashboard";
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Google Sign-In failed.";
      toast.error(errorMessage);
    } finally {
      setLoginLoading(false);
    }
  };

  // const validateForm = () => {
  //   const errors = {};
  //   if (!firstName) errors.firstName = "First name is required.";
  //   if (!lastName) errors.lastName = "Last name is required.";
  //   if (!email) errors.email = "Email is required.";
  //   if (!phoneNumber) errors.phoneNumber = "Phone number is required.";
  //   if (!password) errors.password = "Password is required.";
  //   if (!confirmPassword) errors.confirmPassword = "Confirm password is required.";
  //   if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
  //   if (!goal) errors.goal = "Please select a goal.";
  //   if (!gender) errors.gender = "Please select your gender.";
  //   if (!country) errors.country = "Please select your country.";
  //   if (!fileInputRef.current.files[0]) errors.profilePicture = "Profile picture is required.";
  //   return errors;
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpLoading(true);

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSignUpLoading(false);
      toast.error("Please fill in all required fields correctly");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", `${firstName} ${lastName}`);
    formData.append("phoneNumber", phoneNumber);
    formData.append("country", country || "Nigeria");
    formData.append("gender", gender);
    formData.append(
      "role",
      goal === "I want to ask for help to fund course" ? "learner" : "sponsor"
    );

    // Check if profile picture is selected
    const profilePicture = fileInputRef.current?.files[0];
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    // Timeout helper
    const timeoutPromise = (ms) =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out. Please try again.")), ms)
      );

    try {
      // 15 seconds timeout for sign up
      const response = await Promise.race([
        AuthDataServices.signUp(formData),
        timeoutPromise(30000),
      ]);
      if (response) {
        toast.success(response.data.message);
        setTabIndex(1); // Switch to sign in tab
        // Reset form
        resetForm();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Sign up failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSignUpLoading(false);
    }
  };

  // Helper function to reset form
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setCountry("");
    setGender("");
    setGoal("");
    setConfirmPassword("");
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormErrors({});
  };

  // Enhance form validation
  const validateForm = () => {
    const errors = {};
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    // Name validation
    if (!firstName?.trim()) errors.firstName = "First name is required.";
    if (!lastName?.trim()) errors.lastName = "Last name is required.";
    
    // Phone number validation
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?\d[\d\s\-]{7,}$/.test(phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number.";
    }

    // Other validations
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!goal) errors.goal = "Please select your goal.";
    if (!gender) errors.gender = "Please select your gender.";
    if (!country) errors.country = "Please select your country.";
    
    // Profile picture validation
    if (!fileInputRef.current?.files[0]) {
      errors.profilePicture = "Profile picture is required.";
    }

    return errors;
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 500 * 1024) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image less than 500KB.");
    }
  };

  // Phone number validation (simple international format, can be improved)
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    // Accepts numbers, spaces, +, -, and must be at least 8 digits
    const phoneRegex = /^\+?\d[\d\s\-]{7,}$/;
    if (value && !phoneRegex.test(value)) {
      setPhoneError("Enter a valid phone number");
    } else {
      setPhoneError("");
    }
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
                          src={Image_fx}
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
                      <div className="w-100" style={{ maxWidth: 620 }}>
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
                        <div className="d-flex justify-content-center mb-4" style={{ gap: "60px" }}>
                          <Button
                            className="me-2"
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              background: tabIndex === 1 ? "#11D99A" : "#59b49a",
                              border: `1.5px solid ${tabIndex === 1 ? "#11D99A" : "#59b49a"}`,
                              color: "#fff",
                              borderRadius: "8px",
                              fontWeight: 500,
                              width: "280px",
                              transition: "background 0.2s, border 0.2s"
                            }}
                            onClick={() => setTabIndex(1)}
                          >
                            Sign in
                          </Button>
                          <Button
                            variant="outline-success"
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              background: tabIndex === 2 ? "#11D99A" : "#fff",
                              border: `1.5px solid ${tabIndex === 2 ? "#11D99A" : "#59b49a"}`,
                              color: tabIndex === 2 ? "#fff" : "#59b49a",
                              borderRadius: "8px",
                              fontWeight: 500,
                              width: "280px",
                              transition: "background 0.2s, border 0.2s, color 0.2s"
                            }}
                            onClick={() => setTabIndex(2)}
                          >
                            Sign up
                          </Button>
                        </div>

                        {/* Sign In Form */}
                        <Form className="mb-4"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 500,
                          }}>
                          <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email/Username</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Email"
                              value={loginMail}
                              onChange={(e) => setLoginMail(e.target.value)}
                              style={{ borderRadius: 8, padding: "0.9rem 1rem", borderColor: "#00AA87" }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-4" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="e.g patricksean@gmail.com"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              style={{ borderRadius: 8, padding: "0.9rem 1rem", borderColor: "#00AA87" }}
                            />
                          </Form.Group>
                          <div className="d-flex justify-content-center">
                            <Button
                              className="w-50 mb-3"
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                background: "#00AA87",
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
                          </div>
                        </Form>

                        {/* Or Continue With */}
                        <div className="text-center mb-2" style={{ color: "#888" }}>
                          Or
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                              console.log('Login Failed');
                              toast.error("Google Sign-In failed. Please try again.");
                            }}
                            useOneTap
                            type="standard"
                            theme="outline"
                            size="large"
                            logo_alignment="center"
                            shape="circle"
                            text="continue_with"
                            width="300"
                          />
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
                <Container
                  fluid
                  style={{
                    minHeight: "120vh",
                    background: "#fff"
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Row className="w-100 h-100" style={{ minHeight: "100vh" }}>                                                                                                                                                                                                                                                            
                    <Col
                      md={6}
                      className="d-none d-md-flex align-items-center justify-content-center"
                      style={{
                        height: "100vh",
                        padding: "40px",
                      }}
                    >
                      <div
                        style={{
                          height: "100vh",
                          paddingLeft: "0",
                          paddingTop: "48px",
                          paddingBottom: "48px",
                          paddingRight: "0",
                        }}
                      >
                        <Image
                          src={Image_tab}
                          alt="Sign up visual"
                          fluid
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "90vh",
                            borderRadius: "32px",
                            objectFit: "cover",
                            boxShadow: "none",
                          }}
                        />
                      </div>
                    </Col>
                    <Col
                      md={6}
                      className="align-content-center p-sm-5 d-flex flex-column align-items-center justify-content-center"
                      style={{ height: "100vh" }}
                    >
                      {/* Logo */}
                      <div className="text-center mb-4">
                        <Image src={Logo} style={{ maxHeight: '50px' }} fluid />
                      </div>

                      {/* Tab Buttons */}
                      <div className="d-flex justify-content-center mb-5" style={{ gap: "24px" }}>
                        <Button
                          style={{
                            background: tabIndex === 1 ? "#11D99A" : "#fff",
                            color: tabIndex === 1 ? "#fff" : "#11D99A",
                            border: `2px solid #11D99A`,
                            borderRadius: "8px",
                            fontWeight: 600,
                            width: "180px",
                            boxShadow: "none"
                          }}
                          onClick={() => setTabIndex(1)}
                        >
                          Sign in
                        </Button>
                        <Button
                          style={{
                            background: tabIndex === 2 ? "#11D99A" : "#fff",
                            color: tabIndex === 2 ? "#fff" : "#11D99A",
                            border: `2px solid #11D99A`,
                            borderRadius: "8px",
                            fontWeight: 600,
                            width: "180px",
                            boxShadow: "none"
                          }}
                          onClick={() => setTabIndex(2)}
                        >
                          Sign up
                        </Button>
                      </div>

                      {/* Profile Image Uploader */}
                      <div className="d-flex justify-content-center mb-4 w-100" style={{ position: "relative" }}>
                        <div
                          style={{
                            width: 90,
                            height: 90,
                            borderRadius: "50%",
                            background: "#EAEAEA",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            overflow: "hidden",
                            border: "2px solid #00AA87",
                            margin: "0 auto",
                            position: "relative"
                          }}
                          onClick={() => fileInputRef.current.click()}
                          title="Click to upload profile image"
                        >
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <i className="bi bi-person" style={{ fontSize: 48, color: "#aaa" }}></i>
                          )}
                          {/* Edit icon overlay */}
                          <span
                            style={{
                              position: "absolute",
                              bottom: 8,
                              right: 8,
                              background: "#00AA87",
                              borderRadius: "50%",
                              padding: 4,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                            }}
                          >
                            <FaEdit color="#fff" size={16} />
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleProfileImageChange}
                          />
                        </div>
                      </div>

                      {/* Sign Up Form */}
                      <Form className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: 600, margin: "0 auto" }}>
                        <Row className="mb-3 w-100">
                          <Col sm={6}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="First name"
                                style={{
                                  borderColor: "#00AA87",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18
                                }}
                                onChange={(e) => setFirstName(e.target.value)}
                                isInvalid={!!formErrors.firstName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.firstName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Last name"
                                style={{
                                  borderColor: "#00AA87",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18
                                }}
                                onChange={(e) => setLastName(e.target.value)}
                                isInvalid={!!formErrors.lastName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.lastName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-3 w-100">
                          <Col sm={5}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>Mobile Number</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="+234 XXX XXX XXXX"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                style={{
                                  borderColor: phoneError ? "red" : "#00AA87",
                                  borderRadius: 8,
                                  marginBottom: 8,
                                  height: 56,
                                  fontSize: 18
                                }}
                                isInvalid={!!formErrors.phoneNumber}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.phoneNumber}
                              </Form.Control.Feedback>
                              {phoneError && (
                                <div style={{ color: "red", fontSize: 13, marginTop: -8, marginBottom: 8 }}>
                                  {phoneError}
                                </div>
                              )}
                            </Form.Group>
                          </Col>
                          <Col sm={7}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>Email</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="ciroma001@motivar.live"
                                style={{
                                  borderColor: "#00AA87",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18
                                }}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!formErrors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                         <Row className="mb-3 w-100">
                          <Col sm={6}>
                            <Form.Group>
                              <Form.Label
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontSize: 20,
                                  fontWeight: 500,
                                  textAlign: "left",
                                  width: "100%",
                                }}
                              >
                                Password
                              </Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={handlePasswordChange}
                                style={{
                                  borderColor: passwordMatch ? "#00AA87" : "red",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18,
                                }}
                                isInvalid={!!formErrors.password}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.password}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group>
                              <Form.Label
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontSize: 20,
                                  fontWeight: 500,
                                  textAlign: "left",
                                  width: "100%",
                                }}
                              >
                                Confirm Password
                              </Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                style={{
                                  borderColor: passwordMatch ? "#00AA87" : "red",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18,
                                }}
                                isInvalid={!!formErrors.confirmPassword}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.confirmPassword}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-3 w-100">
                          <Col sm={4}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>Gender</Form.Label>
                              <Form.Select
                                style={{
                                  borderColor: "#00AA87",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18
                                }}
                                onChange={(e) => setGender(e.target.value)}
                                isInvalid={!!formErrors.gender}
                              >
                                <option>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="nb">Prefer not to say</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {formErrors.gender}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col sm={8}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>Country</Form.Label>
                              <Form.Select
                                style={{
                                  borderColor: "#00AA87",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18
                                }}
                                onChange={(e) => setCountry(e.target.value)}
                                isInvalid={!!formErrors.country}
                              >
                                <option>Country</option>
                                {AfricanCountries.map((country, idx) => (
                                  <option key={idx} value={country}>{country}</option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {formErrors.country}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-3 w-100">
                          <Col sm={4}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>Date of Birth</Form.Label>
                              <Form.Control
                                type="date"
                                placeholder="Date of Birth"
                                style={{
                                  borderColor: "#11D99A",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={8}>
                            <Form.Group>
                              <Form.Label style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: 20,
                                fontWeight: 500,
                                textAlign: "left",
                                width: "100%"
                              }}>What do you want to do?</Form.Label>
                              <Form.Select
                                value={goal}
                                onChange={e => setGoal(e.target.value)}
                                style={{
                                  borderColor: "#00AA87",
                                  borderRadius: 8,
                                  marginBottom: 16,
                                  height: 56,
                                  fontSize: 18,
                                  fontFamily: "Montserrat, sans-serif"
                                }}
                                className="custom-goal-select"
                                isInvalid={!!formErrors.goal}
                              >
                                <option value="" disabled hidden>Select an option</option>
                                <option style={{ fontFamily: "Montserrat, sans-serif", fontSize: 14, }}>
                                  I want to ask for help to fund course
                                </option>
                                <option style={{ fontFamily: "Montserrat, sans-serif", fontSize: 14 }}>
                                  I want to sponsor a learner/group of learners
                                </option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {formErrors.goal}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className="mb-3 text-center w-100">
                          <Form.Check
                            type="checkbox"
                            label={
                              <span style={{
                                fontSize: 12,
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: 400
                              }}>
                                I accept the <a href="#">Terms & Conditions</a> and understand my data may be collected and used as described in Motivar's privacy policy
                              </span>
                            }
                          />
                        </div>
                        <div className="d-flex justify-content-center w-100">
                          <Button
                            type="submit"
                            style={{
                              background: "#00AA87",
                              border: "none",
                              borderRadius: 8,
                              fontWeight: 600,
                              width: "100%",
                              fontSize: "1.2rem",
                              height: 56
                            }}
                            onClick={handleSignUp}
                            disabled={!passwordMatch || signUpLoading }
                          >
                            { signUpLoading? "Signing up..." : "Sign up" }
                          </Button>
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

// Add this CSS to your main.css or in a <style> tag for the custom select dropdown highlight
/*
.custom-goal-select option {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
}
.custom-goal-select:focus option:checked,
.custom-goal-select option:active {
  background: #11D99A !important;
  color: #fff !important;
}
*/
