import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './/component/Navbar '

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  )
}

export default App