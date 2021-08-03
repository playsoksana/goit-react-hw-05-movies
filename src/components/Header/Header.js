import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  return (
    <>
      <nav className={styles.Nav}>
        <ul className={styles.List}>
          <li className={styles.Item}>
            <NavLink
              to="/"
              className={styles.Link}
              activeClassName={styles.Active}
              exact
            >
              Home
            </NavLink>
          </li>
          <li className={styles.Item}>
            <NavLink
              to={{
                pathname: '/movies',
                state: {
                  from: location,
                },
              }}
              exact
            >
              Movies
            </NavLink>
          </li>
        </ul>
        <a className={styles.Resource} href="">
          Resource link
        </a>
      </nav>
    </>
  );
};

export default Header;
