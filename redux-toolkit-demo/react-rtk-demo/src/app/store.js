import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "../feature/cake/cake-slice";
import icecreamReducer from "../feature/ice-cream/ice-cream-slice";
import userReducer from "../feature/users/users-slice";
import { createLogger } from "redux-logger";

const logger = createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
