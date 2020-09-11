import React from "react";
import "./AdminLogin.css";
import api from "../../../constants/api";
import { Container, Row, Col, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Redirect } from "react-router-dom";
import DEBUG from "../../../constants/debug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
//let route = "/api";
let route = "/login";
//change to real world later
const METHOD = "POST";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Email: null,
      Name: null,
      final: false,
      hasError: false,
      passwordShown: false,
    };
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
   
    this.showPass = this.showPass.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  showPass() {
    let passState = this.state.passwordShown;
    this.setState({ passwordShown: !passState });
  }
  keyPress(e){
    if(e.keyCode == 13){
      this.handleSubmitButton()
    }
 }
  
  isValidEmailAddress(address) {
    return !!address.match(/.+@.+/);
  }
  async handleSubmitButton() {
    let url = api + route;
    if (
      this.isValidEmailAddress(document.getElementById("email").value) === false
    ) {
      alert("Invalid Email Address");
      return null;
    }
    if (this.state.hasError === true) {
      return null;
      alert("Email provided is not correct");
    }
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

      body: await JSON.stringify({
        Email: document.getElementById("email").value,
        Password: document.getElementById("pass").value,
      }),
    };

    let Urlresponse = await fetch(url, options);
    let JsonResponse = await Urlresponse.json();
    await console.log("jsonResponse ", JsonResponse);
    if (Urlresponse) {
      if (JsonResponse.success === "false") {
        alert("Login Failed. Email or password provided is incorrect");
        window.location.replace("/api");
        return null;
      }
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
                  <AvForm errorMessage="Please enter valid Email">
                    <AvField
                      name="email"
                      placeholder="Your Email address"
                      label="Email"
                      type="email"
                      onKeyDown={this.keyPress}
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
                    onValidSubmit={this.handleValidPassSubmit}
                    onInvalidSubmit={this.handleInvalidPassSubmit}
                    errorMessage="This field is mandatory"
                  >
                    <AvField
                      name="pass"
                      label="Password"
                      placeholder="Your password"
                      type={this.state.passwordShown ? "text" : "password"}
                      onKeyDown={this.keyPress}
                      required
                    />
                    <div className="eye-btn">
                      <i onClick={this.showPass}>{eye} Show password</i>
                    </div>
                  </AvForm>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Button
              type="submit"
              color="primary"
              onClick={this.handleSubmitButton}
            >
              Submit
            </Button>{" "}
          </div>
        </Container>
      </div>
    );
  }
}
export default AdminLogin;
