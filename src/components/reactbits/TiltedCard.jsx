import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * TiltedCard - 3D tilt toward the cursor with a moving glare (ReactBits-inspired).
 */
const TiltedCard = ({ children, max = 12, className = '', glare = true, ...rest }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const glareBg = useTransform([gx, gy], ([x, y]) =>
    `radial-gradient(circle at ${x}% ${y}%, rgba(122,240,176,0.12), transparent 55%)`
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', transformPerspective: 900, position: 'relative' }}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: glareBg,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltedCard;
