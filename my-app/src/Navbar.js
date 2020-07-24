import React from 'react';
import './Navbar.css';
import logo from './logoImg.png';
import { BrowserRouter, Route, Link } from "react-router-dom";
const dbLink=" http://localhost:4321/posts"

let handleClick = () => {
    console.log('HERE!');
    alert('Home route');
   
  };


function Navbar() {
 
  return (
    <div className="Nav">
     <header class="Nav-header">
        <div class="Nav-bar">  
            <Link to='/home'><img src={logo} className="Nav-logo" onClick={()=>{handleClick()}}/>  </Link>
        </div>
     </header>
    </div>
  );
}







export default Navbar;
