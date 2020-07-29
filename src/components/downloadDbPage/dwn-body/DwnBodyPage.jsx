import React from 'react';
import './DwnBodyPage.css';
import {Container, Row, Col} from 'reactstrap'


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


  render (){
    console.log('din body ', this.state.data)
        return (
          <Container>
    <div className="dwn">
      <Row>
        <Col></Col>
          <Col><p className="dwn">Your download should be started now</p></Col>
     <Col></Col>
      </Row>

    </div>
    </Container>
    )
  }

}




 



      export default DwnBodyPage;