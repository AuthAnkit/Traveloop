import { Menu, Bell } from 'lucide-react'

export default function Navbar({ onMenuClick, title }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 lg:px-6 h-16 flex items-center gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu size={20} />
      </button>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 truncate">{title}</h1>
    </header>
  )
}
