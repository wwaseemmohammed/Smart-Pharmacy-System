import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useToast } from '../component/Toast/Toast';
import { usePharmacists } from '../hooks/useApi';
import api from '../services/api';

const generateOrderCode = () => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

export default function Booking() {
  const toast = useToast();
  const { pharmacists, loading: docsLoading } = usePharmacists();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    pharmacistId: '',
  });
  const [confirmationCode, setConfirmationCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date || !form.time || !form.pharmacistId) {
      toast('Please complete all required fields', 'error');
      return;
    }

    const code = generateOrderCode();
    const requestedDoctor = pharmacists.find((doc) => String(doc.id) === form.pharmacistId);
    const notes = `Code: ${code} | Payment: Cash | Doctor: ${requestedDoctor?.name || 'N/A'}`;

    const payload = {
      customer_name: form.name.trim(),
      customer_phone: form.phone.trim(),
      payment_method: 'Cash',
      notes,
      items: [],
      order_code: code,
    };

    try {
      setLoading(true);
      await api.post('/orders', payload);
      setConfirmationCode(code);
      setForm({ name: '', phone: '', date: '', time: '', pharmacistId: '' });
      toast('Order request sent to admin');
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to send booking request', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-4xl rounded-[32px] border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] p-8 lg:p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                Booking Page
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Request your medicine and confirm payment
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  Fill your details, choose a doctor, and receive a unique confirmation code after order submission.
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-900">Need help booking?</div>
                <p className="text-sm text-slate-500">
                  Call us directly or send a message and we will help you schedule your order and payment.
                </p>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>📞 Phone: +970 599 000 111</p>
                  <p>✉️ Email: info@medicare.ps</p>
                </div>
              </div>

              <Link
                to="/doctors"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                View Doctors
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Order</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ahmed Ali"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Phone number
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+970 599 000 111"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Preferred date
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700">
                    Preferred time
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm(prev => ({ ...prev, time: e.target.value }))}
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                    />
                  </label>
                </div>
                <label className="block text-sm font-medium text-slate-700">
                  Doctor
                  <select
                    value={form.pharmacistId}
                    onChange={(e) => setForm(prev => ({ ...prev, pharmacistId: e.target.value }))}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                  >
                    <option value="">Select a doctor</option>
                    {docsLoading ? (
                      <option value="">Loading doctors...</option>
                    ) : pharmacists.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-60"
                >
                  {loading ? 'Sending request...' : 'Confirm Order'}
                </button>
              </form>
              {confirmationCode && (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="font-semibold text-slate-900 mb-2">Order confirmed</div>
                  <p className="mb-2">Your confirmation code is:</p>
                  <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-base font-semibold text-slate-900 shadow-sm">
                    {confirmationCode}
                  </div>
                  <p className="mt-3 text-sm text-slate-500">
                    احتفظ بهذا الرقم للتأكيد. سيتم إرسال طلبك إلى لوحة تحكم الأدمين، وسيُستخدم لتأكيد التسليم.
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
