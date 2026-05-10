import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTrip } from '../../api/trips'
import { addStop, updateStop, deleteStop, reorderStops, addActivity, removeActivity, addActivityFromPlace } from '../../api/trips'
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
import { activityCategoryColor, formatCurrency } from '../../utils/formatters'
import toast from 'react-hot-toast'
import { GripVertical, Plus, Trash2, MapPin, Clock, IndianRupee, Share2, Eye, X, Search, CheckCircle2 } from 'lucide-react'
import PopularPlacesWidget from '../../components/itinerary/PopularPlacesWidget'

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
                  {sa.activity.estimatedCost && <span className="flex items-center gap-1"><IndianRupee size={11} />{sa.activity.estimatedCost.toLocaleString('en-IN')}</span>}
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

function CitySearchCard({ city, selected, onSelect }) {
  const isSelected = selected?.id === city.id
  return (
    <button
      type="button"
      onClick={() => onSelect(city)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 ${
        isSelected
          ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 shadow-md scale-[1.01]'
          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
        isSelected ? 'bg-orange-100 dark:bg-orange-900/40' : 'bg-primary-50 dark:bg-primary-900/20'
      }`}>
        {city.countryCode === 'IN' ? '🇮🇳' : '🌍'}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${isSelected ? 'text-orange-700 dark:text-orange-400' : 'text-gray-900 dark:text-white'}`}>
          {city.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{city.country}</p>
      </div>
      {isSelected && <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" />}
    </button>
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
  const [selectedCity, setSelectedCity] = useState(null)   // NEW: city object, not just ID
  const [activities, setActivities] = useState([])
  const [stopForm, setStopForm] = useState({ arrivalDate: '', departureDate: '' })
  const [activityForm, setActivityForm] = useState({ activityId: '', scheduledTime: '' })
  const [searching, setSearching] = useState(false)
  const [activeCityForRecommendations, setActiveCityName] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  useEffect(() => { loadTrip() }, [id])

  useEffect(() => {
    if (stops.length > 0 && !activeCityForRecommendations) {
      setActiveCityName(stops[stops.length - 1].city?.name)
    }
  }, [stops, activeCityForRecommendations])

  useEffect(() => {
    if (!citySearch.trim()) { setCities([]); return }
    const t = setTimeout(async () => {
      setSearching(true)
      try {
        const r = await getCities(citySearch)
        setCities(r.data)
      } catch { /* silent */ }
      finally { setSearching(false) }
    }, 300)
    return () => clearTimeout(t)
  }, [citySearch])

  useEffect(() => {
    if (!selectedCity?.id) { setActivities([]); return }
    getCityActivities(selectedCity.id).then((r) => setActivities(r.data)).catch(() => {})
  }, [selectedCity])

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
    if (!selectedCity) { toast.error('Please select a city first'); return }
    try {
      const { data } = await addStop(id, {
        cityId: Number(selectedCity.id),
        arrivalDate: stopForm.arrivalDate || null,
        departureDate: stopForm.departureDate || null,
      })
      setStops([...stops, { ...data, activities: [] }])
      setShowAddStop(false)
      setStopForm({ arrivalDate: '', departureDate: '' })
      setCitySearch('')
      setCities([])
      setActiveCityName(selectedCity.name) // Show recommendations for new city
      setSelectedCity(null)
      toast.success(`${selectedCity.name} added to your itinerary! 🎉`)
    } catch { toast.error('Failed to add city') }
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

  const handleAddPopularPlace = async (place, stopIdToUse) => {
    let stop = stops.find(s => s.id === stopIdToUse) || stops.find(s => s.city?.name === place.cityName)
    if (!stop) {
      toast.error(`Please add ${place.cityName} to your itinerary first.`)
      return
    }
    
    try {
      const { data } = await addActivityFromPlace(stop.id, place.id)
      setStops(stops.map((s) =>
        s.id === stop.id ? { ...s, activities: [...(s.activities ?? []), data] } : s
      ))
      toast.success(`${place.placeName} added to itinerary!`)
    } catch {
      toast.error('Failed to add popular place')
    }
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

  const closeAddStop = () => {
    setShowAddStop(false)
    setCitySearch('')
    setCities([])
    setSelectedCity(null)
    setStopForm({ arrivalDate: '', departureDate: '' })
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{trip?.title}</h2>
          <p className="text-sm text-gray-500">{stops.length} {stops.length === 1 ? 'city' : 'cities'} · drag to reorder</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/app/trips/${id}/view`}>
            <Button variant="outline" size="sm"><Eye size={14} /> Preview</Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleShare}><Share2 size={14} /> Share</Button>
          <Button size="sm" onClick={() => setShowAddStop(true)}><Plus size={14} /> Add City</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {stops.length === 0 ? (
          <div className="card p-12 text-center lg:col-span-2">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start building your itinerary</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Add cities to plan your perfect trip across India and beyond!</p>
            <Button onClick={() => setShowAddStop(true)}><Plus size={16} /> Add First City</Button>
          </div>
        ) : (
          <div className="lg:col-span-2">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {stops.map((stop) => (
                    <SortableStop
                      key={stop.id}
                      stop={stop}
                      onDelete={handleDeleteStop}
                      onAddActivity={(s) => { setSelectedStop(s); setSelectedCity(s.city); setShowAddActivity(true) }}
                      onRemoveActivity={handleRemoveActivity}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        <div className="lg:col-span-1 space-y-4">
          {activeCityForRecommendations ? (
            <PopularPlacesWidget 
              cityName={activeCityForRecommendations} 
              onAddActivity={(place) => handleAddPopularPlace(place)} 
            />
          ) : (
             <div className="card p-5 text-center bg-saffron-50/50 dark:bg-saffron-900/10 border border-saffron-100 dark:border-saffron-900/20">
                <p className="text-saffron-600 dark:text-saffron-400 text-sm">Select a city to see top attractions!</p>
             </div>
          )}
        </div>
      </div>

      <Modal open={showAddStop} onClose={closeAddStop} title="Add City to Itinerary">
        <div className="space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="input pl-9 pr-4"
              placeholder="Search Indian cities — e.g. Mumbai, Goa, Jaipur..."
              value={citySearch}
              onChange={(e) => { setCitySearch(e.target.value); setSelectedCity(null) }}
              autoFocus
            />
          </div>

          {searching && (
            <div className="flex items-center justify-center py-4">
              <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="ml-2 text-sm text-gray-400">Searching cities...</span>
            </div>
          )}

          {!searching && cities.length > 0 && (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{cities.length} cities found — click to select</p>
              {cities.map((c) => (
                <CitySearchCard
                  key={c.id}
                  city={c}
                  selected={selectedCity}
                  onSelect={(city) => { setSelectedCity(city); setCities([]); setCitySearch(city.name) }}
                />
              ))}
            </div>
          )}

          {!searching && citySearch.trim() && cities.length === 0 && !selectedCity && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400">No cities found for "{citySearch}"</p>
              <p className="text-xs text-gray-300 mt-1">Try: Mumbai, Delhi, Goa, Jaipur, Shimla, Manali…</p>
            </div>
          )}

          {selectedCity && (
            <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-700 rounded-xl">
              <span className="text-2xl">🇮🇳</span>
              <div className="flex-1">
                <p className="font-semibold text-orange-800 dark:text-orange-300">{selectedCity.name}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">{selectedCity.country}</p>
              </div>
              <CheckCircle2 size={20} className="text-orange-500" />
              <button
                type="button"
                onClick={() => { setSelectedCity(null); setCitySearch(''); setCities([]) }}
                className="text-orange-400 hover:text-orange-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Input label="Arrival Date" type="date" value={stopForm.arrivalDate}
              onChange={(e) => setStopForm({ ...stopForm, arrivalDate: e.target.value })} />
            <Input label="Departure Date" type="date" value={stopForm.departureDate}
              onChange={(e) => setStopForm({ ...stopForm, departureDate: e.target.value })} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={closeAddStop} className="flex-1">Cancel</Button>
            <Button onClick={handleAddStop} className="flex-1" disabled={!selectedCity}>
              {selectedCity ? `Add ${selectedCity.name}` : 'Select a City First'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={showAddActivity} onClose={() => setShowAddActivity(false)} title={`Add Activity — ${selectedStop?.city?.name}`}>
        <div className="space-y-4">
          <Select label="Activity" value={activityForm.activityId}
            onChange={(e) => setActivityForm({ ...activityForm, activityId: e.target.value })}>
            <option value="">-- Select activity --</option>
            {activities.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title} {a.estimatedCost ? `(₹${a.estimatedCost.toLocaleString('en-IN')})` : ''}
              </option>
            ))}
          </Select>
          {activities.length === 0 && <p className="text-sm text-gray-400">No activities found for this city. Activities will show here once added.</p>}
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
