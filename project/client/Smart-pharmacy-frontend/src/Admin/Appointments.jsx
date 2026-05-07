import React from 'react';

export default function Appointments() {
  return (
    <>
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-5 pr-10">
        <h2 className="text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">Appointments</h2>
        <button className="bg-[#38d373] hover:bg-[#2eaa5c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            New Appointment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 pr-10">
        {/* Calendar Side */}
        <div className="col-span-1 bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50">
           <h3 className="text-[18px] font-bold text-[#2a3835] mb-4">Upcoming Schedule</h3>
           <div className="space-y-4">
              <div className="p-4 rounded-xl border border-gray-100 border-l-4 border-l-[#38d373] bg-gray-50/50">
                 <div className="text-[13px] text-[#38d373] font-bold mb-1">09:00 AM - 09:30 AM</div>
                 <div className="text-[15px] text-[#2a3835] font-bold">Consultation - Dr. Smith</div>
                 <div className="text-[13px] text-gray-500 mt-1">Patient: John Doe</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 border-l-4 border-l-[#5e9de6] bg-gray-50/50">
                 <div className="text-[13px] text-[#5e9de6] font-bold mb-1">10:15 AM - 11:00 AM</div>
                 <div className="text-[15px] text-[#2a3835] font-bold">Checkup - Dr. Adams</div>
                 <div className="text-[13px] text-gray-500 mt-1">Patient: Sarah Jenkins</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 border-l-4 border-l-[#eaa05e] bg-gray-50/50">
                 <div className="text-[13px] text-[#eaa05e] font-bold mb-1">01:00 PM - 01:45 PM</div>
                 <div className="text-[15px] text-[#2a3835] font-bold">Therapy - Dr. Lee</div>
                 <div className="text-[13px] text-gray-500 mt-1">Patient: Michael Brown</div>
              </div>
           </div>
        </div>

        {/* List Side */}
        <div className="col-span-2 bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-50">
            <h3 className="text-[20px] font-bold text-[#2a3835]">Today's Appointments</h3>
          </div>
          <div className="overflow-x-auto px-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider border-b border-gray-50/50">
                  <th className="px-6 py-5">Patient</th>
                  <th className="px-6 py-5">Doctor</th>
                  <th className="px-6 py-5">Time</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-[15px] text-[#2a3835] font-bold">John Doe</div>
                    <div className="text-[13px] text-gray-500">+1 234-567-890</div>
                  </td>
                  <td className="px-6 py-4 text-[14.5px] text-[#4a5553] font-medium">Dr. Smith</td>
                  <td className="px-6 py-4 text-[14.5px] text-[#2a3835] font-semibold">09:00 AM</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#eefaf3] text-[#38d373]">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-[15px] text-[#2a3835] font-bold">Sarah Jenkins</div>
                    <div className="text-[13px] text-gray-500">+1 987-654-321</div>
                  </td>
                  <td className="px-6 py-4 text-[14.5px] text-[#4a5553] font-medium">Dr. Adams</td>
                  <td className="px-6 py-4 text-[14.5px] text-[#2a3835] font-semibold">10:15 AM</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#eef5fd] text-[#5e9de6]">
                      In Progress
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-[15px] text-[#2a3835] font-bold">Michael Brown</div>
                    <div className="text-[13px] text-gray-500">+1 555-123-456</div>
                  </td>
                  <td className="px-6 py-4 text-[14.5px] text-[#4a5553] font-medium">Dr. Lee</td>
                  <td className="px-6 py-4 text-[14.5px] text-[#2a3835] font-semibold">01:00 PM</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#fff7ea] text-[#f2a95c]">
                      Waiting
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
