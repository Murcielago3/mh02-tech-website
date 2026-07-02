import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const LINKS = [
  { label: 'Work', to: '/#work', },
  { label: 'Product', to: '/product', },
  { label: 'Approach', to: '/#approach', },
  { label: 'Contact', to: '/#contact', },
];

const Navbar = ({ show = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchor = (e, to) => {
    if (!to.startsWith('/#')) return;
    e.preventDefault();
    const id = to.slice(2);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ opacity: 0, y: -14 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          <span className="nav__mark" aria-hidden="true">◪</span>
          <span className="nav__wordmark">
            STUDIO<span>MH02</span>
          </span>
        </Link>

        <span className="nav__rule" aria-hidden="true" />

        <nav className="nav__links">
          {LINKS.map((l) =>
            l.to.startsWith('/#') ? (
              <a key={l.label} href={l.to} className="nav__link" onClick={(e) => handleAnchor(e, l.to)}>
                <i className="nav__link-n">{l.n}</i>
                <span>{l.label}</span>
              </a>
            ) : (
              <Link key={l.label} to={l.to} className="nav__link">
                <i className="nav__link-n">{l.n}</i>
                <span>{l.label}</span>
              </Link>
            )
          )}
        </nav>

        <a href="mailto:xyz@studiomh02.com" className="nav__cta">
          <span className="nav__cta-dot" />
          Book a call
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.header>
  );
};

export default Navbar;
