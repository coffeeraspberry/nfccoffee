import React from 'react';
import './UsersPage.css';
import Header from '../header/header'
import Footer from '../footer/footer';
import UsersBody from './UsersBody/UsersBody'
import { Container, Row, Col } from 'reactstrap';
import api from '../../constants/api'





class UsersPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: true,
    }
  }

  

 async  componentDidMount() {    

    //let url=  api +'/users'
    let url = 'http://192.168.43.27:5000/users'
    console.log('URL THAT I AM FETCHING', url);
    /*
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
*/
  
      let Urlresponse = await fetch(url)
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
  <Container fluid={true}>
<Row className="on-load">
  <Col></Col>
  <Col>
  <div class="loader"><div className='load-text'>Loading </div><span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>

  </Col>
  <Col></Col>
</Row>
  </Container>
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
