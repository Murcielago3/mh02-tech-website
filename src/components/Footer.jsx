import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import TechLogo from '../assets/Tech Logo.png';
import './Footer.css';

const YEAR = new Date().getFullYear();

const Footer = () => {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setFooterHeight(entries[0].contentRect.height);
    });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div style={{ height: footerHeight, flexShrink: 0, position: 'relative', zIndex: 0 }} aria-hidden="true" />
      <footer className="foot" ref={footerRef}>
        <div className="foot__inner">
          {/* Left: identity block */}
          <div className="foot__ident">
            <div className="foot__mark" aria-hidden="true" style={{ width: '42px', height: '42px', display: 'flex' }}>
              <img src={TechLogo} alt="MH02 Dashboard" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="foot__ident-body">
              <span className="foot__ident-name">MH02 DASHBOARD</span>
            </div>
          </div>

          {/* Middle: giant editorial CTA */}
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20demo&body=Hi%20there%2C%0A%0AI%20would%20like%20to%20get%20a%20demo%20of%20the%20MH02%20Dashboard.%20Please%20let%20me%20know%20what%20the%20next%20steps%20are%20to%20set%20this%20up.%0A%0AThanks!" className="foot__cta" target="_blank" rel="noopener noreferrer">
            <span className="foot__cta-lead mono">→ TALK TO US</span>
            <span className="foot__cta-line">
              hello.tech@studiomh02.com
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
                <path d="M8 21h26M23 10l11 11-11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>

          {/* Right: navigation columns + meta */}
          <div className="foot__grid">
            <div className="foot__col">
              <span className="foot__col-h mono">· PRODUCT</span>
              <a href="/#platform">Platform</a>
              <a href="/#tour">Live tour</a>
              <Link to="/product">Deep dive</Link>
            </div>
            <div className="foot__col">
              <span className="foot__col-h mono">· SALES</span>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20demo&body=Hi%20there%2C%0A%0AI%20would%20like%20to%20get%20a%20demo%20of%20the%20MH02%20Dashboard.%20Please%20let%20me%20know%20what%20the%20next%20steps%20are%20to%20set%20this%20up.%0A%0AThanks!" target="_blank" rel="noopener noreferrer">Book a demo</a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20pricing" target="_blank" rel="noopener noreferrer">Pricing enquiry</a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20support" target="_blank" rel="noopener noreferrer">Support</a>
            </div>
            <div className="foot__col">
              <span className="foot__col-h mono">· COMPANY</span>
              <span>Built by STUDIOMH02</span>
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
    </>
  );
};

export default Footer;
