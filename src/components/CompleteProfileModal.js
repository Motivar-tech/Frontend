import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/index";

const AfricanCountries = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
  "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea",
  "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
  "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya",
  "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco",
  "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of the Congo", "Rwanda",
  "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
  "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia",
  "Uganda", "Zambia", "Zimbabwe",
];

const inputStyle = {
  borderColor: "#00AA87",
  borderRadius: 8,
  height: 48,
  fontSize: 15,
  fontFamily: "Montserrat, sans-serif",
};

export default function CompleteProfileModal({ show, onComplete }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!phoneNumber) {
      e.phoneNumber = "Phone number is required.";
    } else if (!/^\+?\d[\d\s\-]{7,}$/.test(phoneNumber)) {
      e.phoneNumber = "Enter a valid phone number (e.g. +234 XXX XXX XXXX).";
    }
    if (!country) e.country = "Please select your country.";
    if (!gender) e.gender = "Please select your gender.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("motivar-token");
      await axios.patch(
        `${BASE_URL}/user/profile/update`,
        { fullName, phoneNumber, country, gender },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Profile updated! Welcome to Motivar.");
      onComplete({ fullName, phoneNumber, country, gender });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false} centered size="md">
      <Modal.Header
        style={{
          background: "#00AA87",
          borderBottom: "none",
          borderRadius: "0.75rem 0.75rem 0 0",
          padding: "1.2rem 1.5rem",
        }}
      >
        <Modal.Title
          style={{
            color: "#fff",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: "1.15rem",
          }}
        >
          Complete Your Profile
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "1.5rem" }}>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            color: "#555",
            fontSize: 14,
            marginBottom: "1.5rem",
          }}
        >
          A few more details to get your account fully set up. This only takes a moment.
        </p>

        <Form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Label
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 14 }}
            >
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Ciroma Chukwuma"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              style={{ ...inputStyle, borderColor: errors.fullName ? "red" : "#00AA87" }}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
          </Form.Group>

          {/* Phone Number */}
          <Form.Group className="mb-3">
            <Form.Label
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 14 }}
            >
              Phone Number
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="+234 XXX XXX XXXX"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setErrors((prev) => ({ ...prev, phoneNumber: "" }));
              }}
              style={{ ...inputStyle, borderColor: errors.phoneNumber ? "red" : "#00AA87" }}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
          </Form.Group>

          {/* Country & Gender side by side */}
          <Row className="mb-3">
            <Col sm={7}>
              <Form.Group>
                <Form.Label
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 14 }}
                >
                  Country
                </Form.Label>
                <Form.Select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setErrors((prev) => ({ ...prev, country: "" }));
                  }}
                  style={{ ...inputStyle, borderColor: errors.country ? "red" : "#00AA87" }}
                  isInvalid={!!errors.country}
                >
                  <option value="">Select country</option>
                  {AfricanCountries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={5}>
              <Form.Group>
                <Form.Label
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 14 }}
                >
                  Gender
                </Form.Label>
                <Form.Select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setErrors((prev) => ({ ...prev, gender: "" }));
                  }}
                  style={{ ...inputStyle, borderColor: errors.gender ? "red" : "#00AA87" }}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button
            type="submit"
            className="w-100 mt-2"
            disabled={loading}
            style={{
              background: "#00AA87",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              height: 52,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              "Save & Continue"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
