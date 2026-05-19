/**
 * Generate Smart Pharmacy System presentation (~20 slides)
 * Run: node scripts/generate-slides.js
 */
import PptxGenJS from 'pptxgenjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'Smart_Pharmacy_System_Presentation.pptx');

const C = {
  primary: '1D9E75',
  primaryDark: '157A5C',
  blue: '185FA5',
  slate: '1E293B',
  slateMid: '475569',
  slateLight: '64748B',
  white: 'FFFFFF',
  bg: 'F0FDF6',
  accent: '7F77DD',
  amber: 'BA7517',
};

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Smart Pharmacy Team';
pptx.title = 'Smart Pharmacy System';
pptx.subject = 'Software Engineering Project Presentation';

function addFooter(slide, num) {
  slide.addText(`Smart Pharmacy System  •  Slide ${num}`, {
    x: 0.4, y: 5.25, w: 9.2, h: 0.3,
    fontSize: 8, color: C.slateLight, align: 'right',
  });
}

function titleSlide(slide, title, subtitle, opts = {}) {
  slide.background = { color: C.primary };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: C.primary },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 4.2, w: 10, h: 1.425,
    fill: { color: C.primaryDark, transparency: 30 },
  });
  slide.addText(title, {
    x: 0.6, y: 1.2, w: 8.8, h: 1.2,
    fontSize: 36, bold: true, color: C.white,
    fontFace: 'Georgia',
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 2.5, w: 8.8, h: 0.8,
      fontSize: 16, color: 'E1F5EE',
    });
  }
  if (opts.badges) {
    slide.addText(opts.badges, {
      x: 0.6, y: 4.45, w: 8.8, h: 0.5,
      fontSize: 11, color: 'C8F0E0', bold: true,
    });
  }
}

function sectionSlide(slide, sectionTag, title, bodyLines = []) {
  slide.background = { color: C.white };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.primary },
  });
  slide.addText(sectionTag.toUpperCase(), {
    x: 0.5, y: 0.35, w: 3, h: 0.35,
    fontSize: 9, bold: true, color: C.primary,
    charSpacing: 3,
  });
  slide.addText(title, {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontSize: 28, bold: true, color: C.slate, fontFace: 'Georgia',
  });
  if (bodyLines.length) {
    slide.addText(bodyLines.map((t) => ({ text: t, options: { breakLine: true, paraSpaceAfter: 8 } })), {
      x: 0.5, y: 1.55, w: 9, h: 3.5,
      fontSize: 13, color: C.slateMid, valign: 'top',
    });
  }
}

function bulletBlock(slide, items, x, y, w, h, opts = {}) {
  const rows = items.map((t) => ({
    text: t,
    options: { bullet: true, breakLine: true, paraSpaceAfter: 6, fontSize: opts.fontSize || 11, color: opts.color || C.slateMid },
  }));
  slide.addText(rows, { x, y, w, h, valign: 'top' });
}

function card(slide, x, y, w, h, title, desc, color) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: 'FFFFFF' },
    line: { color: 'E2E8F0', width: 1 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.15, y: y + 0.2, w: 0.35, h: 0.35,
    fill: { color },
  });
  slide.addText(title, {
    x: x + 0.15, y: y + 0.65, w: w - 0.3, h: 0.4,
    fontSize: 12, bold: true, color: C.slate,
  });
  slide.addText(desc, {
    x: x + 0.15, y: y + 1.05, w: w - 0.3, h: h - 1.2,
    fontSize: 9, color: C.slateLight, valign: 'top',
  });
}

// ── Slide 1: Title ───────────────────────────────────────────
{
  const s = pptx.addSlide();
  titleSlide(s, 'Smart Pharmacy System', 'Full-Stack Web Application for Modern Pharmacy Management', {
    badges: 'React  •  Node.js  •  Express  •  MySQL  •  JWT  •  Tailwind CSS  •  Vite',
  });
  const meta = [
    ['COURSE', 'Software Engineering'],
    ['TEAM', 'Yousef  •  Mohammad  •  Waseem'],
    ['UNIVERSITY', 'An-Najah National University'],
    ['DATE', 'May 2026'],
  ];
  meta.forEach(([k, v], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    s.addText(k, {
      x: 0.6 + col * 4.5, y: 3.15 + row * 0.55, w: 1.2, h: 0.3,
      fontSize: 8, bold: true, color: 'A8E6CF',
    });
    s.addText(v, {
      x: 1.5 + col * 4.5, y: 3.15 + row * 0.55, w: 3.5, h: 0.3,
      fontSize: 11, color: C.white,
    });
  });
}

