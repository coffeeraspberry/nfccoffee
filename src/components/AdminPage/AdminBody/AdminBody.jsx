import React from "react";
import "./AdminBody.css";
import api from "../../../constants/api";
import { Container, Row, Col, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import DEBUG from "../../../constants/debug";
let route = "/body";
//change to real world later
const METHOD = "GET";

class AdminBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Email: null,
      Name: null,
      token: null,
    };
  }

  async handleSubmitButton() {
  
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
      console.log("UsersPage fetch url : ", url);
      console.log("UsersPage JsonResponse : ", JsonResponse);
      console.log("UsersPage JsonString : ", JsonString);
    }
    return JsonString;
  }

  render() {
    return (
      <div className="admin-login-form">
        <Container fluid>
        
        </Container>
      </div>
    );
  }
}
export default AdminBody;
