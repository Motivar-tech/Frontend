import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import { Buffer } from 'buffer';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Logo from "../assets/images/Motivar.svg";
import {
    FiUser, FiClock, FiCheckCircle, FiBookOpen, FiList,
    FiUpload, FiLogOut, FiAlertCircle
} from 'react-icons/fi';
import { BASE_URL } from '../utils/index'

// --- Brand Colors ---
const brandColors = {
    primary: '#59b49a', // Main interactive green
    primaryDark: '#4aa088', // Darker shade for hover/active
    backgroundLight: '#f1fdf8', // Light green background (MAIN BG)
    backgroundWhite: '#fefcf9', // Off-white background (CARDS/NAV/MODAL)
    textPrimary: '#333',
    textSecondary: '#555',
    textWhite: '#ffffff',
    greyLight: '#e9ecef',
    greyMid: '#ced4da',
    success: '#28a745', // Green for success/paid/completed
    warning: '#fd7e14', // Orange for pending/uncompleted
    danger: '#dc3545', // Red for logout/errors
    info: '#0dcaf0', // Optional info color
};

// --- Styled Components ---

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${brandColors.backgroundLight}; // Light green main background
    color: ${brandColors.textPrimary};
    font-family: 'Poppins', sans-serif; // Example: Add a modern font (ensure it's imported/linked)
  }
`;

// Add a wrapper for the entire dashboard
const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure the wrapper takes the full height of the viewport
`;

// --- Navbar ---
const StyledNavbar = styled(Navbar)`
    background-color: ${brandColors.backgroundWhite};
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;

    .navbar-brand img {
        height: 35px; // Slightly larger logo
    }

    .nav-link {
        color: ${brandColors.textSecondary};
        font-weight: 500;
        margin: 0 0.5rem;
        transition: color 0.2s ease;
         &:hover, &:focus {
             color: ${brandColors.primary};
         }
         &.active { // Add .active class in Nav.Link if needed for routing
            color: ${brandColors.primary};
            font-weight: 600;
         }
    }
`;

// --- Buttons ---
const StyledButton = styled(Button)`
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 50px; // Pill shape
  padding: 0.5rem 1.2rem;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent; // Base border

  // Primary Button (Default)
  background-color: ${brandColors.primary};
  border-color: ${brandColors.primary};
  color: ${brandColors.textWhite};
  &:hover, &:focus, &:active {
    background-color: ${brandColors.primaryDark};
    border-color: ${brandColors.primaryDark};
    color: ${brandColors.textWhite};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  // Secondary Button
  &.btn-secondary {
      background-color: ${brandColors.greyMid};
      border-color: ${brandColors.greyMid};
      color: ${brandColors.textPrimary};
      &:hover, &:focus, &:active {
         background-color: ${brandColors.textSecondary};
         border-color: ${brandColors.textSecondary};
         color: ${brandColors.textWhite};
      }
  }

  // Outline Primary
  &.btn-outline-primary {
      color: ${brandColors.primary};
      border-color: ${brandColors.primary};
      background-color: transparent;
       &:hover, &:focus, &:active {
            background-color: ${brandColors.backgroundLight};
            color: ${brandColors.primaryDark};
            border-color: ${brandColors.primaryDark};
       }
  }

   // Outline Danger (for Logout)
  &.btn-outline-danger {
      color: ${brandColors.danger};
      border-color: ${brandColors.danger};
      background-color: transparent;
       &:hover, &:focus, &:active {
            background-color: rgba(220, 53, 69, 0.1); // Light red background
            color: #a61e2b; // Darker red
            border-color: #a61e2b;
       }
  }
`;

// Update the DashboardContainer to allow it to grow
const DashboardContainer = styled(Container)`
  flex: 1; // Allow the container to grow and take up available space
  padding-top: 2.5rem;
  padding-bottom: 4rem;
`;

// --- Welcome Header ---
const WelcomeHeader = styled.div`
  margin-bottom: 2.5rem;
  padding: 2rem;
  background-color: ${brandColors.backgroundWhite};
  border-radius: 0.75rem; // Slightly more rounded
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-left: 5px solid ${brandColors.primary}; // Accent border

   .icon-wrapper {
       background-color: ${brandColors.backgroundLight};
       padding: 1rem;
       border-radius: 50%;
       display: inline-flex;
   }

  h1 {
    font-size: 1.6rem; // Slightly smaller H1
    font-weight: 600;
    color: ${brandColors.textPrimary};
    margin-bottom: 0.1rem;
  }
  p {
    color: ${brandColors.textSecondary};
    margin-bottom: 0;
    font-size: 0.95rem;
  }
`;

