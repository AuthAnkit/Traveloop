import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTrip } from '../../api/trips'
import { shareTrip } from '../../api/shared'
import { formatDate } from '../../utils/dateUtils'
import { statusColor, activityCategoryColor, formatCurrency } from '../../utils/formatters'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { MapPin, Clock, IndianRupee, Pencil, Share2, Calendar, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ItineraryViewPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrip(id)
      .then((r) => setTrip(r.data))
      .catch(() => toast.error('Failed to load itinerary'))
      .finally(() => setLoading(false))
  }, [id])

  const handleShare = async () => {
    try {
      const { data } = await shareTrip(id)
      await navigator.clipboard.writeText(`${window.location.origin}/trip/${data.publicSlug}`)
      toast.success('Share link copied!')
    } catch { toast.error('Failed to share trip') }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>
  if (!trip) return null

  const totalActivitiesCost = trip.stops?.reduce((acc, s) =>
    acc + (s.activities?.reduce((a2, sa) => a2 + (sa.activity?.estimatedCost ?? 0), 0) ?? 0), 0) ?? 0

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Hero card */}
      <div className="card overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-primary-500 via-primary-600 to-teal-600 flex flex-col items-center justify-center relative">
          <span className="text-6xl mb-2">{trip.coverImage ?? '✈️'}</span>
          <h1 className="text-2xl font-bold text-white">{trip.title}</h1>
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge className={statusColor(trip.status)}>{trip.status}</Badge>
            {trip.visibility === 'PUBLIC' && <Badge className="bg-green-100 text-green-700">Public</Badge>}
          </div>
        </div>
        <div className="p-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={15} />
            <span>{formatDate(trip.startDate)} — {formatDate(trip.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={15} /> <span>{trip.stops?.length ?? 0} cities</span>
          </div>
          {totalActivitiesCost > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <IndianRupee size={15} /><span>{formatCurrency(totalActivitiesCost)} in activities</span>
            </div>
          )}
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" onClick={handleShare}><Share2 size={14} /> Share</Button>
            <Link to={`/app/trips/${id}/builder`}>
              <Button size="sm" variant="outline"><Pencil size={14} /> Edit</Button>
            </Link>
          </div>
        </div>
        {trip.description && (
          <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400">{trip.description}</p>
        )}
      </div>

      {/* Stops timeline */}
      <div className="space-y-4">
        {(trip.stops ?? []).map((stop, idx) => (
          <div key={stop.id} className="flex gap-4">
            {/* Timeline line */}
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
                {/* City header */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{stop.city?.name}</span>
                    <span className="text-sm text-gray-400">{stop.city?.country}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(stop.arrivalDate)} → {formatDate(stop.departureDate)}
                  </p>
                </div>

                {/* Activities */}
                {stop.activities?.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {stop.activities.map((sa) => (
                      <div key={sa.id} className="px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-teal-100 dark:from-primary-900/30 dark:to-teal-900/30 rounded-lg flex items-center justify-center text-sm">
                          🎯
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{sa.activity.title}</span>
                            {sa.activity.category && (
                              <Badge className={`text-xs ${activityCategoryColor(sa.activity.category)}`}>
                                {sa.activity.category}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                            {sa.scheduledTime && <span className="flex items-center gap-1"><Clock size={11} />{sa.scheduledTime}</span>}
                            {sa.activity.estimatedCost && <span className="flex items-center gap-1"><IndianRupee size={11} />{sa.activity.estimatedCost.toLocaleString('en-IN')}</span>}
                            {sa.activity.durationHours && <span className="flex items-center gap-1">⏱ {sa.activity.durationHours}h</span>}
                            {sa.activity.rating && <span className="flex items-center gap-1"><Star size={11} />{sa.activity.rating}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-400 italic">No activities planned yet.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {trip.stops?.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">No cities added to this itinerary yet.</p>
          <Link to={`/app/trips/${id}/builder`}><Button>Open Itinerary Builder</Button></Link>
        </div>
      )}
    </div>
  )
}
