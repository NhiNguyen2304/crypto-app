export const SET_TRADE_MODAL_VISIBILITY = "SET_TRADE_MODAL_VISIBILITY";

export const setTradeModelVisibilitySuccess = (isVisible) => ({
  type: SET_TRADE_MODAL_VISIBILITY,
  payload: { isVisible },
});

export function setTradeModelVisibility(isVisible) {
  return (dispatch) => {
    dispatch(setTradeModelVisibilitySuccess(isVisible)); // Use the correct action creator
  };
}