// --- Summary Cards ---
const SummaryCard = styled(Card)`
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  height: 100%;
  background-color: ${brandColors.backgroundWhite};
  text-align: center;
  padding: 1.5rem 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  .summary-icon {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: ${props => props.iconColor || brandColors.primary}; // Use prop or primary color
  }

  .summary-value {
    font-size: 2.8rem;
    font-weight: 700;
    color: ${props => props.valueColor || brandColors.textPrimary}; // Use prop or default text
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  h5 {
      font-size: 0.95rem;
      font-weight: 500; // Lighter heading
      color: ${brandColors.textSecondary};
      margin-bottom: 0;
  }
`;

// --- Section Cards (for lists) ---
const SectionCard = styled(Card)`
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  background-color: ${brandColors.backgroundWhite};
  overflow: hidden; // Prevents list group borders from showing outside radius

  .card-header {
    background-color: ${brandColors.backgroundWhite};
    border-bottom: 1px solid ${brandColors.greyLight};
    font-weight: 600;
    font-size: 1.1rem;
    color: ${brandColors.textPrimary};
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;

    svg {
      color: ${brandColors.primary}; // Header icon color
      font-size: 1.3rem;
    }
  }

   .list-group-flush .list-group-item:last-child {
        border-bottom: 0; // Remove bottom border on last item
    }
`;


// --- List Group Items ---
const StyledListGroupItem = styled(ListGroup.Item)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background-color: transparent;
  border-color: ${brandColors.greyLight} !important;
  border-width: 0 0 1px 0;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${brandColors.backgroundLight};
  }

  .item-icon-wrapper {
    margin-top: 0.15rem;
    color: ${props => props.iconColor || brandColors.textSecondary};
    font-size: 1.2rem;
  }

  .item-content {
    flex-grow: 1;
    h6 {
      font-weight: 600;
      margin-bottom: 0.2rem;
      color: ${brandColors.textPrimary};
    }
    p,
    .text-muted {
      font-size: 0.85rem;
      color: ${brandColors.textSecondary};
      margin-bottom: 0.5rem;
    }
    small {
      font-size: 0.8rem;
    }
  }
`;

// --- Badges ---
const StyledBadge = styled(Badge)`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35em 0.7em;
  border-radius: 50px; // Pill shape
  border: 1px solid transparent;
  vertical-align: middle; // Align better with text

  // Define colors based on props or specific classes
  &.bg-paid, &.bg-completed { background-color: ${brandColors.success}; color: white; }
  &.bg-pending, &.bg-uncompleted { background-color: ${brandColors.warning}; color: ${brandColors.primary}; }
  &.bg-info { background-color: ${brandColors.info}; color: white; }
  // &.bg-socials { background-color: ${brandColors.greyLight}; color: ${brandColors.textSecondary}; } // Custom for socials
