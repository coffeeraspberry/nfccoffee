import React from "react";
import "./AdminLogin.css";
import api from "../../../constants/api";
import { Container, Row, Col, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {Redirect } from "react-router-dom"
import DEBUG from "../../../constants/debug";
let route = "/api";
//change to real world later
const METHOD = "GET";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Email: null,
      Name: null,
      final:false,
    };
    this.handleSubmitButton= this.handleSubmitButton.bind(this)
  }

  async handleSubmitButton() {
    let url = api + route;
    if (
      document.getElementById("email").value === "" ||
      document.getElementById("pass").value === ""
    ) {
      alert("Please fill all mandatory fields");
      return null;
    }
    let options = {
      method: METHOD,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      }
      /*
      NO BODY FOR DEBUG REASON
      UNCOMMENT FOR REAL BACKEND
      ,body: JSON.stringify({
        Email: document.getElementById("email").value,
        Password: document.getElementById("pass").value,
      }),
*/
    };



    let Urlresponse = await fetch(url, options);
    let JsonResponse =  await Urlresponse.json();

    if (Urlresponse) {
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
      alert("Login Success");
    
      localStorage.setItem('token',JsonResponse.token )
     await  this.setState({final:true})
    }

    if (DEBUG) {
      console.log("AdminLogin Response to POST :", Urlresponse);
      console.log('token ', JsonResponse)
    }
  }

  render() {
    if(this.state.final === true){
     return ( <Redirect to exact path="/home"></Redirect>)
    }
    return (
      <div className="admin-login-form">
        <Container fluid>
          <div className="input-pos">
            <p className="big-text">Log in as admin</p>
            <p className="big-text">Default credentials provided by dev</p>
            <p className="empty-contact"></p>
            <Row>
              <Col></Col>
              <Col lg="6">
                <div className="white">
                  <AvForm
                    onValidSubmit={this.handleValidSubmit}
                    onInvalidSubmit={this.handleInvalidSubmit}
                    errorMessage="Please enter valid Email"
                  >
                    <AvField
                      name="email"
                      placeholder="Your Email address"
                      label="Email"
                      type="email"
                      required
                      className="center"
                    />
                  </AvForm>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col lg="6">
                <div className="white">
                  <AvForm
                    onValidSubmit={this.handleValidSubmit}
                    onInvalidSubmit={this.handleInvalidSubmit}
                    errorMessage="This field is mandatory"
                  >
                    <AvField
                      name="pass"
                      label="Password"
                      type="password"
                      placeholder="Your password"
                      required
                    />
                  </AvForm>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Button color="primary" onClick={this.handleSubmitButton}>
              Submit
            </Button>{" "}
          </div>
        </Container>
      </div>
    );
  }
}
export default AdminLogin;
