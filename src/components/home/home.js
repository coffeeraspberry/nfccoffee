import React from 'react';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import DownloadForm from '../downloadDb/download'
const dbLink=" http://localhost:4321/posts"

let handleClick = () => {
    console.log('HERE!');
    alert('Home route');
  };


function home() {
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







export default home;
