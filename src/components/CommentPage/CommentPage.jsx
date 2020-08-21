import React from "react";
import "./CommentPage.css";
import CommentBody from "./CommentBody/CommentBody";
import api from "../../constants/api";
import DEBUG from '../../constants/debug';
let route = "/comment";


class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isActive: true,
      loading: true,
      moveOn: false,
      user: null,
    };
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  close = () => {
    this.setState({ showMod: false });
  };
  open = () => {
    this.setState({ showMod: true });
  };
  demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  async needFetch() {
    /*Function temporary moved to handleSubmitButton()*/
    /*
    let url=api+route
    console.log('FETCH URL ', url)
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

    let Urlresponse = await fetch(url, options)
    let JsonResponse= await Urlresponse.json()
    let picpic= await JSON.stringify(JsonResponse, null, 4);
   this.state.data= picpic
    */
  }

  async componentDidMount() {
  

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({
        username: "user",
      }),
    };
    this.state.user = "user";

    let url = api + route;
    let Urlresponse = await fetch(url, options);
    let JsonResponse = await Urlresponse.json();
    await this.setState({ moveOn: true, data: JsonResponse.token });
  }

  async handleSubmitButton() {
    if (document.getElementById("username").value == "") {
      alert("Please fill all mandatory fields");
      return null;
    }

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({
        username: document.getElementById("username").value,
      }),
    };
    this.state.user = document.getElementById("username").value;

    let url = api + route;
    let Urlresponse = await fetch(url, options);
    let JsonResponse = await Urlresponse.json();
    await this.setState({ moveOn: true, data: JsonResponse.token });
  }

  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }
    //Return input form while waiting for input
    if (this.state.moveOn == false) {
      return (
       <div className="load">
         <p style={{color:'white', fontSize:'150%'}}>Comments loading</p>
      <img src="https://media.giphy.com/media/roZg3KeB7Pzfq/giphy.gif" width="300" height="200"    />

       </div>
      );
    }

    return (
      <div>
        <CommentBody data={this.state.data} userItem={this.state.user} />
      </div>
    );
  }
}

export default CommentPage;
