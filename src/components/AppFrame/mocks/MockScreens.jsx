import { motion } from 'motion/react';
import './mocks.css';

/* ═══════════════════════════════════════════════════════════
   Fictional demo data — entirely made up for illustration
   ═══════════════════════════════════════════════════════════ */

const INR = (n) => `₹${n.toLocaleString('en-IN')}`;

const REVENUE = [
  { m: 'Jan', v: 8 },  { m: 'Feb', v: 15 }, { m: 'Mar', v: 11 },
  { m: 'Apr', v: 22 }, { m: 'May', v: 19 }, { m: 'Jun', v: 28 },
  { m: 'Jul', v: 16 }, { m: 'Aug', v: 31 }, { m: 'Sep', v: 38 },
  { m: 'Oct', v: 45 }, { m: 'Nov', v: 35 }, { m: 'Dec', v: 40 },
];

const TEAM = [
  { i: 'SK', name: 'Siddharth Kapoor',     id: 'EMP-101', role: 'Design Lead',       tag: 'Employee',        join: '12 Jan 2025', sal: 48000 },
  { i: 'NM', name: 'Nandini Mehta',        id: 'EMP-102', role: 'Project Manager',   tag: 'Project Manager', join: '03 Mar 2025', sal: 62000 },
  { i: 'AV', name: 'Arjun Venkatesh',      id: 'EMP-103', role: 'Frontend Engineer', tag: 'Employee',        join: '18 Jul 2025', sal: 38000 },
  { i: 'PG', name: 'Priya Ghosh',          id: 'EMP-104', role: 'UX Researcher',     tag: 'Employee',        join: '09 Sep 2025', sal: 35000 },
  { i: 'RT', name: 'Rahul Tiwari',         id: 'EMP-105', role: 'Backend Engineer',  tag: 'Employee',        join: '22 Nov 2025', sal: 42000 },
  { i: 'KD', name: 'Kavya Deshmukh',       id: 'EMP-106', role: 'Operations Lead',   tag: 'Project Manager', join: '15 Feb 2025', sal: 55000 },
];

const INVOICES = [
  { n: 'INV-207', dt: '28 Dec', client: 'Horizon Constructions',    proj: 'Lakewood Residences Phase 2',   base: 185000,  tax: 33300,  total: 218300 },
  { n: 'INV-206', dt: '22 Dec', client: 'Pinnacle Design Studio',   proj: 'Marina Bay Office Tower',       base: 92000,   tax: 16560,  total: 108560 },
  { n: 'INV-205', dt: '15 Dec', client: 'Vantage Infrastructure',   proj: 'Metro Link Corridor',           base: 540000,  tax: 97200,  total: 637200 },
  { n: 'INV-204', dt: '10 Dec', client: 'Atlas Urban Developers',   proj: 'Greenfield Campus',             base: 118000,  tax: 21240,  total: 139240 },
  { n: 'INV-203', dt: '04 Dec', client: 'Silverline Architects',    proj: 'Central Library Renovation',    base: 310000,  tax: 55800,  total: 365800 },
];

const CLIENTS_LIST = [
  { name: 'Horizon Constructions',    city: 'Hyderabad',  projects: 5, status: 'Active' },
  { name: 'Pinnacle Design Studio',   city: 'Chennai',    projects: 3, status: 'Active' },
  { name: 'Vantage Infrastructure',   city: 'Delhi',      projects: 7, status: 'Active' },
  { name: 'Atlas Urban Developers',   city: 'Ahmedabad',  projects: 2, status: 'Onboarding' },
];

const PROJECTS = [
  { name: 'Lakewood Residences',     client: 'Horizon Constructions',  progress: 76, budget: 68, mgr: 'NM' },
  { name: 'Marina Bay Office Tower', client: 'Pinnacle Design Studio', progress: 58, budget: 42, mgr: 'KD' },
  { name: 'Metro Link Corridor',     client: 'Vantage Infrastructure', progress: 35, budget: 28, mgr: 'NM' },
  { name: 'Central Library Reno',    client: 'Silverline Architects',  progress: 91, budget: 85, mgr: 'KD' },
];

const REPORT_ROWS = [
  { proj: 'Lakewood Residences',      hours: 172, rev: 218300,  util: 88 },
  { proj: 'Marina Bay Office Tower',  hours: 114, rev: 108560,  util: 75 },
  { proj: 'Metro Link Corridor',      hours: 86,  rev: 637200,  util: 82 },
  { proj: 'Greenfield Campus',        hours: 48,  rev: 139240,  util: 69 },
  { proj: 'Central Library Reno',     hours: 38,  rev: 365800,  util: 73 },
];

