import React from "react";
import "./header.css";
import logo from "../../assets/logoImg.png";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import DEBUG from "../../constants/debug";
import api from "../../constants/api"
let route_verify="/verify"

let handleClick = () => {
  if (DEBUG) {
    console.log("Header handleClick()!");
  }
};

async function verify_token() {
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
    },
  };

  let JsonResponse=null;
  let urlResponse=  await fetch(url, options)
  JsonResponse= await urlResponse.json()
 console.log('Json Resp ', JsonResponse)
 
 return await JsonResponse.success
}



function header() {

  return (
    <div className="header">
      <Container fluid>
        <Row className="head">
          <Col> </Col>

          <Col md="auto">
            {" "}
            <Link to="/home">
              <img
                src={logo}
                className="head-logo"
                onClick={() => {
                  handleClick();
                }}
                alt="logo"
              />{" "}
            </Link>{" "}
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            className="nav"
          >
            <Navbar.Brand className="home-btn">
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                Home
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown
                  title="Options"
                  id="collasible-nav-dropdown"
                  className="nav-dropdown"
                >
                  <div className="items">
                    <NavDropdown.Item>
                      <div className="fix-z">
                        {" "}
                        <Link
                          to="/users"
                          style={{ textDecoration: "none", color: "orange" }}
                        >
                          Show User List
                        </Link>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to="/addUsr"
                        style={{ textDecoration: "none", color: "orange" }}
                      >
                        Add/Fill User Info
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to="/graph"
                        style={{ textDecoration: "none", color: "orange" }}
                      >
                        CoffeeGraph
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Link
                        to="/download"
                        style={{ textDecoration: "none", color: "orange" }}
                      >
                        Download Database .csv
                      </Link>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
                <div className="highlight">
                  <Nav.Link>
                    <Link
                      to="/comment"
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                      Comment Feed
                    </Link>
                  </Nav.Link>
                </div>
                <div className="highlight">
                  <Nav.Link>
                    <Link
                      to="/api"
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                      C0ffeeAdmin
                    </Link>
                  </Nav.Link>
                </div>
                <div className="highlight">
                  <Nav.Link>
                    <Link
                      to="/contact"
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                      Contact
                    </Link>
                  </Nav.Link>
                </div>
                <div className="highlight">
                  <Nav.Link>
                    <Link
                      to="/about"
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                      About
                    </Link>
                  </Nav.Link>
                </div>
                <div className="highlight">
                  <Nav.Link>
                    <Link
                      to="/signout"
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                      Sign Out
                    </Link>
                  </Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
    </div>
  );

}


export default header;
