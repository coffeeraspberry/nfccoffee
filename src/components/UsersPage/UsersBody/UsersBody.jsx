import React from 'react';
import './UsersBody.css';
import BootstrapTable from 'reactjs-bootstrap-table';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Container, Row, Col} from 'reactstrap';
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
        { name: 'Counter'},
        { name: 'Email' },
        { name: 'LastAccess' },
        { name: 'UserID' },
        { name: 'UserName' }
      ]
    console.log('din body ', this.state.data)
        return (
          <div className="usr">
  
      
        
            
        <BootstrapTable className="table-condensed" pagination={true} columns={columns} data={data} bordered={true} onRowDoubleClicked={this.onDoubleClicked} headers={true}/>
      
       
        </div>
     )
  }

}

 
      export default UsersBody;