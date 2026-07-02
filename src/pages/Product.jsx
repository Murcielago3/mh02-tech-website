import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  SpotlightCard, CountUp, TiltedCard, Magnet,
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

const DEMO_MAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20demo&body=Hi%20there%2C%0A%0AI%20would%20like%20to%20get%20a%20demo%20of%20the%20MH02%20Dashboard.%20Please%20let%20me%20know%20what%20the%20next%20steps%20are%20to%20set%20this%20up.%0A%0AThanks!';

const MODULES = [
  { icon: IconChart, n: '01', title: 'Projects & Estimation', desc: 'You can see exactly where a project stands - hours, budget, timeline. When you\'re estimating a new one, it pulls from your team\'s actual history so you\'re not guessing.', meta: 'live stats · estimates' },
  { icon: IconUsers, n: '02', title: 'Clients, Team & HR', desc: 'One record per client, one per person. Roles, reporting lines, increments, appraisals, holidays - all in one spot instead of scattered across email threads and spreadsheets.', meta: 'crm · org · hr' },
  { icon: IconClock, n: '03', title: 'Timesheets', desc: 'Submit weekly, approve weekly. If someone forgets, they get a nudge. You don\'t have to chase anyone.', meta: 'approvals · auto-nudge' },
  { icon: IconReceipt, n: '04', title: 'Invoicing & Expenses', desc: 'Once the hours and expenses are approved, the invoice puts itself together. Handles ₹, PAN, Aadhaar and TDS - the stuff your accountant actually cares about.', meta: 'auto-draft · tds-aware' },
  { icon: IconBell, n: '05', title: 'Slack Automation', desc: 'When something happens - a submission, an approval, a rejection - the right people get tagged in the right channel. No one has to forward a thing.', meta: 'real-time · fail-safe' },
  { icon: IconTerminal, n: '06', title: 'Reporting Engine', desc: 'On the 1st of every month, a clean summary of the previous month appears in Slack. Nobody put it together. It just shows up.', meta: 'scheduled · 1st 09:00' },
];

const ARCH = [
  { stage: [{ label: 'Web App', sub: 'fast, modern UI' }] },
  { stage: [{ label: 'API Core', sub: 'async · typed' }] },
  { stage: [{ label: 'Database', sub: 'source of truth' }, { label: 'Cache', sub: 'queue · memory' }] },
  { stage: [{ label: 'Workers', sub: 'jobs · schedules' }] },
  { stage: [{ label: 'Slack', sub: 'where your team lives' }] },
];

const ROLES = [
  { role: 'Admin', scope: 'Full control', perms: ['All modules', 'User management', 'Configuration'] },
  { role: 'Project Manager', scope: 'Team oversight', perms: ['Approvals', 'Reports', 'Timesheets'] },
  { role: 'Employee', scope: 'Self-service', perms: ['Submit timesheet', 'Claim expenses'] },
  { role: 'Accounts', scope: 'Finance', perms: ['Reimbursements', 'TDS / payroll', 'Exports'] },
];

const SCHEDULE = [
  { when: 'SUN · 12:00', title: 'Timesheet reminder', desc: 'Missed your timesheet? You\'ll hear about it on Sunday. Personally tagged, one line.', channel: '#common' },
  { when: '1st · 09:00', title: 'Monthly report', desc: 'Last month\'s numbers, assembled and dropped into the leadership channel. No one had to remember.', channel: '#management' },
  { when: 'INSTANT', title: 'Event notifications', desc: 'Something gets submitted, approved or rejected? The right people know right away.', channel: 'both' },
];

export default function Product() {
  return (
    <main className="prod">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="prod-hero">
        <div className="prod-hero__glow" aria-hidden="true" />
        <div className="prod-hero container">
          <motion.div
            className="prod-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">[ PLATFORM DEEP DIVE ]</span>
            <h1 className="prod-hero__title">
              Ops <em>Dashboard.</em>
            </h1>
            <p className="prod-hero__tag">
              One tool for everything your studio runs on.
            </p>
            <p className="prod-hero__sub">
              All six modules share the same data. Approve a timesheet and it updates the project,
              shows up on the invoice, and pings the right person in Slack. Here's how the
              whole thing works.
            </p>
            <div className="prod-hero__cta">
              <Magnet padding={50} strength={0.3}>
                <a href={DEMO_MAIL} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Book a demo <IconArrow width={18} height={18} /></a>
              </Magnet>
              <Link to="/#tour" className="btn btn--ghost">Try the live tour</Link>
            </div>
          </motion.div>

          <motion.div
            className="prod-hero__panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dash">
              <div className="dash__bar">
                <span className="dash__dot" /><span className="dash__title mono">ops · your studio today</span>
              </div>
              <div className="dash__grid">
                {[
                  ['Pending timesheets', 3],
                  ['Open claims', 7],
                  ['Reports sent', 12],
                  ['Active projects', 9],
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
          { to: 8, suffix: '', label: 'Modules, one login' },
          { to: 4, suffix: '', label: 'Scoped roles' },
          { to: 100, suffix: '%', label: 'Fail-safe notifications' },
          { to: 0, suffix: '', label: 'Reports compiled by hand' },
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
            <h2 className="section-title">Six modules. One platform.<br />Nothing else to juggle.</h2>
          </motion.div>
          <div className="mod-grid">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={m.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}>
                  <SpotlightCard className="mod-card" spotlightColor="rgba(60,227,154,0.12)">
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

      {/* ────────────────────── ARCHITECTURE ──────────────────── */}
      <section className="section arch" id="architecture">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <h2 className="section-title">Nothing fancy under the hood.<br /><em>That's the point.</em></h2>
            <p className="section__lead">
              It's a containerised stack your engineers can actually read through. We manage the
              infrastructure so you don't have to worry about a thing.
            </p>
          </motion.div>
          <motion.div className="arch__flow" {...fadeUp}>
            {ARCH.map((col, i) => (
              <div className="arch__stage" key={i}>
                <div className="arch__nodes">
                  {col.stage.map((n) => (
                    <div className="arch__node" key={n.label}>
                      <span className="arch__node-label">{n.label}</span>
                      <span className="arch__node-sub mono">{n.sub}</span>
                    </div>
                  ))}
                </div>
                {i < ARCH.length - 1 && <span className="arch__arrow mono" aria-hidden="true">→</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── SCHEDULE ────────────────────── */}
      <section className="section">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <h2 className="section-title">Runs on autopilot, every week.</h2>
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
            <h2 className="section-title">Four roles. Everyone sees only what they should.</h2>
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
          <h2 className="prod-cta__title">
            Want to see this <span className="text-grad">running with your data?</span>
          </h2>
          <p className="prod-cta__sub">We'll set it up around your workflows and deploy it wherever you want it.</p>
          <div className="prod-cta__btns">
            <Magnet padding={50} strength={0.3}>
              <a href={DEMO_MAIL} className="btn btn--light btn--lg" target="_blank" rel="noopener noreferrer">Book a demo <IconArrow width={18} height={18} /></a>
            </Magnet>
            <Link to="/#pricing" className="btn btn--ghost">See pricing</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
