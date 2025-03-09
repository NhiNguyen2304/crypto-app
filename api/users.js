import axios from "axios";

// Set the URL for API
const API_URL = `http://172.22.27.133:3001`;
//const API_URL = `http://192.168.1.4:3001`;

export const login = async ({ email, password }) => {
  const dataJson = {
    email: email,
    password: password,
  };

  try {
    const result = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson),
    });
    console.log("Start login");
    const response = await result.json();
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const signup = async ({ email, password }) => {
  const dataJson = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(`${API_URL}/users/register`, dataJson);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCoin = async ({ email, coinId }) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/watchlist/${email}/${coinId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateWatchList = async ({ email, coinId }) => {
  try {
    const response = await axios.put(`${API_URL}/users/watchlist/${email}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCoin = async ({ email }) => {
  try {
    const response = await axios.get(`${API_URL}/users/watchlist/${email}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCoin = async ({ email, coinId }) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/watchlist/${email}/${coinId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
