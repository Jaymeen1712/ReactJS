// @ts-nocheck

import { produce } from "immer";

const CHANGE_ADDRESS = "CHANGE_ADDRESS";

export const changeStreet = (street: string) => {
  return {
    type: CHANGE_ADDRESS,
    payload: street,
  };
};

const initialAddress = {
  name: "ABC",
  address: {
    street: "123, abc",
    city: "AVC",
    state: "AH",
  },
};

export const addressReducer = (state = initialAddress, action) => {
  switch (action.type) {
    case "CHANGE_ADDRESS":
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};
