import React from "react";
import "./UsersBody.css";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import copy from "copy-to-clipboard";
import {Container, Row, Col} from 'reactstrap'

class UsersBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFetching: false,
      users: [],
    };
    this.state.data = props.items;
  }

  onDoubleClicked() {
    alert("double click on row");
  }

  render() {
    let data = this.state.data;
    const rowEvents = {
      onDoubleClick: (e, row, rowIndex) => {
        alert("Row copied to clipboard ", rowIndex);
        console.log("Row : ", row);
        let string = "";
        string +=
          "Counter : " +
          row.Counter +
          ", Email : " +
          row.Email +
          ", Last Access : " +
          row.LastAccess +
          ", User Id : " +
          row.UserID +
          ", Username : " +
          row.UserName;
        copy(string);
      },
    };
   
    /*
    const selectRow = {
      mode: 'radio',
    }
    */
   
    let columns = [
      {
        dataField: "Counter",
        text: "Counter",
        headerStyle: { backgroundColor: "white" },
      },
      {
        dataField: "Email",
        text: "Email ",
        filter: textFilter(),
        headerStyle: { backgroundColor: "white" },
      },
      {
        dataField: "LastAccess",
        text: "LastAccess",
        headerStyle: { backgroundColor: "white" },
      },
      {
        dataField: "UserID",
        text: "UserID",
        headerStyle: { backgroundColor: "white" },
      },
      {
        dataField: "UserName",
        text: "UserName ",
        filter: textFilter(),
        headerStyle: { backgroundColor: "white" },
      },
    ];
    
    return (
<Container >
  <Row xs="1" sm="1">
  <Col  sm="auto" xs="auto" lg="auto" xl="auto" md="auto"></Col>
    <Col sm="auto" xs="auto" lg="auto" xl="auto" md="auto">
      <div>
        
          <BootstrapTable 
          hover={true}
            keyField="id"
            loading={true}
            data={data}
            columns={columns}
            bordered={true}
            headers={true}
            fluid={true}
            pagination={paginationFactory()}
            filter={filterFactory()}
            rowStyle={{ backgroundColor: "white" }}
            rowEvents={rowEvents}
           
          />
       
      </div>
      </Col>
      <Col sm="auto" xs="auto" lg="auto" xl="auto" md="auto"></Col>
      </Row>
      </Container>
     
    );
  }
}

export default UsersBody;