// ── Slide 2: Project Overview ────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Introduction', 'Project Overview', [
    'What is the Smart Pharmacy System?',
    'A comprehensive full-stack web application that modernizes pharmacy operations — connecting customers and administrators through one unified digital platform (MediCare).',
  ]);
  const features = [
    ['Medicine Catalog', 'Browse, search, filter & order medicines online with live stock'],
    ['Appointment Booking', 'Schedule doctor consultations with availability checks'],
    ['Shopping Cart', 'Add items, adjust quantities, checkout with order tracking'],
    ['Admin Dashboard', 'CRUD for medicines, orders, appointments, users & suppliers'],
  ];
  features.forEach(([t, d], i) => {
    card(s, 0.5 + (i % 2) * 4.6, 2.35 + Math.floor(i / 2) * 1.55, 4.3, 1.4, t, d, C.primary);
  });
  s.addText('Tech Stack:  React.js  •  Vite  •  Tailwind CSS  •  Node.js  •  Express  •  MySQL  •  JWT  •  Axios', {
    x: 0.5, y: 5.0, w: 9, h: 0.35, fontSize: 9, color: C.primary, bold: true,
  });
  addFooter(s, 2);
}

// ── Slide 3: Problem Definition ──────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Motivation', 'Problem Definition', [
    'Challenges in traditional pharmacy systems that our project addresses:',
  ]);
  const problems = [
    ['1. Unavailable Medicine Info', 'Customers cannot check stock or prices without visiting in person.'],
    ['2. No Online Purchasing', 'No digital channel to search, order, or pay for medicines remotely.'],
    ['3. Manual Appointment Booking', 'Phone scheduling causes conflicts, double-booking, and long waits.'],
    ['4. Weak Supplier Management', 'Paper-based tracking leads to stockouts and ordering delays.'],
    ['5. No Order Visibility', 'Customers lack real-time status for pending or delivered orders.'],
    ['6. Slow Admin Operations', 'Manual inventory and reporting consume excessive staff time.'],
  ];
  problems.forEach(([t, d], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    card(s, 0.5 + col * 4.6, 2.0 + row * 1.15, 4.3, 1.05, t, d, i % 2 === 0 ? C.primary : C.blue);
  });
  addFooter(s, 3);
}

// ── Slide 4: Stakeholders ────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Analysis', 'Stakeholder Analysis', [
    'Who interacts with the Smart Pharmacy System?',
  ]);
  const stakeholders = [
    ['Admin', 'Manages medicines, orders, appointments, suppliers, users & analytics via /admin dashboard.'],
    ['Customers', 'Browse & purchase medicines, book appointments, and track order status.'],
    ['Pharmacists', 'Listed on the team page; shifts (morning/evening/night) managed by admin.'],
    ['Doctors', 'Profiles displayed publicly; patients book consultations through the booking flow.'],
    ['Suppliers', 'Supply chain partners; contact records and status maintained by admin.'],
  ];
  stakeholders.forEach(([t, d], i) => {
    const x = 0.5 + (i % 3) * 3.1;
    const y = 2.0 + Math.floor(i / 3) * 1.75;
    if (i < 3) card(s, x, y, 2.9, 1.55, t, d, [C.primary, C.blue, C.amber][i]);
    else card(s, 0.5, 3.75, 2.9, 1.55, t, d, C.accent);
  });
  addFooter(s, 4);
}

