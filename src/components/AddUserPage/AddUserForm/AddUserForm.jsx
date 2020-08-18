import React from 'react'
import './AddUserForm.css'
import { Button, Form, FormGroup,FormFeedback, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import api from '../../../constants/api'
import { Redirect } from 'react-router-dom';
let route='/users'
const DEBUG = 1


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
    
    this.state.badgeID=props.items.UserID
    this.state.email=props.items.Email.toString()
    this.state.username=props.items.UserName.toString()
this.handleSubmitButton=this.handleSubmitButton.bind(this)
/* 
-------------------
DEBUG. EXPERIMENTAL FEATURE
NO USE NOW
-------------------
*/
if(DEBUG){
localStorage.setItem('badgeId', this.state.badgeID);
}

}
//END CONSTRUCTOR

async handleSubmitButton(){


/*
------------------------
       DEBUG CONSOLE LOG
------------------------
*/
if (DEBUG){
console.log('USERNAME ', document.getElementById("username").value)
console.log('EMAIL ', typeof(document.getElementById("email").value))
}
/*
------------------------
        END DEBUG
------------------------
*/


/* Check if input forms are not empty  */
/* Submit button will not do anything */
if(document.getElementById("username").value === "" && document.getElementById("email").value==="" )
  {return null}


let url=  api + route

let options = {
  method: 'POST',
  headers: {
        'Content-Type': 'application/json',
 },
 body:await  JSON.stringify({ UserName:document.getElementById("username").value, Email: document.getElementById("email").value, UserID:this.state.badgeID})
};
/* 
----------------
DEBUG. DATA CHECK
----------------
*/
if(DEBUG){
await console.log('set state ', this.state.data)
await console.log('body json : ', options.body)
}


  let Urlresponse = await fetch(url, options)
  let JsonResponse= await Urlresponse.json()
if(JsonResponse != null  || JsonResponse != undefined)
{
  await this.setState({data:true})
}

}
//*END HANDLE SUBMIT BUTTON


async componentDidMount()
{
  
    /* 
    -------------------
    DEBUG. CHECK DATA
    -------------------
    */
       if(DEBUG){
        console.log('FORM this.state.email ', this.state.email)
        console.log('FORM this.state.username ', this.state.username)
         }
         
} 



render(){
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
                <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} >
          <AvField name="email" label="Email Address" type="email" required value={this.state.email}/>
        </AvForm>
        </Col>
        <Col>
        <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
          <AvField name="username" label="Username" type="username" required value={this.state.username}/>
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
  
 <Redirect to exact path ='/home'></Redirect>
</Container>
    )
  
}
}

}

export default AddUserForm;