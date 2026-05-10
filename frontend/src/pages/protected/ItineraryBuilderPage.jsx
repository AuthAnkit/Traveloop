import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTrip } from '../../api/trips'
import { addStop, updateStop, deleteStop, reorderStops, addActivity, removeActivity } from '../../api/trips'
import { getCities, getCityActivities } from '../../api/cities'
import { shareTrip } from '../../api/shared'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input, { Select } from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import { formatDate } from '../../utils/dateUtils'
import { activityCategoryColor } from '../../utils/formatters'
import toast from 'react-hot-toast'
import { GripVertical, Plus, Trash2, MapPin, Clock, DollarSign, Share2, Eye, X } from 'lucide-react'

function SortableStop({ stop, onDelete, onAddActivity, onRemoveActivity }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stop.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div ref={setNodeRef} style={style} className="card overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <button {...attributes} {...listeners} className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
          <GripVertical size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary-500 flex-shrink-0" />
            <span className="font-semibold text-gray-900 dark:text-white truncate">{stop.city?.name}</span>
            <span className="text-xs text-gray-400">{stop.city?.country}</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatDate(stop.arrivalDate)} — {formatDate(stop.departureDate)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => onAddActivity(stop)}>
            <Plus size={14} /> Activity
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(stop.id)}
            className="text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {/* Activities */}
      {stop.activities?.length > 0 && (
        <div className="p-3 space-y-2">
          {stop.activities.map((sa) => (
            <div key={sa.id} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{sa.activity.title}</span>
                  {sa.activity.category && (
                    <Badge className={`text-xs ${activityCategoryColor(sa.activity.category)}`}>{sa.activity.category}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                  {sa.scheduledTime && <span className="flex items-center gap-1"><Clock size={11} />{sa.scheduledTime}</span>}
                  {sa.activity.estimatedCost && <span className="flex items-center gap-1"><DollarSign size={11} />${sa.activity.estimatedCost}</span>}
                </div>
              </div>
              <button onClick={() => onRemoveActivity(sa.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ItineraryBuilderPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [stops, setStops] = useState([])
  const [loading, setLoading] = useState(true)

  const [showAddStop, setShowAddStop] = useState(false)
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [selectedStop, setSelectedStop] = useState(null)

  const [cities, setCities] = useState([])
  const [citySearch, setCitySearch] = useState('')
  const [activities, setActivities] = useState([])
  const [stopForm, setStopForm] = useState({ cityId: '', arrivalDate: '', departureDate: '' })
  const [activityForm, setActivityForm] = useState({ activityId: '', scheduledTime: '' })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  useEffect(() => {
    loadTrip()
  }, [id])

  useEffect(() => {
    if (!citySearch) return
    const t = setTimeout(() => {
      getCities(citySearch).then((r) => setCities(r.data)).catch(() => {})
    }, 300)
    return () => clearTimeout(t)
  }, [citySearch])

  useEffect(() => {
    if (!stopForm.cityId) return
    getCityActivities(stopForm.cityId).then((r) => setActivities(r.data)).catch(() => {})
  }, [stopForm.cityId])

  const loadTrip = () => {
    setLoading(true)
    getTrip(id)
      .then((r) => { setTrip(r.data); setStops(r.data.stops ?? []) })
      .catch(() => toast.error('Failed to load trip'))
      .finally(() => setLoading(false))
  }

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldIdx = stops.findIndex((s) => s.id === active.id)
    const newIdx = stops.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(stops, oldIdx, newIdx)
    setStops(reordered)
    try {
      await reorderStops(id, reordered.map((s) => s.id))
    } catch {
      toast.error('Failed to save order')
      loadTrip()
    }
  }

  const handleAddStop = async () => {
    if (!stopForm.cityId) { toast.error('Select a city'); return }
    try {
      const { data } = await addStop(id, {
        cityId: Number(stopForm.cityId),
        arrivalDate: stopForm.arrivalDate || null,
        departureDate: stopForm.departureDate || null,
      })
      setStops([...stops, { ...data, activities: [] }])
      setShowAddStop(false)
      setStopForm({ cityId: '', arrivalDate: '', departureDate: '' })
      setCitySearch('')
      toast.success('City added!')
    } catch { toast.error('Failed to add stop') }
  }

  const handleDeleteStop = async (stopId) => {
    if (!confirm('Remove this city from the itinerary?')) return
    try {
      await deleteStop(stopId)
      setStops(stops.filter((s) => s.id !== stopId))
      toast.success('City removed')
    } catch { toast.error('Failed to remove city') }
  }

  const handleAddActivity = async () => {
    if (!activityForm.activityId) { toast.error('Select an activity'); return }
    try {
      const { data } = await addActivity(selectedStop.id, {
        activityId: Number(activityForm.activityId),
        scheduledTime: activityForm.scheduledTime || null,
      })
      setStops(stops.map((s) =>
        s.id === selectedStop.id ? { ...s, activities: [...(s.activities ?? []), data] } : s
      ))
      setShowAddActivity(false)
      setActivityForm({ activityId: '', scheduledTime: '' })
      toast.success('Activity added!')
    } catch { toast.error('Failed to add activity') }
  }

  const handleRemoveActivity = async (saId) => {
    try {
      await removeActivity(saId)
      setStops(stops.map((s) => ({ ...s, activities: (s.activities ?? []).filter((a) => a.id !== saId) })))
      toast.success('Activity removed')
    } catch { toast.error('Failed to remove activity') }
  }

  const handleShare = async () => {
    try {
      const { data } = await shareTrip(id)
      const url = `${window.location.origin}/trip/${data.publicSlug}`
      await navigator.clipboard.writeText(url)
      toast.success('Share link copied to clipboard!')
    } catch { toast.error('Failed to generate share link') }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{trip?.title}</h2>
          <p className="text-sm text-gray-500">{stops.length} cities · drag to reorder</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/app/trips/${id}/view`}>
            <Button variant="outline" size="sm"><Eye size={14} /> Preview</Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleShare}><Share2 size={14} /> Share</Button>
          <Button size="sm" onClick={() => setShowAddStop(true)}><Plus size={14} /> Add City</Button>
        </div>
      </div>

      {/* Drag-and-drop stops */}
      {stops.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">No cities added yet. Start building your itinerary!</p>
          <Button onClick={() => setShowAddStop(true)}><Plus size={16} /> Add First City</Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {stops.map((stop) => (
                <SortableStop
                  key={stop.id}
                  stop={stop}
                  onDelete={handleDeleteStop}
                  onAddActivity={(s) => { setSelectedStop(s); setStopForm({ ...stopForm, cityId: s.city.id }); setShowAddActivity(true) }}
                  onRemoveActivity={handleRemoveActivity}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add Stop Modal */}
      <Modal open={showAddStop} onClose={() => setShowAddStop(false)} title="Add City to Itinerary">
        <div className="space-y-4">
          <Input
            label="Search City"
            placeholder="e.g. Paris, Tokyo..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          {cities.length > 0 && (
            <Select label="Select City" value={stopForm.cityId}
              onChange={(e) => setStopForm({ ...stopForm, cityId: e.target.value })}>
              <option value="">-- Choose a city --</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
              ))}
            </Select>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Input label="Arrival Date" type="date" value={stopForm.arrivalDate}
              onChange={(e) => setStopForm({ ...stopForm, arrivalDate: e.target.value })} />
            <Input label="Departure Date" type="date" value={stopForm.departureDate}
              onChange={(e) => setStopForm({ ...stopForm, departureDate: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddStop(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddStop} className="flex-1">Add City</Button>
          </div>
        </div>
      </Modal>

      {/* Add Activity Modal */}
      <Modal open={showAddActivity} onClose={() => setShowAddActivity(false)} title={`Add Activity — ${selectedStop?.city?.name}`}>
        <div className="space-y-4">
          <Select label="Activity" value={activityForm.activityId}
            onChange={(e) => setActivityForm({ ...activityForm, activityId: e.target.value })}>
            <option value="">-- Select activity --</option>
            {activities.map((a) => (
              <option key={a.id} value={a.id}>{a.title} {a.estimatedCost ? `($${a.estimatedCost})` : ''}</option>
            ))}
          </Select>
          {activities.length === 0 && <p className="text-sm text-gray-400">No activities found for this city. Add some from the admin panel.</p>}
          <Input label="Scheduled Time (optional)" type="time" value={activityForm.scheduledTime}
            onChange={(e) => setActivityForm({ ...activityForm, scheduledTime: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddActivity(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddActivity} className="flex-1">Add Activity</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
