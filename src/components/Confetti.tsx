import React, { useEffect, useRef } from 'react';

type ConfettiProps = {
  duration?: number; // ms
  count?: number;
};

const Confetti: React.FC<ConfettiProps> = ({ duration = 4000, count = 120 }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const colors = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#5ac8fa', '#5856d6', '#ff2d55'];

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; color: string; rot: number; vr: number };

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI - Math.PI / 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: w / 2 + (Math.random() - 0.5) * 200,
        y: h / 3 + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed - (Math.random() * 4 + 2),
        size: 6 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
      });
    }

    let raf = 0;
    let start = performance.now();

    function resize() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);

    function update(dt: number) {
      for (const p of particles) {
        p.vy += 0.06 * dt; // gravity scaled by dt
        p.x += p.vx * dt * 0.6;
        p.y += p.vy * dt * 0.6;
        p.rot += p.vr * dt;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    }

    let last = performance.now();
    function loop(now: number) {
      const elapsed = now - start;
      const dt = Math.min(1 / 30, (now - last) / 16.6667); // normalized step
      last = now;
      update(dt);
      draw();
      if (elapsed < duration + 8000) {
        raf = requestAnimationFrame(loop);
      }
    }

    raf = requestAnimationFrame(loop);

    const stopTimeout = setTimeout(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      // fade out canvas by clearing
      ctx.clearRect(0, 0, w, h);
    }, duration + 1000);

    return () => {
      clearTimeout(stopTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [duration, count]);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}
    />
  );
};

export default Confetti;
