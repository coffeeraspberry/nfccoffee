import React from 'react';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import DownloadForm from './downloadDb/download'
const dbLink=" http://localhost:4321/posts"

let handleClick = () => {
    console.log('HERE!');
    alert('1111Home route');
  };


class home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
     isActive: true
    }
  }
  close = () => {
    this.setState({ showMod: false });
  };
  open = () => {
    this.setState({ showMod: true });
  };

  render(){
    return (
      <div className="home">
       <div class="home-header">
       <Header/>
        <DownloadForm/>
         <Footer/>
          </div>
      </div>
    );

  }
}





export default home;
