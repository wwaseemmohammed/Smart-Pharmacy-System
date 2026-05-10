import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api.js'

const KPI = ({ icon, label, value, sub, color, to }) => (
  <Link to={to || '#'} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: color + '18' }}>
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-800 leading-none">{value ?? '—'}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      {sub && <div className="text-[11px] font-semibold mt-0.5" style={{ color }}>{sub}</div>}
    </div>
  </Link>
)

export default function DashboardOverview() {
  const [data, setData]   = useState(null)
  const [range, setRange] = useState('today')
  const [sales, setSales] = useState([])
  const [topMeds, setTopMeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get('/analytics/summary', { params: { range } }),
      api.get('/analytics/sales',   { params: { range } }),
      api.get('/analytics/top-medicines'),
    ]).then(([s, sa, tm]) => {
      setData(s.data)
      setSales(sa.data)
      setTopMeds(tm.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [range])

  const maxRev = sales.length ? Math.max(...sales.map(s => Number(s.revenue) || 0), 1) : 1

  return (
    <div>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back, Admin 👋</p>
        </div>
        <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl">
          {[['today','Today'],['week','Week'],['month','Month']].map(([v,l]) => (
            <button key={v} onClick={() => setRange(v)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${range===v ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading analytics...</div>
      ) : (
        <>
          {/* KPI grid */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <KPI icon="📦" label="Total Orders"     value={data?.total_orders}                       color="#1D9E75" to="/admin/orders" />
            <KPI icon="💰" label="Revenue"           value={`$${Number(data?.revenue||0).toFixed(0)}`} color="#185FA5" />
            <KPI icon="👥" label="Total Users"       value={data?.total_users}                        color="#7F77DD" to="/admin/users" />
            <KPI icon="📅" label="Appointments"      value={data?.total_appointments}                 color="#BA7517" to="/admin/appointments" />
          </div>

          {data?.low_stock_count > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">⚠️</span>
                <h3 className="font-bold text-red-700 text-sm">Low Stock Alert — {data.low_stock_count} medicine(s) need restocking</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(data.low_stock_medicines || []).map(m => (
                  <Link key={m.id} to="/admin/medicines"
                    className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-red-200 transition-colors">
                    {m.name} — {m.stock} left
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Sales chart */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">Revenue Chart</h3>
              {sales.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">No sales data for this period</div>
              ) : (
                <div className="flex items-end gap-2 h-40">
                  {sales.map((s, i) => {
                    const pct = maxRev > 0 ? (Number(s.revenue) / maxRev) * 100 : 0
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-md transition-all" style={{ height: `${Math.max(pct, 4)}%`, background: '#1D9E75', minHeight: 4 }} title={`$${Number(s.revenue).toFixed(2)}`} />
                        <span className="text-[10px] text-gray-400 truncate w-full text-center">{String(s.date).slice(5)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Top medicines */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">Top Selling Medicines</h3>
              {topMeds.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">No sales recorded yet</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {topMeds.slice(0, 6).map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center justify-center">{i+1}</span>
                      <span className="flex-1 text-sm text-gray-700 font-medium truncate">{m.name}</span>
                      <span className="text-xs font-bold text-gray-500">{m.total_sold} sold</span>
                      <span className="text-xs font-bold text-emerald-600">${Number(m.revenue).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { to:'/admin/medicines',    icon:'💊', label:'Manage Medicines', bg:'#E1F5EE', color:'#1D9E75' },
              { to:'/admin/orders',       icon:'📦', label:'View Orders',      bg:'#E6F1FB', color:'#185FA5' },
              { to:'/admin/doctors',      icon:'👨‍⚕️', label:'Pharmacists',    bg:'#FAEEDA', color:'#BA7517' },
              { to:'/admin/applications', icon:'📝', label:'Applications',     bg:'#EEEDFE', color:'#7F77DD' },
            ].map(q => (
              <Link key={q.to} to={q.to}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-2 text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: q.bg }}>{q.icon}</div>
                <span className="text-xs font-semibold text-gray-700">{q.label}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
