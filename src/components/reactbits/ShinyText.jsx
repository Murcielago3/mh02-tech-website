import './reactbits.css';

/**
 * ShinyText - a sheen sweeps across the text (ReactBits-inspired).
 */
const ShinyText = ({ text, speed = 4, className = '', disabled = false }) => (
  <span
    className={`rb-shiny ${disabled ? 'rb-shiny--off' : ''} ${className}`}
    style={{ animationDuration: `${speed}s` }}
  >
    {text}
  </span>
);

export default ShinyText;
