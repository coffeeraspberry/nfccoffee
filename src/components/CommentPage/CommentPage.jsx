import React from 'react';
import './CommentPage.css';
import Loading from '../../router/loading';
import CommentBody from './CommentBody/CommentBody'
import api from '../../constants/api'
import {Container , Row, Col,  InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Button } from 'reactstrap'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
let route='/comment'




class CommentPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        data:null,
     isActive: true,
     loading:true,
     moveOn:false,
     user:null,
    }

    this.handleSubmitButton=this.handleSubmitButton.bind(this)
  }

  close = () => {
    this.setState({ showMod: false });
  };
  open = () => {
    this.setState({ showMod: true });
  };
demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  };

async needFetch(){
/*
    let url=api+route
    console.log('FETCH URL ', url)
let options = {
    method: 'GET',
    headers: {
      'mode': 'cors',
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
   'Pragma': 'no-cache',
   'Expires': '0'
    },
  };

    let Urlresponse = await fetch(url, options)
    let JsonResponse= await Urlresponse.json()
    
    console.log('JsonResponse : ', JsonResponse)
    
    let picpic= await JSON.stringify(JsonResponse, null, 4);
   this.state.data= picpic
    console.log('this.state.dataa ', this.state.data)
    */
   

}




async   componentDidMount() {
   /*
    //this.demoAsyncCall().then(() => this.setState({ loading: false }));
    let url=  api +route
   
    console.log('URL THAT I AM FETCHING', url);
  
      let Urlresponse = await fetch(url, this.options)
      let JsonResponse= await Urlresponse.json()

    
      await this.setState({data: JsonResponse})
      console.log('state data ', this.state.data)
      return JsonResponse;
      */  
  };



  async handleSubmitButton(){
      
    if (document.getElementById("username").value==""){
      alert('Please fill all mandatory fields')  
      return null
    }
    
  let options = {
      method: 'POST',
      headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
     'Pragma': 'no-cache',
     'Expires': '0',
     }, 
     body:  JSON.stringify({username:document.getElementById("username").value})
  }
  this.state.user=document.getElementById("username").value
  console.log('BODY SUBMIT ', options.body)
     let url=api +route;
    
    let Urlresponse = await fetch(url, options)
    let JsonResponse= await Urlresponse.json()
    console.log('response ', JsonResponse)

   this.setState({moveOn:true, data:JsonResponse.token})

  }




  render(){
    const { loading } = this.state.loading;
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }
    
 

   if(this.state.moveOn==false){
    return (
    <div>
<Container fluid className="white">
    <Col></Col>
    <Col lg="3" xl="3" sm xs md="6">
      <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} value={"user"} errorMessage="This field is mandatory">
<AvField name="username" label="Enter your username"  required />
</AvForm>
<Button color="success" onClick={this.handleSubmitButton}>Submit</Button>{' '}
</Col>
<Col></Col>
</Container>
<div class="loader"><div className='load-text'>Comments loading</div><span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>
</div>


    )
  }
 
    return (
    <div>
       <CommentBody data={this.state.data} userItem={this.state.user}/>
    </div>
    )


  }
}





export default CommentPage;
