-- ============================================================
-- Smart Pharmacy Database Schema
-- Database: smart_pharmacy
-- Password: waseemxd12
-- ============================================================

CREATE DATABASE IF NOT EXISTS smart_pharmacy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_pharmacy;

-- ── Users ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       ENUM('admin','pharmacist','customer') DEFAULT 'customer',
  status     ENUM('Active','Suspended') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Medicines ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS medicines (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  name_ar     VARCHAR(200),
  category    VARCHAR(100) NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  stock       INT NOT NULL DEFAULT 0,
  min_stock   INT NOT NULL DEFAULT 10,
  description TEXT,
  usage_info  TEXT,
  image_url   VARCHAR(500),
  is_new      TINYINT(1) DEFAULT 0,
  popular     INT DEFAULT 50,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Suppliers ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(200) NOT NULL,
  email      VARCHAR(150),
  phone      VARCHAR(50),
  address    VARCHAR(300),
  status     ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Orders ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  customer_name  VARCHAR(150) NOT NULL,
  customer_email VARCHAR(150),
  customer_phone VARCHAR(50),
  address        TEXT,
  total          DECIMAL(10,2) NOT NULL DEFAULT 0,
  status         ENUM('Pending','Accepted','Rejected','Delivered') DEFAULT 'Pending',
  payment_method VARCHAR(50) DEFAULT 'Cash',
  notes          TEXT,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Order Items ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_id    INT NOT NULL,
  medicine_id INT NOT NULL,
  quantity    INT NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id)    REFERENCES orders(id)    ON DELETE CASCADE,
  FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE RESTRICT
);

-- ── Pharmacists (Team) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS pharmacists (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(150) NOT NULL,
  name_ar      VARCHAR(150),
  title        VARCHAR(100),
  title_ar     VARCHAR(100),
  specialty    VARCHAR(150),
  specialty_ar VARCHAR(150),
  experience   INT DEFAULT 0,
  shift        ENUM('morning','evening','night') DEFAULT 'morning',
  phone        VARCHAR(50),
  whatsapp     VARCHAR(50),
  avatar       VARCHAR(10),
  avatar_color VARCHAR(20) DEFAULT '#1D9E75',
  status       ENUM('Available','On Leave','In Surgery') DEFAULT 'Available',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Appointments ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  patient_name   VARCHAR(150) NOT NULL,
  patient_phone  VARCHAR(50),
  pharmacist_id  INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  notes          TEXT,
  status         ENUM('Waiting','In Progress','Completed','Cancelled') DEFAULT 'Waiting',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pharmacist_id) REFERENCES pharmacists(id) ON DELETE RESTRICT
);

-- ── Job Applications ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  full_name      VARCHAR(150) NOT NULL,
  email          VARCHAR(150) NOT NULL,
  phone          VARCHAR(50),
  position       VARCHAR(100) NOT NULL,
  experience     INT DEFAULT 0,
  specialization VARCHAR(200),
  about          TEXT,
  cv_filename    VARCHAR(300),
  status         ENUM('Pending','Reviewed','Accepted','Rejected') DEFAULT 'Pending',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Seed Data ───────────────────────────────────────────────
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin User',   'admin@pharmacy.ps',  '$2b$10$hashed_password_here', 'admin'),
('Test Customer','customer@test.com',  '$2b$10$hashed_password_here', 'customer');

