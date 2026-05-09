import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans overflow-hidden md:flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden md:pl-0">
        <AdminTopNav onToggleSidebar={() => setSidebarOpen((open) => !open)} />
        <main className="flex-1 px-4 pb-6 pt-6 md:px-10 md:pt-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
