import React from "react";
import "../home/home.css";
import AddUserBodyScan from "./AddUserBody/AddUserBodyScan";
import AddUserForm from "./AddUserForm/AddUserForm";
import url from "../../constants/api";
let route = "/scan";
const DEBUG = 1;

class AddUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isActive: true,
      loading: true,
      email: null,
      username: null,
    };
  }
  close = () => {
    this.setState({ showMod: false });
  };
  open = () => {
    this.setState({ showMod: true });
  };

  async componentDidMount() {
    let fetchUrl = url + route;
    let options = {
      method: "GET",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        timeout: "100000",
      },
    };

    let JsonResponse = null;
    let Urlresponse = await fetch(fetchUrl, options);
    JsonResponse = await Urlresponse.json();
    /* 
    -------------------
    DEBUG. CHECK DATA
    -------------------
    */
    if (DEBUG) {
      console.log("AddUserPage JsonResponse :", JsonResponse);
    }

    await this.setState({ data: JsonResponse });
  }

  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }
    if (this.state.data !== null) {
      return (
        <div>
          <div>
            <AddUserForm items={this.state.data} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <AddUserBodyScan />
          </div>
        </div>
      );
    }
  }
}

export default AddUserPage;
