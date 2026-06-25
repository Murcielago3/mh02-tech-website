import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  DotGrid, SpotlightCard, DecryptedText, ShinyText, CountUp,
  RotatingText, Magnet, GradientText,
} from '../components/reactbits';
import {
  IconBrowser, IconAutomation, IconShield, IconBolt, IconLayers, IconChart, IconArrow,
} from '../components/Icons.jsx';
import './Home.css';

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const CAPABILITIES = [
  { icon: IconBrowser, n: '01', title: 'Web Platforms', desc: 'Production React & Next.js front-ends and FastAPI back-ends - typed end to end, server-rendered, and shipped on edge infrastructure.', tags: ['React', 'Next.js', 'FastAPI'] },
  { icon: IconAutomation, n: '02', title: 'Internal Tools & Automation', desc: 'Operations software that runs the business: dashboards, approval flows, scheduled jobs and Slack-native notifications.', tags: ['Celery', 'Webhooks', 'RBAC'] },
  { icon: IconShield, n: '03', title: 'Security Engineering', desc: 'Threat-modelled architectures, hardened auth, least-privilege access and audited dependencies - security as a default layer.', tags: ['OAuth', 'Auditing', 'Hardening'] },
  { icon: IconBolt, n: '04', title: 'Performance', desc: 'Sub-100ms interactions, streaming responses and ruthless bundle budgets. We measure everything and ship the fast path.', tags: ['Core Web Vitals', 'Caching', 'Profiling'] },
  { icon: IconLayers, n: '05', title: 'Systems & Infra', desc: 'Containerised deploys, Postgres at the core, Redis for speed, and reproducible CI/CD pipelines you can trust.', tags: ['Docker', 'Postgres', 'CI/CD'] },
  { icon: IconChart, n: '06', title: 'Data & Reporting', desc: 'Aggregations, scheduled reports and Block-Kit summaries that put the right numbers in front of the right people, on time.', tags: ['Analytics', 'Reports', 'Pipelines'] },
];

const PROCESS = [
  { n: '01', title: 'Scope', desc: 'We map the system, its constraints and its edges before a line of code is written.' },
  { n: '02', title: 'Architect', desc: 'Data models, contracts and infrastructure are designed to scale and stay legible.' },
  { n: '03', title: 'Build', desc: 'Typed, tested, reviewed. Small increments shipped behind clean interfaces.' },
  { n: '04', title: 'Harden', desc: 'Security passes, load tests and observability before anything touches production.' },
  { n: '05', title: 'Operate', desc: 'Monitoring, automation and iteration - we stay close to what we ship.' },
];

const STACK = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Vite', 'Motion'],
  Backend: ['FastAPI', 'Python', 'SQLAlchemy', 'Pydantic', 'Celery'],
  Data: ['PostgreSQL', 'Redis', 'Alembic', 'asyncpg'],
  Infra: ['Docker', 'Compose', 'Nginx', 'GitHub Actions'],
};

const MARQUEE = ['REACT', 'FASTAPI', 'TYPESCRIPT', 'POSTGRESQL', 'REDIS', 'CELERY', 'DOCKER', 'NEXT.JS', 'PYTHON', 'NGINX', 'VITE', 'SQLALCHEMY'];

