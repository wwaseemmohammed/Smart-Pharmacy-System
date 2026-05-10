import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider }   from './components/Toast.jsx'
import { AuthProvider }    from './context/AuthContext.jsx'
import ProtectedRoute      from './components/ProtectedRoute.jsx'

import Home                from './pages/Home.jsx'
import MedicinesPage       from './pages/MedicinesPage.jsx'
import TeamPage            from './pages/TeamPage.jsx'
import JobsPage            from './pages/JobsPage.jsx'
import AuthPage            from './pages/AuthPage.jsx'
import Unauthorized        from './pages/Unauthorized.jsx'

import AdminLayout         from './components/AdminLayout.jsx'
import DashboardOverview   from './Admin/DashboardOverview.jsx'
import Medicines           from './Admin/Medicines.jsx'
import Orders              from './Admin/Orders.jsx'
import Appointments        from './Admin/Appointments.jsx'
import Doctors             from './Admin/Doctors.jsx'
import Users               from './Admin/Users.jsx'
import Suppliers           from './Admin/Suppliers.jsx'
import JobApplications     from './Admin/JobApplications.jsx'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public pages — accessible by everyone */}
            <Route path="/"          element={<Home />} />
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/team"      element={<TeamPage />} />
            <Route path="/careers"   element={<JobsPage />} />

            {/* Auth pages */}
            <Route path="/login"        element={<AuthPage />} />
            <Route path="/signup"       element={<AuthPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Admin pages — protected: owner/admin only */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index                element={<DashboardOverview />} />
              <Route path="medicines"     element={<Medicines />} />
              <Route path="orders"        element={<Orders />} />
              <Route path="appointments"  element={<Appointments />} />
              <Route path="doctors"       element={<Doctors />} />
              <Route path="users"         element={<Users />} />
              <Route path="suppliers"     element={<Suppliers />} />
              <Route path="applications"  element={<JobApplications />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  )
}
