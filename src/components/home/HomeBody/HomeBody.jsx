import React from "react";
import "./HomeBody.css";
import { Container, Row, Col } from "reactstrap";
import laptop from "../../../assets/laptop.mp4";

class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      loading: true,
    };
  }

  render() {
    return (
      <div>
        <Container fluid>
          <div className="elements-together">
            <Row xl="50">
              <Col>
                <div className="video-component">
                  <video className="video-tag" autoPlay loop muted>
                    <source src={laptop} type="video/mp4" />
                  </video>
                </div>
              </Col>
            </Row>
            <div id="home-text">
              <Row xs="1" sm="1" md="1" lg="3" xl="3">
                <Col></Col>
                <Col>
                  <p className="body-description">
                    Giving numbers makes people focus on numbers, not content.
                    That's not helpful. Most people are visual. We have provided
                    a fun tool that aims at replacing traditional coffee usage
                    data inside the office. Hope you will have fun using our
                    Continental Summer Practice 2020 product.
                  </p>
                </Col>
                <Col></Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default HomeBody;
