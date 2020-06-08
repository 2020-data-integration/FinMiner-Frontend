import React from "react";
import logo from "../logo.svg";
import '../App.css';
import {apiTest} from "../api/index.api.ts";


class Homepage extends React.Component {
   componentDidMount() {
    const res=apiTest();
    res.then((data)=>{
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
