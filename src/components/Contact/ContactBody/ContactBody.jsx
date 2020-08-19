import React from "react";
import "./ContactBody.css";
import api from "../../../constants/api";
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
let route="/contact"
const DEBUG=1

class ContactBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Email: null,
      Name: null,
    };
  }

  handleSubmitButton() {
    let url = api + route;
    if (
      document.getElementById("Email").value == "" ||
      document.getElementById("Name").value == "" ||
      document.getElementById("Subject").value == "" ||
      document.getElementById("Msg").value == ""
    ) {
      alert("Please fill all mandatory fields");
      return null;
    }
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({
        Email: document.getElementById("Email").value,
        UserName: document.getElementById("Name").value,
        Subject: document.getElementById("Subject").value,
        Message: document.getElementById("Msg").value,
      }),
    };


    let Urlresponse = fetch(url, options);
    if(DEBUG){
        console.log('ContactBody Response to POST :', Urlresponse)
    }
  }

  render() {
    return (
      <Container fluid>
        <div className="input-pos">
          <p className="big-text">Contact us</p>
          <p className="empty-contact"></p>
          <Row>
            <Col></Col>
            <Col lg="3">
              <div className="white">
                <AvForm
                  onValidSubmit={this.handleValidSubmit}
                  onInvalidSubmit={this.handleInvalidSubmit}
                  md="6"
                  sm="6"
                  lg="6"
                  errorMessage="Please enter valid Email"
                >
                  <AvField
                    name="Email"
                    label="Email Address"
                    type="email"
                    required
                    className="center"
                  />
                </AvForm>
              </div>
            </Col>
            <Col lg="3">
              <div className="white">
                <AvForm
                  onValidSubmit={this.handleValidSubmit}
                  onInvalidSubmit={this.handleInvalidSubmit}
                  errorMessage="This field is mandatory"
                >
                  <AvField name="Name" label="Your Name" required />
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
                  <AvField name="Subject" label="Subject" required />
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
                  <AvField name="Msg" label="Your message" required />
                </AvForm>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Button color="success" onClick={this.handleSubmitButton}>
            Submit
          </Button>{" "}
        </div>
      </Container>
    );
  }
}
export default ContactBody;
