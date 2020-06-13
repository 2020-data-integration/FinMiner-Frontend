import React from "react";
import logo from "../logo.svg";
import "../App.css";


class Homepage extends React.Component {



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>

    );

  }
}

export default Homepage;
