import React from "react";
import { Redirect } from "react-router-dom";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Container, Row, Col, Button, Tooltip, UncontrolledTooltip } from "reactstrap";
import api from "../../../constants/api";
import copy from "copy-to-clipboard";
import DEBUG from "../../../constants/debug";
import "./AdminTable.css";
let route = "/users";
let reset_route = "/api/reset";

class AdminTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFetching: true,
      loading: true,
      uid: null,
    };
    this.handleResetButton = this.handleResetButton.bind(this);
  }

  async componentDidMount() {
    let url = api + route;

    let options = {
      method: "GET",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    };

    let Urlresponse = await fetch(url, options);
    let JsonResponse = await Urlresponse.json();

    this.setState({ data: JsonResponse });
    let JsonString = await JSON.stringify(JsonResponse, null, 4);
    /* 
      -------------------
      DEBUG. CHECK DATA
      -------------------
      */
    if (DEBUG) {
      console.log("AdminTable fetch url : ", url);
      console.log("AdminTable JsonResponse : ", JsonResponse);
      console.log("AdminTable JsonString : ", JsonString);
    }
    return JsonString;
  }
  
  demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  set_uid(uid) {
    this.state.uid = uid;
    console.log("done ", this.state.uid);
  }
  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }
    const selectRow = {
      mode: "radio",
      bgColor: "#ffb300",
      clickToSelect: true,
      hideSelectColumn: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        this.set_uid(row.UserID);
      },
    };
    const rowEvents = {
      onDoubleClick: (e, row, rowIndex) => {
        alert("Row copied to clipboard ", rowIndex);

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
    let columns = [
      
      {
        dataField: "Counter",
        dataAlign: "Center",
        text: "Counter",
        headerStyle: { backgroundColor: "white" },
      },
      {
        dataField: "Email",
        dataAlign: "Center",
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

    if (this.state.data == null) {
      return (
        <div>
          <Container fluid={true}>
            <Row className="on-load">
              <Col></Col>
              <Col xs="auto" sm="auto" md="auto">
                <div class="loader">
                  <div className="load-text">Table loading</div>
                  <span class="loader__dot">.</span>
                  <span class="loader__dot">.</span>
                  <span class="loader__dot">.</span>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col sm="10">
                {" "}
                <div className="load-gif">
                  <img
                    src="https://media3.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
                    width="300"
                    height="200"
                    alt="cat"
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      
      return (
        <div>
          <div className="reset-couter-button">
          
  

            <Button id="uncontrolledTooltip" color="success" onClick={this.handleResetButton}>
              Reset User Counter
            </Button>{" "}
            <UncontrolledTooltip
          placement="bottom"
          target="uncontrolledTooltip"
          delay={{ show: 1000, hide: 0 }}
        >
         First select a row
        </UncontrolledTooltip>
          </div>
          <div classNames="table table-hover">
            <BootstrapTable
              wrapperClasses="table-responsive"
              hover={true}
              className="table-condensed table-striped table-hover"
              keyField="id"
              loading={true}
              data={this.state.data}
              columns={columns}
              headerStyle={{ backgroundColor: "green" }}
              bordered={false}
              headers={true}
              fluid={true}
              pagination={paginationFactory()}
              filter={filterFactory()}
              rowStyle={{ backgroundColor: "white" }}
              rowEvents={rowEvents}
              selectRow={selectRow}
              condensed={true}
            />
          </div>
        </div>
      );
    }
  }

  handleResetButton(e, row) {
    if (this.state.uid === undefined || this.state.uid === null) {
      console.log("this is the uid ", this.state.uid);
      return null;
    }
    console.log("row ", this.state.uid);
    let url = api + reset_route;
    let options = {
      method: "POST",
      headers: {
        "token": localStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({
        UserID: this.state.uid,
      }),
    };
    let response = fetch(url, options).then(() => {
      console.log('AdminTable fetch')
      alert("Change submitted");
     window.location.replace('/api')
    });
  }
}

export default AdminTable;
