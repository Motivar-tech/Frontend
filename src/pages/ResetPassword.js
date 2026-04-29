import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import { toast } from "react-hot-toast";
import AuthDataServices from "../Services/AuthDataServices";
import Logo from "../assets/images/Motivar.svg";

const inputStyle = {
  borderColor: "#00AA87",
  borderRadius: 8,
  height: 52,
  fontSize: 15,
  fontFamily: "Montserrat, sans-serif",
};

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    const id = params.get("id");
    if (!t || !id) {
      toast.error("Invalid or missing reset link. Please request a new one.");
    }
    setToken(t || "");
    setUserId(id || "");
  }, []);

  const handleReset = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!token || !userId) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      await AuthDataServices.resetPassword(token, userId, newPassword);
      setDone(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "This link has expired or is invalid. Please request a new one."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f0f9f6" }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "2.5rem 2rem",
          maxWidth: 440,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
        }}
      >
        <div className="text-center mb-4">
          <Image src={Logo} alt="Motivar" style={{ maxHeight: 44 }} fluid />
        </div>

        {done ? (
          <div className="text-center">
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h5 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, color: "#00AA87", marginBottom: 8 }}>
              Password Updated!
            </h5>
            <p style={{ color: "#555", fontSize: 14, fontFamily: "Montserrat, sans-serif", marginBottom: "1.5rem" }}>
              Your password has been changed successfully. You can now sign in with your new password.
            </p>
            <Button
              style={{
                background: "#00AA87",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                padding: "0.75rem 2rem",
              }}
              onClick={() => navigate("/user-auth")}
            >
              Sign In
            </Button>
          </div>
        ) : (
          <>
            <h5
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                color: "#0d2b24",
                textAlign: "center",
                marginBottom: 6,
              }}
            >
              Set a New Password
            </h5>
            <p
              style={{
                color: "#777",
                fontSize: 13,
                textAlign: "center",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "1.5rem",
              }}
            >
              Choose a strong password you haven't used before.
            </p>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 14 }}>
                New Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: 14 }}>
                Confirm New Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReset()}
                style={{
                  ...inputStyle,
                  borderColor: confirmPassword && confirmPassword !== newPassword ? "red" : "#00AA87",
                }}
              />
              {confirmPassword && confirmPassword !== newPassword && (
                <Form.Text style={{ color: "red", fontSize: 12 }}>Passwords do not match.</Form.Text>
              )}
            </Form.Group>

            <Button
              className="w-100"
              style={{
                background: "#00AA87",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                height: 52,
                fontFamily: "Montserrat, sans-serif",
              }}
              onClick={handleReset}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
            </Button>

            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => navigate("/user-auth")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#888",
                  fontSize: 13,
                  fontFamily: "Montserrat, sans-serif",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Back to Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