export default function Home({ introDone }) {
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
          <DotGrid className="hero__grid" baseColor="#b0c4b8" activeColor="#287457" dotSize={3} />
        </motion.div>
        <div className="hero__fade" />

        <motion.div
          className="hero__content container"
          initial={{ opacity: 0, y: 36 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="hero__eyebrow eyebrow">[ STUDIOMH02 / TECH DIVISION ]</div>

          <h1 className="hero__title">
            <DecryptedText text="We engineer software" as="span" className="hero__title-line" />
            <span className="hero__title-line">
              with <span className="text-grad">precision</span>{' '}
              <RotatingText
                className="hero__rotor"
                words={['& proof.', '& speed.', '& rigor.', '& taste.']}
              />
            </span>
          </h1>

          <p className="hero__sub">
            STUDIOMH02 Tech builds high-performance web platforms, internal tools and
            secure systems - from data model to deployment. No templates, no guesswork.
            <span className="hero__sub-accent"> Measured, typed, and shipped.</span>
          </p>

          <div className="hero__cta">
            <Magnet padding={50} strength={0.3}>
              <a href="#capabilities" className="btn btn--primary">
                <ShinyText text="Explore capabilities" speed={5} />
                <IconArrow width={18} height={18} />
              </a>
            </Magnet>
            <Link to="/product" className="btn btn--ghost">
              <span className="btn__pulse" /> See MH02&nbsp;Dashboard
            </Link>
          </div>

          <div className="hero__spec">
            {[
              ['UPTIME', '99.9', '%'],
              ['P95 LATENCY', '<90', 'ms'],
              ['TYPE COVERAGE', '100', '%'],
              ['SHIP CADENCE', '24/7', ''],
            ].map(([label, val, unit]) => (
              <div className="hero__spec-item" key={label}>
                <span className="hero__spec-val mono">{val}<i>{unit}</i></span>
                <span className="hero__spec-label mono">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hero__scroll mono">SCROLL ↓</div>
      </section>

      {/* ──────────────────────── MARQUEE ─────────────────────── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span className="marquee__item mono" key={i}>
              {t}<i className="marquee__dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ───────────────────────── STATS ──────────────────────── */}
      <section className="stats container">
        {[
          { to: 40, suffix: '+', label: 'Systems shipped', from: 0 },
          { to: 99.9, suffix: '%', label: 'Mean uptime', decimals: 1 },
          { to: 12, suffix: 'ms', label: 'Median query time' },
          { to: 6, suffix: 'yr', label: 'Avg. stack experience' },
        ].map((s, i) => (
          <motion.div className="stats__item" key={s.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
            <span className="stats__num">
              <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals || 0} from={s.from || 0} />
            </span>
            <span className="stats__label mono">{s.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ────────────────────── CAPABILITIES ──────────────────── */}
      <section className="section" id="capabilities">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 01 - CAPABILITIES ]</span>
            <h2 className="section-title">A full-stack discipline,<br />built for what ships.</h2>
            <p className="section__lead">
              We don&apos;t hand off slide decks. We design, build and operate the systems that run businesses.
            </p>
          </motion.div>

          <div className="cap-grid">
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}>
                  <SpotlightCard className="cap-card">
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
        </div>
      </section>

      {/* ──────────────────── FEATURED PRODUCT ────────────────── */}
      <section className="section product-feat">
        <div className="container">
          <motion.div className="product-feat__panel" {...fadeUp}>
            <DotGrid className="product-feat__grid" baseColor="#c7dccf" activeColor="#2f8a54" proximity={150} />
            <div className="product-feat__inner">
              <div className="product-feat__copy">
                <span className="eyebrow">[ FEATURED BUILD ]</span>
                <h2 className="product-feat__title">
                  <GradientText speed={7} colors={['#287457', '#2f8a54', '#1f5d44', '#34965d', '#287457']}>MH02<br />Dashboard</GradientText>
                </h2>
                <p className="product-feat__tagline">The operating system for a studio.</p>
                <p className="product-feat__desc">
                  A full operations platform - timesheets, reimbursements, monthly reporting and
                  Slack-native reminders - powered by FastAPI, Celery and Postgres. Designed,
                  built and run in-house.
                </p>
                <ul className="product-feat__points">
                  {['Role-based access for 4 team functions', 'Automated weekly & monthly Slack workflows', 'Async Python core, containerised deploy'].map((p) => (
                    <li key={p}><span className="dotmark" />{p}</li>
                  ))}
                </ul>
                <Link to="/product" className="btn btn--primary">
                  Explore MH02 Dashboard <IconArrow width={18} height={18} />
                </Link>
              </div>
              <div className="product-feat__visual">
                <div className="term">
                  <div className="term__bar">
                    <i /><i /><i />
                    <span className="mono">celery@mh02-dashboard - beat</span>
                  </div>
                  <pre className="term__body mono">{`[09:00:01] beat: scheduler started
[09:00:01] → monthly_report.dispatch()
[09:00:02] ✓ block-kit summary built
[09:00:02] ✓ posted #management
[12:00:00] → timesheet_reminder.run()
[12:00:01] ✓ 3 nudges @tagged
[12:00:01] exit code 0`}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── PROCESS ────────────────────── */}
      <section className="section" id="process">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 02 - PROCESS ]</span>
            <h2 className="section-title">Five stages. Zero surprises.</h2>
          </motion.div>
          <div className="proc">
            <div className="proc__line" />
            {PROCESS.map((p, i) => (
              <motion.div className="proc__step" key={p.n} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                <span className="proc__n mono">{p.n}</span>
                <h3 className="proc__title">{p.title}</h3>
                <p className="proc__desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── STACK ──────────────────────── */}
      <section className="section" id="stack">
        <div className="container">
          <motion.div className="section__head" {...fadeUp}>
            <span className="eyebrow">[ 03 - STACK ]</span>
            <h2 className="section-title">The tools we trust.</h2>
          </motion.div>
          <div className="stack-grid">
            {Object.entries(STACK).map(([cat, items], i) => (
              <motion.div className="stack-col" key={cat} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}>
                <span className="stack-col__cat mono">{cat}</span>
                <ul>
                  {items.map((it) => <li key={it} className="stack-col__item">{it}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CONTACT ────────────────────── */}
      <section className="section contact" id="contact">
        <motion.div className="contact__panel container" {...fadeUp}>
          <span className="eyebrow">[ START A PROJECT ]</span>
          <h2 className="contact__title">
            Have a system worth <span className="text-grad">building right?</span>
          </h2>
          <p className="contact__sub">Tell us what you&apos;re shipping. We reply within one business day.</p>
          <Magnet padding={50} strength={0.3}>
            <a href="mailto:xyz@studiomh02.com" className="btn btn--primary btn--lg">
              xyz@studiomh02.com <IconArrow width={18} height={18} />
            </a>
          </Magnet>
        </motion.div>
      </section>
    </main>
  );
}
