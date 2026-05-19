import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from '../component/Toast/Toast';

const SHIFT_LABELS = { morning: 'Morning', evening: 'Evening', night: 'Night' };

export default function Employees() {
  const toast = useToast();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/pharmacists');
      setEmployees(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Remove ${name} from the staff list?`)) return;
    try {
      await api.delete(`/pharmacists/${id}`);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      if (selected?.id === id) setSelected(null);
      toast('Employee removed');
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to remove employee', 'error');
    }
  };

  const hiredCount = employees.filter((e) => e.hired_from_application_id).length;

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10 border-b border-gray-200 pb-5 pr-0 md:pr-10">
        <div>
          <h2 className="text-3xl md:text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">
            Employees
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {employees.length} staff member{employees.length === 1 ? '' : 's'}
            {hiredCount > 0 && ` · ${hiredCount} hired from Careers`}
          </p>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
        <button
          type="button"
          onClick={fetchEmployees}
          className="text-sm font-semibold text-teal-600 hover:text-teal-700 self-start md:self-auto"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-0 md:pr-10">
        {loading ? (
          <div className="col-span-full text-center text-slate-500 py-12">Loading employees…</div>
        ) : employees.length === 0 ? (
          <div className="col-span-full text-center text-slate-500 py-12">
            No employees yet. Hire applicants from the Careers page.
          </div>
        ) : (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              emp={emp}
              onView={() => setSelected(emp)}
              onDelete={() => handleDelete(emp.id, emp.name)}
            />
          ))
        )}
      </div>

      {selected && (
        <EmployeeProfileModal emp={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function EmployeeCard({ emp, onView, onDelete }) {
  const initials = emp.avatar || emp.name?.substring(0, 2).toUpperCase();
  const fromCareers = Boolean(emp.hired_from_application_id);

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 hover:-translate-y-1 transition-transform">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
          style={{ background: emp.avatar_color || '#1D9E75' }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[18px] font-bold text-[#2a3835] truncate">{emp.name}</h3>
          <p className="text-[14px] font-medium text-[#38d373] truncate">{emp.title || emp.specialty || 'Staff'}</p>
          {fromCareers && (
            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              From Careers
            </span>
          )}
        </div>
      </div>

      <motionEmployeeMeta emp={emp} />

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={onView}
          className="flex-1 bg-gray-50 hover:bg-gray-100 text-[#2a3835] font-semibold py-2 rounded-xl text-[13px] transition-colors"
        >
          View Profile
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="px-3 py-2 bg-[#fee2e2] hover:bg-red-100 text-[#ef4444] font-semibold rounded-xl text-[13px] transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function motionEmployeeMeta({ emp }) {
  return (
    <div className="pt-4 border-t border-gray-100 space-y-2 text-sm">
      <MetaRow label="Specialty" value={emp.specialty || '—'} />
      <MetaRow label="Experience" value={`${emp.experience || 0} years`} />
      <MetaRow label="Shift" value={SHIFT_LABELS[emp.shift] || emp.shift || '—'} />
      {emp.phone && <MetaRow label="Phone" value={emp.phone} />}
      {emp.email && <MetaRow label="Email" value={emp.email} />}
    </div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-400 font-semibold text-[12px] uppercase">{label}</span>
      <span className="text-[#2a3835] font-medium text-right truncate">{value}</span>
    </div>
  );
}

function EmployeeProfileModal({ emp, onClose }) {
  const initials = emp.avatar || emp.name?.substring(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose} role="presentation">
      <div
        className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <motionProfileHeader emp={emp} initials={initials} onClose={onClose} />
        <div className="space-y-3">
          <ProfileField label="Position" value={emp.title || '—'} />
          <ProfileField label="Specialization" value={emp.specialty || '—'} />
          <ProfileField label="Experience" value={`${emp.experience || 0} years`} />
          <ProfileField label="Shift" value={SHIFT_LABELS[emp.shift] || emp.shift || '—'} />
          <ProfileField label="Phone" value={emp.phone || '—'} />
          <ProfileField label="Email" value={emp.email || '—'} />
          <ProfileField label="Status" value={emp.status || 'Available'} />
          {emp.hired_from_application_id && (
            <p className="text-sm text-emerald-600 font-semibold bg-emerald-50 rounded-xl px-4 py-3">
              Hired from Careers application #{emp.hired_from_application_id}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-6 px-4 py-2.5 bg-[#38d373] hover:bg-[#2eaa5c] text-white rounded-xl font-semibold transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function motionProfileHeader({ emp, initials, onClose }) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
          style={{ background: emp.avatar_color || '#1D9E75' }}
        >
          {initials}
        </div>
        <div>
          <h3 className="text-[22px] font-bold text-[#2a3835]">{emp.name}</h3>
          <p className="text-[14px] text-[#38d373] font-semibold">{emp.title}</p>
        </div>
      </div>
      <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">
        ×
      </button>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-xl">
      <p className="text-[12px] text-gray-500 font-semibold uppercase mb-1">{label}</p>
      <p className="text-[15px] text-[#2a3835] font-bold">{value}</p>
    </div>
  );
}
