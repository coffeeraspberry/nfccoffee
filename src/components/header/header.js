import React from 'react';
import './header.css';
import logo from '../../assets/logoImg.png';
import { BrowserRouter, Route, Link } from "react-router-dom";


let handleClick = () => {
    console.log('HERE!');
    alert('Home route');
  };


function header() {

  return (
    <div className="head">
     <header class="head-header">
        <div class="head-bar">  
            <Link to='/home'><img src={logo} className="head-logo" onClick={()=>{handleClick()}}/>  </Link>
        </div>
     </header>
    </div>
  );
}







export default header;
