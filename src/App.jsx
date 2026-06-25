import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import IntroAnimation from './components/IntroAnimation/IntroAnimation.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ClickSpark from './components/reactbits/ClickSpark.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import './App.css';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Always play intro on initial load, regardless of which page they landed on
  const [isPlayingIntro, setIsPlayingIntro] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [location.pathname]);

  const handleReveal = () => {
    setIntroDone(true);
  };

  const handleComplete = () => {
    // Give IntroAnimation a moment to finish its exit transition, then unmount it
    setTimeout(() => setIsPlayingIntro(false), 500);
  };

  return (
    <ClickSpark sparkColor="#2f8a54" sparkCount={9} sparkRadius={22}>
      {isPlayingIntro && <IntroAnimation onReveal={handleReveal} onComplete={handleComplete} />}
      <Navbar show={introDone} />
      <Routes>
        <Route path="/" element={<Home introDone={introDone} />} />
        <Route path="/product" element={<Product />} />
      </Routes>
      <Footer />
    </ClickSpark>
  );
}

export default App;
