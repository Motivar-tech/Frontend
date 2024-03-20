import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Persons from '../assets/images/persons.png';

export default function AppRequest () {
    return(
        <Container fluid>
            <Row className="ps-5 pt-5 text-center">
                <Col md={7}>
                    <>
                        <p className=" h1 pt-5 px-5 text-md-start fw-normal" ><br></br> <br></br>
                        <strong>Ask for help to pay for courses<br></br>you need but cannot afford</strong>
                        </p>
                        <div className="px-5 pt-3 d-md-flex" >
                            <Button className="btn btn-lg btn-secondary pt-2">Request for help</Button>
                        </div>
                        
                    </>
                </Col>
                <Col md={5}>
                    <Image fluid src={Persons} alt="persons"/>
                </Col>
                
            </Row>
        </Container>
    );
}