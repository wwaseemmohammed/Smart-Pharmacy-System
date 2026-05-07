import React from 'react';

export default function Doctors() {
  const doctors = [
    { name: "Dr. Sarah Smith", spec: "Cardiologist", exp: "15 Years", status: "Available", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Dr. James Wilson", spec: "Pediatrician", exp: "8 Years", status: "On Leave", img: "https://i.pravatar.cc/150?img=11" },
    { name: "Dr. Emily Chen", spec: "Dermatologist", exp: "12 Years", status: "Available", img: "https://i.pravatar.cc/150?img=5" },
    { name: "Dr. Michael Brown", spec: "Neurologist", exp: "20 Years", status: "In Surgery", img: "https://i.pravatar.cc/150?img=8" },
    { name: "Dr. Jessica Davis", spec: "General Surgeon", exp: "10 Years", status: "Available", img: "https://i.pravatar.cc/150?img=9" },
    { name: "Dr. David Miller", spec: "Orthopedics", exp: "18 Years", status: "Available", img: "https://i.pravatar.cc/150?img=12" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-5 pr-10">
        <h2 className="text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">Our Doctors</h2>
        <button className="bg-[#38d373] hover:bg-[#2eaa5c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-10">
        {doctors.map((doc, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100" />
              <div>
                <h3 className="text-[18px] font-bold text-[#2a3835]">{doc.name}</h3>
                <p className="text-[14px] font-medium text-[#38d373]">{doc.spec}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Experience</p>
                <p className="text-[14px] text-[#2a3835] font-semibold">{doc.exp}</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Status</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    doc.status === 'Available' ? 'bg-[#eefaf3] text-[#38d373]' : 
                    doc.status === 'On Leave' ? 'bg-[#fff7ea] text-[#f2a95c]' : 
                    'bg-[#fee2e2] text-[#ef4444]'
                }`}>
                  {doc.status}
                </span>
              </div>
            </div>
            
            <div className="mt-5 flex gap-2">
               <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-[#2a3835] font-semibold py-2 rounded-xl text-[13px] transition-colors">View Profile</button>
               <button className="flex-1 bg-[#eef5fd] hover:bg-[#dbeafe] text-[#5e9de6] font-semibold py-2 rounded-xl text-[13px] transition-colors">Message</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
