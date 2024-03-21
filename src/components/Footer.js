import '../App.css';

// import ul from 'react-bootstrap/ul';
import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import X from '../assets/images/x.svg';
import FB from '../assets/images/fb.svg';
import IN from '../assets/images/in.svg';


    export default function AppFooter() {
        return (
            <>

            <div className="container-fluid p-5 text-center ">
                <footer className="row p-3">
                    <div className="col-md-4 mb-3">
                        <Link to="/" className="justify-content-sm-center justify-content-md-center d-flex mb-3 link-body-emphasis text-decoration-none">
                            <Image src={Logo} className="" alt="logo" fluid/>
                        </Link>
                    </div>
                    <div className="col-md-5"></div>
                    <div className="col-md-1 mb-3 text-md-start">
                        <h5>Company</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/coming-soon" className="nav-link p-0 text-body-secondary">Blog</Link></li>
                            <li className="nav-item mb-2"><Link to="/coming-soon" className="nav-link p-0 text-body-secondary">Pricing</Link></li>
                            <li className="nav-item mb-2"><a href="mailto:contact@motivar.live" className="nav-link p-0 text-body-secondary">Contact</a></li>
                        </ul>
                    </div>
                
                
                    <div className="col-md-2 mb-3 text-md-start">
                        <h5>FAQs</h5>
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2"><Link to="/coming-soon" className="nav-link p-0 text-body-secondary">Terms &amp; Conditions</Link></li>
                                <li className="nav-item mb-2"><Link to="/coming-soon" className="nav-link p-0 text-body-secondary">Privacy</Link></li>
                            </ul>
                            <a href="https://x.com/_motivar"><Image className="mx-auto image-fluid pe-1" src={X} alt="x" fluid/></a>
                            <Link to="/coming-soon" ><Image className="mx-auto image-fluid px-1" src={IN} alt="linked-in" fluid/></Link>
                            <Link to="/coming-soon"><Image className="mx-auto image-fluid" src={FB} alt="facebook" fluid/></Link>
                    </div>
                    
                </footer>
            </div>
                
            <div className="d-flex flex-column flex-sm-row justify-content-center p-4 my-4 border-top">
                <p>Copyright &copy; 2024 Motivar</p>
            </div>
        </>

        );
  }