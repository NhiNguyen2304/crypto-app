import axios from "axios";

export const searchCoins = async ({ searchQuery }) => {
  try {
    if (searchQuery != null) {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchQuery}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      );
      //console.log("Search Coin: " + response.data);
      //setWatchListResults(response.data);
      return response.data;
    } else {
      console.log("Coin list is empty");
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getCoinDetail = async ({ coinId }) => {
  try {
    if (coinId != null) {
      console.log("Get Coin detail");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      console.log("Search Coin: " + response.data);
      //setWatchListResults(response.data);
      return response.data;
    } else {
      console.log("Coin detail is empty");
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getCoinDetailChart = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7`
    );
    //console.log("Search Coin: " + response.data);
    //setWatchListResults(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
