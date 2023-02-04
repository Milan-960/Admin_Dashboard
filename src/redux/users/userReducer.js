/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  user: null,
};

// User Reducer tacking actionTypes

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: state.users.concat(action.payload),
      };
    case actionTypes.USER_TO_EDIT:
      let useToEdit = state.users.filter(
        (item) => parseInt(action.payload) === parseInt(item.id)
      );
      return {
        ...state,
        user: useToEdit[0],
      };
    case actionTypes.UPDATE_USER: {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      const newUsers = [...state.users];
      newUsers[index] = action.payload;
      return {
        ...state,
        users: newUsers,
      };
    }
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((item) => action.payload !== item.id),
      };
    default:
      return { ...state };
  }
};
