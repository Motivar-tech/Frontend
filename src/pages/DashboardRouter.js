import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LearnerDashboard from "./learnerDashboard";
import SponsorDashboard from "./sponsorDashboard";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";

import { BASE_URL } from '../utils/index';

// ── Shared card style for role selection ──────────────────────────────────────
function RoleCard({ selected, emoji, title, description, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                cursor: "pointer",
                border: `2px solid ${selected ? "#00AA87" : "#e0e0e0"}`,
                borderRadius: 16,
                padding: "28px 16px",
                flex: 1,
                textAlign: "center",
                background: selected ? "#f1fdf8" : "#fff",
                boxShadow: selected ? "0 4px 16px rgba(0,170,135,0.12)" : "none",
                transition: "all 0.2s",
            }}
        >
            <div style={{ fontSize: 36, marginBottom: 10 }}>{emoji}</div>
            <h5 style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                color: selected ? "#00AA87" : "#333",
                marginBottom: 6,
                fontSize: "1rem",
            }}>
                {title}
            </h5>
            <p style={{ fontSize: 12, color: "#666", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
                {description}
            </p>
        </div>
    );
}

const DashboardRouter = () => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [roleLoading, setRoleLoading] = useState(false);
    const navigate = useNavigate();

    const fetchRole = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("motivar-token");
            if (!token) {
                throw new Error("Authentication token is missing. Please log in again.");
            }

            const response = await axios.get(`${BASE_URL}/dashboard`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userDetails = response.data.userDetails;
            if (userDetails?.role === "learner" || userDetails?.role === "sponsor") {
                setRole(userDetails.role);
                setShowRoleModal(false);
            } else {
                // Verified user but no role assigned — force role selection
                setShowRoleModal(true);
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to load dashboard.";

            if (
                err.response?.status === 400 &&
                msg === "Invalid user role"
            ) {
                // User is authenticated and verified but has no role yet
                setShowRoleModal(true);
                return;
            }

            if (msg === "Authentication token is missing. Please log in again.") {
                navigate("/user-auth");
                return;
            }

            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchRole();
    }, [fetchRole]);

    const handleSetRole = async () => {
        if (!selectedRole) {
            toast.error("Please choose an account type.");
            return;
        }
        setRoleLoading(true);
        try {
            const token = localStorage.getItem("motivar-token");
            await axios.patch(
                `${BASE_URL}/user/profile/update`,
                { role: selectedRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("motivar-user-role", selectedRole);
            toast.success("Account type set! Welcome to Motivar.");
            // Remove any stale signup state
            localStorage.removeItem("motivar-signup-state");
            setShowRoleModal(false);
            setRole(selectedRole);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to set account type. Please try again.");
        } finally {
            setRoleLoading(false);
        }
    };

    // Non-dismissible role selection modal
    const RoleSelectionModal = (
        <Modal show={showRoleModal} backdrop="static" keyboard={false} centered>
            <Modal.Header style={{
                background: "#00AA87",
                borderBottom: "none",
                borderRadius: "0.75rem 0.75rem 0 0",
                padding: "1.2rem 1.5rem",
            }}>
                <Modal.Title style={{
                    color: "#fff",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                }}>
                    Choose Your Account Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "1.5rem" }}>
                <p style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#555",
                    fontSize: 14,
                    marginBottom: "1.5rem",
                    textAlign: "center",
                }}>
                    To continue, please select the account type that best describes you.
                    This is required to access your dashboard.
                </p>
                <div className="d-flex gap-3 justify-content-center mb-4">
                    <RoleCard
                        selected={selectedRole === "learner"}
                        emoji="🎓"
                        title="Learner"
                        description="I want to get my course funded"
                        onClick={() => setSelectedRole("learner")}
                    />
                    <RoleCard
                        selected={selectedRole === "sponsor"}
                        emoji="🤝"
                        title="Sponsor"
                        description="I want to fund learners"
                        onClick={() => setSelectedRole("sponsor")}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer style={{
                borderTop: "1px solid #e9ecef",
                padding: "1rem 1.5rem",
                justifyContent: "center",
            }}>
                <Button
                    style={{
                        background: selectedRole ? "#00AA87" : "#b2dfdb",
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 600,
                        fontFamily: "Montserrat, sans-serif",
                        padding: "0.7rem 2.5rem",
                        cursor: selectedRole ? "pointer" : "not-allowed",
                        fontSize: "1rem",
                    }}
                    onClick={handleSetRole}
                    disabled={!selectedRole || roleLoading}
                >
                    {roleLoading ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Setting up...
                        </>
                    ) : (
                        "Continue to Dashboard"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );

    if (loading) {
        return (
            <>
                {RoleSelectionModal}
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                    <Spinner animation="border" style={{ color: "#00AA87", width: "3rem", height: "3rem" }} />
                    <p className="mt-3" style={{ color: "#555", fontFamily: "Montserrat, sans-serif" }}>
                        Loading your dashboard...
                    </p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                {RoleSelectionModal}
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                    <div style={{
                        background: "#fff3f3",
                        border: "1px solid #f5c6cb",
                        borderRadius: 12,
                        padding: "2rem",
                        maxWidth: 400,
                        textAlign: "center",
                    }}>
                        <p style={{ color: "#721c24", fontFamily: "Montserrat, sans-serif", marginBottom: "1rem" }}>
                            {error}
                        </p>
                        <Button
                            onClick={() => navigate("/user-auth")}
                            style={{ background: "#00AA87", border: "none", borderRadius: 8 }}
                        >
                            Go to Sign In
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    if (showRoleModal) {
        return RoleSelectionModal;
    }

    if (role === "learner") return <LearnerDashboard />;
    if (role === "sponsor") return <SponsorDashboard />;

    return null;
};

export default DashboardRouter;
