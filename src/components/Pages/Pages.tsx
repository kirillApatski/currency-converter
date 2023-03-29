import React, {ChangeEvent, useEffect, useReducer, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Converter from "./Converter/Converter";
import ExchangeRate from "./ExchangeRate/ExchangeRate";
import PageNotFound from "./PageNotFound/PageNotFound";
import {
  changeCurrentCurrency,
  currencyReducer, CurrencyState,
  CurrencyType,
  saveCurrencyData,
  saveResultSum
} from "../../redusers/currencyReducer";
import {currencyAPI} from "../../api/currencyAPI";

export const PATH = {
  converter: "/converter",
  exchangeRate: "/exchangeRate",
};

const initialState: CurrencyState = {
  currencies: [],
  currentCurrency: 'USD',
  resultSum: 0
};

const Pages = () => {
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
    <Routes>
      <Route path={"/"} element={<Navigate to={PATH.converter} />} />
      <Route path={PATH.converter} element={
        <Converter
          onChangeInputHandler={onChangeInputHandler}
          onChangeSelectHandler={onChangeSelectHandler}
          inputValue={inputValue}
          currentCurrency={state.currentCurrency}
          currencyRate={currencyRate}
          currencies={state.currencies}
          resultSum={state.resultSum}
        />} />
      <Route path={PATH.exchangeRate} element={
        <ExchangeRate currencies={state.currencies}/>
      } />
      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  );
};

export default Pages;