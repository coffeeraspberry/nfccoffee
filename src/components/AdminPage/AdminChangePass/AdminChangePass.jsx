import React from "react";
import "./AdminChangePass.css";
import api from "../../../constants/api";
import { Container, Row, Col, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Redirect } from "react-router-dom";
import DEBUG from "../../../constants/debug";
let route = "/api";
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
    };
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
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
      },
     /*
      body: await JSON.stringify({
        Email: document.getElementById("email").value,
        Password: document.getElementById("pass").value,
      }),
*/
    };

    let Urlresponse = await fetch(url, options);
    let JsonResponse = await Urlresponse.json();

    if (Urlresponse) {
      if (JsonResponse.token === "") {
        alert("Login Failed. Returning to home page.");
        window.location.replace("/home");
        return null;
      }
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
      alert("Login Success");

      localStorage.setItem("token", JsonResponse.token);
      await this.setState({ final: true });
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
                      name="pass"
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
