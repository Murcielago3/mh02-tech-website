import { useEffect, useRef, useState } from 'react';

/**
 * CountUp - animates a number from `from` to `to` when scrolled into view
 * (ReactBits-inspired).
 */
const CountUp = ({
  to,
  from = 0,
  duration = 1.8,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
}) => {
  const [value, setValue] = useState(from);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setValue(from + (to - from) * eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [to, from, duration]);

  const formatted = (() => {
    const fixed = value.toFixed(decimals);
    const [int, dec] = fixed.split('.');
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return dec ? `${withSep}.${dec}` : withSep;
  })();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default CountUp;
