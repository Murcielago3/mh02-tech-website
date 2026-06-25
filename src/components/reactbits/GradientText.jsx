import './reactbits.css';

/**
 * GradientText - animated gradient fill text (ReactBits-inspired).
 */
const GradientText = ({
  children,
  colors = ['#2f8a54', '#5fd99a', '#287457', '#7af0b0', '#2f8a54'],
  speed = 6,
  className = '',
  as: Tag = 'span',
}) => (
  <Tag
    className={`rb-gradient-text ${className}`}
    style={{
      backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
      animationDuration: `${speed}s`,
    }}
  >
    {children}
  </Tag>
);

export default GradientText;
