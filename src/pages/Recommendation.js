import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import RecService from '../Services/RecService';
import { FiStar, FiExternalLink, FiImage } from 'react-icons/fi';
import { getCourseImage } from '../utils/recImgs.js';
import { generateSmartTags } from '../utils/tags.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Motivar.svg";
import { FiLogOut, FiUser, FiGrid } from 'react-icons/fi';

// --- STYLED COMPONENTS ---

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
    yellow: '#ffc107',
    success: '#28a745', // Green for success/paid/completed
    warning: '#fd7e14', // Orange for pending/uncompleted
    danger: '#dc3545', // Red for logout/errors
    info: '#0dcaf0', // Optional info color
};

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${brandColors.backgroundLight}; 
  padding-bottom: 0; /* Footer handles spacing */

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png"); 
    background-repeat: repeat;
    opacity: 0.4;
    z-index: 0;
  }

  @media (max-width: 768px) {
    background-color: ${brandColors.backgroundLight};
    &::before { opacity: 0.1; }
  }
`;

const RecommendationsContainer = styled(Container)`
  z-index: 1;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 1200px;
  flex: 1; /* Ensures this takes up available space pushing footer down */
  width: 100%;
`;

const PageTitle = styled.h2`
  font-family: 'Inter', 'Montserrat', sans-serif;
  font-weight: 700;
  color: ${brandColors.textPrimary};
  margin-bottom: 30px;
  text-align: center;
  font-size: 2.2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const CourseCardWrapper = styled.div`
  background-color: ${brandColors.backgroundWhite};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  height: 100%; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 180px; 
  background-color: ${brandColors.greyLight};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid ${brandColors.greyLight};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const CardBodyStyled = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitleStyled = styled.h5`
  font-family: 'Inter', 'Montserrat', sans-serif;
  font-weight: 700;
  color: ${brandColors.textPrimary};
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
  line-height: 1.4;
`;

const CardMetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  color: ${brandColors.yellow};

  svg { margin-right: 2px; }

  span {
    color: ${brandColors.textSecondary};
    font-weight: 500;
    margin-left: 6px;
    font-size: 0.85rem;
  }
`;

const CardDescription = styled.p`
  color: ${brandColors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1; 
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
`;

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${brandColors.backgroundLight};
  color: ${brandColors.primary};
`;

const ButtonWrapper = styled.div`
    margin-top: auto;
`;

const StyledButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  transition: background-color 0.2s;
  background-color: ${brandColors.primary};
  color: #fff;
  border: none;

  &:hover {
    background-color: ${brandColors.primaryDark};
    color: #fff;
  }
`;

const StyledNavbar = styled(Navbar)`
    background-color: ${brandColors.backgroundWhite};
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    width: 100%; /* Ensure full width */
    z-index: 10; /* Sit above background */

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

const StyledFooter = styled.footer`
  background-color: ${brandColors.backgroundWhite}; 
  color: ${brandColors.textSecondary};
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.9rem;
  border-top: 1px solid ${brandColors.greyLight};
  margin-top: auto; /* Push the footer to the bottom */
  width: 100%; /* Ensure full width */
  z-index: 10;
