import React from "react";
import "./AdminPage.css";
import AdminLogin from "./AdminLogin/AdminLogin";
import AdminTable from "./AdminTable/AdminTable";
import { Container, Row, Col } from "reactstrap";
import api from "../../constants/api";
let route_verify = "/admin";

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
    this.verify_token(localStorage.getItem("token"));
    
  }

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
    let urlResponse = await fetch(url, options);
    console.log("AdminPage Fetch");
    JsonResponse = await urlResponse.json();
    console.log("Json Resp ", JsonResponse);
    this.setState({
      token: localStorage.getItem("token"),
      success: JsonResponse.success,
    });
    return await JsonResponse;
  }

  render() {
    console.log('this.state.success render ', this.state.success)
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
      if(this.state.success ==="false"){
        return ( <div>
          <div>
            <AdminLogin />
          </div>
        </div>)
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

    //last
    return null;
  }
}

export default AdminPage;
