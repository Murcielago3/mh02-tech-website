import { useEffect, useRef } from 'react';

/**
 * ClickSpark - emits a burst of sparks on every click anywhere in its area
 * (ReactBits-inspired). Renders a fixed full-viewport canvas overlay.
 */
const ClickSpark = ({
  sparkColor = '#2f8a54',
  sparkCount = 10,
  sparkSize = 7,
  sparkRadius = 24,
  duration = 420,
  children,
}) => {
  const canvasRef = useRef(null);
  const sparks = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let raf;
    const render = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter((s) => now - s.start < duration);
      for (const s of sparks.current) {
        const t = (now - s.start) / duration;
        const eased = 1 - Math.pow(1 - t, 3);
        const dist = eased * sparkRadius;
        const len = sparkSize * (1 - t);
        const x1 = s.x + Math.cos(s.angle) * dist;
        const y1 = s.y + Math.sin(s.angle) * dist;
        const x2 = s.x + Math.cos(s.angle) * (dist + len);
        const y2 = s.y + Math.sin(s.angle) * (dist + len);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1 - t;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onClick = (e) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / sparkCount,
          start: now,
        });
      }
    };
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, [sparkColor, sparkCount, sparkSize, sparkRadius, duration]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
      {children}
    </>
  );
};

export default ClickSpark;
