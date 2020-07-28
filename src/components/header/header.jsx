import React from 'react';
import './header.css';
import logo from '../../assets/logoImg.png';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';


let handleClick = () => {
    console.log('HERE!');
   // alert('Home route');
  };


function header() {
/*
  return (
    <Container fluid>
   <Row>
     <Col> 1 of 3</Col>
           <Col  xs={5}><Link to='/home'><img src={logo} className="head-logo" onClick={()=>{handleClick()}}/>  </Link></Col> 
           <Col>3 of 3</Col>
           </Row>
           </Container>
  );
  */
 return (
  <Container fluid>
 <Row className="head">
   <Col></Col>
         <Col md="auto"> <Link to='/home'><img src={logo} className="head-logo" onClick={()=>{handleClick()}}/>  </Link> </Col> 
         <Col></Col>
         </Row>
         </Container>
);

}







export default header;
