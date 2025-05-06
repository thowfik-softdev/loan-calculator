import axios from "axios";

const KEY = process.env.REACT_APP_EXCHANGE_API_KEY;
const BASE = process.env.REACT_APP_BASE_CURRENCY;
const URL = `https://v6.exchangerate-api.com/v6/${KEY}/latest/${BASE}`;

export async function fetchExchangeRates() {
  const res = await axios.get(URL);
  return res.data.conversion_rates;
}
