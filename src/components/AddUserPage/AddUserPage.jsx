import React from 'react';
import '../home/home.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Loading from '../../router/loading';
import AddUserBodyScan from './AddUserBody/AddUserBodyScan'
import AddUserForm from './AddUserForm/AddUserForm'




class AddUserPage extends React.Component{
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
        <div className="black">
    <Header/>
    <AddUserForm />
     <Footer/>
      </div>
      </div>
    );

  }
}





export default AddUserPage;
