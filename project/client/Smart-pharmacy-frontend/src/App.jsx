import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminLayout from './component/AdminLayout'
import DashboardOverview from './Admin/DashboardOverview'
import Medicines from './Admin/Medicines'
import Orders from './Admin/Orders'
import Appointments from './Admin/Appointments'
import Doctors from './Admin/Doctors'
import Users from './Admin/Users'
import Suppliers from './Admin/Suppliers'

function App() {
  return (
    <div className="min-h-screen bg-white">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="medicines" element={<Medicines />} />
          <Route path="orders" element={<Orders />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="users" element={<Users />} />
          <Route path="suppliers" element={<Suppliers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App