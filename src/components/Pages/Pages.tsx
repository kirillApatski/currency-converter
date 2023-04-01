import React, {ChangeEvent, useEffect, useReducer, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Converter from "./Converter/Converter";
import ExchangeRate from "./ExchangeRate/ExchangeRate";
import PageNotFound from "./PageNotFound/PageNotFound";
import {
  changeBaseCurrency,
  changeCurrentCurrency,
  currencyReducer, CurrencyState,
  CurrencyType,
  saveCurrencyData,
  saveResultSum, toggleIsLoaded
} from "../../redusers/currencyReducer";
import {currencyAPI} from "../../api/currencyAPI";

export const PATH = {
  converter: "/converter",
  exchangeRate: "/exchangeRate",
};

const initialState: CurrencyState = {
  currencies: [
    {
      Cur_Abbreviation: "BYN",
      Cur_ID: 1233,
      Cur_Name: "Белорусский рубль",
      Cur_OfficialRate: 1,
      Cur_Scale: 100,
      Date: "2023-04-01T00:00:00"
    }
  ],
  currentCurrency: 'USD',
  resultSum: 0,
  baseCurrency: 'BYN',
  isLoaded: true
};

let baseCurScale: any = {
  BYN: 100,
  UAH: 1,
  USD: 100,
  PLN: 10,
  RUB: 1,
  EUR: 100
}

const Pages = () => {
  const [state, dispatchState] = useReducer(currencyReducer, initialState)
  const [inputValue, setInputValue] = useState('')

  let currencyRate: number = 0;
  let course: number = 0;
  let curScale: number = 0;

  let currencyExchangeRate: any = {
    BYN: 1
  }
  state.currencies.forEach((currency: CurrencyType) => {
    if (currency.Cur_Abbreviation === state.currentCurrency) {
      currencyRate = currency.Cur_OfficialRate
      course = currency.Cur_OfficialRate
      curScale = currency.Cur_Scale
    }
    currencyExchangeRate[currency.Cur_Abbreviation] = currency.Cur_OfficialRate
    return currency.Cur_OfficialRate;
  });
  const convertCurrency = () => {
    let finishSum: number = 0;
    if (state.currentCurrency === state.baseCurrency) {
      dispatchState(saveResultSum(Number(inputValue)))
    } else {
      if (state.currentCurrency !== 'BYN') {
        finishSum = Number(inputValue) * currencyRate / curScale;
        dispatchState(saveResultSum(Number(finishSum / currencyExchangeRate[state.baseCurrency]) * 100 / baseCurScale[state.baseCurrency]));
      } else {
        dispatchState(saveResultSum((Number(inputValue) / currencyExchangeRate[state.baseCurrency]) * 100 / baseCurScale[state.baseCurrency]));
      }
    }
  }
  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }
  const onChangeSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatchState(changeCurrentCurrency(event.currentTarget.value))
  }
  const onChangeSelectBaseHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatchState(changeBaseCurrency(event.currentTarget.value))
  }
  course = Number((currencyRate / currencyExchangeRate[state.baseCurrency] * 100 / baseCurScale[state.baseCurrency]).toFixed(4))
  useEffect(() => {
    convertCurrency()
  }, [course, state.baseCurrency, inputValue, state.currentCurrency])
  useEffect(() => {
    dispatchState(toggleIsLoaded(false))
    currencyAPI.getCurrency().then(res => {
      const resultData = res.data.filter((currency: CurrencyType) =>
        currency.Cur_Abbreviation === "UAH" ||
        currency.Cur_Abbreviation === 'PLN' ||
        currency.Cur_Abbreviation === 'RUB' ||
        currency.Cur_Abbreviation === 'EUR' ||
        currency.Cur_Abbreviation === 'USD')
      dispatchState(saveCurrencyData(resultData))
    }).finally(() => {
      dispatchState(toggleIsLoaded(true))
    })
  }, [])
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Navigate to={PATH.converter}/>}/>
        <Route path={PATH.converter} element={
          <Converter
            onChangeInputHandler={onChangeInputHandler}
            onChangeSelectHandler={onChangeSelectHandler}
            inputValue={inputValue}
            currentCurrency={state.currentCurrency}
            currencyRate={course}
            currencies={state.currencies}
            resultSum={state.resultSum}
            baseCurrency={state.baseCurrency}
            onChangeSelectBaseHandler={onChangeSelectBaseHandler}
          />}/>
        <Route path={PATH.exchangeRate} element={
          <ExchangeRate currencies={state.currencies}/>
        }/>
        <Route path={"*"} element={<PageNotFound/>}/>
      </Routes>
    </>
  );
};

export default Pages;