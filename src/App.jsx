import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ClickSpark from './components/reactbits/ClickSpark.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import './App.css';

import { ReactLenis } from 'lenis/react';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const seen =
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('mh02-intro') === '1';

  const [loaded, setLoaded] = useState(seen || !isHome);
  const playLoader = isHome && !seen;

  useEffect(() => {
    if (!location.hash) {
      try { window.scrollTo({ top: 0, behavior: 'instant' }); }
      catch { window.scrollTo(0, 0); }
    }
  }, [location.pathname]);

  const handleComplete = () => {
    try { sessionStorage.setItem('mh02-intro', '1'); } catch { /* ignore */ }
    setLoaded(true);
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <ClickSpark sparkColor="#2f8a54" sparkCount={8} sparkRadius={20}>
        {playLoader && <Loader onComplete={handleComplete} />}
        <Navbar show={loaded} />
        <Routes>
          <Route path="/" element={<Home introDone={loaded} />} />
          <Route path="/product" element={<Product />} />
        </Routes>
        <Footer />
      </ClickSpark>
    </ReactLenis>
  );
}

export default App;
