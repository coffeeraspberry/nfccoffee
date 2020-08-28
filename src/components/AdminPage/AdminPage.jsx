import React from "react";
import "./AdminPage.css";
import AdminLogin from "./AdminLogin/AdminLogin";
import AdminTable from "./AdminTable/AdminTable"
import api from '../../constants/api'
let route_verify = "/verify";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      success: null,
    };
  }
  componentDidMount() {
    if (
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === null
    ) {
      return null;
    } else {
      this.state.token = localStorage.getItem("token");
      console.log("this.state.token ", this.state.token);
    }
  }

async verify_token() {
    const url = api + route_verify;
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

    let JsonResponse=null;
    let urlResponse=  await fetch(url, options)
    JsonResponse= await urlResponse.json()
   console.log('Json Resp ', JsonResponse)
   this.state.success=JsonResponse.success
   return JsonResponse
  }

   render() {
    this.verify_token();
    let found= 0;

   
    if (
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === null ||
      this.state.token === null
    ) {
      return (
        <div>
          <div>
            <AdminLogin />
          </div>
        </div>
      );
    } else {


console.log('this. state. success ', this.state.success)
      if (this.state.success === "true" && found===0) {
        found=1

        return (
          <div>
            <AdminTable/>
          </div>
        );
      } else {



        return (<p color="white">token bad</p>);
      }
    }

    //last
    return null;
  }
}

export default AdminPage;
