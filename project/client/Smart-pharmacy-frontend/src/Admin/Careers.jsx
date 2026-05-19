import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useToast } from '../component/Toast/Toast';

const STATUS_STYLES = {
  Pending: 'bg-[#fff7ea] text-[#f2a95c]',
  Reviewed: 'bg-[#eef5fd] text-[#5e9de6]',
  Accepted: 'bg-[#eefaf3] text-[#38d373]',
  Rejected: 'bg-[#fee2e2] text-[#ef4444]',
};

function Detail({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-xl">
      <p className="text-[12px] text-gray-500 font-semibold uppercase mb-0.5">{label}</p>
      <p className="text-[15px] text-[#2a3835] font-medium">{value}</p>
    </div>
  );
}

function ModalOverlay({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <motionModalOverlay onClick={(e) => e.stopPropagation()} role="dialog">
        {children}
      </motionModalOverlay>
    </div>
  );
}

function motionModalOverlay(props) {
  return <div {...props} />;
}

function ApplicationModal({ app, hireShift, setHireShift, hiringId, onClose, onStatus, onHire, onCv }) {
  const isHired = Boolean(app.pharmacist_id);

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-[22px] font-bold text-[#2a3835]">{app.full_name}</h3>
            <span className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[app.status] || ''}`}>
              {app.status}
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close">
            ×
          </button>
        </div>

        <div className="space-y-3 mb-6 text-sm">
          <Detail label="Email" value={app.email} />
          <Detail label="Phone" value={app.phone || '—'} />
          <Detail label="Position" value={app.position} />
          <Detail label="Experience" value={`${app.experience || 0} years`} />
          <Detail label="Specialization" value={app.specialization || '—'} />
          <Detail label="Applied" value={new Date(app.created_at).toLocaleString()} />
          {app.about && (
            <motionAboutBlock about={app.about} />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {app.cv_filename && (
            <button
              type="button"
              onClick={() => onCv(app.id, app.full_name)}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-[#2a3835] hover:bg-gray-200"
            >
              Download CV
            </button>
          )}
          {!isHired && app.status !== 'Rejected' && (
            <>
              <select
                value={hireShift}
                onChange={(e) => setHireShift(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
              >
                <option value="morning">Morning shift</option>
                <option value="evening">Evening shift</option>
                <option value="night">Night shift</option>
              </select>
              <button
                type="button"
                disabled={hiringId === app.id}
                onClick={() => onHire(app.id)}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-[#38d373] hover:bg-[#2eaa5c] text-white disabled:opacity-50"
              >
                {hiringId === app.id ? 'Adding…' : 'Add to Employees'}
              </button>
            </>
          )}
          {!isHired && (
            <>
              <button
                type="button"
                onClick={() => onStatus(app.id, 'Reviewed')}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#eef5fd] text-[#5e9de6]"
              >
                Mark Reviewed
              </button>
              <button
                type="button"
                onClick={() => onStatus(app.id, 'Rejected')}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#fee2e2] text-[#ef4444]"
              >
                Reject
              </button>
            </>
          )}
          {isHired && (
            <p className="text-sm font-semibold text-[#38d373] w-full">✓ Added to Employees list</p>
          )}
        </div>
      </div>
    </ModalOverlay>
  );
}

function motionAboutBlock({ about }) {
  return (
    <div className="bg-gray-50 p-3 rounded-xl">
      <p className="text-[12px] text-gray-500 font-semibold uppercase mb-1">About</p>
      <p className="text-[14px] text-[#2a3835] whitespace-pre-wrap">{about}</p>
    </div>
  );
}

function ApplicationRow({ app, hiringId, onSelect, onHire, onCv }) {
  const isHired = Boolean(app.pharmacist_id);

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="text-[15px] font-bold text-[#2a3835]">{app.full_name}</div>
        <div className="text-[12px] text-gray-500">{app.email}</div>
      </td>
      <td className="px-6 py-4 text-[14px] font-semibold text-[#2a3835]">{app.position}</td>
      <td className="px-6 py-4 text-[14px] text-gray-600">{app.experience || 0} yrs</td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-[12px] font-bold ${STATUS_STYLES[app.status] || ''}`}>
          {app.status}
        </span>
      </td>
      <td className="px-6 py-4 text-[13px] text-gray-500">{new Date(app.created_at).toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSelect(app)}
            className="px-3 py-1.5 text-[12px] font-bold rounded-lg bg-gray-100 text-[#2a3835] hover:bg-gray-200"
          >
            View
          </button>
          {app.cv_filename && (
            <button
              type="button"
              onClick={() => onCv(app.id, app.full_name)}
              className="px-3 py-1.5 text-[12px] font-bold rounded-lg bg-[#eef5fd] text-[#5e9de6]"
            >
              CV
            </button>
          )}
          {!isHired && app.status !== 'Rejected' && (
            <button
              type="button"
              disabled={hiringId === app.id}
              onClick={() => onHire(app.id)}
              className="px-3 py-1.5 text-[12px] font-bold rounded-lg bg-[#38d373] text-white hover:bg-[#2eaa5c] disabled:opacity-50"
            >
              {hiringId === app.id ? '…' : 'Hire'}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function Careers() {
  const toast = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [hiringId, setHiringId] = useState(null);
  const [hireShift, setHireShift] = useState('morning');

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/jobs');
      setApplications(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/jobs/${id}/status`, { status });
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      if (selected?.id === id) setSelected((s) => ({ ...s, status }));
      const msg = status === 'Rejected'
        ? 'Application rejected — email sent to applicant'
        : status === 'Reviewed'
          ? 'Marked as reviewed — email sent to applicant'
          : 'Status updated';
      toast(msg);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to update status', 'error');
    }
  };

  const hireApplicant = async (id) => {
    setHiringId(id);
    try {
      const { data } = await api.post(`/jobs/${id}/hire`, { shift: hireShift });
      setApplications((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: 'Accepted', pharmacist_id: data.pharmacist?.id } : a
        )
      );
      if (selected?.id === id) {
        setSelected((s) => ({ ...s, status: 'Accepted', pharmacist_id: data.pharmacist?.id }));
      }
      toast(`${data.pharmacist?.name || 'Applicant'} added to Employees — acceptance email sent`);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to hire applicant', 'error');
    } finally {
      setHiringId(null);
    }
  };

  const downloadCv = async (id, name) => {
    try {
      const { data } = await api.get(`/jobs/${id}/cv`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name.replace(/\s+/g, '_')}_CV.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast('CV not available', 'error');
    }
  };

  const pendingCount = applications.filter((a) => a.status === 'Pending').length;

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10 border-b border-gray-200 pb-5 pr-0 md:pr-10">
        <div>
          <h2 className="text-3xl md:text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">
            Careers & Applications
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {pendingCount} pending application{pendingCount === 1 ? '' : 's'}
          </p>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
        <button
          type="button"
          onClick={fetchApplications}
          className="text-sm font-semibold text-teal-600 hover:text-teal-700 self-start md:self-auto"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 pr-0 md:pr-10 max-w-full overflow-hidden">
        <div className="p-7 border-b border-gray-50">
          <h3 className="text-[20px] font-bold text-[#2a3835]">Job Applications</h3>
          <p className="text-sm text-gray-500 mt-1">
            Review applications and add accepted candidates to Employees.
          </p>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <motionLoading />
          ) : applications.length === 0 ? (
            <motionEmpty />
          ) : (
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider border-b border-gray-50/50">
                  <th className="px-6 py-5">Applicant</th>
                  <th className="px-6 py-5">Position</th>
                  <th className="px-6 py-5">Experience</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map((app) => (
                  <ApplicationRow
                    key={app.id}
                    app={app}
                    hiringId={hiringId}
                    onSelect={setSelected}
                    onHire={hireApplicant}
                    onCv={downloadCv}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selected && (
        <ApplicationModal
          app={selected}
          hireShift={hireShift}
          setHireShift={setHireShift}
          hiringId={hiringId}
          onClose={() => setSelected(null)}
          onStatus={updateStatus}
          onHire={hireApplicant}
          onCv={downloadCv}
        />
      )}
    </>
  );
}

function motionLoading() {
  return <div className="p-10 text-center text-slate-500">Loading applications…</div>;
}

function motionEmpty() {
  return <div className="p-10 text-center text-slate-500">No applications yet.</div>;
}
