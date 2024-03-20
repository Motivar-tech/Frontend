import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Persons from '../assets/images/persons.png';

export default function AppSponsor () {
    return(
        <Container fluid>
            <Row className="text-center bg-primary">
                <Col md={5}>
                    <Image fluid src={Persons} alt="persons"/>
                </Col>

                <Col md={7}>
                    <>
                        <p className=" h1 pt-5 px-5 text-md-start fw-normal" ><br></br> <br></br>
                            <strong>Help a learner pay for online courses they need and can't afford</strong>
                        </p>
                        <p class="h3 px-5 text-md-start fw-light">
                            Lots of young people want and need online courses to
                            upskill and improve their knowledge, but unfortunately cannot afford them.
                        </p>
                        <div className="px-5 py-4 d-md-flex" >
                            <Button className="btn btn-lg btn-secondary pt-2">Sponsor a learner</Button>
                        </div>
                        
                    </>
                </Col>
                
            </Row>
        </Container>
    );
}