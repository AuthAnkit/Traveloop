import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboard } from '../../api/users'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency, statusColor } from '../../utils/formatters'
import { formatDate } from '../../utils/dateUtils'
import { StatSkeleton, CardSkeleton } from '../../components/ui/LoadingSkeleton'
import Badge from '../../components/ui/Badge'
import { Map, Wallet, CheckCircle, PlusCircle, ArrowRight, Globe, CalendarDays, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

const indianDestinations = [
  { name: 'Mumbai',    state: 'Maharashtra',      emoji: '🌆', tag: 'City of Dreams',      color: 'from-purple-500 to-pink-500' },
  { name: 'Jaipur',    state: 'Rajasthan',         emoji: '🏰', tag: 'Pink City',            color: 'from-orange-500 to-red-500' },
  { name: 'Goa',       state: 'Goa',               emoji: '🌊', tag: 'Beach Paradise',       color: 'from-cyan-500 to-blue-500' },
  { name: 'Varanasi',  state: 'Uttar Pradesh',     emoji: '🛕', tag: 'Spiritual Capital',    color: 'from-yellow-500 to-orange-500' },
  { name: 'Manali',    state: 'Himachal Pradesh',  emoji: '🏔️', tag: 'Adventure Hub',        color: 'from-blue-500 to-indigo-500' },
  { name: 'Kerala',    state: 'Kerala',             emoji: '🌴', tag: "God's Own Country",   color: 'from-green-500 to-teal-500' },
  { name: 'Agra',      state: 'Uttar Pradesh',     emoji: '🕌', tag: 'Taj Mahal',            color: 'from-rose-400 to-pink-500' },
  { name: 'Shimla',    state: 'Himachal Pradesh',  emoji: '❄️', tag: 'Queen of Hills',       color: 'from-sky-400 to-blue-500' },
  { name: 'Udaipur',   state: 'Rajasthan',         emoji: '🌅', tag: 'City of Lakes',        color: 'from-teal-500 to-cyan-500' },
  { name: 'Rishikesh', state: 'Uttarakhand',       emoji: '🧘', tag: 'Yoga Capital',         color: 'from-emerald-500 to-green-500' },
]

const travelTips = [
  { emoji: '🌧️', tip: 'Best season: Oct–Feb for most of India. Jun–Sep for Himalayas trekking.' },
  { emoji: '🚂', tip: 'Book train tickets 60–90 days in advance on IRCTC for popular routes.' },
  { emoji: '💳', tip: 'Carry some cash in ₹ — many smaller cities are still cash-first.' },
  { emoji: '📱', tip: 'Download offline maps on Google Maps before heading to remote areas.' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then((r) => setData(r.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const upcomingTrip = data?.recentTrips?.find(
    (t) => t.status === 'PLANNED' && t.startDate && new Date(t.startDate) > new Date()
  )
  const daysUntil = upcomingTrip
    ? Math.ceil((new Date(upcomingTrip.startDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null

  const stats = data ? [
    { label: 'Total Trips',   value: data.totalTrips,                       icon: Map,         color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-900/30' },
    { label: 'Planned',       value: data.plannedTrips,                     icon: Globe,       color: 'text-blue-600 dark:text-blue-400',       bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Completed',     value: data.completedTrips,                   icon: CheckCircle, color: 'text-green-600 dark:text-green-400',     bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Total Spent',   value: formatCurrency(data.totalBudgetSpent), icon: Wallet,      color: 'text-orange-600 dark:text-orange-400',   bg: 'bg-orange-100 dark:bg-orange-900/30', isText: true },
  ] : []

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-primary-600 to-teal-600 p-6 sm:p-8">
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-3xl mb-1">👋</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Namaste, {user?.name?.split(' ')[0]}!
            </h2>
            <p className="text-white/70 mt-1 text-sm">
              {daysUntil
                ? `🗓️ Next trip in ${daysUntil} days — ${upcomingTrip.title}`
                : 'Where are you heading next? Plan your adventure! 🇮🇳'}
            </p>
          </div>
          <Link to="/app/trips/new" className="hidden sm:flex items-center gap-2 bg-white text-primary-700 font-bold px-5 py-3 rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:scale-105 duration-200">
            <PlusCircle size={16} /> New Trip
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => <StatSkeleton key={i} />)
          : stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="card p-5 hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-200">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={22} className={color} />
                </div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Trips</h3>
            <Link to="/app/trips" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : data?.recentTrips?.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-5xl mb-4">✈️</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No trips yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Start planning your first Indian adventure!</p>
              <Link to="/app/trips/new" className="btn-primary inline-flex items-center gap-2">
                <PlusCircle size={16} /> Plan a trip
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.recentTrips?.map((trip) => (
                <div key={trip.id} className="card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className="h-28 bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-4xl relative">
                    {trip.coverImage ?? '🌍'}
                    <Badge className={`absolute top-2 right-2 text-xs ${statusColor(trip.status)}`}>{trip.status}</Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate">{trip.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 mb-3">
                      {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Map size={11} /> {trip.stopCount} {trip.stopCount === 1 ? 'city' : 'cities'}
                      </span>
                      <Link to={`/app/trips/${trip.id}/view`}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary-500" /> Quick Actions
            </h3>
            <div className="space-y-2">
              <Link to="/app/trips/new" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors group">
                <PlusCircle size={16} className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Plan New Trip</span>
              </Link>
              <Link to="/app/trips" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <Map size={16} className="text-gray-500 group-hover:text-primary-500 transition-colors" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View All Trips</span>
              </Link>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">🇮🇳 India Travel Tips</h3>
            <div className="space-y-3">
              {travelTips.map((tip, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-lg flex-shrink-0">{tip.emoji}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">🇮🇳 Popular Indian Destinations</h3>
          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Pre-loaded with activities</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {indianDestinations.slice(0, 10).map((dest) => (
            <Link
              key={dest.name}
              to="/app/trips/new"
              className="group cursor-pointer"
            >
              <div className={`h-20 bg-gradient-to-br ${dest.color} rounded-xl flex items-center justify-center text-3xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                {dest.emoji}
              </div>
              <div className="mt-2 px-1">
                <p className="font-bold text-gray-900 dark:text-white text-xs truncate">{dest.name}</p>
                <p className="text-xs text-gray-400 truncate">{dest.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
