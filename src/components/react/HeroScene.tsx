import { useEffect, useRef, useState } from 'react';

/**
 * Animated background for the hero section.
 * Floating gradient orbs + mouse-reactive glow.
 */
export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener('mousemove', onMouse);

    // Orb configuration
    const orbs = [
      { x: 0.2, y: 0.3, r: 200, color: [168, 85, 247], speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.6, r: 160, color: [6, 182, 212], speed: 0.0004, phase: 2 },
      { x: 0.5, y: 0.2, r: 140, color: [244, 114, 182], speed: 0.00035, phase: 4 },
      { x: 0.8, y: 0.3, r: 120, color: [129, 140, 248], speed: 0.00025, phase: 1 },
    ];

    let startTime = performance.now();

    const draw = (time: number) => {
      const elapsed = time - startTime;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw floating orbs
      for (const orb of orbs) {
        const ox = orb.x * w + Math.sin(elapsed * orb.speed + orb.phase) * 60;
        const oy = orb.y * h + Math.cos(elapsed * orb.speed * 0.8 + orb.phase) * 40;
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color.join(',')}, 0.08)`);
        gradient.addColorStop(1, `rgba(${orb.color.join(',')}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(ox - orb.r, oy - orb.r, orb.r * 2, orb.r * 2);
      }

      // Mouse-following glow
      const mx = mouseRef.current.x * w;
      const my = mouseRef.current.y * h;
      const mouseGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
      mouseGlow.addColorStop(0, 'rgba(168, 85, 247, 0.05)');
      mouseGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = mouseGlow;
      ctx.fillRect(mx - 250, my - 250, 500, 500);

      // Grid dots (very subtle)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      const gridSize = 40;
      for (let gx = 0; gx < w; gx += gridSize) {
        for (let gy = 0; gy < h; gy += gridSize) {
          // Only show dots near mouse
          const dist = Math.sqrt((gx - mx) ** 2 + (gy - my) ** 2);
          if (dist < 300) {
            const alpha = Math.max(0, 1 - dist / 300) * 0.06;
            ctx.globalAlpha = alpha;
            ctx.fillRect(gx - 1, gy - 1, 2, 2);
          }
        }
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
