import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { toast } from "react-hot-toast";
import AuthDataServices from "../Services/AuthDataServices";
import Logo from "../assets/images/Motivar.svg";
import Image_tab from "../assets/images/image_tab.png";

export default function CompleteProfile() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleData, setGoogleData] = useState(null);

  useEffect(() => {
    const tempData = localStorage.getItem("temp-google-data");
    if (tempData) {
      setGoogleData(JSON.parse(tempData));
    } else {
      window.location.pathname = "/user-auth";
    }
  }, []);

  const handleSubmit = async () => {
    if (!role) {
      toast.error("Please choose an account type.");
      return;
    }

    setLoading(true);

    try {
      const finalData = {
        role,
        email: googleData.data.email,
        fullName: googleData.data.fullName,
        profilePictureUrl: googleData.data.profilePictureUrl,
        googleId: googleData.data.googleId,
      };

      const response = await AuthDataServices.finalizeGoogleRegistration(finalData);

      if (response) {
        toast.success("Registration completed successfully!");
        localStorage.removeItem("temp-google-data");
        localStorage.setItem("motivar-token", response.data.data.token);
        localStorage.setItem("motivar-user-role", response.data.data.role);
        localStorage.setItem("motivar-user-fname", response.data.data.firstName || googleData.data.fullName);
        window.location.pathname = "/dashboard";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid style={{ minHeight: "100vh", background: "#fff" }}>
      <Row style={{ minHeight: "100vh" }}>
        {/* Left image */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{ height: "100vh", padding: "40px" }}
        >
          <div style={{ height: "100vh", padding: "48px 0" }}>
            <Image
              src={Image_tab}
              alt="Complete profile visual"
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

        {/* Right: account type selection */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
          style={{ padding: "40px 24px" }}
        >
          <div style={{ width: "100%", maxWidth: "520px" }}>
            {/* Logo */}
            <div className="text-center mb-4">
              <Image src={Logo} style={{ maxHeight: "50px" }} fluid />
            </div>

            {/* Google profile info */}
            {googleData && (
              <div className="text-center mb-5">
                <Image
                  src={googleData.data.profilePictureUrl}
                  alt="Profile"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: "3px solid #00AA87",
                    marginBottom: 12,
                  }}
                />
                <h5
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, marginBottom: 4 }}
                >
                  {googleData.data.fullName}
                </h5>
                <p style={{ color: "#888", fontSize: 14, marginBottom: 0 }}>
                  {googleData.data.email}
                </p>
              </div>
            )}

            <h4
              className="text-center mb-2"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, color: "#222" }}
            >
              I am joining as a...
            </h4>
            <p
              className="text-center mb-4"
              style={{ color: "#888", fontSize: 14, fontFamily: "Montserrat, sans-serif" }}
            >
              Choose the account type that best describes you.
            </p>

            <div className="d-flex gap-4 justify-content-center mb-5">
              {/* Learner card */}
              <div
                onClick={() => setRole("learner")}
                style={{
                  cursor: "pointer",
                  border: `2px solid ${role === "learner" ? "#00AA87" : "#e0e0e0"}`,
                  borderRadius: 16,
                  padding: "32px 20px",
                  flex: 1,
                  textAlign: "center",
                  background: role === "learner" ? "#f1fdf8" : "#fff",
                  transition: "all 0.2s",
                  boxShadow: role === "learner" ? "0 4px 16px rgba(0,170,135,0.12)" : "none",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
                <h5
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    color: role === "learner" ? "#00AA87" : "#333",
                    marginBottom: 8,
                  }}
                >
                  Learner
                </h5>
                <p style={{ fontSize: 13, color: "#666", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
                  I want to get my course funded
                </p>
              </div>

              {/* Sponsor card */}
              <div
                onClick={() => setRole("sponsor")}
                style={{
                  cursor: "pointer",
                  border: `2px solid ${role === "sponsor" ? "#00AA87" : "#e0e0e0"}`,
                  borderRadius: 16,
                  padding: "32px 20px",
                  flex: 1,
                  textAlign: "center",
                  background: role === "sponsor" ? "#f1fdf8" : "#fff",
                  transition: "all 0.2s",
                  boxShadow: role === "sponsor" ? "0 4px 16px rgba(0,170,135,0.12)" : "none",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
                <h5
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    color: role === "sponsor" ? "#00AA87" : "#333",
                    marginBottom: 8,
                  }}
                >
                  Sponsor
                </h5>
                <p style={{ fontSize: 13, color: "#666", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
                  I want to fund learners
                </p>
              </div>
            </div>

            <Button
              className="w-100"
              style={{
                background: role ? "#00AA87" : "#b2dfdb",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "18px",
                height: "56px",
                fontFamily: "Montserrat, sans-serif",
                cursor: role ? "pointer" : "not-allowed",
              }}
              onClick={handleSubmit}
              disabled={!role || loading}
            >
              {loading ? "Setting up your account..." : "Continue"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
