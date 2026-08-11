import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard';
import DashboardCard from './components/Cards/StatsCard'
import { Routes, Route,Navigate } from 'react-router-dom'
import Devices from './pages/Devices'
import History from './pages/History'
import Reports from './pages/Reports'
import Notification from './pages/Notifications'

function App() {
  return (
      <Routes>
        <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<Navigate to="/dashboard" replace/>}></Route>
          <Route path="dashboard" element={<Dashboard/>}></Route>
          <Route path="perangkat" element={<Devices/>}></Route>
          <Route path="history-data" element={<History/>}></Route>
          <Route path="laporan" element={<Reports/>}></Route>
          <Route path="notifikasi" element={<Notification/>}></Route>
        </Route>
      </Routes>
  );
}

export default App;
