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

const FifthGraph = () => {
  const [graphData, setGraphData] = useState(miserables);
  const graphRef = useRef(null);

  const comps = [ForceGraph2D];
  // const comps = [ForceGraph3D];
  // const comps = [ ForceGraphVR];
  const compWidth = window.innerWidth / comps.length;

  const handleNodeClick = (node, event) => {
    const updatedNodes = graphData.nodes.map((data) =>
      data.id === node.id ? { ...data, x: data.x + 150, y: data.y + 150 } : data
    );

    const updatedGraphData = {
      ...graphData,
      nodes: updatedNodes,
    };

    setGraphData(updatedGraphData);

    console.log("Node clicked:", node);
    console.log("Node Event:", event);
    // Implement custom behavior here
  };

  const handleNodeHover = (node) => {
    // Change the color of the hovered node
    if (node) node.color = "red";
    // Force re-render to update the graph visualization
    // You may need to use a state management system to update the data
  };

  const handleNodeDrag = (node, x, y) => {
    // Update the position of the dragged node
    node.x = x;
    node.y = y;
    // Force re-render to update the graph visualization
    // You may need to use a state management system to update the data
  };

  const handleNodeDragEnd = (node, x, y) => {
    // console.log("Node dragging ended:", node);
    node.x = x;
    node.y = y;
    // Implement custom behavior here
  };

  return (
    <div style={{ display: "flex" }}>
      {comps.map((Comp) => (
        // <Comp width={compWidth} graphData={genRandomTree()} nodeRelSize={3} />
        <Comp
          ref={graphRef}
          key={Comp.id}
          width={compWidth}
          graphData={graphData}
          onNodeClick={handleNodeClick} // Attach the callback
          // onNodeRightClick
          onNodeHover={handleNodeHover} // Attach the hover callback
          onNodeDrag={handleNodeDrag} // Attach the drag callback
          onNodeDragEnd={handleNodeDragEnd} // Attach the drag end callback
        />
        // <Comp width={compWidth} graphData={blocks} />
        // <Comp width={compWidth} graphData={forcegraphdependencies} />
      ))}
    </div>
  );
};

export default FifthGraph;
