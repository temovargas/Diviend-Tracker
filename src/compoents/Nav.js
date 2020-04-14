import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <div className="wrapper nav">
      <li className="heading">
        <NavLink to="/">
          <h1>Dividend</h1>
        </NavLink>
      </li>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/stocksearch">Search Sotck</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </div>
  </nav>
)

export default Nav
