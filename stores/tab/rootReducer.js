import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import marketReducer from "../market/marketReducer";

export default combineReducers({
  tabReducer,
  marketReducer,
});
