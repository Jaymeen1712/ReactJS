// @ts-nocheck
import React, { useState } from "react";

import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import { genRandomTree } from "./datasets/random-data";
import miserables from "./datasets/miserables.json";
import blocks from "./datasets/blocks.json";
import forcegraphdependencies from "./datasets/forcegraph-dependencies.json";

const ThirdGraph = () => {
  const [isPaused, setIsPaused] = useState(true);

  const comps = [ForceGraph2D];
  // const comps = [ForceGraph3D];
  // const comps = [ ForceGraphVR];
  const compWidth = window.innerWidth / comps.length;

  return (
    <div style={{ display: "flex" }}>
      <button onClick={() => setIsPaused((prev) => !prev)}>
        {!isPaused ? "Resume Animation" : "Pause Animation"}
      </button>
      {comps.map((Comp) => (
        // <Comp width={compWidth} graphData={genRandomTree()} nodeRelSize={3} />
        <Comp
          width={compWidth}
          graphData={miserables}
          // autoPauseRedraw={true} // Enable performance optimization to automatically pause redrawing the 2D canvas at every frame whenever the simulation engine is halted
          // minZoom={10} // Lowest zoom out level
          // maxZoom={1} // Highest zoom in level

          // Callback function to invoke at every frame, immediately before any node/link is rendered to the canvas. This can be used to draw additional external items on the canvas.
          // onRenderFramePre={(ctx, globalScale) => {
          //   const x = 0;
          //   const y = 0;
          //   const sideLength = 100 / globalScale;

          //   // Set the fill color
          //   ctx.fillStyle = "blue";

          //   // Draw a square
          //   ctx.fillRect(x, y, sideLength, sideLength);
          // }}
          // onRenderFramePost={(ctx, globalScale) => {
          //   const x = 100;
          //   const y = 100;
          //   const sideLength = 100 / globalScale;

          //   // Set the fill color
          //   ctx.fillStyle = "blue";

          //   // Draw a square
          //   ctx.fillRect(x, y, sideLength, sideLength);
          // }}
        />
        // <Comp width={compWidth} graphData={blocks} />
        // <Comp width={compWidth} graphData={forcegraphdependencies} />
      ))}
    </div>
  );
};

export default ThirdGraph;
