import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import AppFooter from "../components/Footer.js";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import styled, { createGlobalStyle, css } from 'styled-components';
import {
    FiSearch, FiFilter, FiTag, FiBarChart2, FiExternalLink, FiLogOut,
    FiImage, FiChevronLeft, FiChevronRight, FiStar, FiPlusCircle, FiCheckCircle, FiUser, FiGrid
} from 'react-icons/fi';
import { getCourseImage } from '../utils/imgs.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Motivar.svg";

import { BASE_URL } from '../utils/index.js'

// --- Brand Colors ---
const brandColors = {
    primary: '#59b49a', // Main interactive green
    primaryDark: '#4aa088', // Darker shade for hover/active
    backgroundLight: '#f1fdf8', // Light green background (NOW MAIN BG)
    backgroundWhite: '#fefcf9', // Off-white background (NOW FOR CARDS/FILTERS)
    textPrimary: '#333',
    textSecondary: '#555',
    textWhite: '#ffffff', // For header
    greyLight: '#e9ecef',
    greyMid: '#ced4da',
    success: '#28a745',
    warning: '#ffc107',
    starColor: '#ffc107', // Yellow for stars
};

// --- Styled Components ---

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${brandColors.backgroundLight}; // Light green is main background
    color: ${brandColors.textPrimary};
  }
`;

// const StyledFooter = styled.footer`
//   background-color: ${brandColors.backgroundWhite}; // Light footer
//   color: ${brandColors.textSecondary};
//   text-align: center;
//   padding: 1.5rem 0;
//   font-size: 0.9rem;
//   border-top: 1px solid ${brandColors.greyLight};
//   margin-top: auto; // Push the footer to the bottom
// `;

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

// --- Placeholder SearchAutocomplete Component ---
// Replace this with your actual implementation
const SearchAutocomplete = ({ onSearch, initialQuery }) => {
    const [query, setQuery] = useState(initialQuery || '');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSearch(query); // Trigger search on submit
    };

    // Basic styling for the placeholder
    const SearchInput = styled.input`
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        border: 1px solid ${brandColors.greyMid};
        min-width: 300px; /* Adjust as needed */
        max-width: 500px;
        width: 100%;
        font-size: 1rem;
        &:focus {
            outline: none;
            border-color: ${brandColors.primary};
            box-shadow: 0 0 0 3px rgba(89, 180, 154, 0.3);
        }
    `;
    const SearchButton = styled.button`
        background: none;
        border: none;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: ${brandColors.primary};
        font-size: 1.5rem;
        cursor: pointer;
        padding: 5px;
         &:hover {
             color: ${brandColors.primaryDark};
         }
    `;

    return (
        <form onSubmit={handleFormSubmit} style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <SearchInput
                type="search"
                placeholder="Search for courses, skills, or keywords..."
                value={query}
                onChange={handleInputChange}
            />
            <SearchButton type="submit" aria-label="Search">
                <FiSearch />
            </SearchButton>
        </form>
    );
};
// --- End Placeholder SearchAutocomplete ---


const ExploreHeader = styled.div`
  background-color: ${brandColors.primary}; // Use primary green for header background
  color: ${brandColors.textWhite};
  padding: 3rem 1rem; // Adjusted padding

  /* Mimic Tailwind max-w-7xl mx-auto */
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;

  /* Mimic flex flex-col items-center text-center */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    /* Mimic text-4xl font-bold mb-4 */
    font-size: 2.25rem; /* ~36px */
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    /* Mimic text-xl mb-6 max-w-2xl */
    font-size: 1.25rem; /* ~20px */
    margin-bottom: 1.5rem;
    max-width: 672px; /* ~max-w-2xl */
    line-height: 1.6;
  }
`;

const ExploreContainer = styled(Container)`
  /* Container now doesn't need background, inherits from body */
  padding-top: 2.5rem;
  padding-bottom: 4rem;
`;

// Filters now use off-white background for contrast
const FilterWrapper = styled(Card)`
  background-color: ${brandColors.backgroundWhite};
  padding: 1.5rem 1.2rem;
  margin-bottom: 2.5rem;
  border: 1px solid ${brandColors.greyLight}; // Add subtle border
  border-radius: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04); // Softer shadow

  .form-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${brandColors.textSecondary};
    margin-bottom: 0.3rem;
  }
`;

