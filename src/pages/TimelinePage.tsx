import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { Timeline } from 'vis-timeline/standalone';

interface TimelineItem {
  id: number;
  content: string;
  start: string;
}

const TimelinePage: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInstance = useRef<Timeline | null>(null);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const items = new DataSet<TimelineItem>([
      { id: 1, content: 'Start', start: '2025-06-01' },
      { id: 2, content: 'Milestone 1', start: '2025-06-10' },
      { id: 3, content: 'Milestone 2', start: '2025-06-16' },
      { id: 4, content: 'Completed', start: '2025-09-10' },
    ]);

    timelineInstance.current = new Timeline(container, items, {
      width: '100%',
      height: '400px',
      margin: { item: 20 },
    });

    return () => {
      timelineInstance.current?.destroy();
      timelineInstance.current = null;
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',  // full viewport height
        width: '100%',
      }}
    >
      <div
        ref={timelineRef}
        style={{
          width: '95%',     // For expand horizontally
          height: '500px',  // For making taller for better visibility
        }}
      />
    </div>
  );
};

export default TimelinePage;