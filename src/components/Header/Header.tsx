import React from 'react';
import styles from './Header.module.scss'
import {Link} from "react-router-dom";
import {PATH} from "../Pages/Pages";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Currency Converter</h1>
      <ul className={styles.linkBox}>
        <li className={styles.link}><Link to={PATH.converter}>Converter</Link></li>
        <li className={styles.link}><Link to={PATH.exchangeRate}>Exchange rate</Link></li>
      </ul>
    </header>
  );
};

export default Header;