INSERT IGNORE INTO medicines (name, name_ar, category, price, stock, min_stock, description, usage_info, is_new, popular) VALUES
('Ibuprofen 400mg',     'ايبوبروفين 400 مغ',   'pain',       8.99,  150, 20, 'Non-steroidal anti-inflammatory drug for pain and fever.', 'Take 1-2 tablets every 4-6 hours with food.', 0, 95),
('Paracetamol 500mg',   'باراسيتامول 500 مغ',  'pain',       5.49,  200, 30, 'Analgesic and antipyretic for mild to moderate pain.',    'Take 1-2 tablets up to 4 times daily.',      0, 98),
('Aspirin 100mg',       'أسبرين 100 مغ',       'pain',       6.99,  8,   15, 'Low-dose aspirin for cardiovascular protection.',         'Take 1 tablet daily after meals.',            0, 80),
('Codeine 30mg',        'كودايين 30 مغ',        'pain',       14.50, 0,   10, 'Opioid analgesic for moderate to severe pain.',           'Take 1 tablet every 4 hours as needed.',      0, 60),
('Naproxen 250mg',      'نابروكسين 250 مغ',    'pain',       9.99,  45,  15, 'Long-acting NSAID for pain and inflammation.',            'Take 1 tablet twice daily.',                  1, 72),
('Tramadol 50mg',       'ترامادول 50 مغ',       'pain',       18.00, 12,  10, 'Centrally-acting pain reliever for moderate pain.',       'Take 1-2 capsules every 4-6 hours.',          0, 55),
('Amoxicillin 500mg',   'أموكسيسيلين 500 مغ',  'antibiotic', 12.99, 60,  20, 'Broad-spectrum penicillin antibiotic.',                   'Take 1 capsule three times daily for 7 days.',0, 88),
('Azithromycin 250mg',  'أزيثروميسين 250 مغ',  'antibiotic', 22.50, 35,  15, 'Macrolide antibiotic for respiratory infections.',        'Take 1 tablet daily for 3 days.',             0, 82),
('Ciprofloxacin 500mg', 'سيبروفلوكساسين 500مغ','antibiotic', 19.99, 5,   15, 'Fluoroquinolone antibiotic for urinary infections.',      'Take 1 tablet twice daily for 5-10 days.',    0, 74),
('Metronidazole 400mg', 'ميترونيدازول 400 مغ', 'antibiotic', 11.00, 70,  20, 'Antibiotic for anaerobic infections.',                    'Take 1 tablet three times daily.',            1, 68),
('Doxycycline 100mg',   'دوكسيسيكلين 100 مغ',  'antibiotic', 15.75, 0,   10, 'Tetracycline antibiotic for acne and infections.',        'Take 1 capsule daily with food.',             0, 65),
('Vitamin C 1000mg',    'فيتامين سي 1000 مغ',  'vitamin',    7.99,  300, 50, 'High-dose ascorbic acid for immune support.',             'Take 1 tablet daily with water.',             0, 92),
('Vitamin D3 5000IU',   'فيتامين د3 5000 وحدة','vitamin',    9.49,  180, 40, 'Cholecalciferol for bone health and immunity.',           'Take 1 capsule daily with a fatty meal.',     0, 90),
('Vitamin B Complex',   'فيتامين ب المركب',    'vitamin',    12.00, 7,   20, 'Complete B-vitamin formula for energy metabolism.',       'Take 1 tablet daily after breakfast.',        1, 85),
('Omega-3 Fish Oil',    'زيت السمك أوميغا3',   'vitamin',    16.50, 120, 30, 'EPA and DHA for cardiovascular and brain health.',        'Take 2 softgels daily with meals.',           0, 87),
('Zinc 50mg',           'زنك 50 مغ',            'vitamin',    6.99,  90,  20, 'Essential mineral for immune function.',                  'Take 1 tablet daily with food.',              0, 78),
('Magnesium 400mg',     'ماغنيسيوم 400 مغ',    'vitamin',    10.99, 65,  20, 'Supports muscle, nerve, and bone health.',                'Take 1 tablet daily at bedtime.',             0, 80),
('Iron 65mg',           'حديد 65 مغ',           'vitamin',    8.49,  40,  15, 'Ferrous sulfate supplement for iron deficiency.',         'Take 1 tablet daily on empty stomach.',       1, 70),
('Atorvastatin 20mg',   'أتورفاستاتين 20 مغ',  'cardiac',    28.00, 55,  15, 'Statin medication for lowering LDL cholesterol.',         'Take 1 tablet once daily at bedtime.',        0, 83),
('Amlodipine 5mg',      'أملوديبين 5 مغ',       'cardiac',    24.50, 9,   10, 'Calcium channel blocker for hypertension.',               'Take 1 tablet daily at the same time.',       0, 79),
('Metformin 500mg',     'ميتفورمين 500 مغ',     'cardiac',    18.00, 85,  25, 'Biguanide for type 2 diabetes management.',               'Take 1 tablet twice daily with meals.',       0, 86),
('Lisinopril 10mg',     'ليسينوبريل 10 مغ',    'cardiac',    21.99, 48,  15, 'ACE inhibitor for hypertension and heart failure.',       'Take 1 tablet once daily.',                   1, 76),
('Cetirizine 10mg',     'سيتيريزين 10 مغ',     'allergy',    9.99,  110, 25, 'Non-drowsy antihistamine for allergic rhinitis.',         'Take 1 tablet daily in the evening.',         0, 89),
('Loratadine 10mg',     'لوراتادين 10 مغ',     'allergy',    8.50,  6,   15, 'Long-acting antihistamine for seasonal allergies.',       'Take 1 tablet once daily.',                   0, 84);

