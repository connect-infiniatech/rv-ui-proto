import React from 'react';
import ReactFlow, { MiniMap, Controls, type Node, type Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import './dagpage.css';

// Generate 100 square nodes with proper spacing
const nodes: Node[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  data: { label: `Node ${i + 1}` },
  position: {
    x: (i % 10) * 150,            // 10 nodes per row, spaced 150px apart horizontally
    y: Math.floor(i / 10) * 150,  // 150px vertical spacing
  },
  className: 'custom-node',        // Custom CSS class for node style
}));

// Connect node i → i+1 with animated edges
const edges: Edge[] = Array.from({ length: 99 }, (_, i) => ({
  id: `e${i + 1}-${i + 2}`,
  source: `${i + 1}`,
  target: `${i + 2}`,
  animated: true,
}));

const DAGPage: React.FC = () => (
  <div className="dag-container">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      proOptions={{ hideAttribution: true }} // hides watermark
    >
      <MiniMap className="custom-minimap" />
      <Controls />
    </ReactFlow>
  </div>
);

export default DAGPage;