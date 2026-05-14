import { Link } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

export default function Booking() {
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
                  Book your consultation or medication order
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  Choose a time, send your request, and our team will contact you to confirm your appointment or delivery details.
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-900">Need help booking?</div>
                <p className="text-sm text-slate-500">
                  Call us directly or send a message and we will help you schedule your appointment.
                </p>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>📞 Phone: +970 599 000 111</p>
                  <p>✉️ Email: info@medicare.ps</p>
                </div>
              </div>

              <Link
                to="/medicines"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Browse Medicines
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Booking</h2>
              <form className="space-y-5">
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                  <input
                    type="text"
                    placeholder="Ahmed Ali"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Phone number
                  <input
                    type="tel"
                    placeholder="+970 599 000 111"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Preferred date
                  <input
                    type="date"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Message
                  <textarea
                    placeholder="Tell us what you need"
                    rows="4"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
                  />
                </label>
                <button
                  type="button"
                  className="w-full rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                >
                  Request Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
