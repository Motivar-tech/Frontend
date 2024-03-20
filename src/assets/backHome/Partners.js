import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Pardna from '../assets/images/pardna.png';

export default function AppPartners(){
    return(
        <Container fluid>
            <Row className="partners">
                <Col className="my-3 ms-5">
                    <h3>Partners:</h3>
                </Col>
                <Col>
                    <Image fluid src={Pardna} alt="partner"/>
                </Col>
            </Row>
        </Container>
    );
}