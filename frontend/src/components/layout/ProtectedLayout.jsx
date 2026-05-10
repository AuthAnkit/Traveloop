import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const titleMap = {
  '/app/dashboard':  'Dashboard',
  '/app/trips':      'My Trips',
  '/app/trips/new':  'Plan New Trip',
  '/app/profile':    'Profile',
}

function getTitle(pathname) {
  if (pathname.includes('/builder')) return 'Itinerary Builder'
  if (pathname.includes('/view'))    return 'Itinerary View'
  if (pathname.includes('/budget'))  return 'Budget'
  if (pathname.includes('/packing')) return 'Packing List'
  if (pathname.includes('/notes'))   return 'Notes & Journal'
  if (pathname.includes('/edit'))    return 'Edit Trip'
  return titleMap[pathname] ?? 'Traveloop'
}

export default function ProtectedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={getTitle(pathname)} />
        <main className="flex-1 p-4 lg:p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
