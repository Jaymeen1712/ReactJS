import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./cake-slice";

const CakeView = () => {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <div>Number of cakes: {numOfCakes}</div>
      <button onClick={() => dispatch(ordered())}>Order</button>
      <button onClick={() => dispatch(restocked(3))}>Restoke</button>
    </div>
  );
};

export default CakeView;
