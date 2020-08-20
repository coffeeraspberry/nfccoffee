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
import CommentPage from '../components/CommentPage/CommentPage'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'

import About from '../components/About/About'
  
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Container, Row, Col } from 'reactstrap';
let pageArray=['/home', '/graph', '/comment','/contact', '/about']
const AnimatedSwitch = withRouter(({ location }) => (

  <TransitionGroup>

    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
      <Switch location={location}>
      <Route exact path='/' component={home}/>
      <Route exact path='/home'component={home} />
        <Route exact path='/foot' component={home} / >   
        <Route exact path='/users' component={UsersPage} / > 
        <Route exact path='/graph' component={GraphPage}/>
        <Route exact path='/addUsr' component={AddUserPage}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/comment' component={CommentPage}/>
        <Route exact path='/download' component={downloadDbPage} / >
        
      </Switch>
    </CSSTransition>
   
  </TransitionGroup>
));

function arrayIndex(array, element){
for(let i=0; i<array.length; i++)
{
  if(element==array[i])
  {
    return i;
  }
}
}


function App() {
  


  return (
    
   
    <div className="home">
   
      <Container fluid>
    <Router> 
      
    <Row xl md lg sm xs ><Header/> </Row>
    
      <AnimatedSwitch/>
      
     <div className="footer">
    <Row> <Footer/>   </Row>
     </div>
    </Router>
    </Container>
    </div>
    
    
  );

}

export default App;
