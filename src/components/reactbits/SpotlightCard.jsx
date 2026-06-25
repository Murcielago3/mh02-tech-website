import { useRef } from 'react';
import './reactbits.css';

/**
 * SpotlightCard - radial spotlight that tracks the cursor (ReactBits-inspired).
 */
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(47,138,84,0.25)', ...rest }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spot-opacity', '1');
  };
  const handleLeave = () => {
    ref.current?.style.setProperty('--spot-opacity', '0');
  };

  return (
    <div
      ref={ref}
      className={`rb-spotlight-card ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ '--spot-color': spotlightColor }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
