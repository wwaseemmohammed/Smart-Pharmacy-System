import { useState } from 'react';
import { Phone, Users } from 'lucide-react';
import { PHARMACISTS, SHIFT_LABELS } from '../../data/pharmacists';

const WaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function TeamPage() {
  const [filter, setFilter] = useState('all');

  const displayed = filter === 'all'
    ? PHARMACISTS
    : PHARMACISTS.filter(p => p.shift === filter);

  const totalExp = PHARMACISTS.reduce((s, p) => s + p.experience, 0);
  const avgExp   = Math.round(totalExp / PHARMACISTS.length);

  const shiftCounts = { morning: 0, evening: 0, night: 0 };
  PHARMACISTS.forEach(p => shiftCounts[p.shift]++);

  const getShiftClass = (shift) => {
    const classes = {
      morning: 'bg-amber-50 text-amber-400 border border-amber-100',
      evening: 'bg-blue-50 text-blue-400 border border-blue-100',
      night: 'bg-purple-50 text-purple-400 border border-[#d5d3f9]'
    };
    return classes[shift] || '';
  };

  return (
    <div className="flex-1 p-8 pb-12" style={{ minHeight: 'calc(100vh - 56px)' }}>
      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-teal-400 mb-1">Our Team</p>
            <h1 className="text-xl font-bold text-text-primary tracking-tight leading-6">Meet Our Pharmacists</h1>
            <p className="text-xs text-text-secondary mt-1">طاقم الصيادلة المتخصصين في خدمتكم</p>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'morning', 'evening', 'night']).map(f => (
              <button
                key={f}
                className={`py-1.25 px-3.5 rounded-full text-xs font-medium border border-border-medium bg-bg-primary text-text-secondary cursor-pointer transition-all flex items-center gap-1.25 ${
                  filter === f ? 'bg-teal-400 border-teal-400 text-white' : 'hover:border-teal-400 hover:text-teal-600'
                }`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? (
                  <><Users size={11} /> All</>
                ) : (
                  <>{SHIFT_LABELS[f].icon} {SHIFT_LABELS[f].en}</>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="flex gap-0.5 bg-border-light border border-border-light rounded-lg overflow-hidden mb-7">
        <div className="flex-1 bg-bg-primary p-3.5 px-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md flex items-center justify-center text-base flex-shrink-0 bg-teal-50">👨‍⚕️</div>
          <div>
            <div className="text-base font-bold tracking-tight text-text-primary leading-none">{PHARMACISTS.length}</div>
            <div className="text-[11px] text-text-hint mt-0.5">Pharmacists</div>
          </div>
        </div>
        <div className="flex-1 bg-bg-primary p-3.5 px-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md flex items-center justify-center text-base flex-shrink-0 bg-amber-50">⭐</div>
          <div>
            <div className="text-base font-bold tracking-tight text-text-primary leading-none">{avgExp}+ yrs</div>
            <div className="text-[11px] text-text-hint mt-0.5">Avg. Experience</div>
          </div>
        </div>
        <div className="flex-1 bg-bg-primary p-3.5 px-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md flex items-center justify-center text-base flex-shrink-0 bg-blue-50">🕐</div>
          <div>
            <div className="text-base font-bold tracking-tight text-text-primary leading-none">24/7</div>
            <div className="text-[11px] text-text-hint mt-0.5">Coverage</div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center gap-2.5 p-16 text-text-hint text-xs col-span-full">
            <Users size={32} strokeWidth={1.2} />
            <p>No pharmacists on this shift</p>
          </div>
        ) : (
          displayed.map(p => {
            const shift = SHIFT_LABELS[p.shift];

            return (
              <div key={p.id} className="bg-bg-primary border border-border-light rounded-xl overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 relative">
                {/* Top */}
                <div className="p-5 pb-4 flex items-start gap-3.5">
                  <div
                    className="w-16 h-16 rounded-3.5 flex items-center justify-center text-[18px] font-bold text-white tracking-wide flex-shrink-0"
                    style={{ background: p.avatarColor }}
                  >
                    {p.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-text-primary tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{p.name}</div>
                    <div className="text-xs text-text-secondary rtl mt-0.25">{p.nameAr}</div>
                    <span className="inline-flex items-center mt-1.25 py-0.5 px-2 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-600 border border-teal-100">{p.titleAr}</span>
                  </div>
                </div>

                <div className="h-0.5 bg-border-light mx-5 mb-5" />

                {/* Details */}
                <div className="p-4 px-5 flex flex-col gap-1.75">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-5.5 h-5.5 rounded-sm bg-bg-secondary flex items-center justify-center text-[11px] flex-shrink-0">🎓</div>
                    <span className="text-text-hint text-[11px] min-w-13">Specialty</span>
                    <span className="text-text-primary font-medium text-xs">{p.specialtyAr}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-5.5 h-5.5 rounded-sm bg-bg-secondary flex items-center justify-center text-[11px] flex-shrink-0">📅</div>
                    <span className="text-text-hint text-[11px] min-w-13">Experience</span>
                    <span className="text-text-primary font-medium text-xs">{p.experience} years · {p.experience} سنة</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-5.5 h-5.5 rounded-sm bg-bg-secondary flex items-center justify-center text-[11px] flex-shrink-0">{shift.icon}</div>
                    <span className="text-text-hint text-[11px] min-w-13">Shift</span>
                    <span className={`inline-flex items-center gap-1 py-0.25 px-2 rounded-full text-[11px] font-medium ${getShiftClass(p.shift)}`}>
                      {shift.icon} {shift.ar} · {shift.hours}
                    </span>
                  </div>
                </div>

                <div className="h-0.5 bg-border-light mx-5" />

                {/* Actions */}
                <div className="p-0 px-5 pb-5 flex gap-2 mt-5">
                  <a
                    href={`tel:${p.phone}`}
                    className="flex-1 py-2.25 rounded-md text-xs font-semibold border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all bg-bg-secondary text-text-primary border border-border-medium hover:bg-bg-tertiary hover:border-teal-400 hover:text-teal-600"
                  >
                    <Phone size={12} />
                    {p.phone}
                  </a>
                  <a
                    href={`https://wa.me/${p.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.25 rounded-md text-xs font-semibold border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all bg-[#25D366] text-white hover:bg-[#1ebe5a]"
                  >
                    <WaIcon />
                    واتساب
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
