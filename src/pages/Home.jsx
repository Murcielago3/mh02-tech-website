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
    title: 'Your data is all over the place',
    desc: 'Clients live in a Google Sheet. Timesheets are in some form. Invoices? Somebody\'s Word doc from 2019. Ask three people where the latest version is and you\'ll get three different answers.',
    fix: 'Clients, projects, hours and money all sit in one place. One copy. That\'s it.',
  },
  {
    title: 'Half the week is spent nagging people',
    desc: 'Every Friday someone\'s chasing timesheets. Every month-end someone\'s pinging managers who forgot to approve things. It\'s tedious and nobody likes being that person.',
    fix: 'Slack handles the reminders now. It knows who\'s late and tags them directly.',
  },
  {
    title: 'Reports arrive too late to be useful',
    desc: 'By the time anyone pulls the numbers together, you\'re already two weeks into the next month. And honestly? Half the time nobody gets around to it at all.',
    fix: 'On the 1st, a summary of last month just shows up in Slack. Nobody asked for it. It\'s just there.',
  },
];

const MODULES = [
  { icon: IconChart, n: '01', title: 'Projects & Estimation', desc: 'See how a project is actually doing — hours burned, timeline, budget. Estimates pull from past projects so you stop guessing and stop over-promising.', tags: ['Live stats', 'Confidence bands'] },
  { icon: IconUsers, n: '02', title: 'Clients & Team', desc: 'One record per client, one record per person. Projects, roles, reporting lines — all connected. No more HR tickets to update a job title.', tags: ['CRM', 'Org chart'] },
  { icon: IconClock, n: '03', title: 'Timesheets', desc: 'People submit weekly, managers approve. If someone forgets, the system nudges them. You don\'t have to.', tags: ['Approvals', 'Auto-nudge'] },
  { icon: IconReceipt, n: '04', title: 'Invoicing & Expenses', desc: 'Once hours and expenses are approved, the invoice basically writes itself. Handles ₹, PAN, Aadhaar and TDS because that\'s what your CA needs.', tags: ['Auto-draft', 'TDS-aware'] },
  { icon: IconBell, n: '05', title: 'Slack Automation', desc: 'Submissions, approvals, rejections — they go to the right Slack channel and tag the right person. Instantly. No one has to forward anything.', tags: ['Real-time', 'Fail-safe'] },
  { icon: IconShield, n: '06', title: 'Roles & Access', desc: 'Four roles. Each person sees exactly what they need and nothing they shouldn\'t. An employee never stumbles into payroll data.', tags: ['RBAC', '4 roles'] },
];

const STEPS = [
  { n: '01', title: 'Book a demo', desc: 'We\'ll spend 30 minutes on your actual workflows, not a slideshow. Bring the process that annoys you most.' },
  { n: '02', title: 'We set it up for you', desc: 'We configure your roles, approval chains and Slack channels. It runs on your infrastructure, not ours.' },
  { n: '03', title: 'Your team starts using it', desc: 'Onboarding takes an afternoon. After that, the reminders and reports just run on their own.' },
];

const AUTOMATIONS = [
  { when: 'SUN · 12:00', title: 'Timesheet reminders', desc: 'If you haven\'t submitted, you get tagged on Sunday. Simple as that.', channel: '#common' },
  { when: '1st · 09:00', title: 'Monthly report', desc: 'Last month\'s numbers, assembled and posted to leadership. Nobody had to compile a thing.', channel: '#management' },
  { when: 'INSTANT', title: 'Event notifications', desc: 'Someone submits, approves, or rejects something? The right people know immediately.', channel: 'both' },
];

const PLANS = [
  {
    name: 'Pilot',
    tag: 'FOR SMALL TEAMS',
    blurb: 'Try it with one team first. See if it sticks before you go wider.',
    features: ['Up to 15 seats', 'All core modules', 'Slack automation', 'Email support'],
    cta: 'Start a pilot',
    featured: false,
  },
  {
    name: 'Studio',
    tag: 'MOST POPULAR',
    blurb: 'Everything you need to run a growing studio. No module limits.',
    features: ['Unlimited seats', 'All modules + reporting', 'Custom approval chains', 'Custom Slack workflows', 'Priority support'],
    cta: 'Book a demo',
    featured: true,
  },
  {
    name: 'Enterprise',
    tag: 'SELF-HOSTED',
    blurb: 'Runs on your servers, shaped around how you actually work.',
    features: ['Your infra, your data', 'SSO & audit trails', 'Custom modules', 'Dedicated onboarding', 'SLA-backed support'],
    cta: 'Talk to us',
    featured: false,
  },
];

