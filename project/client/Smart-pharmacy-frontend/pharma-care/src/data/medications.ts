// ─── Types ───────────────────────────────────────────────────────────────────

export type Category = 'pain' | 'antibiotic' | 'vitamin' | 'cardiac' | 'allergy';
export type StockStatus = 'ok' | 'low' | 'out';
export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest';

export interface Medication {
  id: number;
  name: string;
  cat: Category;
  price: number;
  stock: number;
  desc: string;
  usage: string;
  popular: number;
  isNew: boolean;
}

export interface MedFormData {
  name: string;
  cat: Category;
  price: number;
  stock: number;
  desc: string;
  usage: string;
}

export interface Filters {
  category: Category | 'all';
  maxPrice: number;
  availability: {
    inStock: boolean;
    lowStock: boolean;
    outOfStock: boolean;
  };
}

export interface CartState {
  [id: number]: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const CAT_LABELS: Record<Category, string> = {
  pain: 'Pain relief',
  antibiotic: 'Antibiotics',
  vitamin: 'Vitamins',
  cardiac: 'Cardiac care',
  allergy: 'Allergy',
};

export const CAT_EMOJI: Record<Category, string> = {
  pain: '💊',
  antibiotic: '🧫',
  vitamin: '🌿',
  cardiac: '❤️',
  allergy: '🌸',
};

export const CATEGORIES: Array<{ id: Category | 'all'; label: string; count: number }> = [
  { id: 'all',        label: 'All medications', count: 24 },
  { id: 'pain',       label: 'Pain relief',     count: 6  },
  { id: 'antibiotic', label: 'Antibiotics',     count: 5  },
  { id: 'vitamin',    label: 'Vitamins',        count: 7  },
  { id: 'cardiac',    label: 'Cardiac care',    count: 4  },
  { id: 'allergy',    label: 'Allergy',         count: 2  },
];

export const SORT_OPTS: Array<{ value: SortOption; label: string }> = [
  { value: 'popular',    label: 'Most popular'       },
  { value: 'price-asc',  label: 'Price: low → high'  },
  { value: 'price-desc', label: 'Price: high → low'  },
  { value: 'newest',     label: 'Newest arrivals'    },
];

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return 'out';
  if (stock <= 10) return 'low';
  return 'ok';
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

export const INITIAL_MEDS: Medication[] = [
  { id: 1,  name: 'Ibuprofen 400mg',     cat: 'pain',       price: 8.99,  stock: 150, desc: 'Non-steroidal anti-inflammatory drug for pain and fever.',            usage: 'Take 1–2 tablets every 4–6 hours with food.',        popular: 95, isNew: false },
  { id: 2,  name: 'Paracetamol 500mg',   cat: 'pain',       price: 5.49,  stock: 200, desc: 'Analgesic and antipyretic for mild to moderate pain.',                 usage: 'Take 1–2 tablets up to 4 times daily.',              popular: 98, isNew: false },
  { id: 3,  name: 'Aspirin 100mg',       cat: 'pain',       price: 6.99,  stock: 8,   desc: 'Low-dose aspirin for cardiovascular protection and pain.',             usage: 'Take 1 tablet daily after meals.',                   popular: 80, isNew: false },
  { id: 4,  name: 'Codeine 30mg',        cat: 'pain',       price: 14.50, stock: 0,   desc: 'Opioid analgesic for moderate to severe pain.',                        usage: 'Take 1 tablet every 4 hours as needed.',             popular: 60, isNew: false },
  { id: 5,  name: 'Naproxen 250mg',      cat: 'pain',       price: 9.99,  stock: 45,  desc: 'Long-acting NSAID for pain and inflammation.',                         usage: 'Take 1 tablet twice daily.',                        popular: 72, isNew: true  },
  { id: 6,  name: 'Tramadol 50mg',       cat: 'pain',       price: 18.00, stock: 12,  desc: 'Centrally-acting pain reliever for moderate pain.',                    usage: 'Take 1–2 capsules every 4–6 hours.',                popular: 55, isNew: false },
  { id: 7,  name: 'Amoxicillin 500mg',   cat: 'antibiotic', price: 12.99, stock: 60,  desc: 'Broad-spectrum penicillin antibiotic for bacterial infections.',        usage: 'Take 1 capsule three times daily for 7 days.',       popular: 88, isNew: false },
  { id: 8,  name: 'Azithromycin 250mg',  cat: 'antibiotic', price: 22.50, stock: 35,  desc: 'Macrolide antibiotic for respiratory and skin infections.',             usage: 'Take 1 tablet daily for 3 days.',                   popular: 82, isNew: false },
  { id: 9,  name: 'Ciprofloxacin 500mg', cat: 'antibiotic', price: 19.99, stock: 5,   desc: 'Fluoroquinolone antibiotic for urinary and GI infections.',             usage: 'Take 1 tablet twice daily for 5–10 days.',          popular: 74, isNew: false },
  { id: 10, name: 'Metronidazole 400mg', cat: 'antibiotic', price: 11.00, stock: 70,  desc: 'Antibiotic and antiprotozoal for anaerobic infections.',                usage: 'Take 1 tablet three times daily.',                  popular: 68, isNew: true  },
  { id: 11, name: 'Doxycycline 100mg',   cat: 'antibiotic', price: 15.75, stock: 0,   desc: 'Tetracycline antibiotic for acne and infections.',                      usage: 'Take 1 capsule daily with food.',                   popular: 65, isNew: false },
  { id: 12, name: 'Vitamin C 1000mg',    cat: 'vitamin',    price: 7.99,  stock: 300, desc: 'High-dose ascorbic acid for immune support.',                          usage: 'Take 1 tablet daily with water.',                   popular: 92, isNew: false },
  { id: 13, name: 'Vitamin D3 5000IU',   cat: 'vitamin',    price: 9.49,  stock: 180, desc: 'Cholecalciferol for bone health and immunity.',                         usage: 'Take 1 capsule daily with a fatty meal.',           popular: 90, isNew: false },
  { id: 14, name: 'Vitamin B Complex',   cat: 'vitamin',    price: 12.00, stock: 7,   desc: 'Complete B-vitamin formula for energy metabolism.',                    usage: 'Take 1 tablet daily after breakfast.',              popular: 85, isNew: true  },
  { id: 15, name: 'Omega-3 Fish Oil',    cat: 'vitamin',    price: 16.50, stock: 120, desc: 'EPA and DHA for cardiovascular and brain health.',                     usage: 'Take 2 softgels daily with meals.',                 popular: 87, isNew: false },
  { id: 16, name: 'Zinc 50mg',           cat: 'vitamin',    price: 6.99,  stock: 90,  desc: 'Essential mineral for immune function and wound healing.',              usage: 'Take 1 tablet daily with food.',                   popular: 78, isNew: false },
  { id: 17, name: 'Magnesium 400mg',     cat: 'vitamin',    price: 10.99, stock: 65,  desc: 'Supports muscle, nerve, and bone health.',                             usage: 'Take 1 tablet daily at bedtime.',                  popular: 80, isNew: false },
  { id: 18, name: 'Iron 65mg',           cat: 'vitamin',    price: 8.49,  stock: 40,  desc: 'Ferrous sulfate supplement for iron deficiency.',                      usage: 'Take 1 tablet daily on empty stomach.',            popular: 70, isNew: true  },
  { id: 19, name: 'Atorvastatin 20mg',   cat: 'cardiac',    price: 28.00, stock: 55,  desc: 'Statin medication for lowering LDL cholesterol.',                      usage: 'Take 1 tablet once daily at bedtime.',             popular: 83, isNew: false },
  { id: 20, name: 'Amlodipine 5mg',      cat: 'cardiac',    price: 24.50, stock: 9,   desc: 'Calcium channel blocker for hypertension and angina.',                 usage: 'Take 1 tablet daily at the same time.',            popular: 79, isNew: false },
  { id: 21, name: 'Metformin 500mg',     cat: 'cardiac',    price: 18.00, stock: 85,  desc: 'Biguanide for type 2 diabetes management.',                            usage: 'Take 1 tablet twice daily with meals.',            popular: 86, isNew: false },
  { id: 22, name: 'Lisinopril 10mg',     cat: 'cardiac',    price: 21.99, stock: 48,  desc: 'ACE inhibitor for hypertension and heart failure.',                    usage: 'Take 1 tablet once daily.',                        popular: 76, isNew: true  },
  { id: 23, name: 'Cetirizine 10mg',     cat: 'allergy',    price: 9.99,  stock: 110, desc: 'Non-drowsy antihistamine for allergic rhinitis and urticaria.',         usage: 'Take 1 tablet daily in the evening.',              popular: 89, isNew: false },
  { id: 24, name: 'Loratadine 10mg',     cat: 'allergy',    price: 8.50,  stock: 6,   desc: 'Long-acting antihistamine for seasonal allergies.',                    usage: 'Take 1 tablet once daily.',                        popular: 84, isNew: false },
];
