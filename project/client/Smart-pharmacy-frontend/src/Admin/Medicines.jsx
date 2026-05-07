import React, { useState } from 'react';

export default function Medicines() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);

  const initialMedicines = [
    { id: 1, name: "Paracetamol 500mg", cat: "Pain Relief", price: 5.00, stock: 1200, min: 100 },
    { id: 2, name: "Amoxicillin 250mg", cat: "Antibiotics", price: 12.50, stock: 15, min: 50 },
    { id: 3, name: "Vitamin C 1000mg", cat: "Supplements", price: 18.00, stock: 0, min: 20 },
    { id: 4, name: "Ibuprofen 400mg", cat: "Pain Relief", price: 8.20, stock: 450, min: 100 },
  ];

  const filteredMedicines = initialMedicines
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'quantity') return a.stock - b.stock;
      return 0;
    });

  return (
    <>
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-5 pr-10">
        <h2 className="text-[34px] font-extrabold font-serif text-[#0f2922] tracking-tight">Medicines Inventory</h2>
        <button 
           onClick={() => setShowModal(true)}
           className="bg-[#38d373] hover:bg-[#2eaa5c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            Add Medicine
        </button>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-50/50 pr-10 max-w-full">
        <div className="p-7 flex justify-between items-center border-b border-gray-50">
          <div className="flex items-center gap-4">
             <h3 className="text-[20px] font-bold text-[#2a3835]">All Medicines</h3>
             <select 
               className="bg-gray-50 border border-gray-100 text-sm font-semibold rounded-lg text-gray-500 py-2 px-3 outline-none focus:ring-2 focus:ring-[#38d373]/20"
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
             >
               <option value="name">Sort by Name</option>
               <option value="quantity">Sort by Quantity</option>
             </select>
          </div>
          <div className="relative">
             <input 
               type="text" 
               placeholder="Search by name..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-gray-50 border border-gray-100 text-sm font-medium rounded-xl focus:ring-[#38d373] focus:border-[#38d373] block w-64 p-2.5 pl-10" 
             />
             <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
        <div className="overflow-x-auto px-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[12px] font-semibold uppercase tracking-wider border-b border-gray-50/50">
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Quantity / Min</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMedicines.map(med => (
                <tr key={med.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-[15px] text-[#2a3835] font-semibold">{med.name}</td>
                  <td className="px-6 py-5 text-[14.5px] text-gray-500 font-medium">{med.cat}</td>
                  <td className="px-6 py-5 text-[15px] text-[#2a3835] font-bold">${med.price.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                       <span className="text-[15px] text-[#4a5553] font-bold">{med.stock} <span className="text-gray-400 text-[11px] font-normal">avail</span></span>
                       <span className="text-[11px] text-gray-400 font-medium">Min: {med.min}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-bold ${
                       med.stock === 0 ? 'bg-red-50 text-red-500 border border-red-100' :
                       med.stock < med.min ? 'bg-orange-50 text-orange-500 border border-orange-100' :
                       'bg-[#eefaf3] text-[#38d373]'
                    }`}>
                      {med.stock === 0 ? 'Out of Stock' : med.stock < med.min ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition-colors" onClick={() => setShowModal(true)}>
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                      <button className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMedicines.length === 0 && (
                <tr><td colSpan="6" className="text-center py-10 text-gray-400">No medicines found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[500px] shadow-2xl p-6 relative">
            <h3 className="text-xl font-bold text-[#0f2922] mb-6">Medicine Details</h3>
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Name *</label>
                <input type="text" required placeholder="e.g. Paracetamol" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#38d373]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Price *</label>
                  <input type="number" step="0.01" required placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#38d373]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Quantity</label>
                  <input type="number" required placeholder="0" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#38d373]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Minimum Alert Level</label>
                  <input type="number" placeholder="50" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#38d373]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Category</label>
                  <input type="text" placeholder="e.g. Antibiotics" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#38d373]" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-[#38d373] hover:bg-[#2eaa5c] text-white font-bold py-3 rounded-xl transition-colors">Save Medicine</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