// ── Slide 5: Functional Requirements ─────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Requirements', 'Functional Requirements', ['What the system must do:']);
  s.addText('Customer Features', { x: 0.5, y: 1.45, w: 3, h: 0.35, fontSize: 12, bold: true, color: C.primary });
  bulletBlock(s, [
    'FR-01: Browse medicine catalog with categories',
    'FR-02: Search & filter medicines by name',
    'FR-03: View medicine details (price, stock, usage)',
    'FR-04: Add medicines to shopping cart',
    'FR-05: Place orders (checkout)',
    'FR-06: Book doctor appointments',
    'FR-07: View doctors & pharmacists info',
  ], 0.5, 1.8, 3.0, 3.2);

  s.addText('Admin Features', { x: 3.55, y: 1.45, w: 3, h: 0.35, fontSize: 12, bold: true, color: C.blue });
  bulletBlock(s, [
    'FR-08: Manage medicines (CRUD + images)',
    'FR-09: Manage orders (status updates)',
    'FR-10: Approve/reject appointments',
    'FR-11: Manage suppliers',
    'FR-12: Manage users & pharmacists',
    'FR-13: View analytics & reports',
    'FR-14: Review job applications (CV upload)',
  ], 3.55, 1.8, 3.0, 3.2);

  s.addText('System Requirements', { x: 6.6, y: 1.45, w: 3, h: 0.35, fontSize: 12, bold: true, color: C.amber });
  bulletBlock(s, [
    'FR-15: REST API (Frontend ↔ Backend)',
    'FR-16: JWT authentication & roles',
    'FR-17: Responsive navigation',
    'FR-18: Real-time stock updates',
    'FR-19: Data validation & error handling',
    'FR-20: Local data fallback (offline resilience)',
  ], 6.6, 1.8, 3.0, 3.2);
  addFooter(s, 5);
}

// ── Slide 6: Non-Functional Requirements ───────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Requirements', 'Non-Functional Requirements', ['System quality attributes:']);
  const nfr = [
    ['1', 'Performance', '< 2 sec response per typical interaction'],
    ['2', 'Responsive Design', 'Mobile, tablet & desktop compatible (Tailwind)'],
    ['3', 'Scalability', 'MySQL relational schema with indexed queries'],
    ['4', 'Security', 'JWT auth, bcrypt passwords, rate limiting, input validation'],
    ['5', 'Usability', 'Intuitive UI with minimal training required'],
    ['6', 'Reliability', 'Graceful error handling & API health checks'],
    ['7', 'Maintainability', 'Modular React components & Express routes'],
    ['8', 'Cross-Browser', 'Chrome, Firefox, Edge, Safari support'],
  ];
  nfr.forEach(([num, t, d], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.6;
    const y = 1.85 + row * 0.95;
    s.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.4, h: 0.4, fill: { color: C.primary } });
    s.addText(num, { x, y: y + 0.05, w: 0.4, h: 0.35, fontSize: 12, bold: true, color: C.white, align: 'center' });
    s.addText(t, { x: x + 0.5, y, w: 3.8, h: 0.35, fontSize: 12, bold: true, color: C.slate });
    s.addText(d, { x: x + 0.5, y: y + 0.38, w: 3.8, h: 0.5, fontSize: 10, color: C.slateLight });
  });
  addFooter(s, 6);
}

// ── Slide 7: System Architecture ─────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Design', 'System Architecture', ['Three-tier architecture — React SPA + Express API + MySQL']);
  const tiers = [
    ['FRONTEND', 'React.js + Vite + Tailwind CSS + Framer Motion', ['Component-based SPA', 'React Router', 'AuthContext & useCart hooks', 'Axios API service layer', 'Responsive Navbar']],
    ['BACKEND', 'Node.js + Express.js', ['RESTful API (/api/*)', 'JWT middleware', 'Multer file uploads', 'Rate limiting (200/15min)', 'CORS configuration']],
    ['DATABASE', 'MySQL 8 (smart_pharmacy)', ['Relational tables with FKs', 'users, medicines, orders', 'appointments, pharmacists', 'suppliers, order_items', 'jobs (CV applications)']],
  ];
  tiers.forEach(([title, sub, bullets], i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.0, w: 2.95, h: 2.85, rectRadius: 0.06,
      fill: { color: i === 0 ? 'E1F5EE' : i === 1 ? 'E6F1FB' : 'EEEDFE' },
      line: { color: [C.primary, C.blue, C.accent][i], width: 1.5 },
    });
    s.addText(title, { x, y: 2.1, w: 2.95, h: 0.4, fontSize: 13, bold: true, color: [C.primary, C.blue, C.accent][i], align: 'center' });
    s.addText(sub, { x: x + 0.1, y: 2.5, w: 2.75, h: 0.5, fontSize: 9, color: C.slateMid, align: 'center' });
    bulletBlock(s, bullets, x + 0.15, 3.05, 2.65, 1.7, { fontSize: 9 });
  });
  s.addText('HTTP / REST API  ↔  mysql2 driver  ↔  SQL schema', {
    x: 0.5, y: 5.0, w: 9, h: 0.3, fontSize: 10, bold: true, color: C.primary, align: 'center',
  });
  addFooter(s, 7);
}

