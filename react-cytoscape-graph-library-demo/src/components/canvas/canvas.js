import React, { useEffect } from "react";


const Canvas = ({ graphData, layout }) => {
  useEffect(() => {
    const renderCytoscapeElement = () => {
      window.cy = getGraphDefaultConfig(graphData, layout, false, true);
    };

    renderCytoscapeElement();

    return () => {
      window.cy.removeAllListeners();
      window.cy.destroy();
    };
  }, [graphData, layout]);

  return <div className="graphLayout" id="cy" />;
};

export default Canvas;