const FAQS = [
  {
    q: 'How long until we\'re actually using it?',
    a: 'About a week. We set up your roles and approval chains, move your client and team data over, and your people learn it in an afternoon. We kept the interface simple on purpose.',
  },
  {
    q: 'Where does our data live?',
    a: 'Your call. We can host it for you, or it runs entirely on your own servers. Enterprise deployments keep everything inside your network. Nothing leaves.',
  },
  {
    q: 'Does this replace Slack? Or our accounting software?',
    a: 'Neither. It replaces the messy middle — the timesheet Google Forms, the expense spreadsheets, the invoice Word docs, the manual reminder rituals. It talks to Slack and exports clean data for your accountant.',
  },
  {
    q: 'Does it handle Indian tax and compliance stuff?',
    a: 'Yes. ₹, PAN, Aadhaar, TDS — it\'s all built in. Invoices and exports come out in the format your CA actually wants, not some generic template you have to reformat.',
  },
  {
    q: 'Our process is kind of weird. Will this work?',
    a: 'Probably. Every studio we\'ve talked to thinks their process is unusual — and it usually is. Approval chains, roles, reminder schedules, report formats — all of that is configurable. Enterprise plans can include custom modules too.',
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
          <h2 className="section-title">See it for yourself.<br /><em>This is the real thing.</em></h2>
          <p className="section__lead">
            Not a mockup. Pick a section in the sidebar, or hit <b>PLAY TOUR</b> and
            watch it walk through the product.
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
            Run your studio <em>without the spreadsheet chaos.</em>
          </h1>

          <p className="hero__sub">
            Projects, clients, timesheets, invoices and reports — all in one place. Slack
            reminders chase people down so you don't have to.
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
            <h2 className="section-title">Your team is fine.<br /><em>Your tools are the problem.</em></h2>
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
            <h2 className="section-title">Six modules.<br /><em>One source of truth.</em></h2>
            <p className="section__lead">
              When someone approves a timesheet, it updates the project stats, shows up on the
              invoice, and notifies the right people in Slack. Nobody has to copy anything anywhere.
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
              <h2 className="autom__title">Set it up once. <em>It handles the rest.</em></h2>
              <p className="autom__lead">
                Reminders go out on Sunday. Reports land on the 1st. Approvals and rejections
                ping the right channel the moment they happen. You don't have to remember any of it.
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
            <h2 className="section-title">This is your operations data.<br /><em>We take that seriously.</em></h2>
          </motion.div>
          <div className="trust__grid">
            {[
              { icon: IconShield, title: 'Role-scoped access', desc: 'Four roles. Each person sees their own surface. Employees can\'t see payroll. Accounts can\'t edit projects. Simple.' },
              { icon: IconDatabase, title: 'Your infrastructure', desc: 'Runs on your servers or ours. Enterprise plans keep everything inside your network. Your data doesn\'t leave.' },
              { icon: IconBolt, title: 'Fail-safe delivery', desc: 'Notifications are queued, retried and logged. If Slack goes down for a minute, the message still gets through.' },
              { icon: IconLayers, title: 'Boring, proven stack', desc: 'FastAPI, PostgreSQL, Redis, Celery. Nothing exotic. Your engineers can read through the whole thing.' },
              { icon: IconUsers, title: 'Full audit trail', desc: 'Every approval, every edit, every rupee — traceable. When someone asks "who approved this?" you\'ll know in seconds.' },
              { icon: IconTerminal, title: 'Exportable, always', desc: 'Your data is yours. Export it for your CA, your accounting software, or to leave us entirely. No lock-in.' },
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
            <h2 className="section-title">Up and running <em>in a week.</em></h2>
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
            <h2 className="section-title">Pricing that <em>makes sense.</em></h2>
            <p className="section__lead">
              You pay per deployment, not per surprise. Tell us how big your team is
              and we'll get you a quote within a day.
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
            <h2 className="section-title">Things people <em>usually ask.</em></h2>
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
            Ready to stop <em>winging it?</em>
          </h2>
          <p className="contact__sub">30 minutes, your workflows, no slides. We'll reply within a day.</p>
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