// ── Slide 8: Use Case ────────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'UML', 'Use Case Overview', ['Actors and their interactions with the system:']);
  s.addText('CUSTOMER', { x: 0.5, y: 1.5, w: 4.2, h: 0.35, fontSize: 12, bold: true, color: C.primary });
  bulletBlock(s, [
    'Browse Medicine Catalog',
    'Search Medicines by Name/Category',
    'View Medicine Details & Stock',
    'Add Medicines to Cart',
    'Place Order (Checkout)',
    'Book Doctor Appointment',
    'View Doctors & Pharmacists',
    'Register / Login (JWT)',
  ], 0.5, 1.85, 4.2, 3.3);

  s.addText('ADMIN', { x: 5.2, y: 1.5, w: 4.2, h: 0.35, fontSize: 12, bold: true, color: C.blue });
  bulletBlock(s, [
    'Manage Medicines (Add / Edit / Delete)',
    'Manage Orders (Pending → Delivered)',
    'Approve or Reject Appointments',
    'Manage Suppliers',
    'Manage Users & Pharmacists',
    'View Analytics Dashboard',
    'Review Job Applications',
    'Monitor Low-Stock Alerts',
  ], 5.2, 1.85, 4.2, 3.3);
  addFooter(s, 8);
}

// ── Slide 9: Database ERD ────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Database', 'Database Design — ERD', ['MySQL Tables & Relationships (smart_pharmacy):']);
  const tables = [
    ['users', 'id, name, email, password, role\n(admin | pharmacist | customer)'],
    ['medicines', 'id, name, name_ar, category\nprice, stock, min_stock, image_url'],
    ['orders', 'id, customer_name, email, phone\naddress, total, status, payment_method'],
    ['order_items', 'order_id → orders\nmedicine_id → medicines\nquantity, price'],
    ['pharmacists', 'id, name, specialization\nshift, experience, phone'],
    ['appointments', 'id, patient_name, doctor_id\ndate, time, status, notes'],
    ['suppliers', 'id, name, email, phone\naddress, status'],
    ['jobs', 'id, applicant_name, position\nCV file path, status'],
  ];
  tables.forEach(([name, cols], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.45 + col * 2.35;
    const y = 1.75 + row * 1.85;
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 2.2, h: 1.65, rectRadius: 0.05,
      fill: { color: 'F8FAFC' }, line: { color: C.primary, width: 1 },
    });
    s.addText(name, { x, y: y + 0.1, w: 2.2, h: 0.35, fontSize: 11, bold: true, color: C.primary, align: 'center' });
    s.addText(cols, { x: x + 0.1, y: y + 0.5, w: 2.0, h: 1.0, fontSize: 8, color: C.slateMid, valign: 'top' });
  });
  s.addText('Foreign Keys: order_items → orders, medicines  •  appointments → doctors', {
    x: 0.5, y: 5.0, w: 9, h: 0.3, fontSize: 9, color: C.blue, italic: true,
  });
  addFooter(s, 9);
}

// ── Slide 10: UI Design ──────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'UI/UX', 'User Interface Design', ['Key screens and design principles:']);
  const screens = [
    ['Homepage', 'Hero, features, about section, team & CTA with Framer Motion animations.'],
    ['Medicines Page', 'Grid catalog, search bar, category filters, MedCard components & cart panel.'],
    ['Doctors Page', 'Physician cards with specialization & Book navigation.'],
    ['Booking Page', 'Appointment form: doctor, date, time slot, patient details.'],
    ['Shopping Cart', 'Sidebar cart: quantity controls, totals & checkout submission.'],
    ['Admin Dashboard', 'Protected /admin routes: sidebar, overview stats & CRUD tables.'],
    ['Auth Page', 'Login / Register with JWT token stored in context.'],
    ['Analytics', 'Sales charts, top medicines & summary KPIs for admin.'],
  ];
  screens.forEach(([t, d], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    card(s, 0.45 + col * 2.35, 1.75 + row * 1.75, 2.2, 1.55, t, d, [C.primary, C.blue, C.amber, C.accent][col]);
  });
  addFooter(s, 10);
}