`;

// --- Modal ---
const StyledModal = styled(Modal)`
    .modal-content {
        border-radius: 0.75rem;
        border: none;
        background-color: ${brandColors.backgroundWhite};
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .modal-header {
        background-color: ${brandColors.primary};
        color: ${brandColors.textWhite};
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
        border-bottom: none;
        padding: 1rem 1.5rem;

        .modal-title { font-weight: 600; font-size: 1.2rem; }
        .btn-close { // Using default bootstrap class for close button
             filter: brightness(0) invert(1); // Make 'X' white
             &:focus { box-shadow: none; }
        }
    }
     .modal-body {
        padding: 1.5rem;
        .form-label { font-weight: 500; color: ${brandColors.textSecondary};}
        .form-control {
             border-color: ${brandColors.greyMid};
            &:focus {
                border-color: ${brandColors.primary};
                box-shadow: 0 0 0 0.2rem rgba(89, 180, 154, 0.25);
            }
        }
     }

     .modal-footer {
         border-top: 1px solid ${brandColors.greyLight};
         background-color: ${brandColors.backgroundWhite}; // Ensure footer bg matches
         border-bottom-left-radius: 0.75rem;
         border-bottom-right-radius: 0.75rem;
         padding: 1rem 1.5rem;
         justify-content: flex-end; // Align buttons right
     }
`;


// Ensure the footer stays at the bottom
const StyledFooter = styled.footer`
  background-color: ${brandColors.backgroundWhite}; // Light footer
  color: ${brandColors.textSecondary};
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.9rem;
  border-top: 1px solid ${brandColors.greyLight};
  margin-top: auto; // Push the footer to the bottom
`;

// --- Loading/Error Wrappers ---
const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh; // Take up more space
  color: ${brandColors.textSecondary}; // Use secondary text

  .spinner-border {
        width: 3.5rem;
        height: 3.5rem;
        color: ${brandColors.primary}; // Use primary color for spinner
     }
   p {
        margin-top: 1rem;
        font-size: 1.1rem;
     }
`;

const ErrorWrapper = styled(Container)`
    padding-top: 5rem;
    text-align: center;
    .alert { // Style the alert component directly
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
         svg { font-size: 1.5rem; }
    }
`;


// --- Dashboard Component ---
const LearnerDashboard = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [dashboardCourses, setDashboardCourses] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false); // Uploading state

    useEffect(() => {
        const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("motivar-token");
            if (!token) throw new Error("Authentication token is missing. Please log in again.");

            const response = await axios.get(`${BASE_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
            });

            const data = response.data;
            setUserDetails(data.userDetails);
            setDashboardCourses(data.dashboardCourses);
            setRequests(data.requests);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError(err.response?.data?.message || "Failed to load dashboard data. Please try again later.");
        } finally {
            setLoading(false);
        }
        };

        fetchDashboardData();
    }, []);

    // --- Logout Handler ---
    const handleLogout = () => {
        localStorage.removeItem("motivar-token");
        localStorage.removeItem("motivar-user-role");
        window.location.href = "/";
    };

    // --- Upload Certificate Handler ---
    const handleUploadCertificate = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }
        setIsUploading(true); // Start loading indicator
        try {
            const token = localStorage.getItem("motivar-token");
            if (!token) throw new Error("Authentication token is missing.");

            const formData = new FormData();
            formData.append("certificate", selectedFile);

            const response = await axios.put(
                `http://localhost:8089/dashboard/${selectedCourse._id}/upload-completion-certificate`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );

            setDashboardCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course._id === selectedCourse._id
                        ? { ...course, status: "completed", completionCertificate: "Uploaded" }
                        : course
                )
            );
            alert(response.data.message || "Certificate uploaded successfully!");
            setShowModal(false);
            setSelectedFile(null);
            setSelectedCourse(null);
        } catch (err) {
            console.error("Error uploading certificate:", err);
            alert(err.response?.data?.message || "Failed to upload certificate.");
        } finally {
            setIsUploading(false); // Stop loading indicator
        }
    };


    // --- Render Logic ---
    if (loading) {
        return (
            <LoadingWrapper>
                <Spinner animation="border" role="status" />
                <p>Loading your dashboard...</p>
            </LoadingWrapper>
        );
    }

    if (error) {
        return (
            <ErrorWrapper>
                <Alert variant="danger">
                     <FiAlertCircle /> {error}
                </Alert>
            </ErrorWrapper>
        );
    }

    // Calculating summary counts
    const pendingRequestsCount = requests.filter((req) => !req.paid).length;
    const paidRequestsCount = requests.filter((req) => req.paid).length;
    const coursesCount = dashboardCourses.length;

    return (
        <DashboardWrapper>
            <GlobalStyle />

            {/* Header - Styled Navbar */}
            <StyledNavbar expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="Motivar Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/explore">Explore</Nav.Link>
                            <NavDropdown title="Programs" id="programs-dropdown" style={{ color: "#222" }}>
                                <NavDropdown.Item as={Link} to="/coming-soon">DAP</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/coming-soon">DigiAccess</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Community" id="community-dropdown" style={{ color: "#222" }}>
                                <NavDropdown.Item as={Link} to="/coming-soon">Find learners near you</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/coming-soon">Find mentors near you</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/coming-soon">Join accountability group</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <StyledButton variant="outline-danger" onClick={handleLogout}>
                            <FiLogOut /> Logout
                        </StyledButton>
                    </Navbar.Collapse>
                </Container>
            </StyledNavbar>

            <DashboardContainer fluid="lg">
                {/* Welcome Header */}
                {userDetails && (
                     <WelcomeHeader>
                         <div className="icon-wrapper">
                            {userDetails.profilePicture?.data ? (
                                <img
                                src={`data:${userDetails.profilePicture.contentType};base64,${Buffer.from(
                                    userDetails.profilePicture.data.data
                                ).toString("base64")}`}
                                alt="Profile"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                                />
                            ) : (
                                <FiUser size={30} color={brandColors.primary} />
                            )}
                            </div>
                         <div>
                             <h1>Welcome back, {userDetails.fullName}!</h1>
                             <p>Manage your courses, sponsorship requests, and certificates.</p>
                         </div>
                    </WelcomeHeader>
                )}

                {/* Summary Cards */}
                <Row className="g-4">
                  <Col md={4}>
                    <SummaryCard iconColor={brandColors.warning} valueColor={brandColors.warning}>
                      <FiClock className="summary-icon" />
                      <p className="summary-value">{pendingRequestsCount}</p>
                      <h5>Pending Requests</h5>
                    </SummaryCard>
                  </Col>
                  <Col md={4}>
                    <SummaryCard iconColor={brandColors.success} valueColor={brandColors.success}>
                      <FiCheckCircle className="summary-icon" />
                      <p className="summary-value">{paidRequestsCount}</p>
                      <h5>Paid Requests</h5>
                    </SummaryCard>
                  </Col>
                  <Col md={4}>
                    <SummaryCard iconColor={brandColors.primary} valueColor={brandColors.primary}>
                      <FiBookOpen className="summary-icon" />
                      <p className="summary-value">{coursesCount}</p>
                      <h5>Enrolled Courses</h5>
                    </SummaryCard>
                  </Col>
                </Row>

                {/* Copy Section */}
                <Row className="mt-4 text-center">
                  <Col>
                    <h5 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, color: brandColors.textPrimary }}>
                      Need help funding a course? Request for help here.
                    </h5>
                    <Button
                      variant="success"
                      style={{
                        backgroundColor: brandColors.primary,
                        border: "none",
                        color: "#fff",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontFamily: "Montserrat, sans-serif",
                        padding: "0.6rem 1.5rem",
                        marginTop: "1rem",
                      }}
                      onClick={() => window.location.href = "/help"}
                    >
                      Request for Help
                    </Button>
                  </Col>
                </Row>

                {/* Detailed Sections */}
                <Row className="mt-5 g-4">
                  {/* Requests Section */}
                  <Col lg={6}>
                       <SectionCard>
                          <Card.Header><FiList /> Your Course Requests</Card.Header>
                          <ListGroup variant="flush">
                            {requests.length > 0 ? (
                              requests.map((req) => (
                                <StyledListGroupItem key={req._id} iconColor={req.paid ? brandColors.success : brandColors.warning}>
                                  <div className="item-icon-wrapper">
                                    {req.paid ? <FiCheckCircle /> : <FiClock />}
                                  </div>
                                  <div className="item-content">
                                    <h6>{req.course?.courseTitle || 'Course Title Missing'}</h6>
                                    <div className="text-muted small">
                                      {/* Safely access nested properties */}
                                      <span>Platform: {req.course?.platform || 'N/A'}</span> |
                                      <span> Duration: {req.course?.duration || 'N/A'} {req.course?.durationUnit || ''}</span> |
                                      <span> Price: {req.course?.price || 'N/A'} {req.course?.priceUnit || ''}</span>
                                    </div>
                                    <div className="mt-2">
                                      <StyledBadge className={req.paid ? 'bg-paid' : 'bg-pending'}>
                                        {req.paid ? "Paid" : "Payment Pending"}
                                      </StyledBadge>
                                    </div>
                                    {req.motivation && (
                                      <div className="mt-2">
                                        <small className="text-muted">Motivation: "{req.motivation}"</small>
                                      </div>
                                    )}
                                  </div>
                                </StyledListGroupItem>
                              ))
                            ) : (
                              <ListGroup.Item className="text-center text-muted p-4">No requests found.</ListGroup.Item>
                            )}
                          </ListGroup>
                        </SectionCard>
                    </Col>

                    {/* Courses Section */}
                    <Col lg={6}>
                         <SectionCard>
                            <Card.Header><FiBookOpen /> Your Enrolled Courses</Card.Header>
                             <ListGroup variant="flush">
                                {dashboardCourses.length > 0 ? (
                                    dashboardCourses.map((course) => {
                                        const isClickable = course.status !== "completed"; // Check if the course is uncompleted
                                        const courseLink = course.link.startsWith("http://") || course.link.startsWith("https://")
                                             ? course.link
                                            : `https://${course.link}`; // Ensure absolute URL

                                        return (
                                            <StyledListGroupItem
                                                key={course._id}
                                                iconColor={course.status === "completed" ? brandColors.success : brandColors.warning}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                }}
                                            >
                                                {/* Inner wrapper for the clickable area */}
                                                <a
                                                    href={isClickable ? courseLink : undefined}
                                                    target={isClickable ? "_blank" : undefined}
                                                    rel={isClickable ? "noopener noreferrer" : undefined}
                                                    onClick={!isClickable ? (e) => e.preventDefault() : undefined}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexGrow: 1,
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                        cursor: isClickable ? "pointer" : "default",
                                                        marginRight: '1rem',
                                                    }}
                                                >
                                                    <div className="item-icon-wrapper" style={{ marginRight: '0.5rem' }}>
                                                        <FiBookOpen />
                                                    </div>
                                                    <div className="item-content">
                                                        <h6>{course.title}</h6>
                                                        <p className="text-muted small">
                                                            {course.description.length > 50
                                                                ? `${course.description.slice(0, 50)}...`
                                                                : course.description}
                                                        </p>
                                                        <StyledBadge
                                                            className={course.status === "completed" ? "bg-completed" : "bg-uncompleted"}
                                                        >
                                                            {course.status === "completed" ? "Completed" : "In Progress"}
                                                        </StyledBadge>
                                                        {course.completionCertificate && (
                                                            <span className="ms-2 text-success small">
                                                                <FiCheckCircle size="0.9em" /> Certificate Uploaded
                                                            </span>
                                                        )}
                                                    </div>
                                                </a>

                                                {/* Button section */}
                                                <div className="item-actions" style={{ flexShrink: 0 }}>
                                                    {course.status === "completed" && course.completionCertificate && (
                                                        <StyledButton
                                                            variant="outline-success"
                                                            size="sm"
                                                            onClick={async () => {
                                                                try {
                                                                    const token = localStorage.getItem("motivar-token");
                                                                    if (!token) {
                                                                        alert("Authentication token is missing. Please log in again.");
                                                                        return;
                                                                    }

                                                                    const response = await fetch(`http://localhost:8089/dashboard/${course._id}/view-certificate`, {
                                                                        method: "GET",
                                                                        headers: {
                                                                            Authorization: `Bearer ${token}`,
                                                                        },
                                                                    });

                                                                    if (!response.ok) {
                                                                        throw new Error("Failed to fetch the certificate. Please try again.");
                                                                    }

                                                                    // Convert the response to a Blob (e.g., PDF or image)
                                                                    const blob = await response.blob();
                                                                    const url = window.URL.createObjectURL(blob);

                                                                    window.open(url, "_blank", "noopener,noreferrer");
                                                                } catch (error) {
                                                                    console.error("Error viewing certificate:", error);
                                                                    alert(error.message || "An error occurred while trying to view the certificate.");
                                                                }
                                                            }}
                                                        >
                                                            View Certificate
                                                        </StyledButton>
                                                    )}
                                                    {course.status !== "completed" && (
                                                        <StyledButton
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedCourse(course);
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            <FiUpload size="0.9em" /> Upload Cert
                                                        </StyledButton>
                                                    )}
                                                </div>
                                            </StyledListGroupItem>
                                        );
                                    })
                                ) : (
                                    <ListGroup.Item className="text-center text-muted p-4">
                                        You haven't enrolled in any courses yet.
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </SectionCard>
                    </Col>
                </Row>
            </DashboardContainer>

            {/* Footer */}
            <StyledFooter>
                <p>Copyright © {new Date().getFullYear()} Motivar Learning Technologies</p>
            </StyledFooter>

            {/* Upload Certificate Modal - Styled */}
            {selectedCourse && (
                <StyledModal show={showModal} onHide={() => !isUploading && setShowModal(false)} centered>
                    <Modal.Header closeButton={!isUploading}>
                        <Modal.Title>Upload Certificate for {selectedCourse.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isUploading ? (
                            <div className="text-center p-4">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-2 mb-0 text-muted">Uploading...</p>
                            </div>
                        ) : (
                            <Form.Group controlId="certificateFile">
                                <Form.Label>Select Certificate File (PDF, JPG, PNG, Max: 512KB)</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png" // Specify accepted file types
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file && file.size > 512 * 1024) { // Check if file size exceeds 512KB
                                            alert("File size must not exceed 512KB.");
                                            e.target.value = ""; // Reset the file input
                                            setSelectedFile(null);
                                        } else {
                                            setSelectedFile(file); // Set the file if valid
                                        }
                                    }}
                                />
                            </Form.Group>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <StyledButton variant="secondary" onClick={() => setShowModal(false)} disabled={isUploading}>
                            Cancel
                        </StyledButton>
                        <StyledButton variant="primary" onClick={handleUploadCertificate} disabled={!selectedFile || isUploading}>
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </StyledButton>
                    </Modal.Footer>
                </StyledModal>
            )}
        </DashboardWrapper>
    );
};

export default LearnerDashboard;