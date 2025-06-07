import React, { useEffect, useState } from "react";
import axios from "axios";
import LearnerDashboard from "./learnerDashboard";
import SponsorDashboard from "./sponsorDashboard";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const DashboardRouter = () => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("motivar-token");
                if (!token) throw new Error("Authentication token is missing. Please log in again.");

                const response = await axios.get("https://motivar-sponsor-api-v1.onrender.com/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // The backend always returns userDetails with a role for learners, or just userDetails for sponsors
                // We'll check for role property or fallback to sponsor if not present
                const userDetails = response.data.userDetails;
                if (userDetails.role === "learner") {
                    setRole("learner");
                } else {
                    setRole("sponsor");
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Failed to load dashboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, []);

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
                <Spinner animation="border" />
                <p className="mt-3">Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mt-5 text-center">
                {error}
            </Alert>
        );
    }

    // Render the correct dashboard
    if (role === "learner") {
        return <LearnerDashboard />;
    } else if (role === "sponsor") {
        return <SponsorDashboard />;
    } else {
        return (
            <Alert variant="danger" className="mt-5 text-center">
                Unknown user role.
            </Alert>
        );
    }
};

export default DashboardRouter;