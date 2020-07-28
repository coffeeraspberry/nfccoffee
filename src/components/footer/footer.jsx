import React from 'react';
import './footer.css';
import logo from '../../assets/logoImg.png';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Container, Row , Col} from 'reactstrap';


let handleClick = () => {
    console.log('HERE!');
    alert('Footer route');
  };


function footer() {
 
  return (
    
    <Container fluid={true}>
      <Row className="foot">
        <Col></Col>
          <Col md="auto">  <Link to='/foot'><img src={logo} className="imgforFooter" onClick={()=>{handleClick()}}/>  </Link></Col>
          <Col></Col>
            </Row>
    </Container>
  );
}







export default footer;
