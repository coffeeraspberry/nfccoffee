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
  <div className="header">
  <Container fluid>

 <Row className="head">
   <Col>  </Col>
   
         <Col md="auto"> <Link to='/home'><img src={logo} className="head-logo" onClick={()=>{handleClick()}} alt="logo"/> </Link> </Col> 
         <Col ></Col>
         </Row>
         <Row>

         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav">
  <Navbar.Brand className="home-btn" ><Link to="/home">Home</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Options" id="collasible-nav-dropdown">
        <NavDropdown.Item><Link to="/users">Show User List</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/addUsr">Add/Fill User Info</Link></NavDropdown.Item>
        <NavDropdown.Item ><Link to="/graph">CoffeeGraph</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/download">Download Database .csv</Link></NavDropdown.Item> 
      </NavDropdown>
      <Nav.Link ><Link to="/comment">Comment Feed</Link></Nav.Link>
      <Nav.Link ><Link to="/contact">Contact</Link></Nav.Link>
      <Nav.Link ><Link to="/about">About</Link></Nav.Link>
  
    </Nav>
  </Navbar.Collapse>
</Navbar>

         </Row>
         
         </Container>
         </div>
);

}







export default header;
