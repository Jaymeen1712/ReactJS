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

const FourthGraph = () => {
  const [graphData, setGraphData] = useState(miserables);
  const graphRef = useRef(null);

  const comps = [ForceGraph2D];
  // const comps = [ForceGraph3D];
  // const comps = [ ForceGraphVR];
  const compWidth = window.innerWidth / comps.length;

  const handleEngineTick = (engine) => {
    // const hoveredNodeId = getHoveredNodeId(); // Implement your logic to get the hovered node
    // graphData.nodes.forEach((node) => {
    //   node.color = node.id === hoveredNodeId ? "red" : "blue";
    // });
    // setGraphData({ ...graphData });
    console.log("Engine ticks");
  };

  const handleEngineStop = () => {
    console.log("Engine has stopped.");
    // Perform actions when the engine stops
  };

  const handleRestartSimulation = () => {
    if (graphRef.current) {
      // console.log(graphRef.current)
      graphRef.current.d3ReheatSimulation();
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <button onClick={handleRestartSimulation}>Restart Simulation</button>

      {comps.map((Comp) => (
        // <Comp width={compWidth} graphData={genRandomTree()} nodeRelSize={3} />
        <Comp
          ref={graphRef}
          key={Comp.id}
          width={compWidth}
          graphData={graphData}
          // dagMode="rl"
          // dagLevelDistance={50}
          // dagNodeFilter={(node) => node.group === 1 ? false : true}
          // onDagError={(node) => (node.group === 1 ? false : true)}
          // warmupTicks={10} // skip ticks from start
          // cooldownTicks={Infinity} // number of ticks
          // cooldownTime={15000} // time in ms want to run ticks

          // Combination for Fast Convergence and Smooth Animation
          // Engine Tick: 901
          d3AlphaMin={0.001} // Set the desired minimum alpha value
          d3AlphaDecay={0.001} // Set the desired alpha decay rate
          d3VelocityDecay={0.5}

          // // Combination for Slow, Organic-Looking Animation
          // // Engine Tick: 228
          // d3AlphaMin={0.01} // Set the desired minimum alpha value
          // d3AlphaDecay={0.02} // Set the desired alpha decay rate
          // d3VelocityDecay={0.1}
          // // Combination for Balanced Animation and Convergence
          // // Engine Tick: 459
          // d3AlphaMin={0.01} // Set the desired minimum alpha value
          // d3AlphaDecay={0.01} // Set the desired alpha decay rate
          // d3VelocityDecay={0.5}
          // //
          onEngineTick={handleEngineTick}
          onEngineStop={handleEngineStop}
          // d3Force="charge" // The type of force // "link" || "charge" || "center"
        />
        // <Comp width={compWidth} graphData={blocks} />
        // <Comp width={compWidth} graphData={forcegraphdependencies} />
      ))}
    </div>
  );
};

export default FourthGraph;
