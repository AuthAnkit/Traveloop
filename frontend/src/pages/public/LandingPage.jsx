import { Link } from 'react-router-dom'
import { Globe, Map, Wallet, Package, Users, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

const features = [
  { icon: Map,     title: 'Multi-City Itinerary',  desc: 'Build detailed trip plans with drag-and-drop city ordering and activity scheduling.' },
  { icon: Wallet,  title: 'Smart Budget Tracking',  desc: 'Auto-calculate trip costs with real-time budget breakdown by category.' },
  { icon: Package, title: 'Packing Checklist',      desc: 'Never forget essentials with a smart, categorized packing list per trip.' },
  { icon: Users,   title: 'Share Your Adventures',  desc: 'Generate a public link and let others explore or copy your itinerary.' },
]

const destinations = [
  { name: 'Paris',     country: 'France',  emoji: '🗼', cost: '$120/day' },
  { name: 'Tokyo',     country: 'Japan',   emoji: '⛩️', cost: '$85/day'  },
  { name: 'New York',  country: 'USA',     emoji: '🗽', cost: '$200/day' },
  { name: 'Bali',      country: 'Indonesia', emoji: '🌴', cost: '$60/day' },
]

export default function LandingPage() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Traveloop</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Sign in</Link>
            <Link to="/register" className="btn-primary text-sm px-4 py-2 rounded-xl">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-teal-600" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-white text-sm mb-6">
            <Star size={14} className="fill-yellow-300 text-yellow-300" />
            <span>Your AI-powered travel companion</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Plan Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Build multi-city itineraries, track your budget, manage packing lists, and share your trips — all in one beautiful platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:bg-primary-50 transition-all shadow-lg shadow-primary-900/30">
              Start Planning Free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to travel smarter</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">From planning to packing, Traveloop covers every step of your journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/60 transition-colors">
                  <Icon size={22} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((d) => (
              <div key={d.name} className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-32 bg-gradient-to-br from-primary-100 to-teal-100 dark:from-primary-900/30 dark:to-teal-900/30 flex items-center justify-center text-5xl">
                  {d.emoji}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white">{d.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{d.country}</p>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">{d.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-teal-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to plan your dream trip?</h2>
          <p className="text-white/80 mb-8">Join thousands of travelers who plan smarter with Traveloop.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/90 mb-8">
            {['Free to use', 'No credit card required', 'Share with anyone'].map((t) => (
              <div key={t} className="flex items-center gap-1.5"><CheckCircle size={16} />{t}</div>
            ))}
          </div>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:bg-primary-50 transition-all shadow-lg">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800">
        © {new Date().getFullYear()} Traveloop. Built with ❤️ for explorers.
      </footer>
    </div>
  )
}
