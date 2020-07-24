import React from 'react';
import logo from './logoImg.png';
import down from './download.png';
import './App.css';
import Component from './Component'
import Navbar from './Navbar'
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
const dbLink=" http://localhost:4321/posts"


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>

      <Navbar/>
      <Component />
     <Switch>
       <Route path="/"> </Route>
       <Route path='/home'><Navbar/></Route>
       <Route path='/download'><Component  /></Route>

     </Switch>


     </BrowserRouter>
    </div>
  );
}







export default App;
