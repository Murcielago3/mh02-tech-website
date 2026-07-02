import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import AppFrame from '../components/AppFrame/AppFrame.jsx';
import { SCREENS } from '../data/screens.js';
import {
  LetterGlitch, SpotlightCard, GradientText, DecryptedText, CountUp, TiltedCard, Magnet,
} from '../components/reactbits';
import {
  IconClock, IconReceipt, IconBell, IconChart, IconUsers, IconTerminal, IconArrow,
} from '../components/Icons.jsx';
import './Product.css';

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const MODULES = [
  { icon: IconClock, n: '01', title: 'Timesheets', desc: 'Weekly submission, review and approval flows with automatic nudges for anyone missing this week - or last.', meta: 'app · review queue' },
  { icon: IconReceipt, n: '02', title: 'Reimbursements', desc: 'Submit, route and resolve expense claims in ₹ with PAN/Aadhaar/TDS context and instant decision notifications.', meta: 'app · approvals' },
  { icon: IconBell, n: '03', title: 'Slack Reminders', desc: 'A single fail-safe service routes six event types to the right channel - @tagging the exact people who need to act.', meta: 'celery · beat' },
  { icon: IconChart, n: '04', title: 'Monthly Reporting', desc: 'On the 1st at 09:00, a Block-Kit summary of the previous month is assembled and posted to management automatically.', meta: 'scheduled · 1st 09:00' },
  { icon: IconUsers, n: '05', title: 'Role-Based Access', desc: 'Four scoped roles - admin, project manager, employee and accounts - each see exactly the surface they need.', meta: 'rbac · 4 roles' },
  { icon: IconTerminal, n: '06', title: 'Async Engine', desc: 'FastAPI with async SQLAlchemy, Redis-backed Celery workers and Beat scheduling, containerised for clean deploys.', meta: 'fastapi · async' },
];

const ARCH = [
  { stage: [{ label: 'Vue 3 + Vite', sub: 'PrimeVue · Pinia' }] },
  { stage: [{ label: 'FastAPI', sub: 'async · Pydantic' }] },
  { stage: [{ label: 'PostgreSQL', sub: 'SQLAlchemy' }, { label: 'Redis', sub: 'broker · cache' }] },
  { stage: [{ label: 'Celery + Beat', sub: 'workers · schedule' }] },
  { stage: [{ label: 'Slack', sub: 'chat.postMessage' }] },
];

const ROLES = [
  { role: 'Admin', scope: 'Full control', perms: ['All modules', 'User management', 'Config'] },
  { role: 'Project Manager', scope: 'Team oversight', perms: ['Approvals', 'Reports', 'Timesheets'] },
  { role: 'Employee', scope: 'Self-service', perms: ['Submit timesheet', 'Claim expenses'] },
  { role: 'Accounts', scope: 'Finance', perms: ['Reimbursements', 'TDS / payroll', 'Exports'] },
];

const SCHEDULE = [
  { when: 'SUN · 12:00', title: 'Timesheet reminder', desc: 'Nudges everyone missing this week or last - one bullet per person, each @tagged.', channel: '#common' },
  { when: '1st · 09:00', title: 'Monthly report', desc: 'Previous-month Block-Kit summary assembled and posted to management.', channel: '#management' },
  { when: 'INSTANT', title: 'Event notifications', desc: 'Submissions, approvals and rejections fire the moment they happen via background tasks.', channel: 'both' },
];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

