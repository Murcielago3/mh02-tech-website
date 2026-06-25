/**
 * MH02 monogram - a precise, engineered bracket mark.
 * Two angled brackets enclosing a vertical bar, drawn on a baseline grid.
 */
const Logo = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6 6 L2 16 L6 26"
      stroke="var(--green-bright)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 6 L30 16 L26 26"
      stroke="var(--green-bright)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22 L12 10 L16 16 L20 10 L20 22"
      stroke="var(--green)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
