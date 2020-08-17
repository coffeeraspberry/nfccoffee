import React from 'react';
import '../router/App.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import home from '../components/home/home';
import downloadDbPage from '../components/downloadDbPage/downloadDbPage.jsx'
import UsersPage from '../components/UsersPage/UsersPage'
import GraphPage from '../components/GraphPage/GraphPage'
import AddUserPage from '../components/AddUserPage/AddUserPage'
import 'pace-js'
import 'pace-js/themes/yellow/pace-theme-minimal.css'
import back from '../assets/background.jpg'
import Contact from '../components/Contact/Contact'

import Header from '../components/header/header'
import Footer from '../components/footer/footer'

import About from '../components/About/About'
  
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Container, Row, Col } from 'reactstrap';

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>

    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
      <Switch location={location}>
      <Route exact path='/' component={home}/>
      <Route exact path='/home'component={home} />
        <Route exact path='/download' component={downloadDbPage} / >
        <Route exact path='/foot' component={home} / >   
        <Route exact path='/users' component={UsersPage} / > 
        <Route exact path='/graph' component={GraphPage}/>
        <Route exact path='/addUsr' component={AddUserPage}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/about' component={About}/>
      </Switch>
    </CSSTransition>
   
  </TransitionGroup>
));

function App() {
  
  return (
    <div className="App">
    <div className="home">
    <div className="black">
      <Container fluid>
    <Router> 
      <div className="header">
    <Row xl md lg sm xs ><Header/> </Row>
    </div>
    
      <AnimatedSwitch/>
      
    
     <div>
    <Row> <Footer/>   </Row>
     </div>
    </Router>
    </Container>
    </div>
    </div>
    </div>
  );

}

export default App;
