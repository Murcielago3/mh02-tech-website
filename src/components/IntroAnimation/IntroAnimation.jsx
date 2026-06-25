import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import '@fontsource/stack-sans-notch/700.css';
import './IntroAnimation.css';

const TEXT = 'STUDIOMH02  Tech  ';
const LETTERS = Array.from(TEXT);
const N = LETTERS.length;
const RADIUS = 120;
const NAVBAR_HEIGHT = 68;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const IntroAnimation = ({ onReveal, onComplete }) => {
  const letterControls = useAnimation();
  const spinControls = useAnimation();
  const positionControls = useAnimation();
  const fillControls = useAnimation();
  const whiteBgControls = useAnimation();

  const [fillAnchor, setFillAnchor] = useState('bottom');

  // Use a ref to store the latest onComplete callback without causing re-runs
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      // Position the circle container at the dead center of the screen
      positionControls.set({ x: W / 2, y: H / 2, scale: 1 });
      if (!active) return;

      // ═══════════════════════════════════════════════════════════
      // ═══════════════════════════════════════════════════════════
      // PHASE 1 & 2: Letters fly in at constant speed, then spin seamlessly
      // ═══════════════════════════════════════════════════════════
      const delta_s = (2 * Math.PI * RADIUS) / N;
      const s_end = 0;
      
      // Start the text exactly so the leading letter is just about to hit the circle.
      // This minimizes the 'dead' travel time and makes it rip onto the screen.
      const s_start = -(N * delta_s) - 50; 

      // Calculate mathematically perfect constant velocity timing
      // To make the entry truly fast while matching speed, the spin must be fast!
      const SPIN_DURATION = 0.7; // extremely punchy and fast rotation
      const circleCircumference = 2 * Math.PI * RADIUS;
      const pixelsPerSecond = circleCircumference / SPIN_DURATION;
      const D = Math.abs(s_end - s_start);
      const ENTRY_DURATION = D / pixelsPerSecond;

      // Start letter approach (Phase 1)
      letterControls.start((i) => {
        const keyframes = 100;
        const xArr = [];
        const yArr = [];
        const rArr = [];
        const oArr = [];
        
        for (let k = 0; k <= keyframes; k++) {
          // STRICTLY LINEAR: Constant speed, no deceleration
          let p = k / keyframes;
          
          const s_head = s_start * (1 - p) + s_end * p;
          const s_i = s_head + i * delta_s;
          
          if (s_i < 0) {
            // Still on the straight horizontal line tangent to the top
            xArr.push(s_i);
            yArr.push(-RADIUS);
            rArr.push(0);
          } else {
            // Curled onto the circle
            const theta = s_i / RADIUS;
            xArr.push(RADIUS * Math.sin(theta));
            yArr.push(-RADIUS * Math.cos(theta));
            rArr.push(theta * (180 / Math.PI));
          }
          
          // Fade in over the first 10% of the movement
          oArr.push(p < 0.1 ? p / 0.1 : 1);
        }

        return {
          x: xArr,
          y: yArr,
          rotate: rArr,
          opacity: oArr,
          transition: {
            duration: ENTRY_DURATION,
            ease: "linear", // mathematically pure constant velocity
          },
        };
      });

      // Schedule parent spin (Phase 2) to start exactly when Phase 1 ends.
      // Because velocities match mathematically, the transition is invisible.
      spinControls.start({
        rotate: [0, 360],
        transition: {
          delay: ENTRY_DURATION, // starts the exact millisecond letters reach the circle
          duration: SPIN_DURATION,
          ease: 'linear',
          repeat: Infinity,
        },
      });

      // Wait for Phase 1 to finish, plus 1 second of spinning before green fill
      await wait(ENTRY_DURATION * 1000 + 1000); 
      if (!active) return;

      // ═══════════════════════════════════════════════════════════
      // PHASE 3: Green (#287457) fills from bottom + text turns white
      // ═══════════════════════════════════════════════════════════
      letterControls.start({
        color: '#ffffff',
        transition: { duration: 1.0, ease: 'easeInOut' },
      });

      setFillAnchor('bottom');
      await fillControls.start({
        height: H,
        transition: {
          duration: 1.0,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      await wait(100);
      if (!active) return;

      // ═══════════════════════════════════════════════════════════
      // PHASE 4: EXPLODE! Letters shoot outwards radially 
      // while the green background contracts to the top navbar.
      // ═══════════════════════════════════════════════════════════
      setFillAnchor('top');
      await wait(30); // let React re-render the anchor switch
      if (!active) return;

      // Trigger the reveal of the underlying app content
      onReveal?.();

      const explodeDist = 1800; // Far enough to go off-screen

      await Promise.all([
        // Fade out the solid white background to reveal the app
        whiteBgControls.start({
          opacity: 0,
          transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
        // Green contracts from full-screen to navbar height
        fillControls.start({
          height: NAVBAR_HEIGHT,
          transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
        // Letters explode radially outwards from their exact circle angle
        letterControls.start((i) => {
          const theta = i * (2 * Math.PI / N);
          return {
            x: (RADIUS + explodeDist) * Math.sin(theta),
            y: -(RADIUS + explodeDist) * Math.cos(theta),
            opacity: 0,
            scale: 2, // Slightly scale up as they fly towards camera/out
            transition: {
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1], // Expo ease out
            },
          };
        }),
      ]);

      // Fade the green bar away to reveal the real (dark glass) navbar underneath
      await fillControls.start({
        opacity: 0,
        transition: { duration: 0.45, ease: 'easeOut' },
      });

      await wait(120);
      if (active) onCompleteRef.current?.();
    };

    run();

    // Cleanup: cancel all animations on unmount (React StrictMode compatibility)
    return () => {
      active = false;
      letterControls.stop();
      spinControls.stop();
      positionControls.stop();
      fillControls.stop();
      whiteBgControls.stop();
    };
  }, [letterControls, spinControls, positionControls, fillControls, whiteBgControls]);

  return (
    <>
      {/* ── Solid white background to hide the app initially ── */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#ffffff',
          zIndex: 899,
        }}
        initial={{ opacity: 1 }}
        animate={whiteBgControls}
      />

      {/* ── Green overlay: fills from bottom, then contracts to navbar ── */}
      <motion.div
        className="green-fill-overlay"
        style={{
          ...(fillAnchor === 'bottom'
            ? { bottom: 0, top: 'auto' }
            : { top: 0, bottom: 'auto' }),
        }}
        initial={{ height: 0 }}
        animate={fillControls}
      />

      {/* ── Circle position wrapper (stays centered) ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1001,
          width: 0,
          height: 0,
        }}
        animate={positionControls}
      >
        {/* ── Spin wrapper (continuous rotation) ── */}
        <motion.div
          style={{ position: 'relative', width: 0, height: 0 }}
          animate={spinControls}
        >
          {/* ── Individual letters ── */}
          {LETTERS.map((letter, i) => (
            <motion.div
              key={i}
              custom={i}
              className="anim-letter-wrapper"
              animate={letterControls}
              initial={{
                x: -2000,
                y: -RADIUS,
                rotate: 0,
                opacity: 0,
                color: '#287547',
              }}
            >
              <span className="anim-letter">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default IntroAnimation;
