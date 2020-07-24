import React from 'react';
import './download.css';
import {Link}  from "react-router-dom";
import downloadImg from '../../assets/downloadImg.png';



let handleClick = () => {
    console.log('HERE!');
    alert('download route');
  };


  
function DonwloadForm() {
    return (
      <div className="head">
       <div className="">
              <Link to='/download'><img src={downloadImg} className="" onClick={()=>{handleClick()}}/>  </Link>
              </div>
      </div>
    );
  }



export default DonwloadForm;
