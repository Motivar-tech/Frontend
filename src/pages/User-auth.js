/* eslint-disable */

import "../App.css";
import "../assets/css/main.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { GoogleLogin } from "@react-oauth/google";

import { useState, useEffect } from "react";
import Logo from "../assets/images/Motivar.svg";
import Image_fx from "../assets/images/image_fx.png";
import Image_tab from "../assets/images/image_tab.png";

import { toast } from "react-hot-toast";
import AuthDataServices from "../Services/AuthDataServices.js";

// ── Shared styles ────────────────────────────────────────────────────────────
const inputStyle = {
  borderColor: "#00AA87",
  borderRadius: 8,
  height: 56,
  fontSize: 16,
  fontFamily: "Montserrat, sans-serif",
};

const primaryBtn = {
  background: "#00AA87",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: "1.05rem",
  height: 56,
  fontFamily: "Montserrat, sans-serif",
};

const tabBtnStyle = (active) => ({
  fontFamily: "Montserrat, sans-serif",
  background: active ? "#11D99A" : "#fff",
  border: "2px solid #11D99A",
  color: active ? "#fff" : "#11D99A",
  borderRadius: "8px",
  fontWeight: 600,
  width: "180px",
  boxShadow: "none",
});

// ── Step progress dots ───────────────────────────────────────────────────────
function StepDots({ current, total }) {
  return (
    <div className="d-flex justify-content-center gap-2 mb-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i + 1 <= current ? "#00AA87" : "#e0e0e0",
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

// ── Account type card ────────────────────────────────────────────────────────
function RoleCard({ value, selected, emoji, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: `2px solid ${selected ? "#00AA87" : "#e0e0e0"}`,
        borderRadius: 16,
        padding: "32px 20px",
        flex: 1,
        textAlign: "center",
        background: selected ? "#f1fdf8" : "#fff",
        boxShadow: selected ? "0 4px 16px rgba(0,170,135,0.12)" : "none",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{emoji}</div>
      <h5
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          color: selected ? "#00AA87" : "#333",
          marginBottom: 8,
        }}
      >
        {title}
      </h5>
      <p style={{ fontSize: 13, color: "#666", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
        {description}
      </p>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function AppAuth() {
  const [tabIndex, setTabIndex] = useState(1);

  // ── Sign-in state ──
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Sign-up state ──
  const [signUpStep, setSignUpStep] = useState(1); // 1 | 2 | 3

  // Step 1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [step1Loading, setStep1Loading] = useState(false);

  // Step 2 – resend
  const [resendLoading, setResendLoading] = useState(false);

  // Step 3 – Role selection
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(false);

  const timeoutPromise = (ms) =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out. Please try again.")), ms)
    );

  // ── Restore signup state when returning from verification link ───────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verifiedParam = params.get("verified");

    if (verifiedParam === "true") {
      const saved = sessionStorage.getItem("motivar-signup-state");
      if (saved) {
        try {
          const { email: savedEmail, password: savedPassword } = JSON.parse(saved);
          setEmail(savedEmail || "");
          setPassword(savedPassword || "");
        } catch (_) {
          // ignore malformed data
        }
      }
      setTabIndex(2);
      setSignUpStep(3);
      // Clean up URL without triggering a navigation
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (verifiedParam === "false") {
      setTabIndex(2);
      setSignUpStep(2);
      toast.error("Verification link is invalid or expired. Please request a new one.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // ── Sign in ──────────────────────────────────────────────────────────────
  const handleSignIn = async () => {
    if (!loginMail || !loginPassword) {
      toast.error("Please enter both email and password");
      return;
    }
    setLoginLoading(true);
    try {
      const response = await Promise.race([
        AuthDataServices.signIn({ email: loginMail, password: loginPassword }),
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
      toast.error(
        error.response?.data?.message || error.message || "Sign in failed. Please try again."
      );
      setLoginLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoginLoading(true);
    try {
      const response = await AuthDataServices.googleLogin({
        token: credentialResponse.credential,
      });
      if (response) {
        if (response.data.message === "Complete registration") {
          toast.success("Authentication successful! Please choose your account type.");
          localStorage.setItem("temp-google-data", JSON.stringify(response.data));
          window.location.pathname = "/complete-profile";
        } else {
          toast.success(response.data.message);
          localStorage.setItem("motivar-token", response.data.data.token);
          localStorage.setItem("motivar-user-role", response.data.data.role);
          localStorage.setItem("motivar-user-fname", response.data.data.firstName);
          window.location.pathname = "/dashboard";
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Sign-In failed.");
    } finally {
      setLoginLoading(false);
    }
  };

  // ── Step 1: register → sends verification email ──────────────────────────
  const handleStep1Submit = async () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep1Loading(true);

    try {
      await Promise.race([
        AuthDataServices.signUp({ email, password }),
        timeoutPromise(30000),
      ]);
      // Persist credentials so they survive the round-trip through the
      // verification email link and can be used to sign in on step 3.
      sessionStorage.setItem("motivar-signup-state", JSON.stringify({ email, password }));
      setSignUpStep(2);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Sign up failed. Please try again."
      );
    } finally {
      setStep1Loading(false);
    }
  };

  // ── Step 2: resend verification email ────────────────────────────────────
  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      await AuthDataServices.resendVerificationCode({ email });
      toast.success("Verification email resent. Check your inbox.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not resend email. Try again.");
    } finally {
      setResendLoading(false);
    }
  };

  // ── Step 3: sign in → update role → dashboard ────────────────────────────
  const handleSetRole = async () => {
    if (!role) {
      toast.error("Please select an account type.");
      return;
    }

    setRoleLoading(true);
    try {
      // Sign in with the credentials from Step 1 to obtain a token.
      // This will fail if the user hasn't verified their email yet.
      const signInResponse = await Promise.race([
        AuthDataServices.signIn({ email, password }),
        timeoutPromise(20000),
      ]);
      const { token, firstName } = signInResponse.data.data;

      // Set the chosen role as a profile update
      await Promise.race([
        AuthDataServices.updateProfile(token, { role }),
        timeoutPromise(20000),
      ]);

      toast.success("Account set up! Welcome to Motivar.");
      localStorage.setItem("motivar-token", token);
      localStorage.setItem("motivar-user-role", role);
      if (firstName) localStorage.setItem("motivar-user-fname", firstName);
      sessionStorage.removeItem("motivar-signup-state");
      window.location.pathname = "/dashboard";
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(msg);
      setRoleLoading(false);
    }
  };

  const resetSignUp = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPasswordMatch(true);
    setFormErrors({});
    setRole("");
    setSignUpStep(1);
    sessionStorage.removeItem("motivar-signup-state");
  };

  const handleTabSwitch = (index) => {
    setTabIndex(index);
    if (index === 2) resetSignUp();
  };

  // ── Left image panel (shared across sign-up steps) ───────────────────────
  const SignUpImagePanel = () => (
    <Col
      md={6}
      className="d-none d-md-flex align-items-center justify-content-center"
      style={{ height: "100vh", padding: "40px" }}
    >
      <div style={{ height: "100vh", padding: "48px 0" }}>
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
          }}
        />
      </div>
    </Col>
  );

  // ── Tab switcher (shared across sign-up steps) ───────────────────────────
  const TabSwitcher = () => (
    <div className="d-flex justify-content-center mb-4" style={{ gap: "24px" }}>
      <Button style={tabBtnStyle(tabIndex === 1)} onClick={() => handleTabSwitch(1)}>
        Sign in
      </Button>
      <Button style={tabBtnStyle(tabIndex === 2)} onClick={() => handleTabSwitch(2)}>
        Sign up
      </Button>
    </div>
  );

  return (
    <>
      {/* ════════════════ SIGN IN ════════════════ */}
      {tabIndex === 1 && (
        <main>
          <Container
            fluid
            className="d-flex align-items-center justify-content-center"
            style={{ background: "#fff", minHeight: "100vh", padding: 0 }}
          >
            <Row className="w-100 h-100" style={{ minHeight: "100vh" }}>
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
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </Col>

              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100vh" }}
              >
                <div className="w-100" style={{ maxWidth: 520, padding: "0 24px" }}>
                  <div className="text-center mb-4">
                    <Image src={Logo} alt="Motivar Logo" style={{ maxHeight: 50 }} fluid />
                  </div>

                  <div className="d-flex justify-content-center mb-4" style={{ gap: "24px" }}>
                    <Button style={tabBtnStyle(true)} onClick={() => handleTabSwitch(1)}>
                      Sign in
                    </Button>
                    <Button style={tabBtnStyle(false)} onClick={() => handleTabSwitch(2)}>
                      Sign up
                    </Button>
                  </div>

                  <Form className="mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>
                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="e.g patricksean@gmail.com"
                        value={loginMail}
                        onChange={(e) => setLoginMail(e.target.value)}
                        style={inputStyle}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="*********************"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                        style={inputStyle}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button
                        className="w-50 mb-3"
                        style={{ ...primaryBtn, fontSize: "1.1rem", padding: "0.9rem" }}
                        onClick={handleSignIn}
                        disabled={loginLoading}
                      >
                        {loginLoading ? <Spinner animation="border" size="sm" /> : "Sign in"}
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center mb-3" style={{ color: "#888" }}>Or</div>
                  <div className="d-flex justify-content-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => toast.error("Google Sign-In failed. Please try again.")}
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
      )}

      {/* ════════════════ SIGN UP ════════════════ */}
      {tabIndex === 2 && (
        <main>
          <Container
            fluid
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", background: "#fff" }}
          >
            <Row className="w-100" style={{ minHeight: "100vh" }}>
              <SignUpImagePanel />

              <Col
                md={6}
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ padding: "40px 24px" }}
              >
                <div style={{ width: "100%", maxWidth: 520 }}>
                  <div className="text-center mb-3">
                    <Image src={Logo} style={{ maxHeight: 50 }} fluid />
                  </div>

                  <TabSwitcher />

                  {/* ── Step progress ── */}
                  <StepDots current={signUpStep} total={3} />

                  {/* ══════════ STEP 1: Email & Password ══════════ */}
                  {signUpStep === 1 && (
                    <>
                      <h4
                        className="text-center mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, color: "#222" }}
                      >
                        Create your account
                      </h4>
                      <p
                        className="text-center mb-4"
                        style={{ color: "#888", fontSize: 13, fontFamily: "Montserrat, sans-serif" }}
                      >
                        We'll send a verification code to your email.
                      </p>

                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="ciroma001@motivar.live"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setFormErrors((p) => ({ ...p, email: "" }));
                          }}
                          style={{ ...inputStyle, borderColor: formErrors.email ? "red" : "#00AA87" }}
                          isInvalid={!!formErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="At least 8 characters"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordMatch(e.target.value === confirmPassword);
                            setFormErrors((p) => ({ ...p, password: "" }));
                          }}
                          style={{ ...inputStyle, borderColor: formErrors.password ? "red" : "#00AA87" }}
                          isInvalid={!!formErrors.password}
                        />
                        <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordMatch(e.target.value === password);
                            setFormErrors((p) => ({ ...p, confirmPassword: "" }));
                          }}
                          style={{
                            ...inputStyle,
                            borderColor:
                              formErrors.confirmPassword || (!passwordMatch && confirmPassword)
                                ? "red"
                                : "#00AA87",
                          }}
                          isInvalid={!!formErrors.confirmPassword || (!passwordMatch && !!confirmPassword)}
                          onKeyDown={(e) => e.key === "Enter" && handleStep1Submit()}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.confirmPassword ||
                            (!passwordMatch && confirmPassword && "Passwords do not match.")}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        className="w-100 mb-3"
                        style={primaryBtn}
                        onClick={handleStep1Submit}
                        disabled={step1Loading}
                      >
                        {step1Loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Sending code...
                          </>
                        ) : (
                          "Continue"
                        )}
                      </Button>

                      <div className="text-center mb-3" style={{ color: "#888", fontSize: 13 }}>
                        Or sign up with
                      </div>
                      <div className="d-flex justify-content-center">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => toast.error("Google Sign-Up failed. Please try again.")}
                          type="standard"
                          theme="outline"
                          size="large"
                          logo_alignment="center"
                          shape="circle"
                          text="signup_with"
                          width="300"
                        />
                      </div>
                    </>
                  )}

                  {/* ══════════ STEP 2: Check your email ══════════ */}
                  {signUpStep === 2 && (
                    <>
                      {/* Envelope illustration */}
                      <div className="text-center mb-4">
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: "#f1fdf8",
                            border: "2px solid #00AA87",
                            fontSize: 36,
                          }}
                        >
                          ✉️
                        </div>
                      </div>

                      <h4
                        className="text-center mb-2"
                        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, color: "#222" }}
                      >
                        Check your inbox
                      </h4>

                      <p
                        className="text-center mb-1"
                        style={{ color: "#555", fontSize: 14, fontFamily: "Montserrat, sans-serif" }}
                      >
                        We sent a verification link to
                      </p>
                      <p
                        className="text-center mb-3"
                        style={{
                          color: "#00AA87",
                          fontSize: 15,
                          fontWeight: 600,
                          fontFamily: "Montserrat, sans-serif",
                          wordBreak: "break-all",
                        }}
                      >
                        {email}
                      </p>

                      <p
                        className="text-center mb-4"
                        style={{ color: "#888", fontSize: 13, fontFamily: "Montserrat, sans-serif", lineHeight: 1.6 }}
                      >
                        Open the email and click the verification link inside. Once you've verified
                        your address, come back here and click the button below.
                      </p>

                      <Button
                        className="w-100 mb-3"
                        style={primaryBtn}
                        onClick={() => setSignUpStep(3)}
                      >
                        I've verified my email — Continue
                      </Button>

                      {/* Resend link */}
                      <p
                        className="text-center mb-3"
                        style={{ color: "#888", fontSize: 13, fontFamily: "Montserrat, sans-serif" }}
                      >
                        Didn't receive an email?{" "}
                        <button
                          onClick={handleResendEmail}
                          disabled={resendLoading}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#00AA87",
                            fontWeight: 600,
                            cursor: "pointer",
                            padding: 0,
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: 13,
                            textDecoration: "underline",
                          }}
                        >
                          {resendLoading ? "Sending..." : "Resend email"}
                        </button>
                      </p>

                      <Button
                        variant="link"
                        className="w-100"
                        style={{
                          color: "#888",
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 500,
                          textDecoration: "none",
                          fontSize: 13,
                        }}
                        onClick={() => setSignUpStep(1)}
                      >
                        ← Use a different email
                      </Button>
                    </>
                  )}

                  {/* ══════════ STEP 3: Account Type ══════════ */}
                  {signUpStep === 3 && (
                    <>
                      <h4
                        className="text-center mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, color: "#222" }}
                      >
                        I am joining as a...
                      </h4>
                      <p
                        className="text-center mb-4"
                        style={{ color: "#888", fontSize: 13, fontFamily: "Montserrat, sans-serif" }}
                      >
                        Choose the account type that best describes you.
                      </p>

                      <div className="d-flex gap-4 justify-content-center mb-4">
                        <RoleCard
                          value="learner"
                          selected={role === "learner"}
                          emoji="🎓"
                          title="Learner"
                          description="I want to get my course funded"
                          onClick={() => setRole("learner")}
                        />
                        <RoleCard
                          value="sponsor"
                          selected={role === "sponsor"}
                          emoji="🤝"
                          title="Sponsor"
                          description="I want to fund learners"
                          onClick={() => setRole("sponsor")}
                        />
                      </div>

                      <Button
                        className="w-100 mb-3"
                        style={{
                          ...primaryBtn,
                          background: role ? "#00AA87" : "#b2dfdb",
                          cursor: role ? "pointer" : "not-allowed",
                        }}
                        onClick={handleSetRole}
                        disabled={!role || roleLoading}
                      >
                        {roleLoading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Setting up your account...
                          </>
                        ) : (
                          "Go to Dashboard"
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Container>

          <style>{`
            @media (max-width: 767px) {
              .container-fluid, .row, .col-md-6 {
                min-height: auto !important;
                height: auto !important;
                padding: 10px !important;
              }
            }
          `}</style>
        </main>
      )}
    </>
  );
}
