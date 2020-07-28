import React from 'react';
import './downloadDbPage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import DwnBodyPage from './dwn-body/DwnBodyPage'


let handleClick = () => {
    console.log('HERE!');
    alert('downloadDBPAGE route');
  };
/*
  const options = {
    url: 'http://localhost/test.htm',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      a: 10,
      b: 20
    }
  };
  */





class downloadDbPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: true,
    }
  }

  setDbState(data) {
    this.setState.data= data;
  }

 async  componentDidMount() {    
    let url=  'http://localhost:4321/posts'
    let options = {
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
    /*
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data)).then((data)=> this.state.data= data); */
      let Urlresponse = await fetch(url, options)
      let JsonResponse= await Urlresponse.json()
      console.log('JsonResponse : ', JsonResponse)
      this.setState({data: JsonResponse})
      return JsonResponse;
  }
  close = () => {
    this.setState({ showMod: false });
  };

  open = () => {
    this.setState({ showMod: true });
  };
/*
   render(){
     return (
      
            <div className="dwn">
       <div class="dwn-header">
       <Header/>
       {console.log('in render check ', this.state.isFetching)}
       {console.log('data return ',  this.state.data)}
       {this.state.data==null?<h1>Fetching...</h1>: <DwnBodyPage  />}
       <Footer/>
          </div>
      </div>
       
    );
    
  }
}
*/



render(){
  if(this.state.data==null){
    console.log('this.state 1 ',this.state.data)
  return (
    <div className="dwn">
      <Header/>
      <h1 text-color="#FFFFFF">WAIT</h1>
      <Footer/>
    </div>
  )}
  else {
    console.log('this.state 2',this.state.data)
   return ( 
     <div className="dwn">
   <Header/>
   <DwnBodyPage items={this.state.data}/>
   <Footer/>
   </div>
   )

  }
}

}

export default downloadDbPage;
