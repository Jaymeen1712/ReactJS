// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ForceGraph2D } from "react-force-graph";
import Papa from "papaparse";
import { Drawer } from "antd"; // Import the Drawer component from Ant Design

function generateCustomTreeData(numNodes, numLevels) {
  if (numLevels < 1) {
    throw new Error("Number of levels must be at least 1.");
  }

  const data = {
    nodes: [],
    links: [],
  };

  const levels = Array.from({ length: numLevels }, (_, idx) => idx + 1);

  const majorNode = {
    id: "major",
    path: "major",
    leaf: "major",
    module: null,
    size: 20,
    level: 0,
  };

  data.nodes.push(majorNode);

  // Generate nodes
  for (let i = 1; i <= numNodes; i++) {
    const nodeId = `d${i}`;
    const level = levels[Math.floor(Math.random() * numLevels)];

    const parent =
      i === 1 ? "major" : `d${Math.floor(Math.random() * (i - 1)) + 1}`;

    const node = {
      id: nodeId,
      path: nodeId,
      leaf: nodeId,
      module: null,
      size: 20,
      level: level,
      label: nodeId, // Set label to be the same as the id
    };
    data.nodes.push(node);

    if (parent) {
      data.links.push({ source: parent, target: nodeId });
    }
  }

  return data;
}

const initialGraphData = {
  nodes: [
    { id: "d0", path: "d0", leaf: "d0", module: null, size: 20, level: 0 },
    { id: "d1", path: "d1", leaf: "d1", module: null, size: 20, level: 1 },
    { id: "d2", path: "d2", leaf: "d2", module: null, size: 20, level: 1 },
    { id: "d3", path: "d3", leaf: "d3", module: null, size: 20, level: 2 },
    { id: "d4", path: "d4", leaf: "d4", module: null, size: 20, level: 2 },
    { id: "d5", path: "d5", leaf: "d5", module: null, size: 20, level: 3 },
    { id: "d6", path: "d6", leaf: "d6", module: null, size: 20, level: 1 },
    { id: "d7", path: "d7", leaf: "d7", module: null, size: 20, level: 2 },
    { id: "d8", path: "d8", leaf: "d8", module: null, size: 20, level: 2 },
    { id: "d9", path: "d9", leaf: "d9", module: null, size: 20, level: 3 },
    // Additional nodes
    { id: "d10", path: "d10", leaf: "d10", module: null, size: 20, level: 1 },
    { id: "d11", path: "d11", leaf: "d11", module: null, size: 20, level: 1 },
    { id: "d12", path: "d12", leaf: "d12", module: null, size: 20, level: 2 },
    { id: "d13", path: "d13", leaf: "d13", module: null, size: 20, level: 2 },
    { id: "d14", path: "d14", leaf: "d14", module: null, size: 20, level: 3 },
    { id: "d15", path: "d15", leaf: "d15", module: null, size: 20, level: 3 },
    { id: "d16", path: "d16", leaf: "d16", module: null, size: 20, level: 3 },
  ],
  links: [
    { source: "d0", target: "d1" },
    { source: "d0", target: "d2" },
    { source: "d0", target: "d3" },
    { source: "d0", target: "d4" },
    { source: "d0", target: "d5" },
    { source: "d1", target: "d6" },
    { source: "d2", target: "d7" },
    { source: "d2", target: "d8" },
    { source: "d2", target: "d9" },
    { source: "d0", target: "d10" },
    { source: "d0", target: "d11" },
    { source: "d2", target: "d12" },
    { source: "d2", target: "d13" },
    { source: "d4", target: "d14" },
    { source: "d4", target: "d15" },
    { source: "d4", target: "d16" },
  ],
};

// ... (other imports and code)

const TreeDag = () => {
  const initialData = generateCustomTreeData(5, 4);
  const [data, setData] = useState(initialData);
  const graphRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // New state for drawer open/close

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setNewLabel(node.label || "");
    setIsDrawerOpen(true); // Open the drawer when a node is clicked
  };

  const handleNewLabelChange = (event) => {
    if (graphRef.current) {
      setNewLabel(event.target.value);
    }
  };

  const handleLabelUpdate = () => {
    if (selectedNode) {
      const updatedNode = { ...selectedNode, label: newLabel };
      setSelectedNode(updatedNode);

      const updatedNodes = data.nodes.map((node) =>
        node.id === selectedNode.id ? updatedNode : node
      );

      // Update links corresponding to the updated node
      const updatedLinks = data.links.map((link) => {
        if (link.source.id === selectedNode.id) {
          return { ...link, source: updatedNode };
        } else if (link.target.id === selectedNode.id) {
          return { ...link, target: updatedNode };
        } else {
          return link;
        }
      });

      const updatedData = {
        nodes: updatedNodes,
        links: updatedLinks,
      };

      setData(updatedData);
      console.log({ updatedNodes });
      console.log({ updatedLinks });

      setIsDrawerOpen(false); // Close the drawer after updating
    }
  };

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force(
        "collision",
        d3.forceCollide((node) => Math.sqrt(100 / (node.level + 1)))
      );
    }
  }, []);

  const [newColor, setNewColor] = useState(""); // New state for the color input

  const handleNewColorChange = (event) => {
    setNewColor(event.target.value);
  };

  const handleColorUpdate = () => {
    if (selectedNode && newColor) {
      const updatedNode = { ...selectedNode, color: newColor };
      setSelectedNode(updatedNode);

      const updatedNodes = data.nodes.map((node) =>
        node.id === selectedNode.id ? updatedNode : node
      );

      const updatedLinks = data.links.map((link) => {
        if (link.source.id === selectedNode.id) {
          return { ...link, source: updatedNode };
        } else if (link.target.id === selectedNode.id) {
          return { ...link, target: updatedNode };
        } else {
          return link;
        }
      });


      const updatedData = {
        nodes: updatedNodes,
        links: updatedLinks,
      };

      setData(updatedData);
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        dagMode="td"
        dagLevelDistance={300}
        backgroundColor="#101020"
        linkColor={() => "rgba(255,255,255,0.2)"}
        nodeRelSize={1}
        nodeId="path"
        nodeVal={(node) => 100 / (node.level + 1)}
        nodeAutoColorBy="path"
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        d3VelocityDecay={0.3}
        nodeLabel="label"
        onNodeClick={handleNodeClick}
      />
      <Drawer
        title="Node Data"
        placement="right"
        width={400}
        onClose={() => setIsDrawerOpen(false)} // Close the drawer
        visible={isDrawerOpen} // Controlled by isDrawerOpen state
      >
        {selectedNode && (
          <div>
            <pre>{JSON.stringify(selectedNode, null, 2)}</pre>
            <input
              type="text"
              value={newLabel}
              onChange={handleNewLabelChange}
              placeholder="Enter new label"
            />
            <button onClick={handleLabelUpdate}>Update Label</button>

            <input
              type="color"
              value={newColor}
              onChange={handleNewColorChange}
              placeholder="Enter new color"
            />
            <button onClick={handleColorUpdate}>Update Color</button>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default TreeDag;
