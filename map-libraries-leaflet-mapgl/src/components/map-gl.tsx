import React from "react";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const SecondGraph = () => {
  return (
    <div>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoiam9obi1kb2UtMTExIiwiYSI6ImNsbGRxNGNtYzBieGUzaG8xOTYxb3kxNHEifQ.YYfalJtT3Hov4sHklqa_yQ"
        initialViewState={{
          longitude: 72.557753,
          latitude: 23.051753,
          zoom: 14,
        }}
        style={{ width: 1920, height: 1080 }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      />
    </div>
  );
};

export default SecondGraph;
