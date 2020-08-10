import React from 'react';
import './footer.css';
import logo from '../../assets/footLogoImg.png'
import { Link } from "react-router-dom";
import { Container, Row , Col} from 'reactstrap';


let handleClick = () => {
    window.location.replace("https://www.continental.com/ro-ro");
  };


  

function footer() {
 
  return (
    
    <Container fluid={true}>
      <Row className="empty">
        
      </Row>
      <Row className="foot">
      <Col className="bord"></Col>
      <Col md="6" lg="6" xl="2" sm="6">
      <p className="copyright-text bord" >Copyright &#169; 2020. Continental Automotive Romania. 
      <br></br>
      All rights reserved
      </p>
     
      </Col>
      
      <Col className="bord"></Col>
          <Col md="auto" className="bord">  <Link to='/foot'><img src={logo} className="imgforFooter" onClick={()=>{handleClick()}} alt="footlogo" />  </Link></Col>
          
            </Row>

    </Container>
  );
}







export default footer;
