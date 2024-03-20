import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function AppNewsletter () {
    return(
        <Container fluid>
            <Row className="bg-secondary p-5 gx-3">
                <Col className="col-sm-12 col-md-8 offset-md-2">
                   <Row className="p-2 bg-info text-bg-info rounded">
                    <Form className="p-2 d-md-flex">
                        <div className="col-md-4 col-sm-12 text-md-start">
                            <h5><strong>Get updates</strong></h5>
                            <p>Not ready to start learning? Get updates of news, releases, and amazing stuffs you would love</p>
                        </div>
                        <div className="col-md-5 col-sm-12 pt-3">
                            <Form.Group className="" controlId="email">
                                <Form.Control type="email" placeholder="name@example.com" />
                            </Form.Group>
                        </div>
                        <div className="col-md-3 col-sm-12 pt-3">
                            <Button className="btn btn-md btn-secondary" type="button">Join newsletter</Button>
                        </div>
                    </Form>
                   </Row>
                </Col>
                
            </Row>
        </Container>
    );
}