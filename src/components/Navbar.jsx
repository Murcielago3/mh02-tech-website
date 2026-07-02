import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TechLogo from '../assets/Tech Logo.png';
import './Navbar.css';

const LINKS = [
  { label: 'Platform', to: '/#platform' },
  { label: 'Live tour', to: '/#tour' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Deep dive', to: '/product' },
];

const Navbar = ({ show = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowCta(window.scrollY > window.innerHeight * 0.85);
    };
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
        <Link to="/" className="nav__brand" onClick={(e) => {
          if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          <img src={TechLogo} alt="MH02 Dashboard" className="nav__logo-img" />
        </Link>

        <span className="nav__rule" aria-hidden="true" />

        <nav className="nav__links" onMouseLeave={() => setHoveredIndex(null)}>
          {LINKS.map((l, index) => {
            const isActive = location.hash ? `/${location.hash}` === l.to : (location.pathname === l.to);
            const isHovered = hoveredIndex === index;
            return (
              <div 
                key={l.label} 
                className="nav__link-wrapper"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="nav__hover-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {l.to.startsWith('/#') ? (
                  <a href={l.to} className={`nav__link ${isActive ? 'nav__link--active' : ''}`} onClick={(e) => handleAnchor(e, l.to)}>
                    <span>{l.label}</span>
                  </a>
                ) : (
                  <Link to={l.to} className={`nav__link ${isActive ? 'nav__link--active' : ''}`}>
                    <span>{l.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <AnimatePresence>
          {showCta && (
            <motion.a 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20demo&body=Hi%20there%2C%0A%0AI%20would%20like%20to%20get%20a%20demo%20of%20the%20MH02%20Dashboard.%20Please%20let%20me%20know%20what%20the%20next%20steps%20are%20to%20set%20this%20up.%0A%0AThanks!" 
              target="_blank" rel="noopener noreferrer"
              className="nav__cta"
            >
              <span className="nav__cta-dot" />
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
