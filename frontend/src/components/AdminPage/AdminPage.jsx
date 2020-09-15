import React from "react";
import "./AdminPage.css";
import AdminLogin from "./AdminLogin/AdminLogin";
import AdminTable from "./AdminTable/AdminTable";
import { Container, Row, Col } from "reactstrap";
import api from "../../constants/api";
import DEBUG from "../../constants/debug";
let route_verify = "/admin";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      success: null,
      fetcherr: null,
    };
  }
  /* 
Check if token present in local storage
*/
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
    this.verify_token(localStorage.getItem("token"));
  }
  /* 
Verify access token with backend
*/
  async verify_token(tok) {
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
        token: localStorage.getItem("token"),
      },
    };

    let JsonResponse = null;
    let urlResponse;
    try {
      urlResponse = await fetch(url, options);
      JsonResponse = await urlResponse.json();
      this.setState({
        token: localStorage.getItem("token"),
        success: JsonResponse.success,
      });
      //DEBUG
      // console.log("JsonResponse on timeout ", JsonResponse);
    } catch (error) {
      console.log("verify_token fetch error : ", error);
      if (error.toString() === "TypeError: Failed to fetch") {
        await this.setState({ fetcherr: true });
        console.log("verify_token fetch error :  ", this.state.fetcherr);
      }
    }
    return await JsonResponse;
  }

  render() {
    //Manual router
    if (this.state.fetcherr === true) {
      return (
        <p className="fetch-error-text">
          We are sorry, but we were unable to fetch data from backend server
        </p>
      );
    }
    if (
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === null
    ) {
      return (
        <div>
          <div>
            <AdminLogin />
          </div>
        </div>
      );
    } else {
      if (this.state.success === "false") {
        return (
          <div>
            <div>
              <AdminLogin />
            </div>
          </div>
        );
      }

      if (this.state.success === "true") {
        return (
          <div>
            <AdminTable />
          </div>
        );
      } else {
        return (
          <div>
            <Container fluid={true}>
              <Row className="on-load">
                <Col></Col>
                <Col xs="auto" sm="auto" md="auto">
                  <div class="loader">
                    <div className="load-text">Please wait, loading data</div>
                    <span class="loader__dot">.</span>
                    <span class="loader__dot">.</span>
                    <span class="loader__dot">.</span>
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
      }
    }

    
  }
}

export default AdminPage;
