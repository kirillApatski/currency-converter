import React from 'react';
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Currency Converter</h1>
      <ul className={styles.linkBox}>
        <li className={styles.link}><a href="#">Converter</a></li>
        <li className={styles.link}><a href="#">Exchange rate</a></li>
      </ul>
    </header>
  );
};

export default Header;