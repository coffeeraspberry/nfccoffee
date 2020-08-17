import React from 'react';
import '../home/home.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Loading from '../../router/loading';
import AddUserBodyScan from './AddUserBody/AddUserBodyScan'
import AddUserForm from './AddUserForm/AddUserForm'
import url from '../../constants/api'
let route='/scan'


class AddUserPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data:null,
     isActive: true,
     loading:true, 
     email: null, 
     username:null,
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

  async componentDidMount() {
    let fetchUrl= url+ route
    let options = {
      method: 'GET',
      headers: {
        'mode': 'cors',
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
     'Pragma': 'no-cache',
     'Expires': '0',
     'timeout':'100000'
      },
    };
    
    let JsonResponse=null
    let Urlresponse = await fetch(fetchUrl, options)
    JsonResponse= await Urlresponse.json()
   console.log('PAGE jsonResponse ', JsonResponse)
    await this.setState({data: JsonResponse})
    
  };
  

  render(){
    const { loading } = this.state.loading;
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }
   if(this.state.data!==null){
    return (
      <div className="home">
        <div className="black">
    <Header/>
    <AddUserForm items={this.state.data}/>
     <Footer/>
      </div>
      </div>
    );
   }else {

return (
  <div className="home">
  <div className="black">
<Header/>
<AddUserBodyScan/>
<Footer/>
</div>
</div>
)

   }

  }
}





export default AddUserPage;
