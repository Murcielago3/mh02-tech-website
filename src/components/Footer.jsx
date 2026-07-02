import { Link } from 'react-router-dom';
import './Footer.css';

const YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="foot">
      <div className="foot__inner">
        {/* Left: identity block */}
        <div className="foot__ident">
          <div className="foot__mark" aria-hidden="true">◪</div>
          <div className="foot__ident-body">
            <span className="foot__ident-name">STUDIOMH02</span>
            <span className="foot__ident-sub mono">SOFTWARE FOR STUDIOS · EST. 2026</span>
          </div>
        </div>

        {/* Middle: giant editorial CTA */}
        <a href="mailto:xyz@studiomh02.com" className="foot__cta">
          <span className="foot__cta-lead mono">→ START A CONVERSATION</span>
          <span className="foot__cta-line">
            xyz@studiomh02.com
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
              <path d="M8 21h26M23 10l11 11-11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        {/* Right: navigation columns + meta */}
        <div className="foot__grid">
          <div className="foot__col">
            <span className="foot__col-h mono">01 · SITE</span>
            <a href="/#work">Work</a>
            <Link to="/product">Product</Link>
            <a href="/#approach">Approach</a>
          </div>
          <div className="foot__col">
            <span className="foot__col-h mono">02 · REACH</span>
            <a href="mailto:xyz@studiomh02.com">Email</a>
            <a href="https://cal.com" target="_blank" rel="noreferrer">Book call</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="foot__col">
            <span className="foot__col-h mono">03 · WHERE</span>
            <span>New Delhi · IST</span>
            <span>Mon–Fri · 10–19</span>
            <span className="foot__status">
              <i /> Accepting new clients
            </span>
          </div>
        </div>

        {/* Bottom rule + fine print */}
        <div className="foot__fine mono">
          <span>© {YEAR} STUDIOMH02 · ALL RIGHTS RESERVED</span>
          <span>28.6139° N — 77.2090° E</span>
        </div>
      </div>

      {/* Giant background wordmark */}
      <div className="foot__ghost" aria-hidden="true">STUDIOMH02</div>
    </footer>
  );
};

export default Footer;
