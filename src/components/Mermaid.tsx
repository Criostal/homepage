import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark', // 'dark' | 'neutral' | 'forest' | 'base'
});

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [id] = useState(() => `mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!ref.current) return;

    const render = async () => {
      const { svg } = await mermaid.render(id, chart);
      if (ref.current) {
        ref.current.innerHTML = svg;
      }
    };

    render();
  }, [chart, id]);

  return <div ref={ref} />;
}