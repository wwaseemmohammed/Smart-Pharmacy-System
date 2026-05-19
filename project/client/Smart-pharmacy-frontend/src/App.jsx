import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Medicines from './pages/Medicines';
import Doctors from './pages/Doctors';
import JobsPage from './pages/JobsPage';
import AuthPage from './pages/AuthPage';
import Unauthorized from './pages/Unauthorized';
import AdminLayout from './component/AdminLayout';
import ProtectedRoute from './component/ProtectedRoute';
import DashboardOverview from './Admin/DashboardOverview';
import AdminMedicines from './Admin/Medicines';
import Orders from './Admin/Orders';
import Appointments from './Admin/Appointments';
import AdminDoctors from './Admin/Doctors';
import Users from './Admin/Users';
import Suppliers from './Admin/Suppliers';

import { ToastProvider } from './component/Toast/Toast';

function AppInner() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/careers" element={<JobsPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="medicines" element={<AdminMedicines />} />
          <Route path="orders" element={<Orders />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="users" element={<Users />} />
          <Route path="suppliers" element={<Suppliers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
