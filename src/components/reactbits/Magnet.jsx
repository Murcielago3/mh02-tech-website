import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Magnet - pulls its children toward the cursor within a radius (ReactBits-inspired).
 */
const Magnet = ({ children, padding = 80, strength = 0.4, className = '', ...rest }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    if (Math.hypot(dx, dy) < Math.max(rect.width, rect.height) / 2 + padding) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;
