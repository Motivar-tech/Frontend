import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import './Morph.js';


export default function AppHero() {
  
    return (
      <Container fluid>
        <Row className="header-text text-center">
          <Col md={2}></Col>
          <Col md={6}>
            <p className="lead display-4"><br></br><br></br>
              The easiest way to
              {/* <span className="px-2" id="text1"></span><span className="px-2" id="text2"></span>   */}
              online courses
            </p>
          </Col>
        </Row>
      </Container>
      
    );
  }