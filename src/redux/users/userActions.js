import * as actionTypes from "./userTypes";
import axios from "axios";

// Api call is beign made here

export const FetchUserList = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_LOADING, payload: true });
    const response = await axios.get(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    );
    dispatch({ type: actionTypes.FETCH_USERS, payload: response.data });
    dispatch({ type: actionTypes.USER_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: actionTypes.USER_LOADING, payload: false });
    console.log(error);
  }
};

export const AddUser = (userData, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_LOADING, payload: true });
    dispatch({ type: actionTypes.ADD_USER, payload: userData });
    dispatch({ type: actionTypes.USER_LOADING, payload: false });
    history("/");
  } catch (error) {
    dispatch({ type: actionTypes.USER_LOADING, payload: false });
    console.log(error);
  }
};
