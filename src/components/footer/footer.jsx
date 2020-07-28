import React from 'react';
import './footer.css';
import logo from '../../assets/logoImg.png';
import { BrowserRouter, Route, Link } from "react-router-dom";


let handleClick = () => {
    console.log('HERE!');
    alert('Footer route');
  };


function footer() {
 
  return (
    <div className="foot">
        <div className="footer-container">  
            <Link to='/foot'><img src={logo} className="footer-img" onClick={()=>{handleClick()}}/>  </Link>
        </div>
     
    </div>
  );
}







export default footer;
