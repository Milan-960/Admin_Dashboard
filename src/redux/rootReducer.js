import { combineReducers } from "redux";
import UserReducer from "./users/userReducer";

export default combineReducers({
  users: UserReducer,
});
