/* eslint-disable */

import "../App.css";

// import ul from 'react-bootstrap/ul';
import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Logo from "../assets/images/Motivar.svg";
import X from "../assets/images/x.svg";
import FB from "../assets/images/fb.svg";
import IN from "../assets/images/in.svg";

export default function AppFooter() {
  return (
    <div style={{
      backgroundColor: '#64d69f',
          }} className="container-fluid p-5 text-white py-4">
      <footer className="row text-center text-md-start">
        <div className="col-md-4 col-sm-12 mb-3 mb-md-0">
          <Link to="/" className="d-flex justify-content-center justify-content-md-start mb-2">
            <Image src={Logo} alt="logo" fluid className="footer-logo" />
          </Link>
          <p className="text-muted small mb-0">Find | Start | Complete  Online Courses</p>
        </div>

        <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
          <h5 className="text-uppercase small">Company</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link to="/coming-soon" className="text-decoration-none text-muted small">
                Blog
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/coming-soon" className="text-decoration-none text-muted small">
                Pricing
              </Link>
            </li>
            <li className="mb-2">
              <a href="mailto:contact@motivar.live" className="text-decoration-none text-muted small">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
          <h5 className="text-uppercase small">FAQs</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link to="/coming-soon" className="text-decoration-none text-muted small">
                Terms &amp; Conditions
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/coming-soon" className="text-decoration-none text-muted small">
                Privacy
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-center justify-content-md-start">
            <a href="https://x.com/_motivar" className="me-2">
              <Image src={X} alt="x" fluid className="footer-icon" />
            </a>
            <Link to="/coming-soon" className="me-2">
              <Image src={IN} alt="LinkedIn" fluid className="footer-icon" />
            </Link>
            <Link to="/coming-soon">
              <Image src={FB} alt="Facebook" fluid className="footer-icon" />
            </Link>
          </div>
        </div>

        <div className="col-md-2 col-sm-12 mb-3 mb-md-0">
          <h5 className="text-uppercase small">Resources</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link to="/coming-soon" className="text-decoration-none text-muted small">
                Help Center
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/coming-soon" className="text-decoration-none text-muted small">
                Tutorials
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      <div className="border-top py-2 mt-3 text-center">
        <p className="small mb-0">© 2024 Motivar. All Rights Reserved.</p>
      </div>
    </div>
  );
}

