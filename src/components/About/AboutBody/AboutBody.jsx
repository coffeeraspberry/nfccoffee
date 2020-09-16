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
                Our product is powered by Raspberry PI Zero W alongside with an
                Adafruit 16x2 RGB LCD display and an Elechouse RFID Module
                PN532. Adafruit LCD is used to provide offline feedback to the
                end-user regarding the web-app access address and NFC reading
                status. The RFID Module comes up with a friendly hardware
                interface (Serial Peripheral Interface) and easy to use software
                libraries written in Python for data acquistion. The main
                challange was to design a web-app focused on user experince,
                intuitive UI and responsivness on all devices. The way it was
                ment to be used: scand the badge, wait for the display feedback,
                check the web-app for details. For further suggestions feel free
                to use our contact page.
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
