import React from 'react';
import '../router/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from '../components/home/home';
import downloadDbPage from '../components/downloadDbPage/downloadDbPage.jsx'
import UsersPage from '../components/UsersPage/UsersPage'
import 'pace-js'
import 'pace-js/themes/yellow/pace-theme-minimal.css'
import back from '../assets/background.jpg'
function App() {
  
  return (
    
    <Router> 
      <div className="FadeAnim">
        
     <Switch> 
       <Route exact path='/' component={home}/>
      <Route exact path='/home'component={home} />
        <Route exact path='/download' component={downloadDbPage} / >
        <Route exact path='/foot' component={home} / >   
        <Route exact path='/users' component={UsersPage} / > 
     </Switch>
     </div>
    </Router>
  );

}

export default App;
