import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MOCK_SCREENS } from './mocks/MockScreens.jsx';
import './AppFrame.css';

const TOUR_MS = 4500;
const CURSOR_TRAVEL_MS = 900;

/**
 * Interactive "playtest" app frame.
 * - Fake browser chrome with dynamic URL
 * - Left sidebar with nav items (one per screen) - clickable
 * - Content area cross-fades between HTML mock screens
 * - Optional auto-tour that moves a fake cursor from item to item
 *
 * Controlled: pass `activeId` + `onChange`.
 */
const AppFrame = ({
  screens,
  activeId,
  onChange,
  compact = false,
  showTour = true,
  showHotspots = true,
  autoStart = false,
  className = '',
}) => {
  const [touring, setTouring] = useState(false);
  const [cursor, setCursor] = useState({ x: 24, y: 60, click: false, visible: false });
  const sidebarRef = useRef(null);
  const stageRef = useRef(null);
  const tourTimer = useRef(0);
  const cursorTimer = useRef(0);

  const activeIdx = Math.max(0, screens.findIndex((s) => s.id === activeId));
  const screen = screens[activeIdx];

  /* ─── Move fake cursor to a target sidebar button then "click" ─── */
  const moveCursorToItem = useCallback((idx, onLand) => {
    const sidebar = sidebarRef.current;
    const stage = stageRef.current;
    if (!sidebar || !stage) return;
    const btn = sidebar.querySelectorAll('.appfr__nav-item')[idx];
    if (!btn) return;

    const b = btn.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    const x = b.left - s.left + b.width * 0.5;
    const y = b.top - s.top + b.height * 0.5;

    setCursor((c) => ({ ...c, x, y, visible: true, click: false }));
    clearTimeout(cursorTimer.current);
    cursorTimer.current = setTimeout(() => {
      setCursor((c) => ({ ...c, click: true }));
      onLand?.();
      setTimeout(() => setCursor((c) => ({ ...c, click: false })), 260);
    }, CURSOR_TRAVEL_MS);
  }, []);

  /* ─── Tour driver ────────────────────────────────────────── */
  const step = useCallback(() => {
    const next = (screens.findIndex((s) => s.id === activeId) + 1) % screens.length;
    moveCursorToItem(next, () => onChange(screens[next].id));
  }, [screens, activeId, onChange, moveCursorToItem]);

  useEffect(() => {
    if (!touring) {
      clearTimeout(tourTimer.current);
      setCursor((c) => ({ ...c, visible: false }));
      return;
    }
    tourTimer.current = setTimeout(step, TOUR_MS);
    return () => clearTimeout(tourTimer.current);
  }, [touring, activeId, step]);

  useEffect(() => {
    if (autoStart) {
      const t = setTimeout(() => setTouring(true), 800);
      return () => clearTimeout(t);
    }
  }, [autoStart]);

  const handleUserClick = (id) => {
    setTouring(false);
    onChange(id);
  };

  /* Resolve the mock component for this screen */
  const MockComponent = MOCK_SCREENS[screen.id] || null;

  return (
    <div className={`appfr ${compact ? 'appfr--compact' : ''} ${className}`}>
      {/* ── Browser chrome ─────────────────────────────────── */}
      {!compact && (
        <div className="appfr__chrome">
          <span className="appfr__lights"><i /><i /><i /></span>
          <span className="appfr__url">
            <span className="appfr__url-lock" aria-hidden="true">�-�</span>
            <span className="appfr__url-txt mono">{screen.url}</span>
          </span>
          <div className="appfr__chrome-right">
            {showTour && (
              <button
                type="button"
                className={`appfr__tour ${touring ? 'appfr__tour--on' : ''}`}
                onClick={() => setTouring((t) => !t)}
              >
                <span className="appfr__tour-icon" aria-hidden="true">{touring ? '■' : '▶'}</span>
                <span className="mono">{touring ? 'STOP TOUR' : 'PLAY TOUR'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="appfr__stage" ref={stageRef}>
        {/* ── Sidebar ──────────────────────────────────────── */}
        <nav className="appfr__side" ref={sidebarRef} aria-label="App sections">
          <div className="appfr__brand">
            <span className="appfr__brand-mark">�-�</span>
            {!compact && <span className="appfr__brand-txt">MH02</span>}
          </div>
          <div className="appfr__nav">
            {screens.map((s) => {
              const active = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`appfr__nav-item ${active ? 'appfr__nav-item--on' : ''}`}
                  onClick={() => handleUserClick(s.id)}
                  aria-pressed={active}
                >
                  <span className="appfr__nav-icon" aria-hidden="true">{s.icon}</span>
                  <span className="appfr__nav-label">{s.label}</span>
                  {active && <span className="appfr__nav-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
          {!compact && (
            <div className="appfr__side-foot mono">
              <span className="appfr__side-status"><i /> LIVE DEMO</span>
              <span className="appfr__side-hint">CLICK ANY ITEM</span>
            </div>
          )}
        </nav>

        {/* ── Content area with HTML mock screens ────── */}
        <div className="appfr__main">
          {!compact && (
            <div className="appfr__topbar">
              <span className="appfr__crumb mono">MH02 · {screen.label.toUpperCase()}</span>
              <span className="appfr__badge mono"><i /> LIVE</span>
            </div>
          )}

          <div className="appfr__screen">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screen.id}
                className="appfr__screen-layer"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {MockComponent ? <MockComponent /> : (
                  <div style={{ padding: 40, color: '#9aa4a0', textAlign: 'center' }}>
                    Screen not available
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Fake cursor for the tour ───────────────────── */}
        {cursor.visible && (
          <motion.div
            className={`appfr__cursor ${cursor.click ? 'appfr__cursor--click' : ''}`}
            animate={{ x: cursor.x, y: cursor.y }}
            transition={{ duration: CURSOR_TRAVEL_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 2l7 18 2.5-8L20 10 3 2z" fill="#0f1a14" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            <span className="appfr__cursor-pulse" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AppFrame;
