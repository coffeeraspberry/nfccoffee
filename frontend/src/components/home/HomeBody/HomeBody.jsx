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
              <Row sm="1" md="1" xs="1" lg="1" xl="3">
                <Col xs sm md lg xl></Col>
                <Col>
                  <p className="body-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis placerat orci mattis dignissim tincidunt. Nulla a
                    posuere diam, nec maximus libero. Integer dapibus
                    condimentum nisl, sit amet vestibulum est sodales vel.
                    Phasellus aliquet euismod ligula, nec pellentesque est
                    dictum id. Vestibulum ante ipsum primis in faucibus orci
                    luctus et ultrices posuere cubilia curae; Phasellus
                    condimentum fermentum dolor, ac vestibulum risus convallis
                    eu. Ut lacinia ut purus ornare sollicitudin. In egestas
                    convallis ligula. Proin ac mauris nibh. Morbi efficitur ut
                    lacus a imperdiet. Sed mauris purus, pellentesque eu tempus
                    semper, ultrices at eros. Donec blandit cursus imperdiet.
                    Donec ut egestas risus. Integer a mollis odio. Aliquam
                    luctus lacus a lectus posuere consequat. Vestibulum ante
                    ipsum primis in faucibus orci luctus et ultrices posuere
                    cubilia curae;
                  </p>
                </Col>
                <Col xs sm md lg xl></Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default HomeBody;
