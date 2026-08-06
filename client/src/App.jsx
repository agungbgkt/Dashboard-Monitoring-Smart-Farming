import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard';
import DashboardCard from './components/Cards/StatsCard'

function App() {
  return (
    <>
      <DashboardLayout/>
    </>
  );
}

export default App
