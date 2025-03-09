import * as tabAcTypes from "./tabActions";

const initialState = {
  isTradeModalVisible: false,
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case tabAcTypes.SET_TRADE_MODAL_VISIBILITY:
      return {
        ...state,
        isTradeModalVisible: action.payload.isVisible,
      };
    default:
      return state;
  }
};

export default tabReducer;
