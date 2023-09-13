// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";

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

const SixthGraph = () => {
  const [graphData, setGraphData] = useState(miserables);
  const graphRef = useRef(null);

  const comps = [ForceGraph2D];
  // const comps = [ForceGraph3D];
  // const comps = [ ForceGraphVR];
  const compWidth = window.innerWidth / comps.length;

  const handleGetBbox = () => {
    if (graphRef.current) {
      const bbox = graphRef.current.getGraphBbox();
      console.log("Graph Bbox:", bbox);
    }
  };

  const handleMouseMove = (event) => {
    if (graphRef.current) {
      const [x, y] = graphRef.current
        .getInstance()
        .screen2GraphCoords(event.clientX, event.clientY);
      console.log("Mouse position in graph coords:", x, y);
    }
  };

  const handleNodeClick = (node) => {
    if (graphRef.current) {
      console.log(graphRef.current.graph2ScreenCoords(node.x, node.y));
    }
  };  

  return (
    <div style={{ display: "flex" }}>
      <button onClick={handleGetBbox}>Get Graph Bbox</button>
      {comps.map((Comp) => (
        // <Comp width={compWidth} graphData={genRandomTree()} nodeRelSize={3} />
        <Comp
          ref={graphRef}
          key={Comp.id}
          width={compWidth}
          graphData={graphData}
          onNodeClick={handleNodeClick} // Attach node click event
        />
        // <Comp width={compWidth} graphData={blocks} />
        // <Comp width={compWidth} graphData={forcegraphdependencies} />
      ))}
    </div>
  );
};

export default SixthGraph;
