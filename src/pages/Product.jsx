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

const DEMO_MAIL = 'mailto:xyz@studiomh02.com?subject=MH02%20Dashboard%20demo';

const MODULES = [
  { icon: IconChart, n: '01', title: 'Projects & Estimation', desc: 'Live burn, hours and delivery timelines per project - plus estimates rooted in your team’s actual past velocity, with confidence bands so you never over-promise.', meta: 'live stats · estimates' },
  { icon: IconUsers, n: '02', title: 'Clients, Team & HR', desc: 'One record per client and per person. Roles, reporting lines, increments, appraisals and holidays - captured where they belong, not in email threads.', meta: 'crm · org · hr' },
  { icon: IconClock, n: '03', title: 'Timesheets', desc: 'Weekly submission, review and approval flows with automatic nudges for anyone missing this week - or last. Nobody chases anybody.', meta: 'approvals · auto-nudge' },
  { icon: IconReceipt, n: '04', title: 'Invoicing & Expenses', desc: 'Invoices draft themselves from approved hours and claims. Reimbursements route in ₹ with PAN, Aadhaar and TDS context and instant decision notifications.', meta: 'auto-draft · tds-aware' },
  { icon: IconBell, n: '05', title: 'Slack Automation', desc: 'A single fail-safe service routes six event types to the right channel - @tagging the exact people who need to act, the moment they need to.', meta: 'real-time · fail-safe' },
  { icon: IconTerminal, n: '06', title: 'Reporting Engine', desc: 'On the 1st at 09:00, a clean summary of the previous month is assembled and posted to leadership. Nobody compiled it. Nobody had to remember.', meta: 'scheduled · 1st 09:00' },
];

const ARCH = [
  { stage: [{ label: 'Web App', sub: 'fast, modern UI' }] },
  { stage: [{ label: 'API Core', sub: 'async · typed' }] },
  { stage: [{ label: 'PostgreSQL', sub: 'source of truth' }, { label: 'Redis', sub: 'queue · cache' }] },
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
  { when: 'SUN · 12:00', title: 'Timesheet reminder', desc: 'Nudges everyone missing this week or last - one bullet per person, each @tagged.', channel: '#common' },
  { when: '1st · 09:00', title: 'Monthly report', desc: 'Previous-month summary assembled and posted to leadership automatically.', channel: '#management' },
  { when: 'INSTANT', title: 'Event notifications', desc: 'Submissions, approvals and rejections fire the moment they happen.', channel: 'both' },
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
              MH02 <em>Dashboard.</em>
            </h1>
            <p className="prod-hero__tag">
              The operating system for your studio.
            </p>
            <p className="prod-hero__sub">
              Every module below shares one source of truth - so an approved timesheet becomes a
              project stat, an invoice line and a Slack notification without anyone lifting a
              finger. Here&apos;s how it fits together.
            </p>
            <div className="prod-hero__cta">
              <Magnet padding={50} strength={0.3}>
                <a href={DEMO_MAIL} className="btn btn--primary">Book a demo <IconArrow width={18} height={18} /></a>
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
                <span className="dash__dot" /><span className="dash__title mono">mh02 · your studio today</span>
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
            <span className="eyebrow">[ 01 - MODULES ]</span>
            <h2 className="section-title">Everything your studio runs on,<br />in one platform.</h2>
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
            <span className="eyebrow">[ 02 - UNDER THE HOOD ]</span>
            <h2 className="section-title">Boring, proven infrastructure.<br /><em>On yours or ours.</em></h2>
            <p className="section__lead">
              A containerised stack your own engineers can inspect - and that Enterprise
              deployments run entirely inside your network.
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
          <span className="eyebrow">[ GET STARTED ]</span>
          <h2 className="prod-cta__title">
            Want MH02 Dashboard <span className="text-grad">running your studio?</span>
          </h2>
          <p className="prod-cta__sub">We tailor the platform to your workflows and deploy it on your own infrastructure.</p>
          <div className="prod-cta__btns">
            <Magnet padding={50} strength={0.3}>
              <a href={DEMO_MAIL} className="btn btn--light btn--lg">Book a demo <IconArrow width={18} height={18} /></a>
            </Magnet>
            <Link to="/#pricing" className="btn btn--ghost">See pricing</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
