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
    title: 'The Studio Overview.',
    caption:
      'A calm home screen your team opens every morning. What is pending, what needs a decision, what just landed - all in one place.',
    hotspots: [
      { x: 26, y: 26, title: 'Live KPIs',       note: 'Studio-wide numbers, always current.' },
      { x: 55, y: 62, title: 'Activity feed',   note: 'Everything that just ran, in one stream.' },
      { x: 82, y: 24, title: 'Team snapshot',   note: 'Who is on, who is off, at a glance.' },
    ],
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: '◉',
    url: 'mh02.app/clients/new',
    image: '/preview/add-client.png',
    title: 'One home for every client.',
    caption:
      'Add a client in a minute. Every project, invoice and communication threads back to the right record - with no spreadsheet in sight.',
    hotspots: [
      { x: 40, y: 32, title: 'Structured intake', note: 'The fields you actually need. Nothing extra.' },
      { x: 68, y: 74, title: 'One-click save',    note: 'They show up across the app immediately.' },
    ],
  },
  {
    id: 'employees',
    label: 'Team',
    icon: '⬢',
    url: 'mh02.app/employees',
    image: '/preview/employees-tab.png',
    title: 'The team, at a glance.',
    caption:
      'Every employee, their role, their reporting line and their status. Onboarding, offboarding and role changes without an HR ticket.',
    hotspots: [
      { x: 22, y: 38, title: 'Roles + reporting', note: 'The org chart in one filterable table.' },
      { x: 78, y: 42, title: 'Quick actions',      note: 'Update status without leaving the row.' },
    ],
  },
  {
    id: 'hr',
    label: 'HR',
    icon: '✦',
    url: 'mh02.app/hr/increments',
    image: '/preview/hr-increment.png',
    title: 'HR, without the friction.',
    caption:
      'Increments, appraisals, public holidays and payroll context - captured against the person, not buried in an email thread.',
    hotspots: [
      { x: 32, y: 44, title: 'Increment ledger', note: 'Full history, per person, always visible.' },
      { x: 72, y: 66, title: 'Approval flow',   note: 'Route to the right approver, automatically.' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '▤',
    url: 'mh02.app/projects/stats',
    image: '/preview/project-stats-1.png',
    title: 'Every project, in focus.',
    caption:
      'Estimation, delivery, burn and reporting - one screen per project that leadership can scan without a meeting.',
    hotspots: [
      { x: 30, y: 34, title: 'Live project stats', note: 'Hours, budget and progress in real time.' },
      { x: 66, y: 58, title: 'Delivery timeline',   note: 'What has shipped, what is next.' },
    ],
  },
  {
    id: 'estimation',
    label: 'Estimation',
    icon: '∑',
    url: 'mh02.app/projects/estimate',
    image: '/preview/project-estimation.png',
    title: 'Estimate with confidence.',
    caption:
      'Bake past-project data into every new estimate. Time, cost and confidence bands calculated for you before the pitch goes out.',
    hotspots: [
      { x: 38, y: 40, title: 'Data-backed lines', note: 'Rooted in your team’s past velocity.' },
      { x: 68, y: 72, title: 'Confidence bands',  note: 'So you never over-promise.' },
    ],
  },
  {
    id: 'invoicing',
    label: 'Invoicing',
    icon: '▥',
    url: 'mh02.app/invoices/new',
    image: '/preview/invoice-generation.png',
    title: 'Invoices, generated.',
    caption:
      'The claim is approved, the hours are logged. The invoice writes itself - accounts just reviews and sends. Month-end is a five-minute job.',
    hotspots: [
      { x: 44, y: 38, title: 'Auto-drafted', note: 'From approved hours and expenses.' },
      { x: 72, y: 78, title: 'Send in one click', note: 'PDF, email, ledger - all done.' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '◫',
    url: 'mh02.app/projects/report',
    image: '/preview/project-report.png',
    title: 'Monthly summaries, delivered.',
    caption:
      'On the 1st, leadership gets a clean summary in Slack. Nobody assembled it. Nobody had to remember.',
    hotspots: [
      { x: 34, y: 48, title: 'Trend at a glance', note: 'Month-over-month, by project.' },
      { x: 70, y: 30, title: 'Slack-ready format', note: 'Auto-posted to the leadership channel.' },
    ],
  },
];

/* A shorter set used in the Home flagship "compact" widget */
export const HOME_SCREEN_IDS = ['dashboard', 'clients', 'projects', 'invoicing'];
