// @ts-nocheck
import { bindActionCreators, combineReducers, createStore } from "redux";
import { addressReducer, changeStreet } from "./slice/address";

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_ORDERED = "ICE_ORDERED";
const ICE_RESTOCKED = "ICE_RESTOCKED";

// actions
export function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
}

export function restokeCake(qty = 3) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

export function orderIce(qty = 1) {
  return {
    type: ICE_ORDERED,
    payload: qty,
  };
}

export function restokeIce(qty = 3) {
  return {
    type: ICE_RESTOCKED,
    payload: qty,
  };
}

// reducers
const initialIce = {
  numOfIceCreams: 20,
};

const initialCakes = {
  numOfCakes: 10,
};

const caksReducer = (state = initialCakes, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIce, action) => {
  switch (action.type) {
    case ICE_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICE_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: caksReducer,
  iceCream: iceCreamReducer,
  address: addressReducer,
});

export const store = createStore(rootReducer);
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);

export const actions = bindActionCreators(
  { orderCake, restokeCake, orderIce, restokeIce, changeStreet },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();

actions.orderIce();
actions.orderIce();

actions.restokeCake(3);
actions.restokeIce(3);

actions.changeStreet("456, BY");

unsubscribe();