`;

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FiStar
        key={i}
        fill={i <= rating ? brandColors.yellow : 'none'}
        stroke={brandColors.yellow}
        strokeWidth={1.5}
        size={14}
      />
    );
  }
  return stars;
};

// --- MAIN COMPONENT ---

function RecommendationsList() {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
      // Check if the user is logged in by verifying the token in localStorage
      const token = localStorage.getItem("motivar-token");
      setIsLoggedIn(!!token); 
  }, []);
  
  const handleLogout = () => {
      localStorage.removeItem("motivar-token");
      localStorage.removeItem("motivar-user-role");
      window.location.href = "/user-auth";
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      const response = await RecService.getRecommendations();
      
      const augmentedRecommendations = response.recommendations.map((rec, index) => {
          return {
            ...rec,
            id: rec.id || `rec-${index}`,
            tags: generateSmartTags(rec.title, rec.description), 
            ratings: rec.ratings || (Math.random() * (5 - 4.0) + 4.0).toFixed(1), 
            numReviews: rec.numReviews || Math.floor(Math.random() * (500 - 50) + 50) * 10,
          };
      });

      setRecommendations({ recommendations: augmentedRecommendations });
    } catch (error) {
      setError(error.message || 'An error occurred while loading recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  // --- MAIN RENDER ---
  return (
    <PageWrapper>
      {/* 1. Navbar is always visible at the top */}
      <StyledNavbar expand="lg">
          <Container>
              <Navbar.Brand href="/">
                  <img src={Logo} alt="Motivar Logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
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

                  {/* Dashboard Link */}
                  {isLoggedIn && (
                      <StyledButton
                      as={Link}
                      to="/dashboard"
                      variant="outline-primary"
                      style={{
                          border: "1px solid #59b49a",
                          color: "#59b49a",
                          background: "#fff",
                          borderRadius: "16px",
                          fontWeight: 600,
                          fontFamily: "Montserrat, sans-serif",
                          minWidth: "100px",
                          padding: "0.4rem 1.2rem",
                          marginRight: "1rem",
                      }}
                      >
                      <FiGrid /> Dashboard
                      </StyledButton>
                  )}

                  {/* Dynamic Button: Logout or Sign In */}
                  {isLoggedIn ? (
                      <StyledButton
                      variant="outline-danger"
                      onClick={handleLogout}
                      style={{
                          color: "#dc3545",
                          borderColor: "#dc3545",
                          backgroundColor: "transparent",
                          width: 'auto'
                      }}
                      >
                      <FiLogOut /> Logout
                      </StyledButton>
                  ) : (
                      <StyledButton
                      as={Link}
                      to="/user-auth"
                      variant="outline-primary"
                      style={{
                          border: "1px solid #59b49a",
                          color: "#59b49a",
                          background: "#fff",
                          borderRadius: "16px",
                          fontWeight: 600,
                          fontFamily: "Montserrat, sans-serif",
                          minWidth: "100px",
                          padding: "0.4rem 1.2rem",
                      }}
                      >
                      <FiUser /> Sign In
                      </StyledButton>
                  )}
              </Navbar.Collapse>
          </Container>
      </StyledNavbar>

      {/* 2. Content changes based on state */}
      <RecommendationsContainer>
        
        {/* State: Loading */}
        {isLoading && (
             <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" variant="success" />
             </div>
        )}

        {/* State: Error */}
        {!isLoading && error && (
            <Alert variant="danger" className="text-center">{error}</Alert>
        )}

        {/* State: Empty */}
        {!isLoading && !error && (!recommendations || !recommendations.recommendations || recommendations.recommendations.length === 0) && (
            <Alert variant="info" className="text-center">No recommendations found.</Alert>
        )}

        {/* State: Success (Show Grid) */}
        {!isLoading && !error && recommendations && recommendations.recommendations && recommendations.recommendations.length > 0 && (
            <>
                <PageTitle>Your Personalized Recommendations</PageTitle>
                <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                {recommendations.recommendations.map((course) => {
                    const imageUrl = getCourseImage(course.title || []);
                    return (
                    <Col key={course.id}>
                        <CourseCardWrapper>
                            <CardImagePlaceholder>
                                {imageUrl ? (
                                    <img src={imageUrl} alt={course.title} />
                                ) : (
                                    <FiImage size={40} color="#ccc" />
                                )}
                            </CardImagePlaceholder>

                            <CardBodyStyled>
                                <CardTitleStyled>{course.title}</CardTitleStyled>
                                <CardMetaInfo>
                                    <RatingStars>
                                        {renderStars(parseFloat(course.ratings))}
                                        <span>
                                            {parseFloat(course.ratings).toFixed(1)} 
                                            <span style={{color: '#999', fontWeight: 400}}> ({course.numReviews})</span>
                                        </span>
                                    </RatingStars>
                                </CardMetaInfo>
                                <CardDescription>{course.description}</CardDescription>
                                <BadgeGroup>
                                    {course.tags.map(tag => (
                                        <StyledBadge key={tag}>{tag}</StyledBadge>
                                    ))}
                                </BadgeGroup>
                                <ButtonWrapper>
                                <StyledButton
                                    href={course.link} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FiExternalLink /> View Course
                                </StyledButton>
                                </ButtonWrapper>
                            </CardBodyStyled>
                        </CourseCardWrapper>
                    </Col>
                    );
                })}
                </Row>
            </>
        )}

      </RecommendationsContainer>

      {/* 3. Footer is always visible at the bottom */}
      <StyledFooter>
         <Container>
            <p className="mb-0">Copyright © {new Date().getFullYear()} Motivar Learning Technologies</p>
         </Container>
      </StyledFooter>
    </PageWrapper>
  );
}

export default RecommendationsList;