const formControlBase = css`
    border-radius: 0.25rem;
    border: 1px solid ${brandColors.greyMid}; /* Ensure border is visible on white bg */
    background-color: ${brandColors.backgroundWhite}; /* Ensure bg is white */
    color: ${brandColors.textPrimary};
    font-size: 0.9rem;
    &:focus {
        border-color: ${brandColors.primary};
        box-shadow: 0 0 0 0.2rem rgba(89, 180, 154, 0.25);
    }
`;

const StyledFormSelect = styled(Form.Select)`
    ${formControlBase}
`;

const StyledFormControl = styled(Form.Control)`
    ${formControlBase}
`;

const StyledButton = styled(Button)`
  background-color: ${brandColors.primary};
  border-color: ${brandColors.primary};
  color: ${brandColors.textWhite}; // White text on primary button
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  transition: all 0.2s ease-in-out;

  &:hover, &:focus, &:active {
    background-color: ${brandColors.primaryDark};
    border-color: ${brandColors.primaryDark};
    color: ${brandColors.textWhite};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &.btn-outline-primary {
      color: ${brandColors.primary};
      border-color: ${brandColors.primary};
      background-color: transparent;

       &:hover, &:focus, &:active {
            background-color: ${brandColors.backgroundLight}; // Use light green for hover bg
            color: ${brandColors.primaryDark};
            border-color: ${brandColors.primaryDark};
       }
  }

  &.btn-outline-danger {
    color: #dc3545; // Red color for text
    border-color: #dc3545; // Red border
    background-color: transparent; // Transparent background

    &:hover, &:focus, &:active {
        background-color: rgba(220, 53, 69, 0.1); // Light red on hover
        color: #dc3545;
        border-color: #dc3545;
    }
  }
`;

// Course cards use off-white background
const CourseCardWrapper = styled(Card)`
  border: 1px solid ${brandColors.greyLight};
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  height: 100%;
  background-color: ${brandColors.backgroundWhite}; // Off-white background

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

const CardImagePlaceholder = styled.div`
  height: 180px;
  background-color: ${brandColors.greyLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${brandColors.greyMid};
  font-size: 2.5rem;

  img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
`;

const CardBodyStyled = styled(Card.Body)`
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitleStyled = styled(Card.Title)`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${brandColors.textPrimary};
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.6em;
`;

const CardDescription = styled(Card.Text)`
  font-size: 0.85rem; // Slightly smaller description
  color: ${brandColors.textSecondary};
  /* flex-grow: 1; // Removed flex-grow to allow content below to push up */
  margin-bottom: 0.75rem; // Reduced margin
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardMetaInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.85rem;
    color: ${brandColors.textSecondary};
`;

const RatingStars = styled.div`
    display: inline-flex;
    align-items: center;
    color: ${brandColors.starColor};
    gap: 0.1rem;
     .filled-star { fill: ${brandColors.starColor}; }
     .empty-star { fill: ${brandColors.greyMid}; opacity: 0.5;}
`;

const PriceInfo = styled.span`
    font-weight: 600;
    color: ${brandColors.primary}; // Highlight price

    &.free {
        color: ${brandColors.success}; // Green for Free
    }
`;


const BadgeGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const StyledBadge = styled(Badge)`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3em 0.6em;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  &.badge-level { background-color: ${brandColors.primary}; color: ${brandColors.textWhite}; }
  &.badge-platform { background-color: ${brandColors.greyLight}; color: ${brandColors.textSecondary}; }
  &.badge-tag { background-color: #e0e7ff; color: #4338ca; }
`;

const CardFooterStyled = styled.div`
    margin-top: auto; // Pushes footer to bottom
    padding-top: 0.5rem; // Space above button
`;

// Pagination and Loading/Error styles remain largely the same but inherit body background
const PaginationWrapper = styled.div`
    /* Styles remain the same */
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;

    .page-item .page-link {
        color: ${brandColors.primary};
        border-color: ${brandColors.greyLight};
        background-color: ${brandColors.backgroundWhite}; /* Ensure links have white bg */
        margin: 0 0.2rem;
        border-radius: 0.25rem;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: ${brandColors.backgroundLight}; /* Light green on hover */
            border-color: ${brandColors.primary};
            z-index: 2;
        }

        &:focus {
             box-shadow: 0 0 0 0.2rem rgba(89, 180, 154, 0.25);
        }
    }

    .page-item.active .page-link {
        background-color: ${brandColors.primary};
        border-color: ${brandColors.primary};
        color: white;
        z-index: 3;
    }

     .page-item.disabled .page-link {
        color: ${brandColors.greyMid};
        background-color: ${brandColors.backgroundWhite}; /* Use white for disabled bg */
        border-color: ${brandColors.greyLight};
    }
`;

const LoadingErrorWrapper = styled.div`
    /* Styles remain the same */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    color: ${brandColors.textSecondary};

     .spinner-border {
        width: 3rem;
        height: 3rem;
        color: ${brandColors.primary};
     }

     p {
        margin-top: 1rem;
        font-size: 1.1rem;
     }

     .text-danger {
         color: #dc3545 !important;
     }
`;

// --- Helper Function for Ratings ---
const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    //const hasHalfStar = rating % 1 !== 0; // Basic check, no half star icon used here yet

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<FiStar key={`star-${i}`} className="filled-star" size="1em"/>);
        } else {
            // Basic implementation: show empty star if not full
            stars.push(<FiStar key={`star-${i}`} className="empty-star" size="1em"/>);
        }
    }
    // You could add more complex logic here for half stars if needed using a different icon
    return stars;
};


