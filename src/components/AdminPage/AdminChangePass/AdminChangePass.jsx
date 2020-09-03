import React from "react";
import "./AdminChangePass.css";
import api from "../../../constants/api";
import { Container, Row, Col, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Redirect } from "react-router-dom";
import DEBUG from "../../../constants/debug";
let route = "/changepass";
//let route = "/login";
//change to real world later
const METHOD = "POST";

class AdminResetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Email: null,
      Name: null,
      final: false,
      token:null,
    };
    this.setState({token: localStorage.getItem("token")})
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  async handleSubmitButton() {
    let url = api + route;
    if (
      document.getElementById("currpass").value === "" ||
      document.getElementById("newpass").value === ""
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
        token: localStorage.getItem("token"),
      },
     
      body: await JSON.stringify({
        password: document.getElementById("currpass").value,
        newPassword: document.getElementById("newpass").value,
        confirmPassword: document.getElementById("confirmpass").value,
      }),

    };
    console.log('curr pass ', document.getElementById("currpass").value )
    console.log(' new pass ', document.getElementById("newpass").value)
    console.log(' confirm pass ', document.getElementById("confirmpass").value)
    console.log('this.state ', this.state.token)
    console.log('localstorage  ', localStorage.getItem("token"))
    let Urlresponse = await fetch(url, options);
    let JsonResponse = await Urlresponse.json();
console.log('JsonResponse ', JsonResponse)
    if (JsonResponse.success==="true") {
      alert('Password changed !')
     window.location.replace('/api')
    }else {
      alert('Something went wrong :((')
      window.location.replace('/home')
    }

    if (DEBUG) {
      console.log("AdminLogin Response to POST :", Urlresponse);
      console.log("token ", JsonResponse);
    }
  }

  render() {
    if (this.state.final === true) {
      return window.location.replace("/api");
    }
    return (
      <div className="admin-passchange-form">
        <Container fluid>
          <div className="input-pos">
            <p className="big-text">Change your password here</p>
            <p className="big-text"></p>
            <p className="empty-contact"></p>
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
                      name="currpass"
                      placeholder="Current password"
                      label="Your Password"
                      type="password"
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
                      name="newpass"
                      label="New Password"
                      type="password"
                      placeholder="Your new password"
                      required
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
                      name="confirmpass"
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
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
export default AdminResetPass;