// ── Slide 11: Authentication ───────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Security', 'Authentication & Authorization', []);
  const flow = [
    '1. User registers or logs in via POST /api/auth/login',
    '2. Server validates credentials (bcrypt) and returns JWT token',
    '3. Frontend stores token; Axios interceptor attaches Authorization header',
    '4. Protected routes use authMiddleware on the backend',
    '5. Admin-only endpoints check role === admin (adminOnly middleware)',
    '6. React ProtectedRoute guards /admin pages on the frontend',
  ];
  bulletBlock(s, flow, 0.5, 1.55, 5.5, 3.5, { fontSize: 12 });

  s.addShape(pptx.ShapeType.roundRect, {
    x: 6.2, y: 1.7, w: 3.3, h: 3.2, rectRadius: 0.06,
    fill: { color: 'E1F5EE' }, line: { color: C.primary, width: 1 },
  });
  s.addText('Roles', { x: 6.4, y: 1.85, w: 3, h: 0.35, fontSize: 14, bold: true, color: C.primary });
  s.addText([
    { text: 'admin', options: { bold: true, color: C.primary } },
    { text: ' — Full dashboard access\n', options: { breakLine: true } },
    { text: 'pharmacist', options: { bold: true, color: C.blue } },
    { text: ' — Staff profile management\n', options: { breakLine: true } },
    { text: 'customer', options: { bold: true, color: C.amber } },
    { text: ' — Browse, cart & booking\n\n', options: { breakLine: true } },
    { text: 'Demo Admin:\nadmin@medicare.ps / admin123', options: { fontSize: 10, color: C.slateLight } },
  ], { x: 6.4, y: 2.3, w: 2.9, h: 2.5, fontSize: 11, color: C.slateMid });
  addFooter(s, 11);
}

// ── Slide 12: API Endpoints ────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Backend', 'REST API Endpoints', ['Base URL: http://localhost:5000/api']);
  const apis = [
    ['/auth', 'POST register, login  •  GET me'],
    ['/medicines', 'GET catalog  •  CRUD (admin)  •  low-stock alert'],
    ['/orders', 'POST place order  •  GET/PATCH status (admin)'],
    ['/appointments', 'POST book  •  GET availability  •  PATCH status'],
    ['/pharmacists', 'GET public list  •  CRUD (admin)'],
    ['/suppliers', 'CRUD (admin only)'],
    ['/users', 'User management (admin)'],
    ['/analytics', 'summary, sales, top-medicines (admin)'],
    ['/jobs', 'POST apply with CV  •  admin review'],
  ];
  const rows = apis.map(([route, desc]) => [
    { text: route, options: { bold: true, color: C.primary, fontSize: 10 } },
    { text: `  —  ${desc}`, options: { fontSize: 10, color: C.slateMid } },
  ]);
  s.addTable(
    [['Endpoint', 'Description'], ...apis.map(([r, d]) => [r, d])],
    {
      x: 0.5, y: 1.55, w: 9, h: 3.5,
      fontSize: 10,
      border: { type: 'solid', color: 'E2E8F0', pt: 0.5 },
      fill: { color: 'F8FAFC' },
      colW: [1.8, 7.2],
      autoPage: false,
    }
  );
  addFooter(s, 12);
}

