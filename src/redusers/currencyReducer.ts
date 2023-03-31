export type CurrencyType = {
  Cur_ID: number;
  Date: string;
  Cur_Abbreviation: string;
  Cur_Name: string;
  Cur_OfficialRate: number;
  Cur_Scale: number
};
export type CurrencyState = {
  currencies: Array<CurrencyType>;
  currentCurrency: string
  resultSum: number
  baseCurrency: string
};

export const currencyReducer = (state: CurrencyState, action: ActionsType): CurrencyState => {
  switch (action.type) {
    case 'SAVE-CURRENCY':
      return {
        ...state,
        currencies: action.responseData
      }
    case 'CHANGE-CURRENT-CURRENCY':
      return {
        ...state,
        currentCurrency: action.currentCurrency
      }
    case "CHANGE-BASE-CURRENCY":
      return {
        ...state,
        baseCurrency: action.baseCurrency
      }
    case 'SAVE-RESULT-SUM':
      return {
        ...state,
        resultSum: action.resultSum
      }
    default:
      return state;
  }
};

export const saveCurrencyData = (responseData: Array<CurrencyType>) => {
  return {
    type: 'SAVE-CURRENCY',
    responseData
  } as const
}
export const changeCurrentCurrency = (currentCurrency: string) => {
  return {
    type: 'CHANGE-CURRENT-CURRENCY',
    currentCurrency
  } as const
};
export const changeBaseCurrency = (baseCurrency: string) => {
  return {
    type: 'CHANGE-BASE-CURRENCY',
    baseCurrency
  } as const
};
export const saveResultSum = (resultSum: number) => {
  return {
    type: 'SAVE-RESULT-SUM',
    resultSum
  } as const
};

type ActionsType = SaveCurrencyDataType | ChangeCurrentCurrencyType | ChangeBaseCurrencyType | SaveResultSum

export type SaveCurrencyDataType = ReturnType<typeof saveCurrencyData>
export type ChangeCurrentCurrencyType = ReturnType<typeof changeCurrentCurrency>
export type ChangeBaseCurrencyType = ReturnType<typeof changeBaseCurrency>
export type SaveResultSum = ReturnType<typeof saveResultSum>