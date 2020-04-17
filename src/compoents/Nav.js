import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <ul className="wrapper nav">
      <li>
        <NavLink className="heading" to="/">
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
    </ul>
  </nav>
)

export default Nav
