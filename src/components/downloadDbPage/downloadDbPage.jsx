import React from "react";
import "./downloadDbPage.css";
import DwnBodyPage from "./dwn-body/DwnBodyPage";
import { Container, Row, Col } from "reactstrap";
import api from "../../constants/api";
let route = "/users";
const DEBUG = 1;



class downloadDbPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFetching: true,
    };
  }

  setDbState(data) {
    this.setState.data = data;
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
    /* 
    -------------------
    DEBUG. CHECK DATA
    -------------------
    */
    if(DEBUG){
    console.log("JsonResponse : ", JsonResponse);
    }

    this.setState({ data: JsonResponse });
    return JsonResponse;
  }
  close = () => {
    this.setState({ showMod: false });
  };

  open = () => {
    this.setState({ showMod: true });
  };

  render() {
    if (this.state.data == null) {
      console.log("this.state 1 ", this.state.data);

      return (
        <div>
          <div>
            <Container>
              <Row>
                <Col></Col>
                <Col>
                  <p className="text">
                    Please wait, your download will start shortly
                  </p>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <div class="loader">
                    <span class="loader__dot">.</span>
                    <span class="loader__dot">.</span>
                    <span class="loader__dot">.</span>
                  </div>{" "}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Container>
            <DwnBodyPage items={this.state.data} />
          </Container>
        </div>
      );
    }
  }
}

export default downloadDbPage;
