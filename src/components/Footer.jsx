import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <Logo size={30} />
            <span className="footer__brand-text">
              STUDIO<span>MH02</span> <i>/ Tech</i>
            </span>
          </div>
          <p className="footer__tagline">
            Software engineered with precision and proof.<br />
            Web platforms · internal tools · secure systems.
          </p>
          <div className="footer__status mono">
            <span className="footer__status-dot" /> ALL SYSTEMS OPERATIONAL
          </div>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <span className="footer__col-h mono">Studio</span>
            <a href="/#capabilities">Capabilities</a>
            <a href="/#process">Process</a>
            <a href="/#stack">Stack</a>
          </div>
          <div className="footer__col">
            <span className="footer__col-h mono">Work</span>
            <Link to="/product">MH02 Dashboard</Link>
            <a href="/#contact">Start a project</a>
          </div>
          <div className="footer__col">
            <span className="footer__col-h mono">Contact</span>
            <a href="mailto:xyz@studiomh02.com">xyz@studiomh02.com</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <span className="mono">© {new Date().getFullYear()} STUDIOMH02 TECH</span>
        <span className="mono footer__coords">28.6139° N - 77.2090° E · IST</span>
      </div>
    </footer>
  );
}
