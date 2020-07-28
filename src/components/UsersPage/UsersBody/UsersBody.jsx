import React from 'react';
import './UsersBody.css';
import BootstrapTable from 'reactjs-bootstrap-table';

class UsersBody extends React.Component{
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
      let data= this.state.data
      let columns = [
        { name: 'Counter' },
        { name: 'LastAccess' },
        { name: 'UserId' },
        { name: 'UserName' },
        { name: 'email' }
      ]
    console.log('din body ', this.state.data)
        return (
    <div className="usr">
        <div className="Table">
        <BootstrapTable columns={columns} data={data} />
        </div>
    </div>
     )
  }

}




 
      export default UsersBody;