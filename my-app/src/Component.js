import React from 'react';
import './Component.css';
import logo from './logoImg.png';
import down from './download.png';
import Navbar from './Navbar';
import { BrowserRouter, Route, Link } from "react-router-dom";
const dbLink="http://localhost:4321/posts"


const requestOptions = {
  method: 'GET'
 // headers: { 'Content-Type': 'application/json' },
};


/*
let handleClick = () => {
  console.log('HERE!');
  alert('/download route');
  fetch(dbLink, requestOptions)
        .then(response => response.json())
        .then(data => alert(data));
 
this.state.isActive==true? this.state.isActive=false: this.state.isActive=true;

};*/

class Component extends React.Component{

constructor(props, context){super(props, context)
  this.state = {
    isActive: true,
  }
  console.log(this.state.isActive)
}
dismiss() {
  this.props.unmountMe();
} 

handleState(props){
props.state.isActive===true? this.state.isActive=true : this.state.isActive=false;
}


 handleClick = () => {
  console.log('HERE!');
  alert('/download route');
  fetch(dbLink, requestOptions)
        .then(response => response.json())
        .then(data => alert(data));
 
this.state.isActive==true? this.state.isActive=false: this.state.isActive=true;
alert(this.state.isActive)
};


render(){
  if(this.state.isActive=== true){
  return (
    <div className="Component">
       <header>
         <div class= "Comp-header">
           <div className="Comp-Route">
            <Link to='/download' > <img src={down} className="downloadImg" onClick={()=>{this.handleClick()}} /> </Link>
          </div>
          </div>
       </header>
    </div>
  );
}else 
{return (<div/>)}
}

}



/*
function Component() {
 
  return (
    <div className="Component">
       <header>
         <div class= "Comp-header">
           <div className="Comp-Route">
            <Link to='/download' > <img src={down} className="downloadImg" onClick={()=>{handleClick()}} /> </Link>
          </div>
          </div>
       </header>
    </div>
  );
}

*/





export default Component;
