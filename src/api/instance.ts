import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://www.nbrb.by/api/exrates/rates',
})