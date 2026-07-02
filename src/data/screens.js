/**
 * Shared "playtest" screen definitions used by the AppFrame widget.
 * `hotspots` position is in % of the image (0–100).
 */
export const SCREENS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '▦',
    url: 'mh02.app/dashboard',
    image: '/preview/admin-dash.png',
    title: 'Your morning dashboard.',
    caption:
      'Open this first thing. You can see what\'s pending, who needs to do what, and what just happened — without asking anyone.',
    hotspots: [
      { x: 26, y: 26, title: 'Live numbers',       note: 'Studio-wide stats, always up to date.' },
      { x: 55, y: 62, title: 'Activity feed',   note: 'A stream of everything that just happened.' },
      { x: 82, y: 24, title: 'Team snapshot',   note: 'Who\'s on, who\'s off. Quick glance.' },
    ],
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: '◉',
    url: 'mh02.app/clients/new',
    image: '/preview/add-client.png',
    title: 'Add a client in about a minute.',
    caption:
      'Fill in the basics, hit save. Every project, invoice and conversation with that client connects back to this record. No spreadsheet required.',
    hotspots: [
      { x: 40, y: 32, title: 'Just the fields you need', note: 'No bloat. Just what matters for your studio.' },
      { x: 68, y: 74, title: 'One-click save',    note: 'Shows up everywhere in the app right away.' },
    ],
  },
  {
    id: 'employees',
    label: 'Team',
    icon: '⬢',
    url: 'mh02.app/employees',
    image: '/preview/employees-tab.png',
    title: 'Everyone on one screen.',
    caption:
      'Your whole team — role, reporting line, status. Need to onboard someone or change a title? Do it here, not through an HR ticket.',
    hotspots: [
      { x: 22, y: 38, title: 'Roles + reporting', note: 'Your org chart as a filterable table.' },
      { x: 78, y: 42, title: 'Quick actions',      note: 'Change status without leaving the row.' },
    ],
  },
  {
    id: 'hr',
    label: 'HR',
    icon: '✦',
    url: 'mh02.app/hr/increments',
    image: '/preview/hr-increment.png',
    title: 'HR stuff, where it belongs.',
    caption:
      'Increments, appraisals, public holidays, payroll context — recorded against the person, not lost in someone\'s inbox.',
    hotspots: [
      { x: 32, y: 44, title: 'Increment history', note: 'Full record, per person, always visible.' },
      { x: 72, y: 66, title: 'Approval routing',   note: 'Goes to the right approver automatically.' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '▤',
    url: 'mh02.app/projects/stats',
    image: '/preview/project-stats-1.png',
    title: 'See where each project actually stands.',
    caption:
      'Hours, budget, delivery progress — one screen per project. Leadership can check in without scheduling a meeting.',
    hotspots: [
      { x: 30, y: 34, title: 'Project stats', note: 'Hours, budget and progress in real time.' },
      { x: 66, y: 58, title: 'Delivery timeline',   note: 'What\'s shipped, what\'s coming.' },
    ],
  },
  {
    id: 'estimation',
    label: 'Estimation',
    icon: '∑',
    url: 'mh02.app/projects/estimate',
    image: '/preview/project-estimation.png',
    title: 'Stop guessing on estimates.',
    caption:
      'New pitch? The system looks at how long similar work actually took your team and gives you a range. You go in knowing, not hoping.',
    hotspots: [
      { x: 38, y: 40, title: 'Data-backed lines', note: 'Based on how your team actually works.' },
      { x: 68, y: 72, title: 'Confidence bands',  note: 'So you know when you\'re stretching it.' },
    ],
  },
  {
    id: 'invoicing',
    label: 'Invoicing',
    icon: '▥',
    url: 'mh02.app/invoices/new',
    image: '/preview/invoice-generation.png',
    title: 'Invoicing that does itself.',
    caption:
      'The hours are logged, the expenses are approved. The invoice assembles itself from that data. Accounts reviews it and hits send. Five minutes, tops.',
    hotspots: [
      { x: 44, y: 38, title: 'Auto-drafted', note: 'Built from approved hours and expenses.' },
      { x: 72, y: 78, title: 'Send in one click', note: 'PDF, email, ledger entry — done.' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '◫',
    url: 'mh02.app/projects/report',
    image: '/preview/project-report.png',
    title: 'Reports that just show up.',
    caption:
      'On the 1st, a clean summary of last month lands in the Slack leadership channel. Nobody compiled it. Nobody even thought about it.',
    hotspots: [
      { x: 34, y: 48, title: 'Trends at a glance', note: 'Month-over-month, broken out by project.' },
      { x: 70, y: 30, title: 'Slack-ready', note: 'Auto-posted to leadership. No copy-pasting.' },
    ],
  },
];

/* A shorter set used in the Home flagship "compact" widget */
export const HOME_SCREEN_IDS = ['dashboard', 'clients', 'projects', 'invoicing'];
