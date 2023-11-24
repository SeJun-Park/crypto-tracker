import { QueryFunctionContext } from "@tanstack/react-query";

const BASE_URL = `https://api.coinpaprika.com/v1`

export const fetchCoins = () => {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export const fetchCoinInfo = ({ queryKey } : QueryFunctionContext) => {
    const [ _, coinId ] = queryKey
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export const fetchCoinPrice = ({ queryKey } : QueryFunctionContext) => {
    const [ _, coinId ] = queryKey
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

export const fetchCoinHistory = ({ queryKey } : QueryFunctionContext) => {
    const [ _, coinId ] = queryKey
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) => response.json());
}