// ── Slide 13: Frontend Architecture ──────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Frontend', 'Frontend Architecture', ['React application structure:']);
  bulletBlock(s, [
    'pages/ — Home, Medicines, Doctors, Booking, AuthPage, Admin routes',
    'component/ — Navbar, MedCard, CartPanel, AdminLayout, ProtectedRoute',
    'hooks/ — useCart, useMedications, useApi (data fetching)',
    'context/ — AuthContext (JWT session state)',
    'services/ — api.js (Axios + interceptors), connectionTest.js',
    'data/ — Local fallback data when API is unavailable',
    'Routing — React Router v6 with nested /admin child routes',
  ], 0.5, 1.55, 4.5, 3.5, { fontSize: 11 });

  s.addShape(pptx.ShapeType.roundRect, {
    x: 5.3, y: 1.7, w: 4.2, h: 3.3, rectRadius: 0.06,
    fill: { color: 'E6F1FB' }, line: { color: C.blue, width: 1 },
  });
  s.addText('Key Libraries', { x: 5.5, y: 1.9, w: 3.8, h: 0.35, fontSize: 13, bold: true, color: C.blue });
  bulletBlock(s, [
    'Vite — fast dev server & build',
    'Tailwind CSS — utility-first styling',
    'Framer Motion — page animations',
    'Axios — HTTP client',
    'React Router — SPA navigation',
    'Lucide React — icons',
  ], 5.5, 2.35, 3.8, 2.5, { fontSize: 10 });
  addFooter(s, 13);
}

// ── Slide 14: Agile / Scrum ────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Process', 'Agile Project Management', ['Scrum methodology — 4 Sprints:']);
  const sprints = [
    ['Sprint 1', 'Wk 1–2  •  Foundation', ['React + Vite + Tailwind setup', 'Homepage, Medicines & Doctors pages', 'Responsive navigation', 'Node.js + Express + MySQL setup', 'Database schema & seed scripts']],
    ['Sprint 2', 'Wk 3–4  •  Core Features', ['Medicine search & filtering', 'Shopping cart (useCart hook)', 'Appointment booking flow', 'REST API integration (Axios)', 'JWT authentication']],
    ['Sprint 3', 'Wk 5–6  •  Admin Dashboard', ['Admin layout & sidebar', 'Medicine CRUD + image upload', 'Orders & appointments management', 'Suppliers & users modules', 'Analytics endpoints']],
    ['Sprint 4', 'Wk 7–8  •  QA & Finalize', ['Analytics dashboard UI', 'Manual testing all modules', 'Bug fixing & UI polish', 'start.bat / setup-db scripts', 'Documentation & presentation']],
  ];
  sprints.forEach(([title, period, items], i) => {
    const x = 0.45 + i * 2.35;
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.75, w: 2.2, h: 3.35, rectRadius: 0.05,
      fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 },
    });
    s.addText(title, { x, y: 1.85, w: 2.2, h: 0.3, fontSize: 11, bold: true, color: C.primary, align: 'center' });
    s.addText(period, { x, y: 2.15, w: 2.2, h: 0.35, fontSize: 8, color: C.slateLight, align: 'center' });
    bulletBlock(s, items, x + 0.1, 2.55, 2.0, 2.4, { fontSize: 8 });
  });
  s.addText('Tools: Jira task tracking  •  GitHub feature-branch workflow  •  Git version control', {
    x: 0.5, y: 5.05, w: 9, h: 0.3, fontSize: 9, color: C.slateMid, align: 'center',
  });
  addFooter(s, 14);
}

// ── Slide 15: Testing ────────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'QA', 'Quality Assurance & Testing', ['Manual testing across all modules:']);
  s.addTable(
    [
      ['Test ID', 'Description', 'Expected Result', 'Status'],
      ['TC-F01', 'Browse medicine catalog', 'Medicines displayed in grid', '✓ Pass'],
      ['TC-F02', 'Search medicine by name', 'Filtered results instantly', '✓ Pass'],
      ['TC-F03', 'Add to cart & checkout', 'Order saved; stock updated', '✓ Pass'],
      ['TC-F04', 'Book appointment', 'Appointment pending in admin', '✓ Pass'],
      ['TC-A01', 'Add medicine (Admin)', 'Saved & visible in catalog', '✓ Pass'],
      ['TC-A02', 'Update order status', 'Status changes in dashboard', '✓ Pass'],
      ['TC-A03', 'JWT protected /admin', 'Redirects if not authenticated', '✓ Pass'],
      ['TC-UI01', 'Responsive mobile layout', 'Navbar & grid adapt correctly', '✓ Pass'],
    ],
    { x: 0.4, y: 1.5, w: 9.2, h: 2.8, fontSize: 9, colW: [0.9, 3.2, 3.5, 0.8] }
  );
  s.addText('Bugs Fixed:', { x: 0.5, y: 4.45, w: 9, h: 0.3, fontSize: 11, bold: true, color: C.slate });
  bulletBlock(s, [
    'Cart total not updating → fixed quantity onChange handler',
    'API offline → added local data fallback in hooks',
    'Admin table stale after delete → re-fetch after API success',
  ], 0.5, 4.75, 9, 0.8, { fontSize: 9 });
  addFooter(s, 15);
}

