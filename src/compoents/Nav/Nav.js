import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import './Nav.css'

const Nav = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="nav nav_container">
      <label for="nav__menu" className="nav__toggle">
        <span className="nav__menu__bar"></span>
        <span className="nav__menu__bar"></span>
        <span className="nav__menu__bar"></span>
      </label>
      <input id="nav__menu" type="checkbox" />

      <NavLink className="nav__heading nav__item--left " to="/">
        <h1>Dividend</h1>
      </NavLink>

      <ul className="nav__wrapper">
        <li className="nav__item ">
          <NavLink className="nav__link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/stocksearch">
            Search Sotck
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/about">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
