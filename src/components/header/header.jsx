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

  return (
   <div className="head">
           <Col><Link to='/home'><img src={logo} className="head-logo" onClick={()=>{handleClick()}}/>  </Link></Col> 
           </div>
  );
}







export default header;