// ── Slide 16: Challenges ─────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Lessons', 'Challenges & Solutions', ['Technical obstacles encountered and overcome:']);
  const challenges = [
    ['Frontend–Backend Integration', 'Configured CORS; Axios async/await with JWT interceptors for consistent API calls.'],
    ['MySQL Schema & Relations', 'Designed normalized tables with FK constraints; transactions for order placement.'],
    ['Responsive UI', 'Mobile-first Tailwind breakpoints; tested across viewport sizes each sprint.'],
    ['Admin Dashboard Complexity', 'Modular React components per domain; nested React Router for /admin.'],
    ['Auth & Role Management', 'JWT middleware + ProtectedRoute; adminOnly guard on sensitive endpoints.'],
    ['Offline Resilience', 'Local fallback data in hooks when API unavailable; connection test page.'],
  ];
  challenges.forEach(([t, sol], i) => {
    const y = 1.7 + i * 0.58;
    s.addText('⚡', { x: 0.5, y, w: 0.4, h: 0.45, fontSize: 14 });
    s.addText(t, { x: 0.95, y, w: 3.2, h: 0.45, fontSize: 11, bold: true, color: C.slate });
    s.addText('✓', { x: 4.1, y, w: 0.3, h: 0.45, fontSize: 12, color: C.primary, bold: true });
    s.addText(sol, { x: 4.4, y, w: 5.1, h: 0.5, fontSize: 10, color: C.slateMid });
  });
  addFooter(s, 16);
}

// ── Slide 17: Deployment & Setup ───────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'DevOps', 'Deployment & Quick Start', ['How to run the project locally:']);
  bulletBlock(s, [
    'Prerequisites: Node.js v16+, MySQL 8.0+, npm',
    '1. Run setup-db.bat (Windows) or setup-db.sh (Linux/Mac)',
    '2. Run start.bat / start.sh — launches backend (port 5000) & frontend (5173)',
    'Manual: npm install in server/ and client/ → npm run dev',
    'Database: smart_pharmacy (schema.sql + seed-admin.js)',
    'Frontend: http://localhost:5173',
    'Backend API: http://localhost:5000/api',
    'Admin Panel: http://localhost:5173/admin',
    'Health Check: GET /api/health',
  ], 0.5, 1.55, 5.0, 3.5, { fontSize: 11 });

  s.addShape(pptx.ShapeType.roundRect, {
    x: 5.8, y: 1.7, w: 3.7, h: 3.2, rectRadius: 0.06,
    fill: { color: 'FAEEDA' }, line: { color: C.amber, width: 1 },
  });
  s.addText('Project Structure', { x: 6.0, y: 1.9, w: 3.3, h: 0.35, fontSize: 12, bold: true, color: C.amber });
  s.addText(
    'smart-pharmacy-system/\n├── project/client/  (React)\n├── project/server/  (Express)\n├── start.bat / start.sh\n├── setup-db.bat / .sh\n└── README.md',
    { x: 6.0, y: 2.35, w: 3.3, h: 2.4, fontSize: 9, color: C.slateMid, fontFace: 'Courier New' }
  );
  addFooter(s, 17);
}

