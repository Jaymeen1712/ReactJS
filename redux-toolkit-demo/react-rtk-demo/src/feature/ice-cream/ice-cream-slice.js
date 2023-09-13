import { ordered } from "../cake/cake-slice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numOfIcecreams: 10,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIcecreams--;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ordered, (state, action) => {
      state.numOfIcecreams--;
    });
  },
});

export default icecreamSlice.reducer;
export const icecreamActions = icecreamSlice.actions;
