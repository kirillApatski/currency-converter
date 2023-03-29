import React from 'react';
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import {PATH} from "../Pages/Pages";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Currency Converter <span>and Exchange rate</span></h1>
      <ul className={styles.linkBox}>
        <li className={styles.link}><NavLink className={({ isActive }) => isActive ? styles.active : ""} to={PATH.converter}>Converter</NavLink></li>
        <li className={styles.link}><NavLink className={({ isActive }) => isActive ? styles.active : ""} to={PATH.exchangeRate}>Exchange rate</NavLink></li>
      </ul>
    </header>
  );
};

export default Header;