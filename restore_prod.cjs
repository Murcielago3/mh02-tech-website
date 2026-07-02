const fs = require('fs');

const prodJsx = fs.readFileSync('src/pages/Product.jsx', 'utf8');
const newProdJsx = prodJsx.replace(
  /{[\s\S]*?--------------------------- PLAYTEST ----------------------[\s\S]*?(?={<section className="section rhythm")/,
  {/* --------------------------- PLAYTEST ---------------------- */}
      <PlaytestSection />

      
).replace(
  /export default function Product\(\) {/,
  /* --- Playtest section (full AppFrame + syncing side copy) --- */
const PlaytestSection = () => {
  const [activeId, setActiveId] = useState(SCREENS[0].id);
  const active = SCREENS.find((s) => s.id === activeId) || SCREENS[0];

  return (
    <section className="section playtest" id="explore">
      <div className="wrap">
        <motion.div className="section__head" {...rise()}>
          <div className="head-strip mono">
            <span>{'¦'}</span><span>01</span><span>/</span><span>PLAY IT LIVE</span>
          </div>
          <h2 className="section-title">
            The whole app,<br />
            <em>at your fingertips.</em>
          </h2>
          <p className="section-lede">
            Click any section in the sidebar. Or press <b>PLAY TOUR</b> for a walkthrough. Hover
            any green dot on the screen to see what it does.
          </p>
        </motion.div>

        <motion.div className="playtest__grid" {...rise(0.1)}>
          <div className="playtest__copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="playtest__inner"
              >
                <span className="playtest__eyebrow mono">
                  <i /> NOW SHOWING · {active.label.toUpperCase()}
                </span>
                <h3 className="playtest__title">{active.title}</h3>
                <p className="playtest__desc">{active.caption}</p>

                <div className="playtest__meta mono">
                  <span>SCREEN · {String(SCREENS.findIndex(s => s.id === active.id) + 1).padStart(2, '0')}/{String(SCREENS.length).padStart(2, '0')}</span>
                  <span>{active.url}</span>
                </div>

                {active.hotspots?.length > 0 && (
                  <div className="playtest__hints">
                    <span className="playtest__hints-h mono">? HIGHLIGHTS</span>
                    <ul>
                      {active.hotspots.map((h, i) => (
                        <li key={i}>
                          <span>{h.title}</span>
                          <em>{h.note}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="playtest__frame">
            <AppFrame
              screens={SCREENS}
              activeId={activeId}
              onChange={setActiveId}
              showTour
              showHotspots
              autoStart={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Product() {
).replace(
  /import { motion } from 'motion\/react';/,
  import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import AppFrame from '../components/AppFrame/AppFrame.jsx';
import { SCREENS } from '../data/screens.js';
);

fs.writeFileSync('src/pages/Product.jsx', newProdJsx);
console.log('Restored Product.jsx');
