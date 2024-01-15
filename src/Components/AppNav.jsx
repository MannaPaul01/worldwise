import React from 'react';
import Styles from './AppNav.module.css';
import { NavLink } from 'react-router-dom';

export default function AppNav() {
  return (
    <nav className={Styles.nav}>
      <ul>
        <li>
          <NavLink to="Cities" >Cities</NavLink>
        </li>
        <li>
          <NavLink to="Country">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
