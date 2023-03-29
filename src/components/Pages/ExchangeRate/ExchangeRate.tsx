import React from 'react';
import styles from './ExchangeRate.module.scss'


const ExchangeRate = () => {


  return (
    <div className={styles.wrapper}>
      <h2>Exchange Rate</h2>
      <ul className={styles.exchangeRateBox}>
        <li className={styles.rate}>1 USD - 2.84</li>
        <li className={styles.rate}>1 PLN - 6.45</li>
        <li className={styles.rate}>1 EUR - 3.41</li>
        <li className={styles.rate}>100 RUR - 35.71</li>
      </ul>
    </div>
  );
};

export default ExchangeRate;