INSERT IGNORE INTO pharmacists (name, name_ar, title, title_ar, specialty, specialty_ar, experience, shift, phone, whatsapp, avatar, avatar_color) VALUES
('Dr. Layla Hassan',   'د. ليلى حسان',   'Senior Pharmacist',  'صيدلانية أولى',  'Clinical Pharmacy',    'الصيدلة السريرية',    12, 'morning', '+970 569 022 403', '970569022403', 'LH', '#1D9E75'),
('Dr. Omar Nasser',    'د. عمر ناصر',    'Pharmacist',         'صيدلاني',         'Pharmaceutical Care',  'الرعاية الصيدلانية',  7,  'evening', '+970 569 022 403', '970569022403', 'ON', '#378ADD'),
('Dr. Nour Khalil',    'د. نور خليل',    'Pharmacist',         'صيدلانية',        'Drug Interactions',    'التفاعلات الدوائية',  5,  'morning', '+970 569 022 403', '970569022403', 'NK', '#7F77DD'),
('Dr. Sami Barakat',   'د. سامي بركات',  'Night Pharmacist',   'صيدلاني ليلي',   'Emergency Medication', 'أدوية الطوارئ',       9,  'night',   '+970 569 022 403', '970569022403', 'SB', '#BA7517'),
('Dr. Rima Awad',      'د. ريما عوض',    'Senior Pharmacist',  'صيدلانية أولى',  'Pediatric Pharmacy',   'صيدلة الأطفال',       15, 'evening', '+970 569 022 403', '970569022403', 'RA', '#D85A30'),
('Dr. Khaled Mansour', 'د. خالد منصور',  'Pharmacist',         'صيدلاني',         'Oncology Pharmacy',    'صيدلة الأورام',       3,  'night',   '+970 569 022 403', '970569022403', 'KM', '#0F6E56');

INSERT IGNORE INTO suppliers (name, email, phone, address, status) VALUES
('PharmaCorp Global',    'contact@pharmacorp.com', '+1 800-456-7890', 'New York, USA',     'Active'),
('HealthMeds Logistics', 'supply@healthmeds.com',  '+44 20-7946-0958','London, UK',        'Active'),
('BioTech Supplies',     'orders@biotech.com',     '+1 555-019-8372', 'California, USA',   'Inactive');

INSERT IGNORE INTO orders (customer_name, customer_email, total, status, payment_method) VALUES
('Alice Johnson', 'alice@example.com',  24.50, 'Delivered', 'Credit Card'),
('Bob Smith',     'bob@example.com',    18.00, 'Pending',   'Cash'),
('Sarah Connor',  'sarah@example.com',  47.99, 'Accepted',  'Credit Card');
