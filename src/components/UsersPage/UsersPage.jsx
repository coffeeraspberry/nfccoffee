import React from 'react';
import './UsersPage.css';
import Header from '../header/header'
import Footer from '../footer/footer';
import UsersBody from './UsersBody/UsersBody'
import axios from 'axios'

let handleClick = () => {
    console.log('HERE!');
    alert('downloadDBPAGE route');
  };



class UsersPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: true,
    }
  }

  

 async  componentDidMount() {    
    let url=  'http://localhost:4321/users'
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
      this.setState({data: JsonResponse})
      return JsonResponse;
  }

  close = () => {
    this.setState({ showMod: false });
  };

  open = () => {
    this.setState({ showMod: true });
  };



render(){
  if(this.state.data==null){
  return(
  <div>
  <Header/>
  <h1>Please wait for users to load...</h1>
  <Footer/>
  </div>
  )
}else {
  return(
    <div>
    <Header/>
    <UsersBody items={this.state.data}/>
    <Footer/>
    </div>
    )
}
}
}

export default UsersPage;
