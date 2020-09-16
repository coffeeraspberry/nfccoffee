import React from "react";
import "./AddUserForm.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import api from "../../../constants/api";
import { Redirect } from "react-router-dom";
import DEBUG from "../../../constants/debug";
let route = "/users";
let METHOD = "POST";

class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      success: false,
      isActive: true,
      loading: true,
      badgeID: null,
      email: null,
      username: null,
    };

    this.state.badgeID = props.items.UserID;
    this.state.email = props.items.Email.toString();
    this.state.username = props.items.UserName.toString();
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.keyPress = this.keyPress.bind(this);
    /* 
-------------------
DEBUG. EXPERIMENTAL FEATURE
NO USE NOW
-------------------
*/
    if (DEBUG) {
      localStorage.setItem("badgeId", this.state.badgeID);
    }
  }
  //END CONSTRUCTOR
  isValidEmailAddress(address) {
    return !!address.match(/.+@.+/);
  }
  keyPress(e) {
    if (e.keyCode === 13) {
      this.handleSubmitButton();
    }
  }
  async handleSubmitButton() {
    if (
      this.isValidEmailAddress(document.getElementById("email").value) === false
    ) {
      alert("Invalid Email Address");
      return null;
    }
    /*
------------------------
       DEBUG CONSOLE LOG
------------------------
*/
    if (DEBUG) {
      console.log("USERNAME ", document.getElementById("username").value);
      console.log("EMAIL ", typeof document.getElementById("email").value);
    }
    /*
------------------------
        END DEBUG
------------------------
*/

    /* Check if input forms are not empty  */
    /* Submit button will not do anything */
    if (
      document.getElementById("username").value === "" ||
      document.getElementById("email").value === ""
    ) {
      alert("Please fill all mandatory fields ;)");
      return null;
    }

    let url = api + route;
    let options = {
      method: METHOD,
      headers: {
        "Content-Type": "application/json",
      },
      body: await JSON.stringify({
        UserName: document.getElementById("username").value,
        Email: document.getElementById("email").value,
        UserID: this.state.badgeID,
      }),
    };
    /* 
----------------
DEBUG. DATA CHECK
----------------
*/
    if (DEBUG) {
      await console.log("set state ", this.state.data);
      await console.log("body json : ", options.body);
    }

    let Urlresponse = await fetch(url, options);
    let JsonResponse = await Urlresponse.json();
    if (JsonResponse !== null || JsonResponse !== undefined) {
      await this.setState({ data: true });
    }
  }
  //*END HANDLE SUBMIT BUTTON

  async componentDidMount() {
    /* 
    -------------------
    DEBUG. CHECK DATA
    -------------------
    */
    if (DEBUG) {
      console.log("FORM this.state.email ", this.state.email);
      console.log("FORM this.state.username ", this.state.username);
    }
  }

  render() {
    if (this.state.data === null || this.state.data === false) {
      return (
        <Container>
          <div className="white">
            <Form>
              <FormGroup>
                <Row>
                  <Col></Col>
                  <Col xs="auto" sm="auto" md="auto">
                    <FormGroup>
                      <div className="badge-label-formgroup">
                        <Label for="BadgeID" className="white-badge-label">
                          Your badge serial number:
                        </Label>
                        <Input
                          name="badgeinput"
                          label="badgeinput"
                          className="white-badge-label"
                          plaintext
                          value={this.state.badgeID}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col></Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col></Col>
                  <Col sm="10" md="8" lg="6" xl="5">
                    <AvForm
                      onValidSubmit={this.handleValidSubmit}
                      onInvalidSubmit={this.handleInvalidSubmit}
                    >
                      <AvField
                        name="email"
                        label="Email Address"
                        type="email"
                        onKeyDown={this.keyPress}
                        required
                        value={this.state.email}
                      />
                    </AvForm>
                  </Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col sm="10" md="8" lg="6" xl="5">
                    <AvForm
                      onValidSubmit={this.handleValidSubmit}
                      onInvalidSubmit={this.handleInvalidSubmit}
                    >
                      <AvField
                        name="username"
                        label="Username"
                        type="username"
                        onKeyDown={this.keyPress}
                        required
                        value={this.state.username}
                      />
                    </AvForm>
                  </Col>
                  <Col></Col>
                </Row>
              </FormGroup>
              <Button color="success" onClick={this.handleSubmitButton}>
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      );
    } else if (this.state.data === true) {
      return (
        <Container fluid>
          <Row>
            <Col></Col>
            <Col>
              <p className="success-text">Success!</p>
            </Col>
            <Col></Col>
          </Row>

          <Redirect to exact path="/home"></Redirect>
        </Container>
      );
    }
  }
}

export default AddUserForm;
