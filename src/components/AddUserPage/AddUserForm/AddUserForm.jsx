import React from 'react'
import './AddUserForm.css'
import { Button, Form, FormGroup,FormFeedback, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import api from '../../../constants/api'
import { Route, Redirect } from 'react-router-dom';

class AddUserForm extends React.Component{
constructor(props){
    super(props);
    this.state = {
        data:null,
        success:false,
     isActive: true,
     loading:true,
     badgeID:null,
     email:null,
     username:null,
    }
this.state.badgeID='1234321323213'
this.handleSubmitButton=this.handleSubmitButton.bind(this)
localStorage.setItem('badgeId', this.state.badgeID);
}

async handleSubmitButton(){
  
let url=  api +'/users'
   
console.log('URL THAT I AM FETCHING', url);

let options = {
  method: 'POST',
  headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
 'Pragma': 'no-cache',
 'Expires': '0',
 },
 body:await  JSON.stringify({ Email:document.getElementById("email").value, UserName: document.getElementById("username").value, UserID: localStorage.getItem('badgeId')})
};
await console.log('set state ', this.state.data)

  let Urlresponse = await fetch(url, options)
  let JsonResponse= await Urlresponse.json()
if(JsonResponse != null  || JsonResponse != undefined)
{
  await this.setState({data:true})
}

await console.log('set state  dupa ', this.state.data)
}


render(){
     console.log('set state render ', this.state.data)
if(this.state.data==null || this.state.data==false ){

return(
    <Container >
        <div className="white">
<Form>
<FormGroup>
    <Row>
        <Col></Col>
<Col>
        <FormGroup>
        <Label for="BadgeID" className="white-badge-label">Badge ID</Label>
        <Input name="badgeinput" label="badgeinput" className="white-badge-label" plaintext value={this.state.badgeID}/>
      </FormGroup>
      </Col>
      <Col></Col>
</Row>
</FormGroup>


        <FormGroup>
            <Row>
                <Col>
                <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
          <AvField name="email" label="Email Address" type="email" required  />
        </AvForm>
        </Col>
        <Col>
        <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
          <AvField name="username" label="Username" type="username" required />
        </AvForm>
        </Col>
        </Row>
        </FormGroup>
        <Button color="success" onClick={this.handleSubmitButton}>Submit</Button>
</Form>

</div>
</Container>

)
}else if(this.state.data==true) {
    
    return(
<Container fluid>
{alert('You will be redirected to home page now')}
   <Row>
       <Col></Col>
       <Col><p className='success-text'>Success!</p></Col>
       <Col></Col>
   </Row>
  
 <Redirect exact path ='/home'></Redirect>
</Container>
    )
  
}



}



}

export default AddUserForm;