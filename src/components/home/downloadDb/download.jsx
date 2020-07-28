import React from 'react';
import './download.css';
import {Link}  from "react-router-dom";
import downloadImg from '../../../assets/downloadImg.png';
import usersImg from '../../../assets/userListLogo.png'
import home from '../home'
import { Container, Row, Col } from 'reactstrap';


let handleClick = () => {
    console.log('HERE!');
   // alert('Download Router');
  };



function DownloadForm() {
    return (
      <Container fluid>
      <div>
        <Row className="download">
          <Col></Col>
          
          <Col md="auto"><Link to='/download'><img src={downloadImg} className="downloadImg" onClick={()=>{handleClick()}}/></Link>
              <Link to='/users'><img src={usersImg} className="usersImg" onClick={()=>{handleClick()}}/>  </Link></Col>
              <Col></Col>
              </Row>
              
             </div>
             </Container>
    );
  }


export default DownloadForm;
