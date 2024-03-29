import React from "react";
import "./UsersPage.css";
import UsersBody from "./UsersBody/UsersBody";
import { Container, Row, Col, Spinner } from "reactstrap";
import api from "../../constants/api";
import "../home/home.css";
import Loader from "../../router/loading";
import DEBUG from "../../constants/debug";
let route = "/users";

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFetching: true,
      loading: true,
    };
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

  close = () => {
    this.setState({ showMod: false });
  };

  open = () => {
    this.setState({ showMod: true });
  };

  demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }

    if (this.state.data == null) {
      return (
        <div>
          <Container fluid={true}>
            <Row className="on-load">
              <Col></Col>
              <Col xs="auto" sm="auto" md="auto">
                <div class="loader">
                  <div className="load-text">Please wait, loading data</div>
                  <Spinner
                    style={{ width: "3rem", height: "3rem" }}
                    type="grow"
                    color="warning"
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col sm="10">
                {" "}
                <div className="load-gif">
                  <img
                    src="https://media3.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
                    width="300"
                    height="200"
                    alt="cat"
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <UsersBody items={this.state.data} />
        </div>
      );
    }
  }
}

export default UsersPage;
