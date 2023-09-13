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
import * as dat from "dat.gui";
import * as d3 from "d3";

const DagSecond = () => {
  const [graphData, setGraphData] = useState(miserables);

  const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle((b) => !b);
  };
  const fgRef = useRef();

  const [controls] = useState({ "DAG Orientation": "td" });
  const forceUpdate = useForceUpdate();

  // useEffect(() => {
  //   // add collision force
  //   fgRef.current.d3Force(
  //     "collision",
  //     d3.forceCollide((node) => Math.sqrt(100 / (node.level + 1)))
  //   );
  // }, []);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graphData}
      dagMode={"radialin"}
      dagLevelDistance={300}
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
  );
};

export default DagSecond;
