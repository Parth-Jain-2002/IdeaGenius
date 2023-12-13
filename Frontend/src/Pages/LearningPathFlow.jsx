import React from 'react';
import ReactFlow, { Controls } from 'reactflow';

const LearningPathFlow = () => {
  const elements = [
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 100, y: 50 } },
    { id: '2', data: { label: 'Step 1' }, position: { x: 250, y: 50 } },
    { id: '3', data: { label: 'Step 2' }, position: { x: 250, y: 150 } },
    { id: '4', data: { label: 'Step 3' }, position: { x: 250, y: 250 } },
    { id: '5', type: 'output', data: { label: 'End' }, position: { x: 450, y: 150 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
  ];

  return (
    <div style={{ height: '500px', border: '1px solid #ddd', position: 'relative' }}>
      <ReactFlow elements={elements} snapToGrid={true} snapGrid={[15, 15]} nodesDraggable={false}>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default LearningPathFlow;
