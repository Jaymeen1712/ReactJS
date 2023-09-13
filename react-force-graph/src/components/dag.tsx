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
const data = {
  nodes: [
    { id: "node1" },
    { id: "node2" },
    { id: "node3" },
    { id: "node4" },
    { id: "node5" },
    { id: "node6" },
    { id: "node7" },
    { id: "node8" },
    { id: "node9" },
    { id: "node10" },
    { id: "node11" },
    { id: "node12" },
    { id: "node13" },
    { id: "node14" },
    { id: "node15" },
    { id: "node16" },
    { id: "node17" },
    { id: "node18" },
    // Add more nodes here
  ],
  links: [
    // { source: "node1", target: "node2" },
    // { source: "node2", target: "node3" },
    // { source: "node3", target: "node4" },
    // { source: "node4", target: "node5" },
    // { source: "node5", target: "node6" },
    // { source: "node6", target: "node7" },
    // { source: "node7", target: "node8" },
    // { source: "node8", target: "node9" },
    // { source: "node9", target: "node10" },
    // { source: "node10", target: "node11" },
    // { source: "node11", target: "node12" },
    // { source: "node12", target: "node13" },
    // { source: "node13", target: "node14" },
    // { source: "node14", target: "node15" },
    // { source: "node15", target: "node16" },
    // { source: "node16", target: "node17" },
    // { source: "node17", target: "node18" },
    // Add more links here
  ],
};

const Dag = () => {
  const [graphData, setGraphData] = useState(miserables);
  const graphRef = useRef(null);

  const comps = [ForceGraph2D];
  // const comps = [ForceGraph3D];
  // const comps = [ ForceGraphVR];
  const compWidth = window.innerWidth / comps.length;

  const calculateSquareLayout = (nodeCount, gridSize) => {
    const nodesPerRow = Math.ceil(Math.sqrt(nodeCount));
    const numRows = Math.ceil(nodeCount / nodesPerRow);
    const positions = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < nodesPerRow; col++) {
        positions.push({
          x: col * gridSize,
          y: row * gridSize,
        });
      }
    }

    return positions;
  };

  const gridSize = 150;
  const nodePositions = calculateSquareLayout(data.nodes.length, gridSize);

  const handleNodeCanvas = (node, ctx, globalScale) => {
    const position =
      nodePositions[data.nodes.findIndex((n) => n.id === node.id)];
    node.x = position.x + 100;
    node.y = position.y + 100;

    // Customize node appearance (you can use the ctx object)
    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  };

  return (
    <div style={{ display: "flex" }}>
      {comps.map((Comp) => (
        // <Comp width={compWidth} graphData={genRandomTree()} nodeRelSize={3} />
        <Comp
          ref={graphRef}
          key={Comp.id}
          width={compWidth}
          graphData={data}
          // d3AlphaMin={0.01} // Set the desired minimum alpha value
          // d3AlphaDecay={0.01} // Set the desired alpha decay rate
          // d3VelocityDecay={0.05}
          // nodeRelSize={5}
          nodeCanvasObject={handleNodeCanvas}

          // dagMode="radialin" // for circle
          // dagMode="bu" // for straight line

          dagMode={"radialin"}
          dagLevelDistance={100}
          backgroundColor="#101020"
          linkColor={() => "rgba(255,255,255,0.2)"}
          nodeRelSize={1}
          nodeId="id"
          nodeVal={(node) => 100 / (node.group + 1)}
          nodeLabel="id"
          nodeAutoColorBy="group"
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          d3VelocityDecay={0.3}
        />
        // <Comp width={compWidth} graphData={blocks} />
        // <Comp width={compWidth} graphData={forcegraphdependencies} />
      ))}
    </div>
  );
};

export default Dag;
