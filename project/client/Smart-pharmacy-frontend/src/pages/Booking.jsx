import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useToast } from '../component/Toast/Toast';
import { usePharmacists } from '../hooks/useApi';
import api from '../services/api';

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const HOURS = Array.from({ length: 13 }, (_, i) => {
  const h = i + 8;
  return { value: String(h).padStart(2, '0'), label: `${String(h).padStart(2, '0')}:00` };
});

const MINUTES = ['00', '15', '30', '45'].map((m) => ({ value: m, label: m }));

const selectClass =
  'mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white';

const getDaysInMonth = (year, month) => {
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
};

export default function Booking() {
  const toast = useToast();
  const { pharmacists, loading: docsLoading } = usePharmacists();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    month: '',
    day: '',
    year: '',
    hour: '',
    minute: '',
    pharmacistId: '',
  });

  const yearOptions = useMemo(() => {
    const y = new Date().getFullYear();
    return [y, y + 1];
  }, []);

  const dayOptions = useMemo(() => {
    const max = getDaysInMonth(form.year, form.month);
    return Array.from({ length: max }, (_, i) => String(i + 1).padStart(2, '0'));
  }, [form.year, form.month]);
  const [confirmationId, setConfirmationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.month || !form.day || !form.year || !form.hour || !form.minute || !form.pharmacistId) {
      toast('Please complete all required fields', 'error');
      return;
    }

    const appointmentDate = `${form.year}-${form.month}-${form.day}`;
    const appointmentTime = `${form.hour}:${form.minute}:00`;
    const today = new Date().toISOString().split('T')[0];
    if (appointmentDate < today) {
      toast('Please choose a future date', 'error');
      return;
    }

    const requestedPharmacist = pharmacists.find((doc) => String(doc.id) === form.pharmacistId);
    const notes = requestedPharmacist
      ? `Appointment request with ${requestedPharmacist.name}`
      : 'Appointment request';

    const payload = {
      patient_name: form.name.trim(),
      patient_phone: form.phone.trim(),
      pharmacist_id: Number(form.pharmacistId),
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      notes,
    };

    try {
      setLoading(true);
      const { data } = await api.post('/appointments', payload);
      setConfirmationId(data.id);
      setForm({ name: '', phone: '', month: '', day: '', year: '', hour: '', minute: '', pharmacistId: '' });
      toast('Appointment request sent to admin', 'success');
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to send appointment request', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-8 sm:py-12 md:py-16 px-3 sm:px-4">
        <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-lg sm:shadow-xl overflow-hidden">
          <div className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1.2fr_0.8fr] p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-emerald-700">
                📅 Book an Appointment
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  Schedule a consultation with our pharmacists
                </h1>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
                  Choose your preferred date, time, and pharmacist. Your request will appear in the admin dashboard for approval.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5 md:p-6">
                <div className="text-xs sm:text-sm font-semibold text-slate-900">Need help booking?</div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Call us or send a message and we will help you schedule your appointment.
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-700">
                  <p>📞 Phone: +970 599 000 111</p>
                  <p>✉️ Email: info@medicare.ps</p>
                </div>
              </div>

              <Link
                to="/doctors"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition"
              >
                👨‍⚕️ View Pharmacists
              </Link>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-5 md:mb-6">Appointment Request</h2>
              <form lang="en-US" className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Full name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ahmed Ali"
                    required
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                  />
                </label>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Phone number
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+970 599 000 111"
                    required
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                  />
                </label>
                <div>
                  <span className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Preferred date</span>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <select
                      value={form.month}
                      onChange={(e) => setForm(prev => ({ ...prev, month: e.target.value, day: '' }))}
                      required
                      className={selectClass}
                    >
                      <option value="">Month</option>
                      {MONTHS.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                    <select
                      value={form.day}
                      onChange={(e) => setForm(prev => ({ ...prev, day: e.target.value }))}
                      required
                      disabled={!form.month || !form.year}
                      className={selectClass}
                    >
                      <option value="">Day</option>
                      {dayOptions.map((d) => (
                        <option key={d} value={d}>{Number(d)}</option>
                      ))}
                    </select>
                    <select
                      value={form.year}
                      onChange={(e) => setForm(prev => ({ ...prev, year: e.target.value, day: '' }))}
                      required
                      className={selectClass}
                    >
                      <option value="">Year</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">Preferred time</span>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <select
                      value={form.hour}
                      onChange={(e) => setForm(prev => ({ ...prev, hour: e.target.value }))}
                      required
                      className={selectClass}
                    >
                      <option value="">Hour</option>
                      {HOURS.map((h) => (
                        <option key={h.value} value={h.value}>{h.label}</option>
                      ))}
                    </select>
                    <select
                      value={form.minute}
                      onChange={(e) => setForm(prev => ({ ...prev, minute: e.target.value }))}
                      required
                      className={selectClass}
                    >
                      <option value="">Minute</option>
                      {MINUTES.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Pharmacist
                  <select
                    value={form.pharmacistId}
                    onChange={(e) => setForm(prev => ({ ...prev, pharmacistId: e.target.value }))}
                    required
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                  >
                    <option value="">Select a pharmacist</option>
                    {docsLoading ? (
                      <option value="">Loading pharmacists...</option>
                    ) : pharmacists.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} — {doc.specialty}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl sm:rounded-3xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition"
                >
                  {loading ? 'Sending request...' : 'Send appointment request'}
                </button>
              </form>
              {confirmationId && (
                <div className="mt-4 sm:mt-5 md:mt-6 rounded-2xl sm:rounded-3xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5 text-xs sm:text-sm text-slate-700">
                  <div className="font-semibold text-slate-900 mb-2">Appointment request received</div>
                  <p className="mb-2">Your reference number is:</p>
                  <div className="inline-flex items-center rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-semibold text-slate-900 shadow-sm border border-slate-200">
                    #{confirmationId}
                  </div>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">
                    Keep this number for confirmation. Your request has been sent to the admin dashboard and is awaiting approval.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
