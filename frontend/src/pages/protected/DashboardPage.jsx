import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboard } from '../../api/users'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency, statusColor } from '../../utils/formatters'
import { formatDate } from '../../utils/dateUtils'
import { StatSkeleton, CardSkeleton } from '../../components/ui/LoadingSkeleton'
import Badge from '../../components/ui/Badge'
import { Map, Wallet, CheckCircle, PlusCircle, ArrowRight, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

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

  const stats = data ? [
    { label: 'Total Trips',     value: data.totalTrips,         icon: Map,         color: 'text-primary-600 dark:text-primary-400',  bg: 'bg-primary-100 dark:bg-primary-900/30' },
    { label: 'Planned',         value: data.plannedTrips,        icon: Globe,       color: 'text-blue-600 dark:text-blue-400',         bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Completed',       value: data.completedTrips,      icon: CheckCircle, color: 'text-green-600 dark:text-green-400',       bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Total Spent',     value: formatCurrency(data.totalBudgetSpent), icon: Wallet, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', isText: true },
  ] : []

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's an overview of your travel plans.</p>
        </div>
        <Link to="/app/trips/new" className="btn-primary flex items-center gap-2 hidden sm:flex">
          <PlusCircle size={16} /> New Trip
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => <StatSkeleton key={i} />)
          : stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="card p-5">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={20} className={color} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
      </div>

      {/* Recent trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Trips</h3>
          <Link to="/app/trips" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(3).fill(0).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : data?.recentTrips?.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-5xl mb-4">✈️</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No trips yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Start planning your first adventure!</p>
            <Link to="/app/trips/new" className="btn-primary inline-flex items-center gap-2">
              <PlusCircle size={16} /> Plan a trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.recentTrips?.map((trip) => (
              <div key={trip.id} className="card overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-36 bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-4xl">
                  {trip.coverImage ?? '🌍'}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">{trip.title}</h4>
                    <Badge className={statusColor(trip.status)}>{trip.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{trip.stopCount} cities</span>
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

      {/* Popular cities */}
      {data?.popularCities?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {data.popularCities.slice(0, 5).map((city) => (
              <div key={city.id} className="card p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-2">🏙️</div>
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{city.name}</p>
                <p className="text-xs text-gray-400 truncate">{city.country}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
