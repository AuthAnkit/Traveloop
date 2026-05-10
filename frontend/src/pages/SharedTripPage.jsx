import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSharedTrip } from '../api/shared'
import { formatDate } from '../utils/dateUtils'
import { activityCategoryColor, formatCurrency } from '../utils/formatters'
import Badge from '../components/ui/Badge'
import { Globe, MapPin, Clock, DollarSign, Star, Calendar, ArrowLeft, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SharedTripPage() {
  const { slug } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getSharedTrip(slug)
      .then(({ data }) => setTrip(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied!')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Trip not found</h1>
        <p className="text-gray-400 mb-6">This itinerary may have been removed or the link is invalid.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2"><ArrowLeft size={16} /> Go Home</Link>
      </div>
    </div>
  )

  const totalCost = trip?.stops?.reduce((acc, s) =>
    acc + (s.activities?.reduce((a2, sa) => a2 + (sa.activity?.estimatedCost ?? 0), 0) ?? 0), 0) ?? 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Globe size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Traveloop</span>
          </Link>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="btn-secondary text-sm flex items-center gap-1.5 px-3 py-1.5">
              <Copy size={13} /> Copy Link
            </button>
            <Link to="/register" className="btn-primary text-sm px-3 py-1.5 rounded-lg">Plan Yours Free</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="card overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-primary-500 via-primary-600 to-teal-600 flex flex-col items-center justify-center">
            <span className="text-6xl mb-2">{trip?.coverImage ?? '✈️'}</span>
            <h1 className="text-2xl font-bold text-white">{trip?.title}</h1>
            <p className="text-white/70 text-sm">by {trip?.userName}</p>
          </div>
          <div className="p-5 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar size={14} />{formatDate(trip?.startDate)} — {formatDate(trip?.endDate)}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin size={14} />{trip?.stopCount} cities
            </div>
            {totalCost > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <DollarSign size={14} />{formatCurrency(totalCost)} estimated
              </div>
            )}
          </div>
          {trip?.description && <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400">{trip.description}</p>}
        </div>

        {trip?.stops?.map((stop, idx) => (
          <div key={stop.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm flex-shrink-0">
                {idx + 1}
              </div>
              {idx < (trip.stops?.length ?? 1) - 1 && (
                <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 my-2" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="card overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-primary-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{stop.city?.name}</span>
                    <span className="text-sm text-gray-400">{stop.city?.country}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(stop.arrivalDate)} → {formatDate(stop.departureDate)}</p>
                </div>
                {stop.activities?.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {stop.activities.map((sa) => (
                      <div key={sa.id} className="px-4 py-3 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{sa.activity.title}</span>
                            {sa.activity.category && <Badge className={`text-xs ${activityCategoryColor(sa.activity.category)}`}>{sa.activity.category}</Badge>}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                            {sa.scheduledTime && <span className="flex items-center gap-1"><Clock size={11} />{sa.scheduledTime}</span>}
                            {sa.activity.estimatedCost && <span className="flex items-center gap-1"><DollarSign size={11} />${sa.activity.estimatedCost}</span>}
                            {sa.activity.rating && <span className="flex items-center gap-1"><Star size={11} />{sa.activity.rating}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="px-4 py-3 text-sm text-gray-400 italic">No activities planned.</p>}
              </div>
            </div>
          </div>
        ))}

        <div className="card p-6 text-center bg-gradient-to-r from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Inspired? Plan your own trip!</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create your free Traveloop account and start building your adventure.</p>
          <Link to="/register" className="btn-primary inline-flex items-center gap-2">Get Started Free</Link>
        </div>
      </div>
    </div>
  )
}
