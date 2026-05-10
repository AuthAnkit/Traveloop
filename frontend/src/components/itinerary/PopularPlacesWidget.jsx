import { useState, useEffect } from 'react'
import { getRecommendedPlaces } from '../../api/places'
import { PlusCircle, MapPin, Tag } from 'lucide-react'
import toast from 'react-hot-toast'

const CATEGORIES = ['All', 'Adventure', 'Historical', 'Nature', 'Religious', 'Food', 'Nightlife', 'Shopping']

export default function PopularPlacesWidget({ cityName, onAddActivity }) {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    if (!cityName) return
    setLoading(true)
    getRecommendedPlaces(cityName)
      .then((res) => setPlaces(res.data))
      .catch(() => toast.error('Failed to load popular places'))
      .finally(() => setLoading(false))
  }, [cityName])

  const filteredPlaces = activeCategory === 'All' 
    ? places 
    : places.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())

  if (!cityName) return null

  return (
    <div className="card p-5 mt-6 border-saffron-200 dark:border-saffron-900/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-xl">🌟</span> Must-Visit in {cityName}
        </h3>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-saffron-100 text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-400 border border-saffron-200 dark:border-saffron-800'
                : 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            ))}
          </div>
        ) : filteredPlaces.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
            No {activeCategory !== 'All' ? activeCategory.toLowerCase() : ''} places found.
          </div>
        ) : (
          filteredPlaces.map(place => (
            <div key={place.id} className="group relative flex items-start gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-saffron-200 dark:hover:border-saffron-800/50 hover:shadow-md transition-all bg-white dark:bg-gray-900">
              <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-saffron-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-lg flex items-center justify-center text-2xl shadow-sm border border-orange-100 dark:border-gray-700">
                {place.imageUrl || '📍'}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate" title={place.placeName}>
                    {place.placeName}
                  </h4>
                  <button
                    onClick={() => onAddActivity(place)}
                    className="flex-shrink-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 p-1 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:scale-110 transition-transform"
                    title="Add to Itinerary"
                  >
                    <PlusCircle size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                    <Tag size={10} /> {place.category}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
