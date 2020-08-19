import React from "react";
import "./home.css";
import HomeBody from "./HomeBody/HomeBody";

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  render() {
    const { loading } = this.state.loading;
    if (loading) {
      return null;
    }

    return (
      <div>
        <HomeBody />
      </div>
    );
  }
}

export default home;
