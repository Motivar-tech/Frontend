import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Test from '../assets/images/test.png';

export default function AppTestimonial () {
    return(
        <Container fluid>
            <Row className="p-5 bg-primary justify-content-center testimonial">
                <col md={3}></col>
                <Col md={6} className="shadow-sm rounded">
                    <>
                    <Carousel>
                        <Carousel.Item>
                            <div class="caption">Yemi, 19</div>
                            <Image fluid src={Test} alt="testimonial" style={{float: 'left'}}/>
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div class="caption">Yemi, 19</div>
                            <Image fluid src={Test} alt="testimonial" style={{float: 'left'}}/>
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div class="caption">Yemi, 19</div>
                            <Image fluid src={Test} alt="testimonial" style={{float: 'left'}}/>
                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                        
                    </>
                </Col>
                
            </Row>
        </Container>
    );
}