/* ═══════════════════════════════════════════════════════════
   Reusable primitives
   ═══════════════════════════════════════════════════════════ */

const Toolbar = ({ title, sub, cta }) => (
  <div className="mk-toolbar">
    <div>
      <h4 className="mk-toolbar__h">{title}</h4>
      {sub && <p className="mk-toolbar__s">{sub}</p>}
    </div>
    {cta && (
      <button type="button" className="mk-btn">
        <span>＋</span>{cta}
      </button>
    )}
  </div>
);

const Kpi = ({ tint, icon, label, value, sub }) => (
  <div className={`mk-kpi mk-kpi--${tint}`}>
    <span className="mk-kpi__icon" aria-hidden="true">{icon}</span>
    <div className="mk-kpi__body">
      <span className="mk-kpi__l">{label}</span>
      <span className="mk-kpi__v">{value}</span>
      <span className="mk-kpi__s">{sub}</span>
    </div>
  </div>
);

/* Donut chart via conic-gradient — segments = [ [percent, color], ... ] */
const Donut = ({ segments, size = 92 }) => {
  let acc = 0;
  const stops = segments.map(([pct, col]) => {
    const from = acc;
    acc += pct;
    return `${col} ${from}% ${acc}%`;
  }).join(', ');
  return (
    <div
      className="mk-donut"
      style={{
        width: size, height: size,
        background: `conic-gradient(${stops})`,
      }}
    >
      <div className="mk-donut__hole" style={{ width: size * 0.62, height: size * 0.62 }} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   1. Dashboard
   ═══════════════════════════════════════════════════════════ */
const DashboardMock = () => {
  const max = Math.max(...REVENUE.map(r => r.v));
  const w = 600;
  const h = 130;
  const pts = REVENUE.map((r, i) => {
    const x = (i / (REVENUE.length - 1)) * w;
    const y = h - (r.v / max) * (h - 12) - 6;
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const area = path + ` L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="mk mk--dashboard">
      <div className="mk-card mk-card--wide">
        <div className="mk-card__head">
          <h4>Monthly Revenue</h4>
          <span>Invoice subtotals · Jan – Dec</span>
        </div>
        <div className="mk-chart">
          <div className="mk-chart__ax">
            {['₹50L', '₹40L', '₹30L', '₹20L', '₹0'].map(l => <span key={l}>{l}</span>)}
          </div>
          <svg viewBox={`0 0 ${w} ${h + 22}`} className="mk-chart__svg" preserveAspectRatio="none">
            {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
              <line key={i} x1="0" x2={w} y1={h * y} y2={h * y} stroke="#e6ecea" strokeWidth="1" />
            ))}
            <path d={area} fill="rgba(40,117,71,0.14)" />
            <motion.path
              d={path}
              fill="none"
              stroke="#287457"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.4" fill="#fff" stroke="#287457" strokeWidth="1.6" />
            ))}
            {REVENUE.map((r, i) => (
              <text key={r.m} x={(i / (REVENUE.length - 1)) * w} y={h + 14} textAnchor="middle" fontSize="8" fill="#9aa4a0">
                {r.m}
              </text>
            ))}
          </svg>
        </div>
      </div>

      <div className="mk-row">
        <div className="mk-card">
          <div className="mk-card__head">
            <h4>Project Status</h4>
            <span>Billed vs outstanding · all projects</span>
          </div>
          <div className="mk-donut-row">
            <Donut segments={[[87.6, '#287457'], [12.4, '#e35b5b']]} />
            <div className="mk-legend">
              <div><i style={{ background: '#287457' }} /> Billed <b>₹14.69L</b><em>87.6%</em></div>
              <div><i style={{ background: '#e35b5b' }} /> Outstanding <b>₹2.08L</b><em>12.4%</em></div>
            </div>
          </div>
        </div>

        <div className="mk-card">
          <div className="mk-card__head">
            <h4>Cost Breakdown</h4>
            <span>Payroll · overheads · margin</span>
          </div>
          <div className="mk-donut-row">
            <Donut segments={[[18.5, '#e35b5b'], [11.2, '#7961d2'], [70.3, '#2ea760']]} />
            <div className="mk-legend">
              <div><i style={{ background: '#e35b5b' }} /> Payroll <b>₹3.10L</b><em>18.5%</em></div>
              <div><i style={{ background: '#7961d2' }} /> Overheads <b>₹1.88L</b><em>11.2%</em></div>
              <div><i style={{ background: '#2ea760' }} /> Margin <b>₹11.79L</b><em>70.3%</em></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   2. Clients (Add New Client form)
   ═══════════════════════════════════════════════════════════ */
const ClientsMock = () => (
  <div className="mk mk--clients">
    <Toolbar title="Clients" sub="Every project, invoice and thread traced back to the right record." cta="New Client" />

    <div className="mk-splits">
      <div className="mk-card">
        <div className="mk-card__head">
          <h4>Add New Client</h4>
          <span>Fill only what's needed. Save when done.</span>
        </div>
        <div className="mk-form">
          {[
            ['Company name', 'Horizon Constructions'],
            ['Contact person', 'Vikram Sethi'],
            ['Email',      'vikram@horizoncon.in'],
            ['Phone',      '+91 99001 56789'],
            ['GST',        '36AADCH7890P1ZQ'],
            ['PAN',        'AADCH7890P'],
          ].map(([l, v]) => (
            <label key={l} className="mk-field">
              <span>{l}</span>
              <input type="text" defaultValue={v} readOnly />
            </label>
          ))}
          <label className="mk-field mk-field--full">
            <span>Address</span>
            <input type="text" defaultValue="12th Floor, Banjara Hills, Hyderabad 500034" readOnly />
          </label>
          <div className="mk-form__foot">
            <span className="mk-form__note mono">DRAFT — 6 OF 8 REQUIRED FIELDS COMPLETE</span>
            <div className="mk-form__actions">
              <button type="button" className="mk-btn mk-btn--ghost">Cancel</button>
              <button type="button" className="mk-btn">Save client</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mk-card mk-card--slim">
        <div className="mk-card__head">
          <h4>Recent</h4>
          <span>Last four added</span>
        </div>
        <ul className="mk-list">
          {CLIENTS_LIST.map((c) => (
            <li key={c.name}>
              <span className="mk-list__avatar">{c.name.slice(0, 2).toUpperCase()}</span>
              <div>
                <b>{c.name}</b>
                <em>{c.city} · {c.projects} projects</em>
              </div>
              <span className={`mk-chip mk-chip--${c.status === 'Active' ? 'ok' : 'wait'}`}>{c.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   3. Team / Employees (card grid)
   ═══════════════════════════════════════════════════════════ */
const TeamMock = () => (
  <div className="mk mk--team">
    <Toolbar title="Employee directory" sub="Search and manage employees through the card list." cta="Add employee" />
    <div className="mk-grid">
      {TEAM.map((e) => (
        <div className="mk-emp" key={e.id}>
          <div className="mk-emp__head">
            <span className="mk-emp__av">{e.i}</span>
            <div>
              <b>{e.name}</b>
              <em className="mono">{e.id}</em>
            </div>
            <span className={`mk-chip mk-chip--${e.tag === 'Project Manager' ? 'wait' : 'ok'}`}>{e.tag}</span>
          </div>
          <ul className="mk-emp__body">
            <li><span>Designation</span><b>{e.role}</b></li>
            <li><span>Joining</span><b>{e.join}</b></li>
            <li><span>Salary</span><b>{INR(e.sal)}</b></li>
          </ul>
          <a className="mk-emp__edit" href="#">Edit</a>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   4. HR (Salary Increments)
   ═══════════════════════════════════════════════════════════ */
const HrMock = () => (
  <div className="mk mk--hr">
    <div className="mk-head-block">
      <h4 className="mk-head-title">Human Resources</h4>
      <p className="mk-head-sub">Salary increments and the company holiday calendar</p>
      <div className="mk-tabs">
        <button className="mk-tab mk-tab--on">↗ Salary Increments</button>
        <button className="mk-tab">▤ Holidays</button>
      </div>
    </div>

    <div className="mk-card mk-card--flush">
      <table className="mk-table">
        <thead>
          <tr>
            <th>Employee</th><th>Designation</th><th className="mk-tr">Current salary</th>
            <th className="mk-tr">Hourly rate</th><th>Effective from</th><th></th>
          </tr>
        </thead>
        <tbody>
          {TEAM.slice(0, 6).map((e) => (
            <tr key={e.id}>
              <td><b>{e.name}</b></td>
              <td>{e.role}</td>
              <td className="mk-tr">{INR(e.sal)}</td>
              <td className="mk-tr">₹{Math.round(e.sal / 160).toLocaleString('en-IN')}.00</td>
              <td>{e.join.replace(' ', '-')}</td>
              <td className="mk-tr">
                <a className="mk-link">History</a>
                <button className="mk-btn mk-btn--sm">＋ Increment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   5. Projects (stats)
   ═══════════════════════════════════════════════════════════ */
const ProjectsMock = () => (
  <div className="mk mk--projects">
    <Toolbar title="Projects" sub="Every project, at a glance. Filter, drill in, catch drift early." />

    <div className="mk-kpis">
      <Kpi tint="green" icon="◉" label="ACTIVE PROJECTS"   value="9" sub="+3 this quarter" />
      <Kpi tint="blue"  icon="▤" label="HOURS THIS MONTH"  value="958" sub="79% billable" />
      <Kpi tint="red"   icon="◐" label="AT RISK"           value="1" sub="check timeline" />
      <Kpi tint="mute"  icon="◆" label="ON TIME"           value="8 / 9" sub="delivery" />
    </div>

    <div className="mk-card">
      <div className="mk-card__head">
        <h4>Live project stats</h4>
        <span>Progress and budget burn, in real time</span>
      </div>
      <ul className="mk-plist">
        {PROJECTS.map((p) => (
          <li key={p.name}>
            <div className="mk-plist__head">
              <b>{p.name}</b>
              <em>{p.client} · PM {p.mgr}</em>
            </div>
            <div className="mk-plist__bars">
              <div className="mk-plist__row">
                <span>Progress</span>
                <div className="mk-bar"><i style={{ width: `${p.progress}%`, background: '#287457' }} /></div>
                <b>{p.progress}%</b>
              </div>
              <div className="mk-plist__row">
                <span>Budget used</span>
                <div className="mk-bar"><i style={{ width: `${p.budget}%`, background: p.budget > 80 ? '#e35b5b' : '#7961d2' }} /></div>
                <b>{p.budget}%</b>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   6. Estimation
   ═══════════════════════════════════════════════════════════ */
const EstimationMock = () => {
  const lines = [
    ['Schematic design',    'Design lead',       40,  2200],
    ['3D visualization',    'Visualization lead', 28, 1900],
    ['Technical drawings',  'Drafting engineer',  52, 1400],
    ['Site coordination',   'PM',                 18, 2400],
    ['Stakeholder reviews', 'Design lead',        10, 2200],
  ];
  const subtotal = lines.reduce((s, l) => s + l[2] * l[3], 0);
  const tax = Math.round(subtotal * 0.18);
  return (
    <div className="mk mk--estim">
      <Toolbar title="New project estimate" sub="Data-backed lines rooted in your team's past velocity." cta="Send to client" />

      <div className="mk-splits">
        <div className="mk-card">
          <div className="mk-card__head">
            <h4>Horizon Constructions · Lakewood Phase 2</h4>
            <span>Draft · updated moments ago</span>
          </div>
          <table className="mk-table">
            <thead>
              <tr><th>Task</th><th>Role</th><th className="mk-tr">Hours</th><th className="mk-tr">Rate</th><th className="mk-tr">Total</th></tr>
            </thead>
            <tbody>
              {lines.map(([t, r, h, rate]) => (
                <tr key={t}>
                  <td><b>{t}</b></td>
                  <td>{r}</td>
                  <td className="mk-tr">{h}</td>
                  <td className="mk-tr">{INR(rate)}</td>
                  <td className="mk-tr"><b>{INR(h * rate)}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mk-card mk-card--slim">
          <div className="mk-card__head">
            <h4>Totals</h4>
            <span>Confidence: <b style={{ color: '#287457' }}>High</b></span>
          </div>
          <ul className="mk-totals">
            <li><span>Subtotal</span><b>{INR(subtotal)}</b></li>
            <li><span>GST 18%</span><b>{INR(tax)}</b></li>
            <li className="mk-totals__final"><span>Total</span><b>{INR(subtotal + tax)}</b></li>
          </ul>
          <div className="mk-conf">
            <span className="mk-conf__l">Confidence band</span>
            <div className="mk-conf__bar">
              <i style={{ left: '50%', width: '28%' }} />
              <em style={{ left: '63%' }}>±10%</em>
            </div>
            <span className="mk-conf__note">Based on 6 similar projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   7. Invoicing
   ═══════════════════════════════════════════════════════════ */
const InvoicingMock = () => (
  <div className="mk mk--inv">
    <div className="mk-head-block">
      <h4 className="mk-head-title">Invoices</h4>
      <p className="mk-head-sub">Track billed amounts, taxes and PDFs in one place</p>
    </div>
    <div className="mk-kpis">
      <Kpi tint="green" icon="◉" label="TOTAL BILLED"   value="₹14,69,100" sub="across 9 invoices" />
      <Kpi tint="blue"  icon="▤" label="BASE (PRE-TAX)" value="₹12,45,000" sub="subtotal before GST" />
      <Kpi tint="yellow" icon="◧" label="TAX COLLECTED" value="₹2,24,100"  sub="CGST + SGST + IGST" />
    </div>

    <div className="mk-card mk-card--flush">
      <div className="mk-inv-bar">
        <span className="mk-search">🔍 Search invoice #, client, project…</span>
        <div className="mk-inv-chips">
          <span className="mk-inv-chip mk-inv-chip--on">▤ All <b>9</b></span>
          <span className="mk-inv-chip">◉ Tax Invoice <b>9</b></span>
          <span className="mk-inv-chip">◧ Proforma <b>0</b></span>
        </div>
      </div>
      <table className="mk-table mk-table--inv">
        <thead>
          <tr>
            <th>Invoice</th><th>Date</th><th>Client & Project</th>
            <th className="mk-tr">Base</th><th className="mk-tr">Tax</th><th className="mk-tr">Total</th>
          </tr>
        </thead>
        <tbody>
          {INVOICES.map((r) => (
            <tr key={r.n}>
              <td><b>{r.n}</b><span className="mk-tag">TAX</span></td>
              <td><b>{r.dt}</b><em className="mono">DEC 25</em></td>
              <td><b>{r.client}</b><em>📁 {r.proj}</em></td>
              <td className="mk-tr">{INR(r.base)}</td>
              <td className="mk-tr" style={{ color: '#c96434' }}>{INR(r.tax)}</td>
              <td className="mk-tr"><b>{INR(r.total)}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   8. Reports (monthly project report)
   ═══════════════════════════════════════════════════════════ */
const ReportsMock = () => (
  <div className="mk mk--rep">
    <Toolbar title="Monthly report · Dec 2025" sub="Auto-assembled from timesheets, invoices and approvals" cta="Send to Slack" />

    <div className="mk-kpis">
      <Kpi tint="green" icon="◉" label="HOURS LOGGED"  value="958" sub="+9% vs Nov" />
      <Kpi tint="blue"  icon="▤" label="REVENUE"       value="₹14.69L" sub="+14% vs Nov" />
      <Kpi tint="mute"  icon="◐" label="UTILIZATION"   value="81%"    sub="target 75%" />
      <Kpi tint="yellow" icon="◧" label="DELIVERIES"   value="3 / 4" sub="on schedule" />
    </div>

    <div className="mk-card mk-card--flush">
      <div className="mk-card__head">
        <h4>By project</h4>
        <span>Sorted by revenue</span>
      </div>
      <table className="mk-table">
        <thead>
          <tr>
            <th>Project</th><th className="mk-tr">Hours</th><th className="mk-tr">Revenue</th><th>Utilization</th>
          </tr>
        </thead>
        <tbody>
          {REPORT_ROWS.map((r) => (
            <tr key={r.proj}>
              <td><b>{r.proj}</b></td>
              <td className="mk-tr">{r.hours}</td>
              <td className="mk-tr"><b>{INR(r.rev)}</b></td>
              <td>
                <div className="mk-util">
                  <div className="mk-bar"><i style={{ width: `${r.util}%`, background: r.util >= 80 ? '#287457' : '#7961d2' }} /></div>
                  <b>{r.util}%</b>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Registry — id → mock component
   ═══════════════════════════════════════════════════════════ */
export const MOCK_SCREENS = {
  dashboard:  DashboardMock,
  clients:    ClientsMock,
  employees:  TeamMock,
  hr:         HrMock,
  projects:   ProjectsMock,
  estimation: EstimationMock,
  invoicing:  InvoicingMock,
  reports:    ReportsMock,
};
