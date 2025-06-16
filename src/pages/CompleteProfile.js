import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { toast } from "react-hot-toast";
import AuthDataServices from "../Services/AuthDataServices";
import Logo from "../assets/images/Motivar.svg";
import Image_tab from "../assets/images/image_tab.png";

export default function CompleteProfile() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    country: "Nigeria",
    gender: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleData, setGoogleData] = useState(null);

 useEffect(() => {
  const tempData = localStorage.getItem("temp-google-data");
  console.log("Loaded temp-google-data:", tempData);
  if (tempData) {
    const parsed = JSON.parse(tempData);
    console.log("Parsed googleData:", parsed);
    setGoogleData(parsed);
  } else {
    window.location.pathname = "/user-auth";
  }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.phoneNumber || !formData.gender || !formData.role) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const finalData = {
        ...formData,
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
        window.location.pathname = "/dashboard";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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


  return (
    <Container fluid style={{ minHeight: "100vh", background: "#fff" }}>
      <Row className="h-100">
        {/* Left: Image */}
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
                boxShadow: "none",
              }}
            />
          </div>
        </Col>

        {/* Right: Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
          style={{ padding: "40px" }}
        >
          <div style={{ width: "100%", maxWidth: "600px" }}>
            {/* Logo */}
            <div className="text-center mb-4">
              <Image src={Logo} style={{ maxHeight: "50px" }} fluid />
            </div>

            <h2 
              className="text-center mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                color: "#222"
              }}
            >
              Complete Your Profile
            </h2>

            {googleData && (
              <div className="text-center mb-4">
                <Image
                  src={googleData.data.profilePictureUrl}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: "3px solid #00AA87"
                  }}
                />
                <h4 
                  className="mt-3"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500
                  }}
                >
                  {googleData.data.fullName}
                </h4>
                <p className="text-muted">{googleData.data.email}</p>
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label 
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "18px",
                    fontWeight: 500
                  }}
                >
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder={"+234 XXX XXX XXXX"}
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  style={{
                    borderColor: "#00AA87",
                    borderRadius: "8px",
                    height: "56px",
                    fontSize: "16px"
                  }}
                  required
                />
              </Form.Group>

              <Row className="mb-4">
                <Col>
                  <Form.Group>
                    <Form.Label
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "18px",
                        fontWeight: 500
                      }}
                    >
                      Country
                    </Form.Label>
                    <Form.Select
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      style={{
                        borderColor: "#00AA87",
                        borderRadius: "8px",
                        height: "56px",
                        fontSize: "16px"
                      }}
                    >
                      {AfricanCountries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "18px",
                        fontWeight: 500
                      }}
                    >
                      Gender
                    </Form.Label>
                    <Form.Select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      style={{
                        borderColor: "#00AA87",
                        borderRadius: "8px",
                        height: "56px",
                        fontSize: "16px"
                      }}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="nb">Prefer not to say</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "18px",
                    fontWeight: 500
                  }}
                >
                  What do you want to do?
                </Form.Label>
                <Form.Select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{
                    borderColor: "#00AA87",
                    borderRadius: "8px",
                    height: "56px",
                    fontSize: "16px"
                  }}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="learner">I want to ask for help to fund course</option>
                  <option value="sponsor">I want to sponsor a learner/group of learners</option>
                </Form.Select>
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                style={{
                  background: "#00AA87",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  fontFamily: "Montserrat, sans-serif"
                }}
                disabled={loading}
              >
                {loading ? "Completing Registration..." : "Complete Registration"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}