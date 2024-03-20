import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Faces from '../assets/images/faces.png';

export default function AppComplete () {
    return(
        <Container fluid>
            <Row className="p-5 gx-5 text-center">
                <Col md={7}>
                    <>
                        <p className=" h1 pt-5 px-5 text-md-start fw-normal" ><br></br> <br></br>
                        <strong>Complete online courses you need to succeed</strong>
                        </p>
                        <p class="h3 px-5 text-md-start fw-light">Whatever you want to learn online, wherever they are hosted. We
                        will help you make the most of the journey.
                        </p>
                        <div className="px-5 pt-3 d-md-flex" >
                            <Button className="btn btn-lg btn-secondary pt-2">Get Started</Button>
                        </div>
                        
                    </>
                </Col>
                <Col md={5}>
                    <Image fluid src={Faces} alt="faces"/>
                </Col>
            </Row>
        </Container>
    );
}