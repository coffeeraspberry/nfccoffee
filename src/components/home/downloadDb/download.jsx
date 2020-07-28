import React from 'react';
import './download.css';
import {Link}  from "react-router-dom";
import downloadImg from '../../../assets/downloadImg.png';
import usersImg from '../../../assets/userListLogo.png'
import home from '../home'


let handleClick = () => {
    console.log('HERE!');
   // alert('Download Router');
  };



function DownloadForm() {
    return (
      <div className="download">
        <div className="space"></div>
        <div className="imgContainer">
          <Link to='/download'><img src={downloadImg} className="downloadImg" onClick={()=>{handleClick()}}/>  </Link>
          
              <Link to='/users'><img src={usersImg} className="usersImg" onClick={()=>{handleClick()}}/>  </Link>
              </div> 
      </div>
    );
  }


export default DownloadForm;
