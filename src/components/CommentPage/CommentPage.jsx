import React from "react";
import "./CommentPage.css";
import CommentBody from "./CommentBody/CommentBody";
import api from "../../constants/api";
import { Container, Row, Col, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
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
    /*
  ------------------

  ------------------
  */
    /*
    let options = {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
       'Pragma': 'no-cache',
       'Expires': '0',
       }, 
       body:  JSON.stringify({username:"user"})
    }
   
     let url=api +route;
     let Urlresponse = await fetch(url, options)
     let JsonResponse= await Urlresponse.json()
     this.setState({moveOn:true, data:JsonResponse.token})
   */
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
        <div>
          <p className="white-text">Enter Alias</p>
          <AvForm
          lg="6" md="3" xl="3"
          
            onValidSubmit={this.handleValidSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
            errorMessage="This field is mandatory"
          >
            <AvField name="username"  required />
          </AvForm>
          <Button color="success" onClick={this.handleSubmitButton}>
            Submit
          </Button>{" "}
          <div class="loader">
            <div className="load-text">Comments loading</div>
            <span class="loader__dot">.</span>
            <span class="loader__dot">.</span>
            <span class="loader__dot">.</span>
          </div>
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
