import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
  LayoutDashboard, Map, PlusCircle, Wallet, Package, NotebookPen,
  User, LogOut, Sun, Moon, Globe, X,
} from 'lucide-react'
import clsx from 'clsx'

const links = [
  { to: '/app/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/trips',      icon: Map,              label: 'My Trips' },
  { to: '/app/trips/new',  icon: PlusCircle,       label: 'Plan New Trip' },
]

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-white dark:bg-gray-900',
        'border-r border-gray-100 dark:border-gray-800 transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">Traveloop</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        {/* User avatar */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app/trips'}
              className={({ isActive }) => clsx('sidebar-link', isActive && 'active')}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
          <NavLink to="/app/profile" className={({ isActive }) => clsx('sidebar-link', isActive && 'active')} onClick={onClose}>
            <User size={18} /><span>Profile</span>
          </NavLink>
          <button
            onClick={toggle}
            className="sidebar-link w-full"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={handleLogout} className="sidebar-link w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut size={18} /><span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
