import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/stocksearch">Search Sotck</NavLink>
    </li>
    <li>
      <NavLink to="/about">About</NavLink>
    </li>
  </nav>
);

export default Nav;
