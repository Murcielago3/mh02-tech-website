import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { DotGrid, SpotlightCard, Magnet } from '../components/reactbits';
import {
  IconClock, IconReceipt, IconBell, IconChart, IconUsers, IconTerminal,
  IconShield, IconBolt, IconLayers, IconArrow, IconDatabase,
} from '../components/Icons.jsx';
import AppFrame from '../components/AppFrame/AppFrame.jsx';
import { SCREENS } from '../data/screens.js';
import './Home.css';

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const DEMO_MAIL = 'mailto:xyz@studiomh02.com?subject=MH02%20Dashboard%20demo';

/* ─── Content ────────────────────────────────────────────────── */

const PAINS = [
  {
    title: 'The spreadsheet sprawl',
    desc: 'Client lists in Sheets, timesheets in forms, invoices in Word. Four sources of truth means zero sources of truth.',
    fix: 'One platform. One record for every client, project, hour and rupee.',
  },
  {
    title: 'The chasing game',
    desc: 'Ops spends Friday chasing timesheets, month-end assembling reports and reminding approvers to approve.',
    fix: 'Automatic Slack nudges tag exactly the people who owe an action.',
  },
  {
    title: 'The invisible month',
    desc: 'Leadership finds out how the month went weeks after it ended - if anyone had time to compile it at all.',
    fix: 'A full month-in-review lands in Slack on the 1st, at 09:00, untouched by human hands.',
  },
];

const MODULES = [
  { icon: IconChart, n: '01', title: 'Projects & Estimation', desc: 'Live burn, delivery timelines and data-backed estimates rooted in your team’s real velocity - so you never over-promise a client again.', tags: ['Live stats', 'Confidence bands'] },
  { icon: IconUsers, n: '02', title: 'Clients & Team', desc: 'Every client, project and employee threads back to one clean record. Onboarding, roles and reporting lines without an HR ticket.', tags: ['CRM', 'Org chart'] },
  { icon: IconClock, n: '03', title: 'Timesheets', desc: 'Weekly submission and approval flows with automatic nudges for anyone missing this week - or last. No chasing required.', tags: ['Approvals', 'Auto-nudge'] },
  { icon: IconReceipt, n: '04', title: 'Invoicing & Expenses', desc: 'Invoices draft themselves from approved hours and claims. Reimbursements route in ₹ with PAN, Aadhaar and TDS context built in.', tags: ['Auto-draft', 'TDS-aware'] },
  { icon: IconBell, n: '05', title: 'Slack Automation', desc: 'Six event types routed to the right channel the moment they happen, @tagging the exact people who need to act.', tags: ['Real-time', 'Fail-safe'] },
  { icon: IconShield, n: '06', title: 'Roles & Access', desc: 'Admin, project manager, employee and accounts each see exactly the surface they need. Nothing more, nothing missing.', tags: ['RBAC', '4 roles'] },
];

const STEPS = [
  { n: '01', title: 'Book a demo', desc: 'A 30-minute walkthrough on your use case - not a canned pitch. Bring your messiest workflow.' },
  { n: '02', title: 'We tailor & deploy', desc: 'Your roles, your approval chains, your Slack channels - configured and deployed on your own infrastructure.' },
  { n: '03', title: 'Your team just works', desc: 'Onboarding takes an afternoon. The reminders, reports and month-end run themselves from day one.' },
];

const AUTOMATIONS = [
  { when: 'SUN · 12:00', title: 'Timesheet reminders', desc: 'Everyone missing this week or last gets one bullet, personally @tagged.', channel: '#common' },
  { when: '1st · 09:00', title: 'Monthly report', desc: 'The previous month, summarised and posted to leadership. Nobody compiled it.', channel: '#management' },
  { when: 'INSTANT', title: 'Event notifications', desc: 'Submissions, approvals and rejections fire the moment they happen.', channel: 'both' },
];

