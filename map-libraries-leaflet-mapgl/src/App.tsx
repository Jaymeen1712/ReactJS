import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import FirstGraph from "./components/leaflet-map";
import SecondGraph from "./components/map-gl";

function App() {
  return (
    <div className="App">
      {/* <FirstGraph /> */}
      <SecondGraph />
    </div>
  );
}

export default App;
