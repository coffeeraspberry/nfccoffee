import React from 'react';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Loading from '../../router/loading';
import DownloadForm from './downloadDb/download'
const dbLink=" http://localhost:4321/posts"


let handleClick = () => {
    console.log('HERE!');
   // alert('1111Home route');
  };


class home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
     isActive: true,
     loading:true
    }
  }
  close = () => {
    this.setState({ showMod: false });
  };
  open = () => {
    this.setState({ showMod: true });
  };
demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  };
  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    this.demoAsyncCall().then(() => this.setState({ loading: false }));
  };
  

  render(){
    const { loading } = this.state.loading;
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }
  
    return (
      <div className="home">
       <div class="home-header">
       <Header/>
       </div>
       <div className="home-body">
        <DownloadForm/>
        </div>
        <div className="home-footer">
         <Footer/>
          </div>
      </div>
    );

  }
}





export default home;
