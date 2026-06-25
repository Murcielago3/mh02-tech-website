import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import Magnet from './reactbits/Magnet.jsx';
import './Navbar.css';

const LINKS = [
  { label: 'Capabilities', to: '/#capabilities' },
  { label: 'Process', to: '/#process' },
  { label: 'Product', to: '/product' },
  { label: 'Stack', to: '/#stack' },
];

const Navbar = ({ show = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      initial={{ opacity: 0, y: -12 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label="STUDIOMH02 Tech home">
          <Logo size={26} />
          <span className="nav__brand-text">
            STUDIO<span className="nav__brand-accent">MH02</span>
            <span className="nav__brand-div">/</span>
            <span className="nav__brand-tech">Tech</span>
          </span>
        </Link>

        <nav className="nav__links">
          {LINKS.map((l) =>
            l.to.startsWith('/#') ? (
              <a key={l.label} href={l.to} className="nav__link" onClick={(e) => handleAnchor(e, l.to)}>
                {l.label}
              </a>
            ) : (
              <Link key={l.label} to={l.to} className="nav__link">
                {l.label}
              </Link>
            )
          )}
        </nav>

        <Magnet padding={40} strength={0.35}>
          <a href="/#contact" className="nav__cta" onClick={(e) => handleAnchor(e, '/#contact')}>
            <span className="nav__cta-dot" />
            Start a project
          </a>
        </Magnet>
      </div>
    </motion.header>
  );
};

export default Navbar;
