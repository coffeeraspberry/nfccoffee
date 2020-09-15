import React from "react";
import "./CommentPage.css";
import CommentBody from "./CommentBody/CommentBody";
import api from "../../constants/api";
import DEBUG from "../../constants/debug";
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
  }

  /* Fetch GETSTREAM access token from backend server */
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

  render() {
    //Display loading screen while loading
    if (this.state.moveOn === false) {
      return (
        <div className="load">
          <p style={{ color: "white", fontSize: "150%" }}>Comments loading</p>
          <img
            src="https://media.giphy.com/media/roZg3KeB7Pzfq/giphy.gif"
            width="300"
            height="200"
            alt="cat"
          />
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
