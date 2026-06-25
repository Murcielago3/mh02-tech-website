import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}-=+*^?#________01';

/**
 * DecryptedText - scrambles characters then resolves to the target text
 * (ReactBits-inspired). Triggers when scrolled into view, optionally re-runs on hover.
 */
const DecryptedText = ({
  text,
  speed = 120,
  revealDelay = 1,
  className = '',
  as: Tag = 'span',
  startOnView = true,
  hoverReveal = false,
}) => {
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);
  const frame = useRef(0);
  const intervalRef = useRef(null);

  const run = () => {
    clearInterval(intervalRef.current);
    frame.current = 0;
    const len = text.length;
    intervalRef.current = setInterval(() => {
      const revealed = Math.floor(frame.current / revealDelay);
      let out = '';
      for (let i = 0; i < len; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        if (i < revealed) out += text[i];
        else out += CHARS[(Math.random() * CHARS.length) | 0];
      }
      setDisplay(out);
      frame.current += 1;
      if (revealed >= len) {
        clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, Math.max(8, 1000 / speed));
  };

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (el) io.observe(el);
    return () => { io.disconnect(); clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={hoverReveal ? run : undefined}
      style={{ fontVariantLigatures: 'none' }}
    >
      {display}
    </Tag>
  );
};

export default DecryptedText;