// ── Slide 18: Demo Guide ───────────────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Demo', 'Live Demo Walkthrough', ['Recommended flow for video presentation:']);
  const steps = [
    ['1', 'Homepage', 'Show hero, features & navigation'],
    ['2', 'Medicines', 'Search, filter, add to cart'],
    ['3', 'Cart & Checkout', 'Adjust qty, place order'],
    ['4', 'Doctors & Booking', 'View doctors, submit appointment'],
    ['5', 'Login', 'Authenticate as admin'],
    ['6', 'Admin Dashboard', 'Overview stats & analytics charts'],
    ['7', 'Manage Data', 'CRUD medicines, orders, appointments'],
    ['8', 'Proof', 'Show order/appointment reflected in admin'],
  ];
  steps.forEach(([num, t, d], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.45 + col * 2.35;
    const y = 1.75 + row * 1.75;
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.15, y: y + 0.15, w: 0.35, h: 0.35, fill: { color: C.primary } });
    s.addText(num, { x: x + 0.15, y: y + 0.18, w: 0.35, h: 0.3, fontSize: 11, bold: true, color: C.white, align: 'center' });
    s.addText(t, { x: x + 0.6, y: y + 0.15, w: 1.5, h: 0.35, fontSize: 11, bold: true, color: C.slate });
    s.addText(d, { x: x + 0.15, y: y + 0.55, w: 2.0, h: 1.0, fontSize: 9, color: C.slateLight });
  });
  addFooter(s, 18);
}

// ── Slide 19: Future Improvements ──────────────────────────────
{
  const s = pptx.addSlide();
  sectionSlide(s, 'Roadmap', 'Future Improvements', ['Planned enhancements for next versions:']);
  const future = [
    ['💳 Online Payment', 'Integrate Stripe or PayPal for secure in-app transactions.'],
    ['🤖 AI Recommendation', 'ML engine suggests medicines based on purchase history.'],
    ['📍 Real-Time Delivery', 'GPS tracking with WebSocket live order updates.'],
    ['📱 Mobile App', 'React Native iOS & Android sharing core API logic.'],
    ['📊 Advanced Analytics', 'Predictive inventory & demand forecasting dashboards.'],
    ['🌐 Multi-Language', 'Full Arabic & English UI via react-i18next.'],
  ];
  future.forEach(([t, d], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    card(s, 0.5 + col * 4.6, 1.75 + row * 1.15, 4.3, 1.05, t, d, [C.primary, C.blue, C.amber, C.accent, C.primary, C.blue][i]);
  });
  addFooter(s, 19);
}

// ── Slide 20: Conclusion ───────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: C.primary };
  s.addText('Conclusion', {
    x: 0.6, y: 0.5, w: 8.8, h: 0.8,
    fontSize: 32, bold: true, color: C.white, fontFace: 'Georgia',
  });
  const points = [
    ['Functional System', 'All 20 functional requirements delivered — catalog, cart, appointments, admin CRUD, analytics & JWT auth.'],
    ['Modern Tech Stack', 'React + Node.js + Express + MySQL with Tailwind CSS ensured scalability, security & performance.'],
    ['Agile Delivery', '4-sprint Scrum cycle with Jira tracking and GitHub feature-branch workflow kept the team aligned.'],
    ['Team Collaboration', 'Yousef (Frontend), Mohammad (Admin & Testing), Waseem (Backend & Integration) — each owned their domain.'],
  ];
  points.forEach(([t, d], i) => {
    const y = 1.4 + i * 0.95;
    s.addText('✓', { x: 0.6, y, w: 0.4, h: 0.5, fontSize: 18, color: 'A8E6CF', bold: true });
    s.addText(t, { x: 1.1, y, w: 8, h: 0.35, fontSize: 14, bold: true, color: C.white });
    s.addText(d, { x: 1.1, y: y + 0.38, w: 8, h: 0.5, fontSize: 11, color: 'D1FAE5' });
  });
  s.addText('An-Najah National University  •  Software Engineering  •  May 2026', {
    x: 0.6, y: 5.0, w: 8.8, h: 0.4, fontSize: 12, color: 'A8E6CF', align: 'center',
  });
  s.addText('Thank You — Questions?', {
    x: 0.6, y: 4.55, w: 8.8, h: 0.5, fontSize: 20, bold: true, color: C.white, align: 'center',
  });
  addFooter(s, 20);
}

// Also copy to Desktop
const desktopOut = 'c:\\Users\\user\\Desktop\\Smart_Pharmacy_System_Slides.pptx';

await pptx.writeFile({ fileName: OUT });
await pptx.writeFile({ fileName: desktopOut });

console.log('Created:', OUT);
console.log('Created:', desktopOut);
