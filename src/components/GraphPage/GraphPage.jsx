import React from "react";
import "./GraphPage.css";
import "../home/home.css";
import GraphBody from "./graphBody/graphBody";
import {Spinner} from 'reactstrap'
import api from "../../constants/api";
import DEBUG from '../../constants/debug';
let route = "/users";


class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isActive: true,
      loading: true,
    };
  }
  close = () => {
    this.setState({ showMod: false });
  };
  open = () => {
    this.setState({ showMod: true });
  };

  options = {
    method: "GET",
    headers: {
      mode: "cors",
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
  async componentDidMount() {
    let url = api + route;

    let Urlresponse = await fetch(url, this.options);
    let JsonResponse = await Urlresponse.json();
    let newData = [];
    JsonResponse.forEach((element) => {
      newData.push({
        label: element.UserName,
        data: parseInt(element.Counter),
      });
    });

    await this.setState({ data: newData });
    /* 
    -------------------
    DEBUG. CHECK DATA
    -------------------
    */
    if (DEBUG) {
      console.log("GraphPage newData : ", newData);
      console.log("GraphPage state.data : ", this.state.data);
    }
    return newData;
  }

  render() {
    if (this.state.data == null) {
      return (
        <div>
          <div class="loader">
            <div className="load-text">CoffeeGraph loading</div>
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="warning"/>
          </div>
        </div>
      );
    }

    return (
      <div>
        <GraphBody items={this.state.data} />
      </div>
    );
  }
}

export default GraphPage;