/* ─── Playtest section (full AppFrame + syncing side copy) ─── */
const PlaytestSection = () => {
  const [activeId, setActiveId] = useState(SCREENS[0].id);
  const active = SCREENS.find((s) => s.id === activeId) || SCREENS[0];

  return (
    <section className="section playtest" id="explore">
      <div className="container">
        <motion.div className="section__head" {...rise()}>
          <div className="head-strip mono">
            <span>{'■'}</span><span>01</span><span>/</span><span>PLAY IT LIVE</span>
          </div>
          <h2 className="section-title">
            The whole app,<br />
            <em>at your fingertips.</em>
          </h2>
          <p className="section__lead">
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
                    <span className="playtest__hints-h mono">◈ HIGHLIGHTS</span>
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
  return (
    <main className="prod">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="prod-hero">
        <LetterGlitch className="prod-hero__glitch" glitchSpeed={70} fontSize={15} />
        <div className="prod-hero__veil" />

        <div className="prod-hero container">
          <motion.div
            className="prod-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="prod-hero__title">
              <GradientText speed={8} colors={['#287457', '#2f8a54', '#1f5d44', '#34965d', '#287457']}>MH02<br />Dashboard</GradientText>
            </h1>
            <p className="prod-hero__tag">
              <DecryptedText text="The operating system for a studio." />
            </p>
            <p className="prod-hero__sub">
              One platform to run the operations layer of the business - timesheets, reimbursements,
              reporting and Slack-native automation - built on an async FastAPI core with Celery,
              Postgres and Redis.
            </p>
            <div className="prod-hero__cta">
              <Magnet padding={50} strength={0.3}>
                <a href="#modules" className="btn btn--primary">Explore the platform <IconArrow width={18} height={18} /></a>
              </Magnet>
              <a href="#architecture" className="btn btn--ghost">View architecture</a>
            </div>
          </motion.div>

          <motion.div
            className="prod-hero__panel"
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dash">
              <div className="dash__bar">
                <span className="dash__dot" /><span className="dash__title mono">mh02-dashboard · dashboard</span>
              </div>
              <div className="dash__grid">
                {[
                  ['Pending timesheets', 3, ''],
                  ['Open claims', 7, ''],
                  ['Reports sent', 12, ''],
                  ['Active roles', 4, ''],
                ].map(([l, v]) => (
                  <div className="dash__stat" key={l}>
                    <span className="dash__stat-num"><CountUp to={v} /></span>
                    <span className="dash__stat-l mono">{l}</span>
                  </div>
                ))}
              </div>
              <div className="dash__feed">
                {[
                  ['✓', 'Reimbursement approved · ₹4,200', 'accounts'],
                  ['→', 'Timesheet submitted · week 25', 'employee'],
                  ['◆', 'Monthly report posted', '#management'],
                ].map(([icn, txt, tag]) => (
                  <div className="dash__row mono" key={txt}>
                    <span className="dash__row-i">{icn}</span>
                    <span className="dash__row-t">{txt}</span>
                    <span className="dash__row-tag">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── METRICS ─────────────────────── */}
      <section className="container prod-metrics">
        {[
          { to: 6, suffix: '', label: 'Notification types' },
          { to: 4, suffix: '', label: 'Scoped roles' },
          { to: 100, suffix: '%', label: 'Fail-safe sends' },
          { to: 0, suffix: '', label: 'Missed reminders', prefix: '' },
        ].map((m, i) => (
          <motion.div className="prod-metrics__item" key={m.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}>
            <span className="prod-metrics__num"><CountUp to={m.to} suffix={m.suffix} /></span>
            <span className="prod-metrics__l mono">{m.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ──────────────────────── MODULES ─────────────────────── */}
      <section className="section" id="modules">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 01 - MODULES ]</span>
            <h2 className="section-title">Everything the studio runs on,<br />in one platform.</h2>
          </motion.div>
          <div className="mod-grid">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={m.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}>
                  <SpotlightCard className="mod-card" spotlightColor="rgba(95,217,154,0.18)">
                    <div className="mod-card__top">
                      <span className="mod-card__icon"><Icon /></span>
                      <span className="mod-card__n mono">{m.n}</span>
                    </div>
                    <h3 className="mod-card__title">{m.title}</h3>
                    <p className="mod-card__desc">{m.desc}</p>
                    <span className="mod-card__meta mono">{m.meta}</span>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PLAYTEST ══════════════════════ */}
      <PlaytestSection />

      {/* ──────────────────────── SCHEDULE ────────────────────── */}
      <section className="section">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 03 - AUTOMATION ]</span>
            <h2 className="section-title">The cadence runs itself.</h2>
          </motion.div>
          <div className="sched">
            {SCHEDULE.map((s, i) => (
              <motion.div className="sched__row" key={s.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <span className="sched__when mono">{s.when}</span>
                <div className="sched__body">
                  <h3 className="sched__title">{s.title}</h3>
                  <p className="sched__desc">{s.desc}</p>
                </div>
                <span className="sched__channel mono">{s.channel}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ROLES ──────────────────────── */}
      <section className="section">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 04 - ACCESS CONTROL ]</span>
            <h2 className="section-title">Four roles. Precise scope.</h2>
          </motion.div>
          <div className="roles-grid">
            {ROLES.map((r, i) => (
              <motion.div key={r.role} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}>
                <TiltedCard className="role-card" max={9}>
                  <span className="role-card__name">{r.role}</span>
                  <span className="role-card__scope mono">{r.scope}</span>
                  <ul className="role-card__perms">
                    {r.perms.map((p) => <li key={p}><span className="dotmark" />{p}</li>)}
                  </ul>
                </TiltedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA ────────────────────────── */}
      <section className="section prod-cta">
        <motion.div className="prod-cta__panel container" {...fadeUp}>
          <span className="eyebrow">[ DEPLOY IT FOR YOUR TEAM ]</span>
          <h2 className="prod-cta__title">
            Want MH02 Dashboard <span className="text-grad">running your studio?</span>
          </h2>
          <p className="prod-cta__sub">We tailor and deploy the platform on your own infrastructure.</p>
          <div className="prod-cta__btns">
            <Magnet padding={50} strength={0.3}>
              <a href="mailto:xyz@studiomh02.com?subject=MH02%20Dashboard" className="btn btn--primary btn--lg">Request a deployment <IconArrow width={18} height={18} /></a>
            </Magnet>
            <Link to="/" className="btn btn--ghost">Back to studio</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
