import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styled, { createGlobalStyle } from 'styled-components';
import Logo from "../assets/images/Motivar.svg";
import { FiUser, FiList, FiLogOut, FiAlertCircle } from 'react-icons/fi';

// --- Brand Colors ---
const brandColors = {
    primary: '#59b49a',
    primaryDark: '#4aa088',
    backgroundLight: '#f1fdf8',
    backgroundWhite: '#fefcf9',
    textPrimary: '#333',
    textSecondary: '#555',
    textWhite: '#ffffff',
    greyLight: '#e9ecef',
    greyMid: '#ced4da',
    success: '#28a745',
    warning: '#fd7e14',
    danger: '#dc3545',
    info: '#0dcaf0',
};

// --- Styled Components ---
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${brandColors.backgroundLight};
    color: ${brandColors.textPrimary};
    font-family: 'Poppins', sans-serif;
  }
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledNavbar = styled(Navbar)`
    background-color: ${brandColors.backgroundWhite};
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;

    .navbar-brand img {
        height: 35px;
    }

    .nav-link {
        color: ${brandColors.textSecondary};
        font-weight: 500;
        margin: 0 0.5rem;
        transition: color 0.2s ease;
         &:hover, &:focus {
             color: ${brandColors.primary};
         }
         &.active {
            color: ${brandColors.primary};
            font-weight: 600;
         }
    }
`;

const StyledButton = styled(Button)`
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 50px;
  padding: 0.5rem 1.2rem;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  background-color: ${brandColors.primary};
  border-color: ${brandColors.primary};
  color: ${brandColors.textWhite};
  &:hover, &:focus, &:active {
    background-color: ${brandColors.primaryDark};
    border-color: ${brandColors.primaryDark};
    color: ${brandColors.textWhite};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  &.btn-outline-danger {
      color: ${brandColors.danger};
      border-color: ${brandColors.danger};
      background-color: transparent;
       &:hover, &:focus, &:active {
            background-color: rgba(220, 53, 69, 0.1);
            color: #a61e2b;
            border-color: #a61e2b;
       }
  }
`;

const DashboardContainer = styled(Container)`
  flex: 1;
  padding-top: 2.5rem;
  padding-bottom: 4rem;
`;

const WelcomeHeader = styled.div`
  margin-bottom: 2.5rem;
  padding: 2rem;
  background-color: ${brandColors.backgroundWhite};
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-left: 5px solid ${brandColors.primary};

   .icon-wrapper {
       background-color: ${brandColors.backgroundLight};
       padding: 1rem;
       border-radius: 50%;
       display: inline-flex;
   }

  h1 {
    font-size: 1.6rem;
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

const SectionCard = styled(Card)`
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  background-color: ${brandColors.backgroundWhite};
  overflow: hidden;

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
      color: ${brandColors.primary};
      font-size: 1.3rem;
    }
  }
`;

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

const StyledFooter = styled.footer`
  background-color: ${brandColors.backgroundWhite};
  color: ${brandColors.textSecondary};
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.9rem;
  border-top: 1px solid ${brandColors.greyLight};
  margin-top: auto;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  color: ${brandColors.textSecondary};
  .spinner-border {
        width: 3.5rem;
        height: 3.5rem;
        color: ${brandColors.primary};
     }
   p {
        margin-top: 1rem;
        font-size: 1.1rem;
     }
`;

const ErrorWrapper = styled(Container)`
    padding-top: 5rem;
    text-align: center;
    .alert {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
         svg { font-size: 1.5rem; }
    }
`;

// --- Sponsor Dashboard Component ---
const SponsorDashboard = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [sponsoredRequests, setSponsoredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSponsorDashboard = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("motivar-token");
                if (!token) throw new Error("Authentication token is missing. Please log in again.");

                const response = await axios.get("http://localhost:8089/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = response.data;
                setUserDetails(data.userDetails);
                setSponsoredRequests(data.sponsoredRequests || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load sponsor dashboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchSponsorDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("motivar-token");
        window.location.href = "/user-auth";
    };

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
                            <Nav.Link href="">Programs</Nav.Link>
                            <Nav.Link href="">Community</Nav.Link>
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
                            <FiUser size={30} color={brandColors.primary} />
                        </div>
                        <div>
                            <h1>Welcome back, {userDetails.fullName}!</h1>
                            <p>View and manage your sponsored requests.</p>
                        </div>
                    </WelcomeHeader>
                )}

                {/* Sponsored Requests Section */}
                <Row className="g-4">
                    <Col lg={12}>
                        <SectionCard>
                            <Card.Header>
                                <FiList /> Sponsored Requests
                            </Card.Header>
                            <ListGroup variant="flush">
                                {sponsoredRequests.length > 0 ? (
                                    sponsoredRequests.map((req) => (
                                        <StyledListGroupItem key={req._id}>
                                            <div className="item-content">
                                                <h6>
                                                    {req.courseTitle || "Course Title Missing"}
                                                </h6>
                                                <p className="text-muted small">
                                                    {/* Display more fields as needed */}
                                                    <span>Beneficiary: {req.learnerName || "N/A"}</span> |{" "}
                                                    <span>Platform: {req.platform || "N/A"}</span> |{" "}
                                                    <span>Price: {req.price || "N/A"} {req.priceUnit || ""}</span>
                                                </p>
                                                {req.status && (
                                                    <span>
                                                        <strong>Status:</strong> {req.status}
                                                    </span>
                                                )}
                                                {req.motivation && (
                                                    <div className="mt-2">
                                                        <small className="text-muted">
                                                            Motivation: "{req.motivation}"
                                                        </small>
                                                    </div>
                                                )}
                                            </div>
                                        </StyledListGroupItem>
                                    ))
                                ) : (
                                    <ListGroup.Item className="text-center text-muted p-4">
                                        You have not sponsored any requests yet.
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </SectionCard>
                    </Col>
                </Row>
            </DashboardContainer>

            {/* Footer */}
            <StyledFooter>
                <p>© {new Date().getFullYear()} Motivar. All rights reserved.</p>
            </StyledFooter>
        </DashboardWrapper>
    );
};

export default SponsorDashboard;