const PLANS = [
  {
    name: 'Pilot',
    tag: 'FOR SMALL TEAMS',
    blurb: 'Up and running fast - prove it on one team before you roll it out.',
    features: ['Up to 15 seats', 'All core modules', 'Slack automation', 'Email support'],
    cta: 'Start a pilot',
    featured: false,
  },
  {
    name: 'Studio',
    tag: 'MOST POPULAR',
    blurb: 'The full operations layer for a growing studio or agency.',
    features: ['Unlimited seats', 'All modules + reporting', 'Custom approval chains', 'Custom Slack workflows', 'Priority support'],
    cta: 'Book a demo',
    featured: true,
  },
  {
    name: 'Enterprise',
    tag: 'SELF-HOSTED',
    blurb: 'Deployed on your own infrastructure, tailored to your processes.',
    features: ['Your infra, your data', 'SSO & audit trails', 'Custom modules', 'Dedicated onboarding', 'SLA-backed support'],
    cta: 'Talk to us',
    featured: false,
  },
];

const FAQS = [
  {
    q: 'How long does it take to get started?',
    a: 'Most teams are live within a week. We configure roles, approval chains and Slack channels with you, migrate your client and team data, and your team onboards in an afternoon - the interface is deliberately simple.',
  },
  {
    q: 'Where does our data live?',
    a: 'Wherever you want it. MH02 Dashboard deploys as a containerised stack - on our managed infrastructure or entirely on yours. Enterprise deployments keep every byte inside your own network.',
  },
  {
    q: 'Does it replace our existing tools?',
    a: 'It replaces the operations patchwork - the timesheet forms, expense spreadsheets, invoice templates and reminder rituals. It plugs into Slack rather than replacing it, and exports cleanly to your accounting tools.',
  },
  {
    q: 'Is it built for Indian compliance?',
    a: 'Yes. Reimbursements and payroll context handle ₹, PAN, Aadhaar and TDS natively. Invoices and exports follow the formats your CA actually asks for.',
  },
  {
    q: 'What if our process is non-standard?',
    a: 'Every studio’s is. Approval chains, roles, reminder cadences and report formats are configuration, not code - and Enterprise plans include custom modules built for your workflow.',
  },
];

/* ─── Scroll-linked marquee: glides right-to-left as you scroll ─ */
const MARQUEE_WORDS = ['Projects', 'Clients', 'Timesheets', 'Invoicing', 'Estimation', 'HR', 'Reports', 'Slack Automation'];

