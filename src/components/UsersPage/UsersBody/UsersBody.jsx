import React from 'react';
import './UsersBody.css';
import BootstrapTable from 'reactjs-bootstrap-table';
import { Container, Row, Col } from 'reactstrap';
class UsersBody extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: false,
            users: []
    };
    this.state.data=props.items
  }

  onDoubleClicked(){
    alert('double click on row')
  }


  render (){
      let data= this.state.data
      let columns = [
        { name: 'Counter' },
        { name: 'LastAccess' },
        { name: 'UserId' },
        { name: 'UserName' },
        { name: 'email' }
      ]
    console.log('din body ', this.state.data)
        return (
    <Container fluid={true}>
        <BootstrapTable className="table" columns={columns} data={data} onRowDoubleClicked={this.onDoubleClicked} headers={true}/>
        </Container>
     )
  }

}

 
      export default UsersBody;