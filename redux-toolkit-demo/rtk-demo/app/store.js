const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("../feature/cake/cake-slice");
const icecreamReducer = require("../feature/ice-cream/ice-cream-slice");
const userReducer = require("../feature/users/users-slice");
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
