import { useRef, useEffect, useCallback } from 'react';

/**
 * DotGrid - interactive precision grid (ReactBits-inspired).
 * Dots are pushed away from the cursor and spring back with inertia.
 * Canvas-based, no external animation deps.
 */
const DotGrid = ({
  dotSize = 2,
  gap = 30,
  baseColor = '#d3ddd7',
  activeColor = '#2f8a54',
  proximity = 130,
  shockRadius = 220,
  shockStrength = 4,
  returnSpeed = 0.12,
  className = '',
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointer = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 });
  const rafRef = useRef(0);

  const hexToRgb = (hex) => {
    const m = hex.replace('#', '');
    const n = parseInt(m.length === 3 ? m.split('').map((c) => c + c).join('') : m, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  };
  const base = hexToRgb(baseColor);
  const active = hexToRgb(activeColor);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.floor((width + gap) / gap);
    const rows = Math.floor((height + gap) / gap);
    const startX = (width - (cols - 1) * gap) / 2;
    const startY = (height - (rows - 1) * gap) / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const ox = startX + x * gap;
        const oy = startY + y * gap;
        dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
  }, [gap]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const prox2 = proximity * proximity;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const p = pointer.current;
      for (const d of dotsRef.current) {
        // spring back to origin
        d.vx += (d.ox - d.x) * returnSpeed;
        d.vy += (d.oy - d.y) * returnSpeed;
        d.vx *= 0.78;
        d.vy *= 0.78;

        const dx = d.x - p.x;
        const dy = d.y - p.y;
        const dist2 = dx * dx + dy * dy;
        let glow = 0;
        if (dist2 < prox2) {
          const dist = Math.sqrt(dist2) || 1;
          glow = 1 - dist / proximity;
          const force = glow * 2.2;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }
        d.x += d.vx;
        d.y += d.vy;

        const r = base.r + (active.r - base.r) * glow;
        const g = base.g + (active.g - base.g) * glow;
        const b = base.b + (active.b - base.b) * glow;
        const size = dotSize + glow * dotSize * 1.6;
        ctx.beginPath();
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [proximity, returnSpeed, dotSize, base.r, base.g, base.b, active.r, active.g, active.b]);

  const onMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    pointer.current.x = e.clientX - rect.left;
    pointer.current.y = e.clientY - rect.top;
  };
  const onLeave = () => {
    pointer.current.x = -9999;
    pointer.current.y = -9999;
  };
  const onClick = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    for (const d of dotsRef.current) {
      const dx = d.x - cx;
      const dy = d.y - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < shockRadius) {
        const f = (1 - dist / shockRadius) * shockStrength;
        const ang = Math.atan2(dy, dx);
        d.vx += Math.cos(ang) * f * 6;
        d.vy += Math.sin(ang) * f * 6;
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: 'absolute', inset: 0, ...style }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onClick}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default DotGrid;
