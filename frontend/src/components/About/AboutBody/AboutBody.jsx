import React from "react";
import "./AboutBody.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../../assets/raspLogo.png";

class AboutBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  render() {
    return (
      <Container fluid>
        <div className="about">
          <Row sm="1" md="1" xs="1" lg="1" xl="2">
            <Col xs sm md lg xl>
              <p className="about-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                placerat orci mattis dignissim tincidunt. Nulla a posuere diam,
                nec maximus libero. Integer dapibus condimentum nisl, sit amet
                vestibulum est sodales vel. Phasellus aliquet euismod ligula,
                nec pellentesque est dictum id. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia curae;
                Phasellus condimentum fermentum dolor, ac vestibulum risus
                convallis eu. Ut lacinia ut purus ornare sollicitudin. In
                egestas convallis ligula. Proin ac mauris nibh. Morbi efficitur
                ut lacus a imperdiet. Sed mauris purus, pellentesque eu tempus
                semper, ultrices at eros. Donec blandit cursus imperdiet. Donec
                ut egestas risus. Integer a mollis odio. Aliquam luctus lacus a
                lectus posuere consequat. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia curae;
              </p>
            </Col>
            <Col xs sm md lg xl>
              <img className="about-img" src={aboutImg} alt="raspberry" />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default AboutBody;
