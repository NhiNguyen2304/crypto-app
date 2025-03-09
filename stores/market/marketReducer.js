import * as marketActions from "./marketAction";

const initialState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case marketActions.GET_HOLDINGS_START:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload.myHoldings,
      };
    case marketActions.GET_HOLDINGS_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    case marketActions.GET_COIN_START:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_COIN_SUCCESS:
      return {
        ...state,
        coins: action.payload.coins,
      };
    case marketActions.GET_COIN_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default marketReducer;
