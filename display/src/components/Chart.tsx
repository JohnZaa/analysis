// src/components/Chart.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Chart: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', 800)
      .attr('height', 400);

    // 添加你的 D3 代码
  }, []);

  return <svg ref={ref}></svg>;
};

export default Chart;