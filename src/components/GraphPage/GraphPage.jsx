import React from 'react';
import './GraphPage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Loading from '../../router/loading';
import GraphBody from './graphBody/graphBody'
import api from '../../constants/api'




class GraphPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data:null,
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

  options = {
    method: 'GET',
    headers: {
      'mode': 'cors',
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
   'Pragma': 'no-cache',
   'Expires': '0'
    },
  };
  async componentDidMount() {
    // this simulates an async action, after which the component will render the content
    //this.demoAsyncCall().then(() => this.setState({ loading: false }));
    let url=  api +'/users'
   
    console.log('URL THAT I AM FETCHING', url);
  
      let Urlresponse = await fetch(url, this.options)
      let JsonResponse= await Urlresponse.json()
    
      //this.setState({data: JsonResponse})
      let newData=[];
      JsonResponse.forEach(element=>{
       newData.push({
         label:element.UserName,
         data: parseInt(element.Counter)
       })
      })
      console.log('newData ', newData)
      await this.setState({data: newData})
      console.log('state data ', this.state.data)
      return newData;
  };
  

  render(){
   if(this.state.data==null){
     return (
       <div>
       <Header/>
       <h1>Data fetching</h1>
       <Footer/>
       </div>
     )
   }
   
    return (
      <div className="home">
        <div className="black">
    <Header/>
 <GraphBody items={this.state.data}/>
     <Footer/>
      </div>
      </div>
    );

  }
}





export default GraphPage;
