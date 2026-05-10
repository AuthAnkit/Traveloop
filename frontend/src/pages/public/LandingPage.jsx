import { Link } from 'react-router-dom'
import { Globe, Map, Wallet, Package, Users, Star, ArrowRight, CheckCircle, Train, Plane, Mountain, Camera, Utensils } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

const features = [
  { icon: Map,      title: 'Multi-City Itinerary',   desc: 'Plan your route from Himalayas to backwaters. Drag-and-drop cities, schedule activities day by day.' },
  { icon: Wallet,   title: 'Budget in ₹ INR',         desc: 'Track hotel, transport, food & activity costs. Get daily average and breakdown charts instantly.' },
  { icon: Package,  title: 'Smart Packing Checklist', desc: 'Never forget your OCI card or sunscreen. Categorized packing lists with one-click reset.' },
  { icon: Users,    title: 'Share Your Adventures',   desc: 'Generate a public link for your trip. Let friends and family follow your journey.' },
]

const destinations = [
  { name: 'Goa',       state: 'Goa',           emoji: '🌊', cost: '₹2,500/day', tag: 'Beaches',    color: 'from-cyan-400 to-blue-500' },
  { name: 'Jaipur',    state: 'Rajasthan',      emoji: '🏰', cost: '₹1,800/day', tag: 'Heritage',   color: 'from-orange-400 to-red-500' },
  { name: 'Manali',    state: 'Himachal Pradesh', emoji: '🏔️', cost: '₹2,000/day', tag: 'Mountains',  color: 'from-blue-400 to-indigo-500' },
  { name: 'Kerala',    state: 'Kerala',          emoji: '🌴', cost: '₹2,200/day', tag: 'Backwaters', color: 'from-green-400 to-teal-500' },
  { name: 'Varanasi',  state: 'Uttar Pradesh',   emoji: '🛕', cost: '₹1,200/day', tag: 'Spiritual',  color: 'from-yellow-400 to-orange-500' },
  { name: 'Mumbai',    state: 'Maharashtra',     emoji: '🌆', cost: '₹3,500/day', tag: 'Metro',      color: 'from-purple-400 to-pink-500' },
]

const stats = [
  { value: '50+', label: 'Indian Cities', icon: '🗺️' },
  { value: '29', label: 'UNESCO Heritage Sites', icon: '🏛️' },
  { value: '200+', label: 'Activities Curated', icon: '🎯' },
  { value: '₹0', label: 'Cost to Use', icon: '💚' },
]

const howItWorks = [
  { step: '01', icon: Plane, title: 'Create Your Trip', desc: 'Name your adventure, set dates, and pick a cover emoji. Takes 30 seconds.' },
  { step: '02', icon: Map, title: 'Build Your Itinerary', desc: 'Search cities, add stops, schedule activities. Drag to reorder your route.' },
  { step: '03', icon: Camera, title: 'Track & Share', desc: 'Monitor your budget in ₹ INR, pack your bag with checklists, share with loved ones.' },
]

const testimonials = [
  { name: 'Priya S.', place: 'Mumbai', text: 'Planned my entire Rajasthan trip on Traveloop — 6 cities, 14 days, ₹40K budget. Perfect!', avatar: 'P' },
  { name: 'Arjun M.', place: 'Bengaluru', text: 'The packing list saved me from forgetting my passport on my Ladakh trip. Absolute lifesaver!', avatar: 'A' },
  { name: 'Sneha R.', place: 'Delhi', text: 'Finally a travel planner that works in INR. Shared my Kerala itinerary with 100+ friends!', avatar: 'S' },
]

export default function LandingPage() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Globe size={18} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Traveloop</span>
            <span className="hidden sm:inline-block text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">India</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Sign in</Link>
            <Link to="/register" className="btn-primary text-sm px-5 py-2 rounded-xl shadow-md shadow-primary-500/30">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-primary-700 to-teal-700" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 text-white text-sm font-medium mb-8 border border-white/20">
            <span className="text-base">🇮🇳</span>
            <span>India's smartest travel planner — free forever</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            From Himalayas to
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Tropical Backwaters
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Plan multi-city Indian itineraries, track your ₹ budget, manage packing lists, and share your trips — all in one stunning platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/register" className="flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:bg-orange-50 transition-all shadow-xl shadow-black/20 hover:scale-105 duration-200">
              Start Planning Free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-2xl transition-all border border-white/20 backdrop-blur-sm">
              Sign In
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-white/70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">🇮🇳 Incredible India</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Popular Indian Destinations</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">From golden deserts to misty mountains — all 50+ cities are pre-loaded with activities and cost data.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((d) => (
              <div key={d.name} className="group cursor-pointer">
                <div className={`h-28 bg-gradient-to-br ${d.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                  {d.emoji}
                </div>
                <div className="mt-3 text-center">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{d.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{d.state}</p>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{d.tag}</span>
                  </div>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-1">{d.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Everything you need to travel smarter</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">From planning to packing, Traveloop covers every step of your Indian adventure.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-900">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/30">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Plan your trip in 3 simple steps</h2>
            <p className="text-gray-500 dark:text-gray-400">No spreadsheets. No confusion. Just beautiful trip planning.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative text-center">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-4 border-2 border-primary-100 dark:border-primary-900">
                    <Icon size={28} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                    {step.replace('0', '')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Loved by Indian travelers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array(5).fill(0).map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-500 via-primary-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🇮🇳</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to plan your dream trip?</h2>
          <p className="text-white/80 mb-8 text-lg">Join thousands of Indian travelers who plan smarter with Traveloop.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/90 mb-10">
            {['100% Free to use', 'No credit card required', '50+ Indian cities', 'Budget in ₹ INR'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle size={16} className="flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-10 py-4 rounded-2xl hover:bg-orange-50 transition-all shadow-2xl hover:scale-105 duration-200">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="py-10 bg-gray-950 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-primary-600 rounded-lg flex items-center justify-center">
            <Globe size={14} className="text-white" />
          </div>
          <span className="text-white font-bold">Traveloop</span>
        </div>
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Traveloop. Built with ❤️ for Indian explorers.</p>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
          <span>🏔️ Himalayas</span>
          <span>🌊 Goa Beaches</span>
          <span>🛕 Varanasi</span>
          <span>🌴 Kerala</span>
          <span>🏰 Jaipur</span>
        </div>
      </footer>
    </div>
  )
}
