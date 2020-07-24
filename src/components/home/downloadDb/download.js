import React from 'react';
import './download.css';
import {Link}  from "react-router-dom";
import downloadImg from '../../../assets/downloadImg.png';
import home from '../home.js'


let handleClick = () => {
    console.log('HERE!');
   // alert('Download Router');
  };



function DownloadForm() {
    return (
      <div className="head">
       <div className="download-body">
              <Link to='/download'><img src={downloadImg} className="downloadImg" onClick={()=>{handleClick()}}/>  </Link>
              </div>
      </div>
    );
  }


export default DownloadForm;
