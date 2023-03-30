import {
  changeCurrentCurrency,
  currencyReducer,
  CurrencyState,
  saveCurrencyData,
  saveResultSum
} from "../redusers/currencyReducer";

let startState: CurrencyState;

beforeEach(() => {
  startState = {
    currencies: [
      {
        Cur_ID: 1,
        Date: "2023-03-30T00:00:00",
        Cur_Abbreviation: "EUR",
        Cur_Name: "Евро",
        Cur_OfficialRate: 3.1013,
        Cur_Scale: 1
      }
    ],
    currentCurrency: 'USD',
    resultSum: 0,
    baseCurrency: 'Белорусский рубль'
  };
});

test('save currency data', () => {
  const action = saveCurrencyData([{
    Cur_ID: 2,
    Date: "2023-02-20T00:00:00",
    Cur_Abbreviation: "RUB",
    Cur_Name: "Российских рублей",
    Cur_OfficialRate:
      3.7237,
    Cur_Scale: 100
  }])

  const endState = currencyReducer(startState, action)

  expect(endState.currencies.length).toBe(1);
  expect(endState.currencies[0].Cur_Abbreviation).toBe("RUB");
  expect(endState.currencies).toBeDefined();
});

test('change current currency', () => {
  const action = changeCurrentCurrency('USD')

  const endState = currencyReducer(startState, action)

  expect(endState.currencies).toBeDefined();
  expect(endState.currentCurrency).toBe("USD");
});

test('save result sum', () => {
  const action = saveResultSum(555)

  const endState = currencyReducer(startState, action)

  expect(endState.resultSum).toBeDefined();
  expect(endState.resultSum).toBe(555);
});