// --- Component ---

const Explore = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedCourses, setAddedCourses] = useState([]); // Track added courses
    const [savingCourseId, setSavingCourseId] = useState(null); // Track the course being saved

    // Filter input states
    const [level, setLevel] = useState('');
    const [status, setStatus] = useState('');
    const [platform, setPlatform] = useState('');
    const [tagsInput, setTagsInput] = useState('');

    // Applied filters state (includes search term now)
    const [appliedFilters, setAppliedFilters] = useState({
        level: '',
        status: '',
        platform: '',
        tags: '',
        search: '', // Search term handled here
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_PER_PAGE = 12; // 4x3 layout

    // Fetch courses function using actual API call
    const fetchCourses = useCallback(async (page = 1, filters) => {
        setLoading(true);
        setError(null);
        console.log('Fetching with Filters:', filters, 'Page:', page); // Log filters being sent

        try {
            // --- === ACTUAL API CALL === ---
            const response = await axios.get(`${BASE_URL}/explore/filter`, {
                params: {
                    ...filters, // Send all applied filters (level, status, platform, tags, search)
                    page,
                    limit: ITEMS_PER_PAGE,
                },
            });

            const { courses: fetchedCourses, currentPage: fetchedCurrentPage, totalPages: fetchedTotalPages } = response.data;

            // **IMPORTANT**: Ensure backend returns courses WITH `_id` and ideally `imageUrl`
            // Assuming backend courses match the schema
            setCourses(fetchedCourses || []);
            setCurrentPage(fetchedCurrentPage || 1);
            setTotalPages(fetchedTotalPages || 1);
             // --- === END ACTUAL API CALL === ---

        } catch (err) {
            console.error('Error fetching courses:', err);
             // Check if the error has response data (like from Axios)
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
                 setError(`Failed to load courses (Status: ${err.response.status}). Please try again.`);
            } else if (err.request) {
                 console.error("Error request:", err.request);
                 setError('Failed to load courses. No response received from server. Please check your connection.');
            } else {
                 setError('Failed to load courses. An unexpected error occurred.');
            }
            setCourses([]); // Clear courses on error
            setTotalPages(1);
            setCurrentPage(1);
        } finally {
            setLoading(false);
        }
    }, []); // fetchCourses itself doesn't need dependencies

    // Effect to fetch courses when filters or page change
    useEffect(() => {
        fetchCourses(currentPage, appliedFilters);
    }, [appliedFilters, currentPage, fetchCourses]); // Add fetchCourses here

    // Handle Search from Header Component
    const handleSearch = (searchQuery) => {
        console.log("Search triggered:", searchQuery);
        setAppliedFilters(prevFilters => ({
            ...prevFilters,
            search: searchQuery, // Update only the search term
        }));
        setCurrentPage(1); // Reset to page 1 on new search
         // fetchCourses will be triggered by the useEffect watching appliedFilters
    };

    // Handle filter application from the filter bar (excluding search)
    const handleFilter = () => {
        const newFilters = {
            ...appliedFilters, // Keep existing search term
            level,
            status,
            platform,
            tags: tagsInput,
        };
        setAppliedFilters(newFilters);
        setCurrentPage(1); // Reset to the first page when filters change
        // fetchCourses will be triggered by the useEffect watching appliedFilters
    };

    // Handle Enter key for Tags input only
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.id === 'filterTags') {
            setTagsInput(e.target.value); // Ensure state is updated if needed
            handleFilter(); // Apply filters including the tag
        }
    };

     // Handle pagination click
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
             // fetchCourses will be triggered by the useEffect watching currentPage
             window.scrollTo(0, 0); // Scroll to top on page change
        }
    };

    // Function to handle adding a course to the dashboard
    const handleAddCourse = async (course) => {
        setSavingCourseId(course._id); // Set the course being saved
        try {
            const token = localStorage.getItem("motivar-token");
            if (!token) throw new Error("Authentication token is missing. Please log in again.");

            const response = await axios.post(
                `${BASE_URL}/dashboard/add`, // Backend endpoint
                {
                    title: course.title,
                    description: course.description,
                    link: course.url,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert(response.data.message); // Notify the user
            setAddedCourses((prev) => [...prev, course._id]); // Mark the course as added
        } catch (err) {
            console.error("Error adding course:", err);
            alert(err.response?.data?.message || "Failed to add course. Please try again.");
        } finally {
            setSavingCourseId(null); // Reset the saving state
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by verifying the token in localStorage
        const token = localStorage.getItem("motivar-token");
        setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("motivar-token");
        localStorage.removeItem("motivar-user-role");
        window.location.href = "/user-auth";
    };

     // --- Render Pagination Items (Function remains the same) ---
     const renderPaginationItems = () => {
        let items = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        const adjustedStartPage = Math.max(1, endPage - maxPagesToShow + 1);

        items.push(
            <Pagination.Item key="prev" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                <FiChevronLeft />
            </Pagination.Item>
        );

        if (adjustedStartPage > 1) {
            items.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>{1}</Pagination.Item>);
            if (adjustedStartPage > 2) {
                 items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            }
        }

        for (let number = adjustedStartPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages) {
             if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            }
            items.push(<Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>);
        }

        items.push(
            <Pagination.Item key="next" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                 <FiChevronRight />
            </Pagination.Item>
        );

        return items;
    };


    return (
        <>
            <GlobalStyle />
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
             {/* New Header Section */}
            <ExploreHeader>
                 <h1>What do you want to learn today?</h1>
                 <p>
                    Discover thousands of online courses from top providers. Learn new skills, advance your career, or explore a passion.
                 </p>
                 {/* Pass handleSearch and potentially the current search query */}
                 <SearchAutocomplete onSearch={handleSearch} initialQuery={appliedFilters.search} />
            </ExploreHeader>

            <ExploreContainer>
                 {/* Filters */}
                <FilterWrapper>
                    {/* Reduced columns as Search is removed */}
                    <Row className="g-3 align-items-end">
                        <Col md={6} lg={2}> {/* Level */}
                            <Form.Group controlId="filterLevel">
                                <Form.Label>Level</Form.Label>
                                <StyledFormSelect value={level} onChange={(e) => setLevel(e.target.value)}>
                                    <option value="">All Levels</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="All">All (Specific)</option>
                                </StyledFormSelect>
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={2}> {/* Status */}
                             <Form.Group controlId="filterStatus">
                                <Form.Label>Status</Form.Label>
                                <StyledFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">All Status</option>
                                    <option value="Free">Free</option>
                                    <option value="Paid">Paid</option>
                                </StyledFormSelect>
                            </Form.Group>
                        </Col>
                         <Col md={6} lg={3}> {/* Platform */}
                            <Form.Group controlId="filterPlatform">
                                <Form.Label>Platform</Form.Label>
                                <StyledFormControl
                                    type="text"
                                    placeholder="e.g., Coursera"
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    // No Enter key trigger here usually
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={3}> {/* Tags */}
                            <Form.Group controlId="filterTags">
                                <Form.Label>Tags / Keywords</Form.Label>
                                <StyledFormControl
                                    type="text"
                                    placeholder="e.g., react, python"
                                    value={tagsInput}
                                    onChange={(e) => setTagsInput(e.target.value)}
                                    onKeyPress={handleKeyPress} // Trigger filter on Enter
                                    list="tag-suggestions" // Link to datalist
                                />
                                {/* Basic Datalist for suggestions - replace with better component later */}
                                <datalist id="tag-suggestions">
                                    <option value="Marketing" />
                                    <option value="Python Programming" />
                                    <option value="Data Analysis" />
                                    <option value="Machine Learning" />
                                    <option value="DevOps" />
                                    {/* Add more common tags or fetch dynamically */}
                                </datalist>
                            </Form.Group>
                        </Col>
                        <Col md={12} lg={2}> {/* Apply Button - takes full width on medium */}
                             <StyledButton variant="primary" onClick={handleFilter} className="w-100">
                                <FiFilter /> Apply Filters
                            </StyledButton>
                        </Col>
                    </Row>
                </FilterWrapper>


                {/* Course List Area */}
                 {loading ? (
                    <LoadingErrorWrapper>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p>Loading courses...</p>
                    </LoadingErrorWrapper>
                ) : error ? (
                     <LoadingErrorWrapper>
                        <p className="text-danger">{error}</p>
                     </LoadingErrorWrapper>
                 ) : courses.length > 0 ? (
                    <>
                        {/* Course Grid - Updated Column Count */}
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            {courses.map((course) => {
                                const imageUrl = getCourseImage(course.title, course.description, course.tags || []);
                                const isAdded = addedCourses.includes(course._id); // Check if the course is already added
                                return (
                                <Col key={course._id}>
                                    <CourseCardWrapper>
                                        <CardImagePlaceholder>
                                            {imageUrl ? (
                                                <img src={imageUrl} alt={course.title} />
                                            ) : (
                                                <FiImage /> // Fallback icon
                                            )}
                                        </CardImagePlaceholder>
                                        <CardBodyStyled>
                                            <CardTitleStyled>{course.title}</CardTitleStyled>

                                            {/* Meta Info: Ratings and Price */}
                                            <CardMetaInfo>
                                                 {/* Display Ratings if available */}
                                                <span>
                                                    {typeof course.ratings === 'number' ? (
                                                        <RatingStars>
                                                            {renderStars(course.ratings)}
                                                            <span style={{ marginLeft: '0.3rem', color: brandColors.textSecondary }}>
                                                                ({course.ratings.toFixed(1)})
                                                            </span>
                                                        </RatingStars>
                                                    ) : (
                                                        // Optional: Show placeholder if no rating
                                                         <span style={{ color: brandColors.greyMid }}>No rating</span>
                                                    )}
                                                </span>

                                                 {/* Display Price */}
                                                <PriceInfo className={course.status === 'Free' ? 'free' : ''}>
                                                    {course.status === 'Free' ? (
                                                        <>Free</>
                                                    ) : typeof course.price === 'number' ? (
                                                         `${course.priceUnit || ''}${course.price}`
                                                    ) : (
                                                         'Paid' // Fallback if price number isn't available
                                                    )}
                                                </PriceInfo>
                                            </CardMetaInfo>


                                            <CardDescription>{course.description}</CardDescription>

                                            <BadgeGroup>
                                                {course.level && <StyledBadge pill bg="" className="badge-level"><FiBarChart2 /> {course.level}</StyledBadge>}
                                                {course.platform && <StyledBadge pill bg="" className="badge-platform">{course.platform}</StyledBadge>}
                                                {/* Render first 2 tags */}
                                                 {course.tags && course.tags.length > 0 && course.tags.slice(0, 2).map(tag => (
                                                     <StyledBadge key={tag} pill bg="" className="badge-tag"><FiTag /> {tag}</StyledBadge>
                                                 ))}
                                            </BadgeGroup>

                                             <CardFooterStyled>
                                                <StyledButton
                                                    variant="outline-primary"
                                                    size="sm"
                                                    href={course.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-100" // Make button full width in footer
                                                >
                                                    <FiExternalLink /> View Course
                                                </StyledButton>
                                                <StyledButton
                                                    variant={isAdded ? "outline-success" : "outline-primary"}
                                                    size="sm"
                                                    onClick={() => handleAddCourse(course)}
                                                    disabled={isAdded || savingCourseId === course._id} // Disable if already added or saving
                                                    className="mt-2 w-100"
                                                >
                                                    {isAdded ? (
                                                        <FiCheckCircle />
                                                    ) : savingCourseId === course._id ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <FiPlusCircle />
                                                    )}{" "}
                                                    {isAdded ? "Added" : savingCourseId === course._id ? "Saving..." : "Save to Dashboard"}
                                                </StyledButton>
                                            </CardFooterStyled>

                                        </CardBodyStyled>
                                    </CourseCardWrapper>
                                </Col>
                            )})}
                        </Row>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <PaginationWrapper>
                                <Pagination>{renderPaginationItems()}</Pagination>
                            </PaginationWrapper>
                        )}
                    </>
                 ) : (
                     <LoadingErrorWrapper>
                         <p>No courses found matching your criteria. Try adjusting your filters or search term.</p>
                     </LoadingErrorWrapper>
                 )}
            </ExploreContainer>
            {/* Footer */}
            <AppFooter />
        </>
    );
};

export default Explore;