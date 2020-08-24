import React from "react";
import "./footer.css";
import logo from "../../assets/footLogoImg.png";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import fb from "../../assets/fb.png";
import yt from "../../assets/yt.png";
import ig from "../../assets/ig.png";
const fblink = "https://www.facebook.com/RomaniaContinental/";
const ytlink = "https://www.youtube.com/channel/UCc6onv-TbTWQuZ9IQaHp_JQ";
const iglink = "https://www.instagram.com/continental_career/";
let handleClick = () => {
  window.location.replace("https://www.continental.com/ro-ro");
};

class footer extends React.Component {

  render() {
    return (
      <Container
        fluid
        style={{ width: "100%", padding: "0", overflowX: "hidden" }}
      >
        <Row className="empty-high"></Row>
        <div className="background-gradient">
          <Row className="foot">
            <Col xs="6" sm md lg="6" xl>
              <p className="social-text">Follow social media:</p>
              <a href={fblink}>
                <img src={fb} alt="fbLogo"></img>
              </a>
              <a href={ytlink}>
                <img src={yt} alt="ytLogo"></img>
              </a>
              <a href={iglink}>
                <img src={ig} alt="igLogo"></img>
              </a>
            </Col>
            <Col xs="6" sm md lg="6" xl>
              <p className="copyright-text bord">
                Copyright &#169; 2020. Continental Automotive Romania.
                <br></br>
                All rights reserved
              </p>
            </Col>

            <Col xs="25" sm="auto" md="auto" lg="12" xl>
              {" "}
              <Link to="/foot">
                <img
                  src={logo}
                  className="imgforFooter"
                  onClick={() => {
                    handleClick();
                  }}
                  alt="footlogo"
                />{" "}
              </Link>
            </Col>
          </Row>
        </div>
        <Row style={{ height: "1vh", backgroundColor: "black" }}></Row>
      </Container>
    );
  }
}

export default footer;
