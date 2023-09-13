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

const FirstGraph = () => {
  const comps = [ForceGraph2D];
  // const comps = [ForceGraph3D];
  // const comps = [ ForceGraphVR];
  const compWidth = window.innerWidth / comps.length;

  const nodeCanvasObject = (node, ctx, globalScale) => {
    // ********************
    // zoom >> node size <<
    // zoom << node size >>
    const baseRadius = node.group; // Initial radius value
    const adjustedRadius = baseRadius / globalScale;
    // ********************

    // radius according to the group
    const radius = Math.sqrt(node.group) * globalScale;

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, adjustedRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    // Calculate font size and label position based on globalScale
    const fontSize = Math.max(2, 6 / globalScale); // Ensure a minimum font size
    const labelYOffset = 10 / globalScale; // Adjust label position based on globalScale

    // Draw label under node
    const label = node.id; // Replace with your node label property
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(label, node.x, node.y + adjustedRadius + labelYOffset);
  };

  return (
    <div style={{ display: "flex" }}>
      {comps.map((Comp) => (
        // <Comp width={compWidth} graphData={genRandomTree()} nodeRelSize={3} />
        <Comp
          width={compWidth}
          graphData={miserables}
          // nodeRelSize={3}
          // nodeVal="group"
          // nodeLabel="id"
          // nodeVisibility="group"
          // nodeColor="group"
          // nodeAutoColorBy="group"
          // nodeCanvasObject={nodeCanvasObject}
          // nodeCanvasObjectMode="after"
        />
        // <Comp width={compWidth} graphData={blocks} />
        // <Comp width={compWidth} graphData={forcegraphdependencies} />
      ))}
    </div>
  );
};

export default FirstGraph;
