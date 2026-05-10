import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTrips, deleteTrip } from '../../api/trips'
import { formatDate } from '../../utils/dateUtils'
import { statusColor } from '../../utils/formatters'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { CardSkeleton } from '../../components/ui/LoadingSkeleton'
import { PlusCircle, Map, Pencil, Trash2, Eye, Wallet, Package, NotebookPen, CalendarDays } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MyTripsPage() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    getTrips()
      .then((r) => setTrips(r.data))
      .catch(() => toast.error('Failed to load trips'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this trip? This cannot be undone.')) return
    try {
      await deleteTrip(id)
      setTrips(trips.filter((t) => t.id !== id))
      toast.success('Trip deleted')
    } catch {
      toast.error('Failed to delete trip')
    }
  }

  const filters = ['ALL', 'PLANNED', 'ACTIVE', 'COMPLETED']
  const filtered = filter === 'ALL' ? trips : trips.filter((t) => t.status === filter)

  const daysUntil = (dateStr) => {
    if (!dateStr) return null
    const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : null
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Trips</h2>
          <p className="text-gray-500 dark:text-gray-400">{trips.length} trip{trips.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link to="/app/trips/new" className="btn-primary flex items-center gap-2 self-start">
          <PlusCircle size={16} /> New Trip
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {filter === 'ALL' ? 'No trips yet' : `No ${filter.toLowerCase()} trips`}
          </h3>
          <p className="text-gray-400 mb-4">Create your first trip to get started.</p>
          <Link to="/app/trips/new" className="btn-primary inline-flex items-center gap-2">
            <PlusCircle size={16} /> Plan a Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((trip) => (
            <div key={trip.id} className="card overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col">
              {/* Cover */}
              <div className="h-36 bg-gradient-to-br from-saffron-400 via-primary-500 to-teal-500 relative flex items-center justify-center">
                <span className="text-4xl">{trip.coverImage ?? '✈️'}</span>
                <Badge className={`absolute top-3 right-3 ${statusColor(trip.status)}`}>
                  {trip.status}
                </Badge>
                {daysUntil(trip.startDate) && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg">
                    <CalendarDays size={11} /> {daysUntil(trip.startDate)}d to go
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 dark:text-white truncate mb-1">{trip.title}</h3>
                <p className="text-xs text-gray-400 mb-2">
                  {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                  <Map size={12} /> {trip.stopCount} {trip.stopCount === 1 ? 'city' : 'cities'}
                </p>

                {/* Quick links */}
                <div className="flex gap-2 flex-wrap mb-4 mt-auto">
                  <Link to={`/app/trips/${trip.id}/builder`} className="flex items-center gap-1 text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-2.5 py-1 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
                    <Map size={11} /> Builder
                  </Link>
                  <Link to={`/app/trips/${trip.id}/budget`} className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-lg hover:bg-green-100 transition-colors">
                    <Wallet size={11} /> Budget
                  </Link>
                  <Link to={`/app/trips/${trip.id}/packing`} className="flex items-center gap-1 text-xs bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2.5 py-1 rounded-lg hover:bg-orange-100 transition-colors">
                    <Package size={11} /> Packing
                  </Link>
                  <Link to={`/app/trips/${trip.id}/notes`} className="flex items-center gap-1 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2.5 py-1 rounded-lg hover:bg-purple-100 transition-colors">
                    <NotebookPen size={11} /> Notes
                  </Link>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/app/trips/${trip.id}/view`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye size={14} /> View
                    </Button>
                  </Link>
                  <Link to={`/app/trips/${trip.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Pencil size={14} />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(trip.id)}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
