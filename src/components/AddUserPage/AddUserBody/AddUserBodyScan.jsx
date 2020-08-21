import React from "react";
import "./AddUserBodyScan.css";
import { Container, Row, Col } from "reactstrap";

class AddUserBodyScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      loading: true,
    };
  }
  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }

    return (
      <Container fluid>
        <Row>
          <Col>
            <div>
              <div class="loader">
                <div className="load-text">
                  Scan your badge within 5 seconds{" "}
                </div>
                <span class="loader__dot">.</span>
                <span class="loader__dot">.</span>
                <span class="loader__dot">.</span>
              </div>
              <div className="nothing-text">
                If nothing happens, please refresh the page
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddUserBodyScan;
