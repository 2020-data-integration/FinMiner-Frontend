import React from "react";
import '../App.css';
import {apiTest} from "../api/index.api.ts";
import {Wrapper,Cover,GDPMap,StockMap} from "../components/public/Homepage";


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
              </header>
              <body>
              <Cover />
              <Wrapper />

              <GDPMap />
              <StockMap/>
              </body>
          </div>

      );

  }
}
export default Homepage;
