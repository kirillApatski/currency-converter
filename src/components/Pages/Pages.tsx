import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Converter from "./Converter/Converter";
import ExchangeRate from "./ExchangeRate/ExchangeRate";
import PageNotFound from "./PageNotFound/PageNotFound";

export const PATH = {
  converter: "/converter",
  exchangeRate: "/exchangeRate",
};

const Pages = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={PATH.converter} />} />
      <Route path={PATH.converter} element={<Converter/>} />
      <Route path={PATH.exchangeRate} element={<ExchangeRate/>} />
      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  );
};

export default Pages;