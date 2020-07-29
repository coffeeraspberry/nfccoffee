import React from 'react';
import './downloadDbPage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import DwnBodyPage from './dwn-body/DwnBodyPage'
import {Container, Row, Col} from 'reactstrap'

let handleClick = () => {
    console.log('HERE!');
    alert('downloadDBPAGE route');
  };






class downloadDbPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: true,
    }
  }

  setDbState(data) {
    this.setState.data= data;
  }

 async  componentDidMount() {    
    let url=  'http://localhost:4321/posts'
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
    console.log('this.state 1 ',this.state.data)
   
  return (
    <div className="dwn">
    <Container>
      <Header/>
      <Row>
        <Col></Col>
        <Col><p>Please wait, your download will start shortly</p></Col>
        <Col></Col>
      </Row>
      <Footer/>
     
    </Container>
    </div>
     
  )}
  else {
    console.log('this.state 2',this.state.data)
   return ( 
     <div className="dwn">
   <Header/>
   <DwnBodyPage items={this.state.data}/>
   <Footer/>
   </div>
   )

  }
}

}

export default downloadDbPage;
