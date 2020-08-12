import React from 'react';
import './download.css';
import {Link}  from "react-router-dom";
import downloadImg from '../../../assets/downloadImg.png';
import usersImg from '../../../assets/userListLogo.png'
import statisticsImg from '../../../assets/statistics.png'
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
          
          <Col md="auto"><Link to='/download'><img src={downloadImg} className="downloadImg" onClick={()=>{handleClick()}} alt="database"/></Link>
              <Link to='/users'><img src={usersImg} className="usersImg" onClick={()=>{handleClick()}} alt="users list"/>  </Link>
              <Link to='/graph'><img src={statisticsImg} className="statImg" onClick={()=>{handleClick()}} alt="users list"/>  </Link></Col>
              <Col></Col>
              </Row>
              
             </div>
             </Container>
    );
  }


export default DownloadForm;