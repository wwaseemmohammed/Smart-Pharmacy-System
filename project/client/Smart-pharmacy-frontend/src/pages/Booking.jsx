import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useToast } from '../component/Toast/Toast';
import { usePharmacists } from '../hooks/useApi';
import api from '../services/api';

const PAYMENT_METHODS = [
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Cash', label: 'Cash / Delivery' },
  { value: 'Online', label: 'Online Payment' },
];

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
    paymentMethod: 'WhatsApp',
    message: '',
    address: '',
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
    const notes = `Code: ${code} | Requested via ${form.paymentMethod}. Doctor: ${requestedDoctor?.name || 'N/A'}.${form.message ? ` Request: ${form.message.trim()}` : ''}`;

    const payload = {
      customer_name: form.name.trim(),
      customer_phone: form.phone.trim(),
      address: form.address.trim() || null,
      payment_method: form.paymentMethod,
      notes,
      items: [],
      order_code: code,
    };

    try {
      setLoading(true);
      await api.post('/orders', payload);
      setConfirmationCode(code);
      setOrderSubmitted(true);
      setForm({ name: '', phone: '', date: '', time: '', pharmacistId: '', paymentMethod: 'WhatsApp', message: '', address: '' });
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-8 sm:py-12 md:py-16 px-3 sm:px-4">
        <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-lg sm:shadow-xl overflow-hidden">
          <div className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1.2fr_0.8fr] p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-emerald-700">
                📋 Booking Page
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  Request your medicine and confirm payment
                </h1>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
                  Fill your details, choose a doctor, and receive a unique confirmation code after order submission.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5 md:p-6">
                <div className="text-xs sm:text-sm font-semibold text-slate-900">Need help booking?</div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Call us directly or send a message and we will help you schedule your order and payment.
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
                👨‍⚕️ View Doctors
              </Link>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-5 md:mb-6">Quick Order</h2>
              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Full name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ahmed Ali"
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
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                  />
                </label>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700">
                    Preferred date
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                      className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                    />
                  </label>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700">
                    Preferred time
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm(prev => ({ ...prev, time: e.target.value }))}
                      className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                    />
                  </label>
                </div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Doctor
                  <select
                    value={form.pharmacistId}
                    onChange={(e) => setForm(prev => ({ ...prev, pharmacistId: e.target.value }))}
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                  >
                    <option value="">Select a doctor</option>
                    {docsLoading ? (
                      <option value="">Loading doctors...</option>
                    ) : pharmacists.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Payment method
                  <select
                    value={form.paymentMethod}
                    onChange={(e) => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                  >
                    {PAYMENT_METHODS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Delivery address
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Address for delivery"
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                  />
                </label>
                <label className="block text-xs sm:text-sm font-medium text-slate-700">
                  Order details
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe the medicine or order you need"
                    rows="3"
                    className="mt-1.5 sm:mt-2 w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white resize-none"
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl sm:rounded-3xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition"
                >
                  {loading ? '⏳ Sending request...' : '✓ Confirm Order'}
                </button>
              </form>
              {confirmationCode && (
                <div className="mt-4 sm:mt-5 md:mt-6 rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5 text-xs sm:text-sm text-slate-700">
                  <div className="font-semibold text-slate-900 mb-2">✅ Order confirmed</div>
                  <p className="mb-2">Your confirmation code is:</p>
                  <div className="inline-flex items-center rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-semibold text-slate-900 shadow-sm border border-slate-200">
                    {confirmationCode}
                  </div>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">
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
