import axios from "axios";

export const GET_HOLDINGS_START = "GET_HOLDINGS_START";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAIL = "GET_HOLDINGS_FAIL";
export const GET_COIN_START = "GET_COIN_START";
export const GET_COIN_SUCCESS = "GET_COIN_SUCCESS";
export const GET_COIN_FAIL = "GET_COIN_FAIL";
//Holding / My holding

export const getHoldingStart = () => ({
  type: GET_HOLDINGS_START,
});

export const getHoldingFail = (error) => ({
  type: GET_HOLDINGS_FAIL,
  payload: { error },
});

export const getHoldingSuccess = (myHoldings) => ({
  type: GET_HOLDINGS_SUCCESS,
  payload: { myHoldings },
});

export function getHoldings(
  holdings = holdings,
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1
) {
  return (dispatch) => {
    dispatch(getHoldingStart());
    let ids = holdings
      .map((item) => {
        return item.id;
      })
      .join(",");
    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

    return axios({
      url: apiUrl,
      method: "GET",
      header: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        //console.log(response);
        if (response.status == 200) {
          console.log("GetHoldings");
          // Message data
          let myHoldings = response.data.map((item) => {
            // Retrieve current hodlings to get current quantity
            let coin = holdings.find((a) => a.id == item.id);

            //Get Price from 7 days ago
            let price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);

            return {
              id: item.id,
              symbol: item.symbol,
              image: item.image,
              current_price: item.current_price,
              qty: coin.qty,
              total: coin.qty * item.current_price,
              price_change_percentage_7d_in_currency:
                item.price_change_percentage_7d_in_currency,
              holding_value_change_7d:
                (item.current_price - price7d) * coin.qty,
              sparkline_in_7d: {
                value: item.sparkline_in_7d.price.map((price) => {
                  return price * coin.qty;
                }),
              },
            };
          });
          dispatch(getHoldingSuccess(myHoldings));
        } else {
          dispatch(getHoldingFail(response.data));
        }
      })
      .catch((error) => {
        dispatch(getHoldingFail(error));
      });
  };
}

//Coin Market
export const getCoinMarketStart = () => ({
  type: GET_COIN_START,
});

export const getCoinMarketSuccess = (coins) => ({
  type: GET_COIN_SUCCESS,
  payload: { coins },
});

export const getCoinMarketFail = (error) => ({
  type: GET_COIN_FAIL,
  payload: { error },
});

export function getCoinMarket(
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1
) {
  return (dispatch) => {
    dispatch(getCoinMarketStart());
    let apiCoinUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;
    return axios({
      url: apiCoinUrl,
      method: "GET",
      header: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("GETCoinMarket");
        // console.log(response);
        if (response.status == 200) {
          console.log("GETCoinMarket");
          dispatch(getCoinMarketSuccess(response.data));
        } else {
          dispatch(getCoinMarketFail(response.data));
        }
      })
      .catch((error) => {
        dispatch(getCoinMarketFail(error));
      });
  };
}