const ScrollMarquee = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-46%']);

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <motion.div className="marquee__track" style={{ x }}>
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((t, i) => (
          <span className={`marquee__item ${i % 2 ? 'marquee__item--outline' : ''}`} key={i}>
            {t}
            <i className="marquee__dot" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── FAQ item ───────────────────────────────────────────────── */
const FaqItem = ({ q, a, open, onToggle }) => (
  <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
    <button type="button" className="faq__q" onClick={onToggle} aria-expanded={open}>
      <span>{q}</span>
      <span className="faq__mark mono" aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className="faq__a-wrap"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="faq__a">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ─── Live tour section ──────────────────────────────────────── */
const TourSection = () => {
  const [activeId, setActiveId] = useState(SCREENS[0].id);
  const active = SCREENS.find((s) => s.id === activeId) || SCREENS[0];

  return (
    <section className="section tour" id="tour">
      <div className="container">
        <motion.div className="section__head" {...fadeUp}>
          <span className="eyebrow">[ 02 - LIVE TOUR ]</span>
          <h2 className="section-title">Don&apos;t take our word for it.<br /><em>Click around.</em></h2>
          <p className="section__lead">
            This is the actual product. Pick a section in the sidebar or press <b>PLAY TOUR</b> and
            let it drive.
          </p>
        </motion.div>

        <motion.div className="tour__grid" {...fadeUp}>
          <div className="tour__copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="tour__inner"
              >
                <span className="tour__eyebrow mono">
                  <i /> NOW SHOWING · {active.label.toUpperCase()}
                </span>
                <h3 className="tour__title">{active.title}</h3>
                <p className="tour__desc">{active.caption}</p>

                <div className="tour__meta mono">
                  <span>SCREEN · {String(SCREENS.findIndex((s) => s.id === active.id) + 1).padStart(2, '0')}/{String(SCREENS.length).padStart(2, '0')}</span>
                  <span>{active.url}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="tour__frame">
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

/* ═══════════════════════════ Page ═══════════════════════════ */
export default function Home({ introDone = true }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="home">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="hero" id="top">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <DotGrid className="hero__grid" baseColor="#c5d8cd" activeColor="#217a52" dotSize={3} />
        </motion.div>
        <div className="hero__fade" />

        <motion.div
          className="hero__content container"
          initial={{ opacity: 0, y: 36 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="hero__badge mono">
            <i /> MH02 DASHBOARD · FOR STUDIOS & AGENCIES
          </div>

          <h1 className="hero__title">
            The operating system <em>your studio deserves.</em>
          </h1>

          <p className="hero__sub">
            Projects, clients, timesheets, invoicing and reporting in one dashboard - with Slack
            automation that chases people so you never have to.
          </p>

          <div className="hero__cta">
            <Magnet padding={50} strength={0.3}>
              <a href={DEMO_MAIL} className="btn btn--primary">
                Book a demo <IconArrow width={18} height={18} />
              </a>
            </Magnet>
            <a href="#tour" className="btn btn--ghost">
              <span className="btn__pulse" /> Try the live tour
            </a>
          </div>
        </motion.div>

        <div className="hero__scroll mono">SCROLL ↓</div>
      </section>

      {/* ──────────── SCROLL MARQUEE (right below hero) ────────── */}
      <ScrollMarquee />

      {/* ───────────────────────── PAINS ──────────────────────── */}
      <section className="section pains" id="why">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 00 - WHY ]</span>
            <h2 className="section-title">Your studio doesn&apos;t have an ops problem.<br /><em>It has an ops-tooling problem.</em></h2>
          </motion.div>
          <div className="pains__grid">
            {PAINS.map((p, i) => (
              <motion.div className="pain-card" key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <span className="pain-card__x mono">✕</span>
                <h3 className="pain-card__title">{p.title}</h3>
                <p className="pain-card__desc">{p.desc}</p>
                <div className="pain-card__fix">
                  <span className="mono">→</span>
                  <p>{p.fix}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── PLATFORM ────────────────────── */}
      <section className="section platform" id="platform">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 01 - PLATFORM ]</span>
            <h2 className="section-title">Everything your studio runs on,<br /><em>in one place.</em></h2>
            <p className="section__lead">
              Eight modules that share one source of truth - so an approved timesheet becomes a
              project stat, an invoice line and a Slack notification without anyone touching it.
            </p>
          </motion.div>

          <div className="cap-grid">
            {MODULES.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}>
                  <SpotlightCard className="cap-card" spotlightColor="rgba(33,122,82,0.08)">
                    <div className="cap-card__top">
                      <span className="cap-card__icon"><Icon /></span>
                      <span className="cap-card__n mono">{c.n}</span>
                    </div>
                    <h3 className="cap-card__title">{c.title}</h3>
                    <p className="cap-card__desc">{c.desc}</p>
                    <div className="cap-card__tags">
                      {c.tags.map((t) => <span key={t} className="tag mono">{t}</span>)}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

          <motion.div className="platform-more" {...fadeUp}>
            <Link to="/product" className="btn btn--ghost">
              Full platform deep dive <IconArrow width={16} height={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ LIVE TOUR ══════════════════════ */}
      <TourSection />

      {/* ─────────────────────── AUTOMATION ───────────────────── */}
      <section className="section autom" id="automation">
        <div className="container">
          <motion.div className="autom__panel" {...fadeUp}>
            <div className="autom__copy">
              <span className="autom__eyebrow mono">[ 03 - AUTOMATION ]</span>
              <h2 className="autom__title">The cadence <em>runs itself.</em></h2>
              <p className="autom__lead">
                MH02 Dashboard doesn&apos;t just store your operations data - it acts on it. Reminders,
                reports and notifications land in Slack on schedule, every time, without a human
                in the loop.
              </p>
              <div className="autom__rows">
                {AUTOMATIONS.map((s) => (
                  <div className="autom__row" key={s.title}>
                    <span className="autom__when mono">{s.when}</span>
                    <div className="autom__body">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                    <span className="autom__channel mono">{s.channel}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="autom__visual">
              <div className="term">
                <div className="term__bar">
                  <i /><i /><i />
                  <span className="mono">mh02 · automation log</span>
                </div>
                <pre className="term__body mono">{`[SUN 12:00] timesheet_reminder.run()
[SUN 12:00] ✓ 3 nudges sent, @tagged
[MON 09:14] → claim approved · ₹4,200
[MON 09:14] ✓ notified @accounts
[1st 09:00] monthly_report.dispatch()
[1st 09:00] ✓ posted #management
            0 missed · 0 manual`}</pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── SECURITY / TRUST ────────────────── */}
      <section className="section trust" id="trust">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 04 - BUILT TO BE TRUSTED ]</span>
            <h2 className="section-title">Your ops data is the business.<br /><em>We treat it that way.</em></h2>
          </motion.div>
          <div className="trust__grid">
            {[
              { icon: IconShield, title: 'Role-scoped access', desc: 'Four roles, each seeing exactly their surface. An employee never sees payroll; accounts never edits projects.' },
              { icon: IconDatabase, title: 'Your infrastructure', desc: 'Containerised deploys that run on your servers or ours. Enterprise data never leaves your network.' },
              { icon: IconBolt, title: 'Fail-safe delivery', desc: 'Every notification is queued, retried and logged. If Slack blinks, the message still lands.' },
              { icon: IconLayers, title: 'Boring, proven stack', desc: 'FastAPI, PostgreSQL, Redis and Celery - audited dependencies and a stack your own engineers can inspect.' },
              { icon: IconUsers, title: 'Full audit trail', desc: 'Every approval, edit and rupee is attributable. Month-end questions take seconds, not archaeology.' },
              { icon: IconTerminal, title: 'Exportable, always', desc: 'Your data is yours. Clean exports for your CA, your accounting tools, or your way out - no lock-in.' },
            ].map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div className="trust__item" key={t.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.07 }}>
                  <span className="trust__icon"><Icon width={22} height={22} /></span>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────── HOW IT WORKS ──────────────────── */}
      <section className="section" id="how">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 05 - GETTING STARTED ]</span>
            <h2 className="section-title">Three steps. <em>One week.</em></h2>
          </motion.div>
          <div className="proc">
            <div className="proc__line" />
            {STEPS.map((p, i) => (
              <motion.div className="proc__step" key={p.n} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                <span className="proc__n mono">{p.n}</span>
                <h3 className="proc__title">{p.title}</h3>
                <p className="proc__desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PRICING ────────────────────── */}
      <section className="section pricing" id="pricing">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 06 - PRICING ]</span>
            <h2 className="section-title">Plans that scale <em>with the studio.</em></h2>
            <p className="section__lead">
              Pricing is per deployment, not per surprise. Tell us your team size and we&apos;ll quote
              in one business day.
            </p>
          </motion.div>
          <div className="pricing__grid">
            {PLANS.map((p, i) => (
              <motion.div
                className={`plan ${p.featured ? 'plan--featured' : ''}`}
                key={p.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              >
                <span className="plan__tag mono">{p.tag}</span>
                <h3 className="plan__name">{p.name}</h3>
                <p className="plan__blurb">{p.blurb}</p>
                <ul className="plan__features">
                  {p.features.map((f) => <li key={f}><span className="dotmark" />{f}</li>)}
                </ul>
                <a
                  href={`mailto:xyz@studiomh02.com?subject=MH02%20Dashboard%20-%20${encodeURIComponent(p.name)}`}
                  className={`btn ${p.featured ? 'btn--light' : 'btn--ghost'} plan__cta`}
                >
                  {p.cta} <IconArrow width={16} height={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FAQ ──────────────────────── */}
      <section className="section faq" id="faq">
        <div className="container faq__wrap">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 07 - FAQ ]</span>
            <h2 className="section-title">Questions studios <em>ask us.</em></h2>
          </motion.div>
          <motion.div className="faq__list" {...fadeUp}>
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                {...f}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── CONTACT ────────────────────── */}
      <section className="section contact" id="contact">
        <motion.div className="contact__panel container" {...fadeUp}>
          <span className="contact__eyebrow mono">[ GET STARTED ]</span>
          <h2 className="contact__title">
            Give your studio its <em>operating system.</em>
          </h2>
          <p className="contact__sub">A 30-minute demo on your workflows. We reply within one business day.</p>
          <Magnet padding={50} strength={0.3}>
            <a href={DEMO_MAIL} className="btn btn--light btn--lg">
              Book a demo <IconArrow width={18} height={18} />
            </a>
          </Magnet>
          <span className="contact__alt mono">or write to xyz@studiomh02.com</span>
        </motion.div>
      </section>
    </main>
  );
}
