import React from "react";
import './ContactBody.css'
import api from '../../../constants/api'
import {Container , Row, Col,  InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Button } from 'reactstrap'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
class ContactBody extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:null, 
            Email:null,
            Name:null,
        }
    }


       

  handleSubmitButton(){
    let options = {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
       'Pragma': 'no-cache',
       'Expires': '0',
       }, 
       body:  JSON.stringify({ Email:document.getElementById("Email").value, UserName: document.getElementById("Name").value, Subject:document.getElementById("Subject").value, Message:document.getElementById("Msg").value})
    }
       
    
    
       let url=api +'/contact';
      
      
      let Urlresponse =  fetch(url, options)
     // let JsonResponse=  Urlresponse.json()

    }

render(){
return (
<Container>
    <div className="input-pos">
    <Row>
        <Col></Col>
        <Col md="auto" lg="6" sm="auto">
        <p className="big-text">Contact us</p>
<div className="white">
<AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} md="6" sm="6" lg="6" errorMessage="Please enter valid Email">
          <AvField name="Email" label="Email Address" type="email" required />
        </AvForm>
      
    </div>
    <div className="white">
<AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} errorMessage="This field is mandatory" >
          <AvField name="Name" label="Your Name"  required />
        </AvForm>
     
    </div>
    <div className="white">
<AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} errorMessage="This field is mandatory">
          <AvField name="Subject" label="Subject"  required />
        </AvForm>
   
    </div>
    <div className="white">
<AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} errorMessage="This field is mandatory">
          <AvField name="Msg" label="Your message"  required />
        </AvForm>
     
    </div>
    <Button color="success" onClick={this.handleSubmitButton}>Submit</Button>{' '}
    </Col>
    <Col></Col>
    </Row>
    </div>
    </Container>
);

}
}
export default ContactBody;