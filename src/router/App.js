import React from 'react';
import '../router/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from '../components/home/home';
import downloadDbPage from '../components/downloadDbPage/downloadDbPage'

function App() {
  
  return (
    <Router>
    <div className="App">
     <Switch>
       <Route exact path='/' component={home}/>
      <Route exact path='/home'component={home} />
        <Route exact path='/download' component={downloadDbPage} / >
        <Route exact path='/foot' component={home} / >
     </Switch>
    </div>
    </Router>
  );

}

export default App;
