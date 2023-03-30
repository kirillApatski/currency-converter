import React, {FC} from 'react';
import styles from './ExchangeRate.module.scss'
import {CurrencyType} from "../../../redusers/currencyReducer";

type ExchangeRatePropsType = {
  currencies: Array<CurrencyType>
}

const ExchangeRate:FC<ExchangeRatePropsType> = ({currencies}) => {

  return (
    <div className={styles.wrapper}>
      <h2>Exchange Rate</h2>
      <ul className={styles.exchangeRateBox}>
        {
          currencies.map(currency => {
            return (
              <li key={currency.Cur_ID} className={styles.rate}>1 {currency.Cur_Abbreviation} - {currency.Cur_OfficialRate}</li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default ExchangeRate;