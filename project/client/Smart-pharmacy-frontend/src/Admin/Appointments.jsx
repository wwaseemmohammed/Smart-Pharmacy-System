import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from '../component/Toast/Toast';

export default function Appointments() {
  const toast = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ patient: '', doctor: '', phone: '', date: '', time: '', notes: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/appointments');
      setAppointments(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load appointments');
      console.error('Fetch appointments failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = async () => {
    if (!formData.patient || !formData.doctor || !formData.phone || !formData.date || !formData.time) {
      toast('Please fill all booking fields', 'error');
      return;
    }

    try {
      const payload = {
        patient_name: formData.patient.trim(),
        patient_phone: formData.phone.trim(),
        pharmacist_id: 1,
        appointment_date: formData.date,
        appointment_time: formData.time,
        notes: `${formData.notes.trim()} (Doctor: ${formData.doctor.trim()})`,
      };

      const { data } = await api.post('/appointments', payload);
      setAppointments(prev => [{
        id: data.id,
        patient_name: payload.patient_name,
        patient_phone: payload.patient_phone,
        pharmacist_name: formData.doctor,
        appointment_date: payload.appointment_date,
        appointment_time: payload.appointment_time,
        status: 'Waiting',
      }, ...prev]);
      setFormData({ patient: '', doctor: '', phone: '', date: '', time: '', notes: '' });
      setShowAddForm(false);
      toast('Appointment saved successfully');
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to save appointment', 'error');
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(prev => prev.filter(app => app.id !== id));
      toast('Appointment deleted successfully');
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to delete appointment', 'error');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status: newStatus });
      setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      toast('Status updated');
    } catch (err) {
      toast(err.response?.data?.message || err.message || 'Failed to update status', 'error');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-5 pr-10">
        <div>
          <h2 className="text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">Appointments</h2>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#38d373] hover:bg-[#2eaa5c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            New Appointment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 pr-10">
        <div className="col-span-1 bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50">
           <h3 className="text-[18px] font-bold text-[#2a3835] mb-4">Upcoming Schedule</h3>
           {loading ? (
             <div className="text-sm text-slate-500">Loading schedule...</div>
           ) : appointments.length === 0 ? (
             <div className="text-sm text-slate-500">No appointments yet.</div>
           ) : (
             <div className="space-y-4">
               {appointments.slice(0, 3).map((app) => (
                 <div key={app.id} className="p-4 rounded-xl border border-gray-100 border-l-4 border-l-[#38d373] bg-gray-50/50">
                   <div className="text-[13px] text-[#38d373] font-bold mb-1">{app.appointment_time}</div>
                   <div className="text-[15px] text-[#2a3835] font-bold">{app.patient_name}</div>
                   <div className="text-[13px] text-gray-500 mt-1">Doctor: {app.pharmacist_name}</div>
                 </div>
               ))}
             </div>
           )}
        </div>

        <div className="col-span-2 bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-50">
            <h3 className="text-[20px] font-bold text-[#2a3835]">Appointment Requests</h3>
          </div>
          <div className="overflow-x-auto px-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider border-b border-gray-50/50">
                  <th className="px-6 py-5">Patient</th>
                  <th className="px-6 py-5">Doctor</th>
                  <th className="px-6 py-5">Time</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map((app) => (
                <tr key={app.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-[15px] text-[#2a3835] font-bold">{app.patient_name}</div>
                    <div className="text-[13px] text-gray-500">{app.patient_phone}</div>
                  </td>
                  <td className="px-6 py-4 text-[14.5px] text-[#4a5553] font-medium">{app.pharmacist_name}</td>
                  <td className="px-6 py-4 text-[14.5px] text-[#2a3835] font-semibold">{app.appointment_date} {app.appointment_time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold ${
                        app.status === 'Completed' ? 'bg-[#eefaf3] text-[#38d373]' : 
                        app.status === 'In Progress' ? 'bg-[#eef5fd] text-[#5e9de6]' : 
                        app.status === 'Waiting' ? 'bg-[#fff7ea] text-[#f2a95c]' : 
                        'bg-[#fee2e2] text-[#ef4444]'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2 justify-end">
                      {app.status !== 'Completed' && app.status !== 'Cancelled' && (
                        <>
                          <button
                            onClick={() => updateStatus(app.id, 'In Progress')}
                            className="px-3 py-1.5 bg-[#38d373] hover:bg-[#2eaa5c] text-white text-[12px] font-bold rounded-lg transition-colors"
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => updateStatus(app.id, 'Completed')}
                            className="px-3 py-1.5 bg-[#5e9de6] hover:bg-[#4078d0] text-white text-[12px] font-bold rounded-lg transition-colors"
                          >
                            Complete
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteAppointment(app.id)}
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
                {appointments.length === 0 && (
                  <tr><td colSpan="5" className="text-center py-10 text-gray-400">No appointments found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[24px] p-8 w-96 shadow-2xl">
            <h3 className="text-[22px] font-bold text-[#2a3835] mb-6">New Appointment</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Patient Name"
                value={formData.patient}
                onChange={(e) => setFormData(prev => ({ ...prev, patient: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#38d373]"
              />
              <input
                type="text"
                placeholder="Doctor Name"
                value={formData.doctor}
                onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#38d373]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#38d373]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#38d373]"
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#38d373]"
                />
              </div>
              <textarea
                placeholder="Notes or special request"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#38d373]"
                rows="3"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-semibold text-[#2a3835] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAppointment}
                className="flex-1 px-4 py-2.5 bg-[#38d373] hover:bg-[#2eaa5c] text-white rounded-xl font-semibold transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
