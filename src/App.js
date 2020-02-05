import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Compoents
import Nav from "./compoents/Nav";
import StockSearch from "./compoents/SockSearch";
import About from "./compoents/About";

function testbtn() {
  axios
    .get(
      `https://cloud.iexapis.com/stable/data-points/T/DIVIDENDYIELD?token=${process.env.REACT_APP_IXE_API_KEY}`
    )
    .then(data => {
      console.log("====================================");
      console.log(data.data);
      console.log("====================================");
    });
}
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <header className="App-header">
          <h1>Dividend Porfolio</h1>
          <button onClick={testbtn}>Click me</button>
        </header>
        {/* Routes */}
        <Switch>
          <Route exact path="/" to="/"></Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/stocksearch">
            <StockSearch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
