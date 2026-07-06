import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './Loader.css';

const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+*<>';
const TARGET = 'MH02/DASHBOARD';
const DURATION = 1900;    // total loader time
const COUNT_DUR = 1600;   // counter animation

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Schematic loader - corner brackets, decrypted brand, counter, shutter exit.
 * A single clean pass in ~2s, then unmounts.
 */
const Loader = ({ onComplete }) => {
  const [display, setDisplay] = useState('______________');
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onComplete);

  useEffect(() => { doneRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    let alive = true;

    const scramble = async () => {
      const chars = TARGET.split('');
      const revealed = new Array(chars.length).fill(false);
      const per = 900 / chars.length;   // when each locks in
      const start = performance.now();

      const tick = () => {
        if (!alive) return;
        const t = performance.now() - start;
        const idx = Math.floor(t / per);
        for (let i = 0; i < chars.length && i <= idx; i++) revealed[i] = true;

        const out = chars.map((c, i) => {
          if (c === '/') return '/';
          if (revealed[i]) return c;
          return SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
        }).join('');
        setDisplay(out);

        if (t < 950) requestAnimationFrame(tick);
        else setDisplay(TARGET);
      };
      requestAnimationFrame(tick);
    };

    const counter = () => {
      const start = performance.now();
      const tick = () => {
        if (!alive) return;
        const t = Math.min((performance.now() - start) / COUNT_DUR, 1);
        const eased = 1 - Math.pow(1 - t, 2);
        setCount(Math.floor(eased * 100));
        if (t < 1) requestAnimationFrame(tick);
        else setCount(100);
      };
      requestAnimationFrame(tick);
    };

    const run = async () => {
      await wait(120);
      scramble();
      counter();
      await wait(DURATION);
      if (!alive) return;
      setExiting(true);
      await wait(760);
      if (!alive) return;
      setGone(true);
      doneRef.current?.();
    };

    run();
    return () => { alive = false; };
  }, []);

  if (gone) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Top-left coordinate tag */}
        <motion.span
          className="loader__coord loader__coord--tl mono"
          initial={{ opacity: 0, x: -12, y: -12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
        </motion.span>
        <motion.span
          className="loader__coord loader__coord--tr mono"
          initial={{ opacity: 0, x: 12, y: -12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
        </motion.span>
        <motion.span
          className="loader__coord loader__coord--bl mono"
          initial={{ opacity: 0, x: -12, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
        </motion.span>
        <motion.span
          className="loader__coord loader__coord--br mono"
          initial={{ opacity: 0, x: 12, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
        </motion.span>

        {/* Center block */}
        <motion.div
          className="loader__center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="loader__brackets" aria-hidden="true">
            <span className="loader__bracket loader__bracket--l">[</span>
            <span className="loader__brand">{display}</span>
            <span className="loader__bracket loader__bracket--r">]</span>
          </div>

          <div className="loader__meter" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`loader__seg ${count >= ((i + 1) / 24) * 100 ? 'loader__seg--on' : ''}`}
              />
            ))}
          </div>

          <div className="loader__status mono">
            <span>→ INITIALIZING PLATFORM</span>
            <span className="loader__count">[ {String(count).padStart(3, '0')} / 100 ]</span>
          </div>
        </motion.div>

        {/* Shutter - two panels close from top and bottom on exit */}
        <motion.div
          className="loader__shutter loader__shutter--top"
          initial={{ y: '-101%' }}
          animate={exiting ? { y: 0 } : { y: '-101%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="loader__shutter loader__shutter--bot"
          initial={{ y: '101%' }}
          animate={exiting ? { y: 0 } : { y: '101%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
