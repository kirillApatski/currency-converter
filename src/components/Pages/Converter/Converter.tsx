import React, {ChangeEvent, FC} from 'react';
import styles from './Converter.module.scss'
import {
  CurrencyType,
} from "../../../redusers/currencyReducer";

type ConverterPropsType = {
  onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeSelectHandler: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeSelectBaseHandler: (event: ChangeEvent<HTMLSelectElement>) => void
  currencies: Array<CurrencyType>
  inputValue: string
  currentCurrency: string
  currencyRate: number
  resultSum: number
  baseCurrency: string
}

const Converter:FC<ConverterPropsType> = (
  {
    onChangeInputHandler,
    onChangeSelectHandler,
    inputValue,
    currentCurrency,
    currencies,
    currencyRate,
    resultSum,
    baseCurrency,
    onChangeSelectBaseHandler
  }
) => {

  return (
    <div className={styles.wrapper}>
      <h2>Converter</h2>
      <div className={styles.converterContainer}>
        <h3 className={styles.title}>Выберите валюту</h3>
        <div className={styles.currencyBox}>
          <input value={inputValue} onChange={onChangeInputHandler} placeholder="Введите сумму" type="number"/>
          <select value={currentCurrency} onChange={onChangeSelectHandler}>
            {
              currencies.map(currency => {
                return (
                  <option
                    key={currency.Cur_ID}
                    value={currency.Cur_Abbreviation}
                  >
                    {currency.Cur_Abbreviation}
                  </option>
                )
              })
            }
          </select>
        </div>
        <p>Выберите в какую валюту конвертировать</p>
        <select value={baseCurrency} onChange={onChangeSelectBaseHandler}>
          {
            currencies.map(currency => {
              return (
                <option
                  key={currency.Cur_ID + currency.Cur_Abbreviation}
                  value={currency.Cur_Abbreviation}
                >
                  {currency.Cur_Abbreviation}
                </option>
              )
            })
          }
        </select>
        <p>Валютный курс: {currencyRate}</p>

        <div className={styles.resultBox}>
          <h3>Получается :</h3>
          <div>
            {resultSum.toFixed(3)} : {baseCurrency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;