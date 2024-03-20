import Logo from './Motivar.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col, Button} from 'react-bootstrap'

const Navbar = () => {
    
    return ( 
        <Container fluid>
            <nav className='navbar navbar-nav navbar-expand-lg bg-body-tertiary'>
                <Row>
                    <Col md>
                        <a href="/explore">Explore</a>
                        <a href="/pricing">Pricing</a>
                        <a href="/community">Community</a>
                    </Col>
                    <Col md><img  src={ Logo } alt='Logo' /></Col>
                    <Col md>
                        <Button className="btn btn-lg  me-2 d-inline-flex justify-content-center align-items-center"> Sign in</Button>
                        <Button>Get App</Button>
                    </Col>
                    <Col md>
                        
                    </Col>
                </Row>
            
            </nav>
        </Container>
        
    );
}
 
export default Navbar;