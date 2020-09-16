import React from "react";
import "../router/App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import home from "../components/home/home";
import downloadDbPage from "../components/downloadDbPage/downloadDbPage.jsx";
import UsersPage from "../components/UsersPage/UsersPage";
import GraphPage from "../components/GraphPage/GraphPage";
import AddUserPage from "../components/AddUserPage/AddUserPage";
import "pace-js";
import "pace-js/themes/yellow/pace-theme-minimal.css";
import Contact from "../components/Contact/Contact";
import CommentPage from "../components/CommentPage/CommentPage";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import AdminPage from "../components/AdminPage/AdminPage";
import AdminChangePass from "../components/AdminPage/AdminChangePass/AdminChangePass";
import About from "../components/About/About";
import Sign from "../components/sign";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Container, Row } from "reactstrap";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
      <Switch location={location}>
        <Route exact path="/" component={home} />
        <Route exact path="/home" component={home} />
        <Route exact path="/foot" component={home} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/graph" component={GraphPage} />
        <Route exact path="/addUsr" component={AddUserPage} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/comment" component={CommentPage} />
        <Route exact path="/download" component={downloadDbPage} />
        <Route exact path="/api" component={AdminPage} />
        <Route exact path="/change" component={AdminChangePass} />
        <Route exact path="/signout" component={Sign} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

function App() {
  return (
    <div className="background-img">
      <Container fluid>
        <Router>
          <div className="webpage">
            <div className="webpage-header">
              <Row xl md lg sm xs>
                <Header />{" "}
              </Row>
            </div>
            <AnimatedSwitch />

            <div className="footer">
              <Row>
                {" "}
                <Footer />{" "}
              </Row>
            </div>
          </div>
        </Router>
      </Container>
    </div>
  );
}

export default App;
