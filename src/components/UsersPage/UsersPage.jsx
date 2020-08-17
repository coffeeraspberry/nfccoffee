import React from 'react';
import './UsersPage.css';
import Header from '../header/header'
import Footer from '../footer/footer';
import UsersBody from './UsersBody/UsersBody'
import { Container, Row, Col } from 'reactstrap';
import api from '../../constants/api'
import '../home/home.css'
import Loader from "../../router/loading"





class UsersPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: true,
      loading:true,
    }
  }

  

 async  componentDidMount() {    

    let url=  api +'/users'
   
    console.log('URL THAT I AM FETCHING', url);
    
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
      //console.log('JsonResponse : ', JsonResponse)
      this.setState({data: JsonResponse})
      let picpic= await JSON.stringify(JsonResponse, null, 4);
      console.log('pic pic ', picpic)
      this.demoAsyncCall().then(() => this.setState({ loading: false }));
      return picpic;

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


render(){
  const { loading } = this.state.loading;
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }

  if(this.state.data==null){
  return(
  <div >
    <div >

  <Container fluid={true}>
<Row className="on-load">
  <Col></Col>
  <Col>
  <div class="loader"><div className='load-text'>User table loading</div><span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>
 </Col>
  <Col></Col>
</Row>
  </Container>
  
  </div>
  </div>
  )
}else {
  return(
    <div >
   
    <UsersBody items={this.state.data}/>
    
    </div>
    )
}
}
}

export default UsersPage;
