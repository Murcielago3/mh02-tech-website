import { Link } from 'react-router-dom';
import './Footer.css';

const YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="foot">
      <div className="foot__inner">
        {/* Left: identity block */}
        <div className="foot__ident">
          <div className="foot__mark" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" />
              <path d="M8 15.5v-6l4 4 4-4v6" stroke="#0d3524" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div className="foot__ident-body">
            <span className="foot__ident-name">MH02 DASHBOARD</span>
            <span className="foot__ident-sub mono">RUNS YOUR STUDIO'S OPS</span>
          </div>
        </div>

        {/* Middle: giant editorial CTA */}
        <a href="mailto:xyz@studiomh02.com?subject=MH02%20Dashboard%20demo" className="foot__cta">
          <span className="foot__cta-lead mono">→ BOOK A DEMO</span>
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
            <span className="foot__col-h mono">01 · PRODUCT</span>
            <a href="/#platform">Platform</a>
            <a href="/#tour">Live tour</a>
            <a href="/#pricing">Pricing</a>
            <Link to="/product">Deep dive</Link>
          </div>
          <div className="foot__col">
            <span className="foot__col-h mono">02 · SALES</span>
            <a href="mailto:xyz@studiomh02.com?subject=MH02%20Dashboard%20demo">Book a demo</a>
            <a href="mailto:xyz@studiomh02.com?subject=MH02%20Dashboard%20pricing">Pricing enquiry</a>
            <a href="mailto:xyz@studiomh02.com?subject=MH02%20Dashboard%20support">Support</a>
          </div>
          <div className="foot__col">
            <span className="foot__col-h mono">03 · COMPANY</span>
            <span>Built by STUDIOMH02</span>
            <span>New Delhi · IST</span>
            <span className="foot__status">
              <i /> Onboarding new teams
            </span>
          </div>
        </div>

        {/* Bottom rule + fine print */}
        <div className="foot__fine mono">
          <span>© {YEAR} STUDIOMH02 · ALL RIGHTS RESERVED</span>
          <span>MH02 DASHBOARD · V2</span>
        </div>
      </div>

      {/* Giant background wordmark */}
      <div className="foot__ghost" aria-hidden="true">MH02</div>
    </footer>
  );
};

export default Footer;
