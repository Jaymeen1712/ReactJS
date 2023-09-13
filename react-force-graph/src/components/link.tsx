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

const SecondGraph = () => {
  const comps = [ForceGraph2D];
  // const comps = [ForceGraph3D];
  // const comps = [ ForceGraphVR];
  const compWidth = window.innerWidth / comps.length;

  const linkCanvasObject = (link, ctx, globalScale) => {
    // Customize the appearance of links using canvas
    const lineColor = link.source.group === link.target.group ? "green" : "red";
    const lineWidth = 2 / globalScale;

    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  return (
    <div style={{ display: "flex" }}>
      {comps.map((Comp) => (
        // <Comp width={compWidth} graphData={genRandomTree()} nodeRelSize={3} />
        <Comp
          width={compWidth}
          graphData={miserables}
          // linkLabel={(link) => `${link.source.id} ${link.target.id}`}
          // linkVisibility={(link) => link.source.group}
          // linkColor={(link) => link.source.group}
          // linkAutoColorBy={(link) => link.source.group}
          // linkLineDash={(link) => link.source.group === 0 && [20, 3, 3, 3, 3, 3, 3, 3]}
          // linkWidth={(link) =>
          //   link.source.group === 0 && link.target.group === 4 ? 5 : 1
          // }
          // linkCurvature={(link) =>
          //   link.source.group === 0 && link.target.group === 4 ? 2 : 0
          // }
          // linkCurveRotation={(link) =>
          //   link.source.group === 0 && link.target.group === 0 ? 5 : 10
          // }
          // linkCanvasObject={linkCanvasObject}
          // linkCanvasObjectMode="replace"
          // linkDirectionalArrowLength={6}
          // linkDirectionalArrowColor="red"
          // linkDirectionalArrowRelPos={1}
          // linkDirectionalArrowResolution={1000}
          // linkDirectionalParticles={(link) =>
          //   link.source.group === 0 && link.target.group === 0 ? 0 : 1
          // }
          // linkDirectionalParticles={(link) =>
          //   link.source.group === 0 && link.target.group === 0 ? 0 : 1
          // }
          // linkDirectionalParticleSpeed={0.09}
          // linkDirectionalParticleWidth={10}
          // linkDirectionalParticleColor="red"
          // linkDirectionalParticleResolutio={1000}
        />
        // <Comp width={compWidth} graphData={blocks} />
        // <Comp width={compWidth} graphData={forcegraphdependencies} />
      ))}
    </div>
  );
};

export default SecondGraph;
