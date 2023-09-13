import React from "react";
import { orderCake, store } from "../store/store";

const First = () => {
  store.dispatch(orderCake());
  return <div>First</div>;
};

export default First;
