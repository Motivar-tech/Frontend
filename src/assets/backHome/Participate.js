import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Group from '../assets/images/group.png';

export default function AppParticipate () {
    return(
        <Container fluid>
            <Row className="text-center bg-dark">
                <Col md={5}>
                    <Image fluid src={Group} alt="group"/>
                </Col>

                <Col md={7}>
                    <>
                        <p className=" h1 pt-5 px-5 text-md-start fw-normal" ><br></br> <br></br>
                        <strong>Participate in learner <br></br>communities and turbocharge your learning experience</strong>
                        </p>
                        <p class="h3 px-5 text-md-start fw-light">
                            Connect with learners like you in your location to share ideas,
                            insights, challenges, and wins
                        </p>
                        <div className="px-5 py-4 d-md-flex" >
                            <Button className="btn btn-lg btn-secondary pt-2">Get Started</Button>
                        </div>
                        
                    </>
                </Col>
                
                
            </Row>
        </Container>
    );
}