import React, {ChangeEvent, useEffect, useReducer, useState} from 'react';
import styles from './Converter.module.scss'
import {
  changeCurrentCurrency,
  currencyReducer,
  CurrencyState,
  CurrencyType,
  saveCurrencyData, saveResultSum
} from "../../../redusers/currencyReducer";
import {currencyAPI} from "../../../api/currencyAPI";

const initialState: CurrencyState = {
  currencies: [],
  currentCurrency: 'USD',
  resultSum: 0
};

const Converter = () => {
  const [state, dispatchState] = useReducer(currencyReducer, initialState)
  const [inputValue, setInputValue] = useState('')

  let currencyRate: number = 0;

  state.currencies.forEach((currency: CurrencyType) => {
    if (currency.Cur_Abbreviation === state.currentCurrency) {
      currencyRate = currency.Cur_OfficialRate
    }
    return currency.Cur_OfficialRate;
  });
  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const resultSum = Number(event.currentTarget.value) * currencyRate
    setInputValue(event.currentTarget.value)
    dispatchState(saveResultSum(resultSum))
  }
  const onChangeSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatchState(changeCurrentCurrency(event.currentTarget.value))
  }

  useEffect(() => {
    dispatchState(saveResultSum(Number(inputValue) * currencyRate))
  }, [currencyRate, inputValue])

  useEffect(() => {
    currencyAPI.getCurrency().then(res => {
      const resultData = res.data.filter((currency: CurrencyType) =>
        currency.Cur_Abbreviation === 'PLN' ||
        currency.Cur_Abbreviation === 'RUB' ||
        currency.Cur_Abbreviation === 'EUR' ||
        currency.Cur_Abbreviation === 'USD')

      dispatchState(saveCurrencyData(resultData))
    })
  }, [])
  return (
    <div className={styles.wrapper}>
      <h2>Converter</h2>
      <div className={styles.converterContainer}>
        <h3 className={styles.title}>Выберите валюту</h3>
        <div className={styles.currencyBox}>
          <input value={inputValue} onChange={onChangeInputHandler} placeholder="Введите сумму" type="number"/>
          <select value={state.currentCurrency} onChange={onChangeSelectHandler}>
            {
              state.currencies.map(currency => {
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
        <p>Валютный курс: {currencyRate}</p>

        <div className={styles.resultBox}>
          <h3>Получается :</h3>
          <span>{state.resultSum.toFixed(4)} Бел. рублей</span>
        </div>
      </div>
    </div>
  );
};

export default Converter;