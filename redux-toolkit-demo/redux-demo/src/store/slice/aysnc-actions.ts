// @ts-nocheck

import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const initialValues = {
  loading: false,
  users: [],
  error: "",
};

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const userReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUESTED":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCCEEDED":
      return {
        ...state,
        users: action.payload,
        error: "",
      };
    case "FETCH_USERS_FAILED":
      return {
        ...state,
        users: [],
        error: action.payload,
      };
  }
};

const fetchData = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios 
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailed(error.message));
      });
  };
};

export const store = createStore(userReducer, applyMiddleware(thunk));

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchData());
