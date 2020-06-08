import React from "react";
import logo from "../logo.svg";
import '../App.css';
import {apiTest} from "../api/index.api";
import {message} from "antd";


class Homepage extends React.Component {
   componentDidMount() {
    const res=apiTest();
    res.then((data)=>{
      message.success("requesting success 🎉");
      console.log(data)});
  }

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
