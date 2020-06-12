import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Compoents
import Nav from '../compoents/Nav/Nav'
import StockSearch from '../pages/SockSearch'
import About from '../pages/About'
import Home from '../pages/Home/Home'

import './App.css'
function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Nav />
        </header>
        {/* Routes */}
        <div className="wrapper">
          <Switch>
            <Route exact path="/" to="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/stocksearch">
              <StockSearch />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
