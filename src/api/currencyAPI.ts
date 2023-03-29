import {instance} from "./instance";

export const currencyAPI = {
  getCurrency() {
    return instance.get('?periodicity=0')
  }
}