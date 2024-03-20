import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Motivar.svg';
import X from '../assets/images/x.svg';
import FB from '../assets/images/fb.svg';
import IN from '../assets/images/in.svg';


export default function AppFooter () {
    return(
        <Container fluid>
            <Row className="p-5 text-start">
                <>
                    <Col className="col-md-3 ps-5">
                        <a href="index.html" class="d-flex mb-3 link-body-emphasis text-decoration-none">
                        <Image src={Logo} alt="logo" fluid/>
                        </a>
                    </Col>
                
                    <Col className="col-md-5 mb-3"></Col>
                
                    <Col className="col-md-2 mb-3">
                        <h5>Company</h5>
                        <ListGroup className="nav flex-column " flush>
                            <ListGroup.Item className="nav-item mb-2"><a href="wait.html" className="nav-link p-0 text-body-secondary">Blog</a></ListGroup.Item>
                            <ListGroup.Item className="nav-item mb-2"><a href="wait.html" className="nav-link p-0 text-body-secondary">Pricing</a></ListGroup.Item>
                            <ListGroup.Item className="nav-item mb-2"><a href="wait.html" className="nav-link p-0 text-body-secondary">Team</a></ListGroup.Item>
                        </ListGroup>
                    </Col>
                
                
                    <Col className="col-md-2 mb-3">
                        <h5>FAQs</h5>
                        <ListGroup className="nav flex-column ">
                            <ListGroup.Item className="nav-item mb-2"><a href="wait.html" className="nav-link p-0 text-body-secondary">Terms &amp; Conditions</a></ListGroup.Item>
                            <ListGroup.Item className="nav-item mb-2"><a href="wait.html" className="nav-link p-0 text-body-secondary">Privacy</a></ListGroup.Item>
                        </ListGroup>
                        <a href="https://x.com/_motivar"><Image className="mx-auto image-fluid" src={X} alt="x" fluid/></a>
                        <a href=""><Image className="mx-auto image-fluid" src={IN} alt="linked-in" fluid/></a>
                        <a href=""><Image className="mx-auto image-fluid" src={FB} alt="facebook" fluid/></a>
                    </Col>
                        
                </>
            </Row>
            <div className="d-flex flex-column flex-sm-row justify-content-center p-4 my-4 border-top">
        <p>Copyright &copy; 2024 Motivar</p>
        </div>
        </Container>
    );
}