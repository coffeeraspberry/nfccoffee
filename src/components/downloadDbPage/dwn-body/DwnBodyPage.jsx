import React from 'react';
import './DwnBodyPage.css';



class DwnBodyPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      isFetching: false,
            users: []
    };
    this.state.data=props.items
  }


  render (){
    console.log('din body ', this.state.data)
        return (
    <div className="dwn">
      <div className='wait'>
     <h1 className="text">Wait for database download...</h1>
  <h1 className="text">Downloaded data</h1>
        <h1 className="text">id = {this.state.data.id}</h1>
        <h1 className="text">title = {this.state.data.title}</h1>
        <h1 className="text">author = {this.state.data.author}</h1>
     </div>
    </div>)
  }

}




 

/*
  function DwnBodyPage(res, gg) {
    
     
     
       return (
        
          <div className="dwn">
            <div className='wait'>
           <h1 className="text">Wait for database download...</h1>
        <h1 className="text">Downloaded : {}</h1>
      
           </div>
          </div>
           
        );
         
      }
    
*/

      export default DwnBodyPage;