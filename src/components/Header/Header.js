import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <nav>
    <ul>
      <li>
        <NavLink
          to="/"
          className={styles.Link}
          activeClassName={styles.Active}
          exact
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/movies" exact>
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Header;
