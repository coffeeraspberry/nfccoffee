import React from 'react';
import './CommentPage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
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
    }

 
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
    
   

}




async   componentDidMount() {
    
    //this.demoAsyncCall().then(() => this.setState({ loading: false }));
    let url=  api +route
   
    console.log('URL THAT I AM FETCHING', url);
  
      let Urlresponse = await fetch(url, this.options)
      let JsonResponse= await Urlresponse.json()

    
      await this.setState({data: JsonResponse})
      console.log('state data ', this.state.data)
      return JsonResponse;
  };
  
  handleSubmitButton(){
    if (document.getElementById("username").value==""){
      alert('Please fill all mandatory fields')  
      return null
    }
  let options = {
      method: 'GET',
      headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
     'Pragma': 'no-cache',
     'Expires': '0',
     }, 
     body:  JSON.stringify({username:document.getElementById("username").value})
  }
  
  
     let url=api +'/comment';
    
    let Urlresponse =  fetch(url, options)
   // let JsonResponse=  Urlresponse.json()

  }




  render(){
    const { loading } = this.state.loading;
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }
    
 

   if(this.state.data==null){
    return (
      <div>

      <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} errorMessage="This field is mandatory">
<AvField name="username" label="Enter your username"  required />
</AvForm>
<Button color="success" onClick={this.handleSubmitButton}>Submit</Button>{' '}
<div class="loader"><div className='load-text'>Comments loading</div><span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>
   

</div>
    )
  }
 
    return (
    <div>
       <CommentBody items={this.state.data}/>
    </div>
    )


  }
}





export default CommentPage;
