import React from 'react';
import './UsersBody.css';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Container, Row, Col} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
//<BootstrapTable className="table-condensed" pagination={true} columns={columns} data={data} bordered={true} onRowDoubleClicked={this.onDoubleClicked} headers={true}/>
      




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
      console.log('data data data ', data)
      
      let columns = [
        {dataField: 'id', text : 'id'},
        { dataField: 'Counter', text: 'Counter'},
        { dataField: 'Email',text: 'Email ', filter: textFilter() },
        { dataField: 'LastAccess',text: 'LastAccess' },
        { dataField: 'UserID',text: 'UserID' },
        {dataField: 'UserName', text: 'UserName ',  filter: textFilter() }
      ]
    console.log('din body ', this.state.data)
   
        return (
          <div className="usr">
         



<div className="table">
<BootstrapTable className="table-condensed" keyField='id' loading={ true } data={ data } columns={ columns } bordered={true} headers={true} fluid={true} pagination={ paginationFactory()}  filter={ filterFactory() }   />
</div>


        
       
        </div>
     )
  }

}

 
      export default UsersBody;