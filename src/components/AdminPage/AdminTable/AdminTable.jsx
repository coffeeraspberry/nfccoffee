import React from "react";
import {Link } from "react-router-dom";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Container, Row, Col, Button } from "reactstrap";
import api from "../../../constants/api";
import copy from "copy-to-clipboard";
import DEBUG from "../../../constants/debug";
import Type from "react-bootstrap-table2-editor";
import "./AdminTable.css";
import AdminTableEdit from "./AdminTableEdit";
let route = "/users";
let reset_route = "/resetCounter";

class AdminTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFetching: true,
      loading: true,
      uid: null,
      edit: false,
      token: null,
    };
    this.handleResetButton = this.handleResetButton.bind(this);
  }
  /* Edit button handler */
  handleMyButton(e, row) {
    if (!this.state.edit) {
      alert("You are entering edit mode");
    } else {
      alert("You are leaving edit mode");
    }
    let it_be = !this.state.edit;
    this.setState({ edit: it_be });
    console.log("edit it be", this.state.edit);
  }
  /* Users table fetch */
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

  /* Change in state without render trigger */
  set_uid(uid) {
    this.state.uid = uid;
    console.log("done ", this.state.uid);
  }

  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }
    //Table props
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
        console.log("row is ", row);
        let string = "";
        string +=
          "Counter : " +
          row.Counter +
          ", Coffee Price : " +
          row.CoffeeUnitPrice +
          ", To pay : " +
          row.AmountToPay +
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
        editor: {
          type: Type.TEXTAREA,
        },
      },
      {
        dataField: "CoffeeUnitPrice",
        dataAlign: "Center",
        text: "Coffee Price",
        headerStyle: { backgroundColor: "white" },
      },
      {
        dataField: "AmountToPay",
        dataAlign: "Center",
        text: "To pay",
        headerStyle: { backgroundColor: "white" },
      },
      {
        dataField: "Email",
        dataAlign: "Center",
        text: "Email ",
        filter: textFilter(),
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
      },
      {
        dataField: "LastAccess",
        text: "LastAccess",
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
      },
      {
        dataField: "UserID",
        text: "UserID",
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
      },
      {
        dataField: "UserName",
        text: "UserName ",
        filter: textFilter(),
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
      },
    ];
    //end table props
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
      console.log("this.state.edit  inainte de return ", this.state.edit);
      //fetch success
      if (this.state.edit === false) {
        return (
          <div className="reset-couter-button">
            <Container fluid>
              <Row>
                <Col>
                  <div>
                    <Button color="success" onClick={this.handleResetButton}>
                      Reset User Counter
                    </Button>{" "}
                  </div>
                </Col>
                <Col>
                  <div>
                    <Button
                      color="primary"
                      onClick={this.handleMyButton.bind(this)}
                    >
                      Edit Mode
                    </Button>{" "}
                  </div>
                </Col>
                <Col>
                  <div>
                    <Link to="/signout">
                      <Button color="danger">Sign Out</Button>{" "}
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col>
                  <div className="change-button">
                    <Link to="/change">
                      <Button color="warning">Change Password</Button>{" "}
                    </Link>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Container>
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
      } else if (this.state.edit === true) {
        return (
          <div className="edit-buttons">
            <Container fluid>
              <Row>
                <Col>
                  <div>
                    <Button color="secondary">Reset User Counter</Button>{" "}
                  </div>
                </Col>
                <Col>
                  <div>
                    <Button
                      color="danger"
                      onClick={this.handleMyButton.bind(this)}
                    >
                      Leave edit mode
                    </Button>{" "}
                  </div>
                </Col>
                <Col>
                  <Button color="secondary">Sign Out</Button>{" "}
                </Col>
              </Row>
            </Container>
            <div>
              <AdminTableEdit data={this.state.data} />
            </div>
          </div>
        );
      }
    }
  }

  /* Reset button handler */
  handleResetButton(e, row) {
    if (this.state.uid === undefined || this.state.uid === null) {
      console.log("this is the uid ", this.state.uid);
      alert("Please select a row from table");
      return null;
    }
    console.log("row ", this.state.uid);
    let url = api + reset_route;
    let options = {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({
        uid: this.state.uid,
      }),
    };
    let response = fetch(url, options).then(() => {
      alert("Change submitted");
      window.location.replace("/api");
    });
  }
}

export default AdminTable;
