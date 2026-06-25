import { useRef, useEffect } from 'react';

/**
 * LetterGlitch - a grid of monospace glyphs that randomly flicker between
 * characters and accent colors (ReactBits-inspired). Canvas-based.
 */
const LetterGlitch = ({
  glyphColors = ['#cfe0d6', '#a7cdb6', '#5aa97c', '#2f8a54'],
  fontSize = 16,
  glitchSpeed = 60,
  className = '',
  style,
  vignette = true,
}) => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const lettersRef = useRef([]);
  const gridRef = useRef({ cols: 0, rows: 0 });
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/\\=+*#%@'.split('');
  const rand = (arr) => arr[(Math.random() * arr.length) | 0];

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext('2d');

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const charW = fontSize * 0.62;
      const charH = fontSize * 1.1;
      const cols = Math.ceil(width / charW);
      const rows = Math.ceil(height / charH);
      gridRef.current = { cols, rows, charW, charH };
      lettersRef.current = Array.from({ length: cols * rows }, () => ({
        char: rand(CHARS),
        color: rand(glyphColors),
      }));
    };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(wrap);

    const draw = (now) => {
      if (now - lastRef.current > glitchSpeed) {
        lastRef.current = now;
        const letters = lettersRef.current;
        const updates = Math.max(1, (letters.length * 0.06) | 0);
        for (let i = 0; i < updates; i++) {
          const idx = (Math.random() * letters.length) | 0;
          letters[idx] = { char: rand(CHARS), color: rand(glyphColors) };
        }
      }
      const { cols, charW, charH } = gridRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';
      lettersRef.current.forEach((l, i) => {
        const x = (i % cols) * charW;
        const y = ((i / cols) | 0) * charH;
        ctx.fillStyle = l.color;
        ctx.fillText(l.char, x, y);
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontSize, glitchSpeed]);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      {vignette && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.92) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default LetterGlitch;
