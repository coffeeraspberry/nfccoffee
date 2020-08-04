import React from 'react';
import './header.css';
import logo from '../../assets/logoImg.png';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { Button, Navbar, NavDropdown, Nav } from 'react-bootstrap'

let handleClick = () => {
    console.log('HERE!');
   // alert('Home route');
  };


function header() {

 return (
  <Container fluid>
 <Row className="head">
   <Col>  </Col>
         <Col md="auto"> <Link to='/home'><img src={logo} className="head-logo" onClick={()=>{handleClick()}} alt="logo"/>  </Link> </Col> 
         <Col ></Col>
         </Row>
         <Row>

         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav">
  <Navbar.Brand href="/home" className="home-btn">Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Options" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/users">Show User List</NavDropdown.Item>
        <NavDropdown.Item href="/addUsr">Add New User</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Fill User Info</NavDropdown.Item>
        <NavDropdown.Item href="/graph">CoffeeGraph</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/download">Download Database .csv</NavDropdown.Item> 
      </NavDropdown>
   
      <Nav.Link href="/contact">Contact</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
    
    </Nav>
  </Navbar.Collapse>
</Navbar>
         </Row>

         </Container>
);

}







export default header;
