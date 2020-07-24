import React from 'react';
import './downloadDbPage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import DwnBodyPage from './dwn-body/DwnBodyPage'


let handleClick = () => {
    console.log('HERE!');
    alert('downloadDBPAGE route');
  };


class downloadDbPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
     isActive: true
    }
  }

  render(){
    return (
      <div className="dwn">
       <div class="dwn-header">
       <Header/>
     <DwnBodyPage/>
       <Footer/>
          </div>
      </div>
    );

  }
}





export default downloadDbPage;
