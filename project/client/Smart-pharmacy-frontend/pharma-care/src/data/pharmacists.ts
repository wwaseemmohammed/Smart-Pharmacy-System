export type Shift = 'morning' | 'evening' | 'night';

export interface Pharmacist {
  id: number;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  experience: number;
  shift: Shift;
  phone: string;
  whatsapp: string;
  specialty: string;
  specialtyAr: string;
  avatar: string; // initials fallback
  avatarColor: string;
}

export const SHIFT_LABELS: Record<Shift, { en: string; ar: string; hours: string; icon: string }> = {
  morning: { en: 'Morning',  ar: 'صباحي',  hours: '08:00 – 16:00', icon: '🌅' },
  evening: { en: 'Evening',  ar: 'مسائي',  hours: '16:00 – 00:00', icon: '🌇' },
  night:   { en: 'Night',    ar: 'ليلي',   hours: '00:00 – 08:00', icon: '🌙' },
};

export const PHARMACISTS: Pharmacist[] = [
  {
    id: 1,
    name: 'Dr. Layla Hassan',
    nameAr: 'د. ليلى حسان',
    title: 'Senior Pharmacist',
    titleAr: 'صيدلانية أولى',
    experience: 12,
    shift: 'morning',
    phone: '+970-59-100-0001',
    whatsapp: '970591000001',
    specialty: 'Clinical Pharmacy',
    specialtyAr: 'الصيدلة السريرية',
    avatar: 'LH',
    avatarColor: '#1D9E75',
  },
  {
    id: 2,
    name: 'Dr. Omar Nasser',
    nameAr: 'د. عمر ناصر',
    title: 'Pharmacist',
    titleAr: 'صيدلاني',
    experience: 7,
    shift: 'evening',
    phone: '+970-59-100-0002',
    whatsapp: '970591000002',
    specialty: 'Pharmaceutical Care',
    specialtyAr: 'الرعاية الصيدلانية',
    avatar: 'ON',
    avatarColor: '#378ADD',
  },
  {
    id: 3,
    name: 'Dr. Nour Khalil',
    nameAr: 'د. نور خليل',
    title: 'Pharmacist',
    titleAr: 'صيدلانية',
    experience: 5,
    shift: 'morning',
    phone: '+970-59-100-0003',
    whatsapp: '970591000003',
    specialty: 'Drug Interactions',
    specialtyAr: 'التفاعلات الدوائية',
    avatar: 'NK',
    avatarColor: '#7F77DD',
  },
  {
    id: 4,
    name: 'Dr. Sami Barakat',
    nameAr: 'د. سامي بركات',
    title: 'Night Pharmacist',
    titleAr: 'صيدلاني ليلي',
    experience: 9,
    shift: 'night',
    phone: '+970-59-100-0004',
    whatsapp: '970591000004',
    specialty: 'Emergency Medication',
    specialtyAr: 'أدوية الطوارئ',
    avatar: 'SB',
    avatarColor: '#BA7517',
  },
  {
    id: 5,
    name: 'Dr. Rima Awad',
    nameAr: 'د. ريما عوض',
    title: 'Senior Pharmacist',
    titleAr: 'صيدلانية أولى',
    experience: 15,
    shift: 'evening',
    phone: '+970-59-100-0005',
    whatsapp: '970591000005',
    specialty: 'Pediatric Pharmacy',
    specialtyAr: 'صيدلة الأطفال',
    avatar: 'RA',
    avatarColor: '#D85A30',
  },
  {
    id: 6,
    name: 'Dr. Khaled Mansour',
    nameAr: 'د. خالد منصور',
    title: 'Pharmacist',
    titleAr: 'صيدلاني',
    experience: 3,
    shift: 'night',
    phone: '+970-59-100-0006',
    whatsapp: '970591000006',
    specialty: 'Oncology Pharmacy',
    specialtyAr: 'صيدلة الأورام',
    avatar: 'KM',
    avatarColor: '#0F6E56',
  },
];
