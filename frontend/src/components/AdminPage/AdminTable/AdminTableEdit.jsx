import React from "react";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import api from "../../../constants/api";
import DEBUG from "../../../constants/debug";
import cellEditFactory from "react-bootstrap-table2-editor";
import Type from "react-bootstrap-table2-editor";
import "./AdminTable.css";
let route = "/save";
const METHOD = "POST";

class AdminTableEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFetching: true,
      loading: true,
      uid: null,
      edit: false,
    };
    this.state.data = props.data;
  }

  async componentDidMount() {}

  /*
  async f() to fetch changes on cell 
  */ 
  async fetch_changes(changes) {
    let url = api + route;
    let options = {
      method: METHOD,
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        token: localStorage.getItem("token"),
      },
      body: await JSON.stringify({
        CoffeeUnitPrice: changes.CoffeeUnitPrice,
        Email: changes.Email,
        Username: changes.UserName,
        uid: changes.UserID,
      }),
    };
    if (DEBUG) {
      console.log("Change Body ", options.body);
    }
    await console.log("Changes to fetch ", changes);
    await console.log("Options to fetch ", options.body);
    let fetch_now = fetch(url, options);
    return null;
  }

  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }
    //editable table props
    let columns = [
      {
        dataField: "Counter",
        dataAlign: "Center",
        text: "Counter",
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
        editable: false,
      },
      ,
      {
        dataField: "CoffeeUnitPrice",
        dataAlign: "Center",
        text: "Coffee Price",
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
        editable: true,
      },
      {
        dataField: "AmountToPay",
        dataAlign: "Center",
        text: "To pay",
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
        editable: false,
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
        editable: false,
      },
      {
        dataField: "UserID",
        text: "UserID",
        headerStyle: { backgroundColor: "white" },
        editor: {
          type: Type.TEXTAREA,
        },
        editable: false,
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

    return (
      <div className="reset-couter-button">
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
            cellEdit={cellEditFactory({
              mode: "click",
              blurToSave: "true",
              onStartEdit: (row, column, rowIndex, columnIndex) => {
                console.log("Edit Start!");
              },
              beforeSaveCell: (oldValue, newValue, row, column) => {
                console.log("Before Cell Save!");
              },
              afterSaveCell: (oldValue, newValue, row, column) => {
                console.log("After Cell Save Row : ", row);
                this.fetch_changes(row);
              },
            })}
            condensed={true}
          />
        </div>
      </div>
    );
  }
}

export default AdminTableEdit;
