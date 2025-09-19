import React from 'react';
import ReactFlow, { MiniMap, Controls, type Node, type Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import './dagpage.css';

// Generate 1000 square nodes with better spacing to prevent overlap
const nodes: Node[] = Array.from({ length: 1000 }, (_, i) => ({
  id: `${i + 1}`,
  data: { label: `Node ${i + 1}` },
  position: {
    x: (i % 40) * 130,             // wider horizontal spacing
    y: Math.floor(i / 40) * 130,   // taller vertical spacing
  },
  className: 'custom-node',        // CSS class for styling
}));

// Connect node i to i+1 with animated edges
const edges: Edge[] = Array.from({ length: 999 }, (_, i) => ({
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
      proOptions={{ hideAttribution: true }} // hides “React Flow” watermark
    >
      <MiniMap className="custom-minimap" />
      <Controls />
    </ReactFlow>
  </div>
);

export default DAGPage;