/* eslint-disable */

import "../App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Logo from "../assets/images/Motivar.svg";

const handleLogout = () => {
  localStorage.removeItem('motivar-token');
  localStorage.removeItem('motivar-user-role');
  window.location.href = '/';
};

export default function AppNavbar() {
  let token = localStorage.getItem("motivar-token");

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#fefcf9",
        fontFamily: "Montserrat, sans-serif",
        minHeight: "109px",
        height: "109px",
        zIndex: 1000,
      }}
      className="shadow-none"
      fixed="top"
    >
      <Container fluid className="px-md-5 position-relative">
        {/* Left: Nav Links */}
        <Nav
          className="d-none d-lg-flex align-items-center"
          style={{
            gap: "2.5rem",
            fontWeight: 500,
            fontSize: "1.08rem",
          }}
        >
          <Nav.Link as={Link} to="/explore" style={{ color: "#222", padding: "0 0.5rem" }}>
            Explore
          </Nav.Link>
          <NavDropdown title="Programs" id="programs-dropdown" style={{ color: "#222" }}>
            <NavDropdown.Item as={Link} to="/coming-soon">All Programs</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Community" id="community-dropdown" style={{ color: "#222" }}>
            <NavDropdown.Item as={Link} to="/coming-soon">Find learners near you</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/coming-soon">Find mentors near you</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/coming-soon">Join accountability group</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Center: Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="position-absolute start-50 top-50 translate-middle d-none d-lg-flex align-items-center justify-content-center"
          style={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#295c4a",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "auto",
            lineHeight: 1,
          }}
        >
          <Image src={Logo} alt="Motivar Logo" style={{ maxHeight: "36px", marginRight: "0.5rem", verticalAlign: "middle" }} />
        </Navbar.Brand>

        {/* Mobile: Logo left */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex d-lg-none align-items-center"
          style={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#295c4a",
          }}
        >
          <Image src={Logo} alt="Motivar Logo" style={{ maxHeight: "36px", marginRight: "0.5rem" }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" className="ms-auto" />

        <Navbar.Collapse id="main-navbar-nav">
          {/* Mobile: Nav Links */}
          <Nav
            className="d-lg-none align-items-start"
            style={{
              gap: "1.2rem",
              fontWeight: 500,
              fontSize: "1.08rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Nav.Link as={Link} to="/explore" style={{ color: "#222" }}>
              Explore
            </Nav.Link>
            <NavDropdown title="Programs" id="programs-dropdown-mobile" style={{ color: "#222" }}>
              <NavDropdown.Item as={Link} to="/coming-soon">All Programs</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Community" id="community-dropdown-mobile" style={{ color: "#222" }}>
              <NavDropdown.Item as={Link} to="/coming-soon">Find learners near you</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/coming-soon">Find mentors near you</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/coming-soon">Join accountability group</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right: Auth Buttons */}
          <div
            className="d-flex align-items-center ms-lg-auto flex-column flex-lg-row"
            style={{ gap: "1rem" }}
          >
            {!token && (
              <Link to="/user-auth" className="w-100">
                <Button
                  variant="outline-success"
                  className="w-100"
                  style={{
                    border: "2px solid #59b49a",
                    color: "#59b49a",
                    background: "#fff",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontFamily: "Montserrat, sans-serif",
                    minWidth: "100px",
                    padding: "0.4rem 1.2rem",
                  }}
                >
                  Sign in
                </Button>
              </Link>
            )}
            {token && (
              <Button
                variant="outline-danger"
                className="w-100"
                style={{
                  border: "2px solid #dc3545",
                  color: "#dc3545",
                  background: "#fff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif",
                  minWidth: "100px",
                  padding: "0.4rem 1.2rem",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
            <Link to="/coming-soon" className="w-100">
              <Button
                className="w-100"
                style={{
                  background: "#59b49a",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif",
                  minWidth: "110px",
                  padding: "0.4rem 1.2rem",
                  boxShadow: "none",
                }}
              >
                Get App
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
      <style>
        {`
        @media (max-width: 991.98px) {
          .navbar {
            min-height: 70px !important;
            height: 70px !important;
          }
          .navbar-brand.position-absolute {
            position: static !important;
            left: unset !important;
            top: unset !important;
            transform: none !important;
            margin-right: 0 !important;
          }
          .navbar-collapse {
            background: #fefcf9;
            padding-bottom: 1rem;
            border-radius: 0 0 16px 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.03);
          }
          .navbar-nav {
            gap: 0.5rem !important;
            align-items: flex-start !important;
          }
          .navbar .btn, .navbar .btn-outline-success, .navbar .btn-outline-danger {
            min-width: 100%;
            margin-bottom: 0.5rem;
          }
        }
        `}
      </style>
    </Navbar>
  );
}
