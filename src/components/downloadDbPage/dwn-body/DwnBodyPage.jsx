import React from 'react';
import './DwnBodyPage.css';
import api from '../../../constants/api'
import {Container, Row, Col} from 'reactstrap'
import CsvDownload from 'react-json-to-csv'
let route='/users'
class DwnBodyPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: false,
            users: []
    };
    this.state.data=props.items
  }

  async  componentDidMount() {    

    let url=  api +route
   
    
    
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
      return picpic;
  }

  
  render (){
    console.log('din body ', this.state.data)
        return (
          <div>
          <Container>
    
      <Row>
        <Col></Col>
          <Col>
          
          <CsvDownload data={this.state.data}  className="down-button"/>
          
          </Col>
     <Col></Col>
      </Row>

  
    </Container>
    </div>
    )
  }

}




 



      export default DwnBodyPage;