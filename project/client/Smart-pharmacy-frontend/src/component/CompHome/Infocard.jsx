import { motion } from 'framer-motion'

/**
 * InfoCard — كارد عام قابل لإعادة الاستخدام
 *
 * Props:
 * @param {string}   title        - العنوان الرئيسي
 * @param {string}   subtitle     - نص صغير تحت العنوان
 * @param {string}   badge        - نص الـ badge  (مثل: "In Stock")
 * @param {string}   badgeColor   - "green" | "blue" | "amber" | "red" | "purple" | "gray"
 * @param {JSX}      icon         - أيقونة SVG تظهر بجانب العنوان
 * @param {string}   iconBg       - لون خلفية الأيقونة hex
 * @param {string}   iconColor    - لون الأيقونة hex
 * @param {Array}    fields       - [{ label: string, value: string }]
 * @param {Array}    actions      - [{ label: string, onClick: fn, variant: "primary"|"ghost" }]
 * @param {function} onClick      - كلك على الكارد كاملاً
 * @param {string}   className    - Tailwind classes إضافية
 *
 * ───── أمثلة استخدام ─────
 *
 * // دواء
 * <InfoCard
 *   title="Amoxicillin 500mg"
 *   subtitle="Antibiotics"
 *   badge="In Stock"
 *   badgeColor="green"
 *   fields={[
 *     { label: "Price",    value: "$12.50"    },
 *     { label: "Quantity", value: "240 units" },
 *     { label: "Expiry",   value: "Dec 2026"  },
 *   ]}
 *   actions={[
 *     { label: "Details",     variant: "ghost",   onClick: () => {} },
 *     { label: "Add to Cart", variant: "primary", onClick: () => {} },
 *   ]}
 * />
 *
 * // مريض
 * <InfoCard
 *   title="Ahmad Saleh"
 *   subtitle="Patient #1042"
 *   badge="Active"
 *   badgeColor="blue"
 *   fields={[
 *     { label: "Age",           value: "34"        },
 *     { label: "Last Visit",    value: "Apr 8"     },
 *     { label: "Prescriptions", value: "3 active"  },
 *   ]}
 * />
 *
 * // موظف
 * <InfoCard
 *   title="Dr. Layla Hassan"
 *   subtitle="Chief Pharmacist"
 *   badge="On Duty"
 *   badgeColor="green"
 *   fields={[
 *     { label: "Experience", value: "15 years"       },
 *     { label: "Specialty",  value: "Chronic Care"   },
 *     { label: "Email",      value: "layla@med.ps"   },
 *   ]}
 * />
 *
 * // طلب
 * <InfoCard
 *   title="Order #1042"
 *   subtitle="Ahmad Saleh"
 *   badge="Pending"
 *   badgeColor="amber"
 *   fields={[
 *     { label: "Medicine", value: "Amoxicillin 500mg" },
 *     { label: "Qty",      value: "2 boxes"           },
 *     { label: "Total",    value: "$25.00"            },
 *     { label: "Time",     value: "09:15 AM"          },
 *   ]}
 *   actions={[
 *     { label: "Reject",  variant: "ghost",   onClick: () => {} },
 *     { label: "Approve", variant: "primary", onClick: () => {} },
 *   ]}
 * />
 */

const badgeStyles = {
  green:  { bg: '#E1F5EE', text: '#1D9E75' },
  blue:   { bg: '#E6F1FB', text: '#185FA5' },
  amber:  { bg: '#FAEEDA', text: '#BA7517' },
  red:    { bg: '#FCEBEB', text: '#A32D2D' },
  purple: { bg: '#EEEDFE', text: '#7F77DD' },
  gray:   { bg: '#F1EFE8', text: '#5F5E5A' },
}

export default function InfoCard({
  title,
  subtitle,
  badge,
  badgeColor = 'green',
  icon,
  iconBg = '#E1F5EE',
  iconColor = '#1D9E75',
  fields = [],
  actions = [],
  onClick,
  className = '',
}) {
  const bs = badgeStyles[badgeColor] ?? badgeStyles.green

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3 border-b border-slate-50">
        <div className="flex items-center gap-3 min-w-0">

          {/* Icon */}
          {icon && (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: iconBg, color: iconColor }}
            >
              {icon}
            </div>
          )}

          {/* Title + Subtitle */}
          <div className="min-w-0">
            <h3
              className="font-bold text-slate-800 text-sm truncate leading-snug"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <span
            className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: bs.bg, color: bs.text }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* ── Fields ── */}
      {fields.length > 0 && (
        <div className="px-5 py-3.5 flex flex-col gap-2.5">
          {fields.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400 flex-shrink-0">{f.label}</span>
              <span className="text-xs font-semibold text-slate-700 text-right truncate">{f.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Actions ── */}
      {actions.length > 0 && (
        <div
          className={`px-5 pb-5 flex gap-2 ${
            fields.length > 0 ? 'pt-3 border-t border-slate-50' : 'pt-4'
          }`}
        >
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); a.onClick?.() }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90 active:scale-95 ${
                a.variant === 'primary'
                  ? 'text-white'
                  : 'border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 bg-white'
              }`}
              style={
                a.variant === 'primary'
                  ? { background: 'linear-gradient(135deg, #1D9E75, #0F6E56)' }
                  : {}
              }
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}