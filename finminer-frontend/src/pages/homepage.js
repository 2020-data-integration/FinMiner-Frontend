import React from "react";
import logo from "../logo.svg";
import '../App.css';
import {apiTest} from "../api/index.api.ts";
import tsIcon from '../images/Background.jpg';



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
                  <img src={tsIcon} className="background" alt="" />
                  <div className="vcenter"><h1>FinMiner<br/></h1></div>
                  <div className="center"><h1>在线股票分析<br/>收获您的财富密码</h1></div>
                  <img src={logo} className="App-logo" alt="logo" />
              </header>
          </div>

      );

  }
}
export default Homepage;
