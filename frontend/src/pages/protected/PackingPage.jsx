import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPackingItems, addPackingItem, togglePacked, deletePackingItem, resetChecklist } from '../../api/packing'
import { getTrip } from '../../api/trips'
import { categoryIcon } from '../../utils/formatters'
import Button from '../../components/ui/Button'
import Input, { Select } from '../../components/ui/Input'
import { ListSkeleton } from '../../components/ui/LoadingSkeleton'
import { Plus, Trash2, RefreshCw, ArrowLeft, CheckCircle2, Circle } from 'lucide-react'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const CATEGORIES = ['CLOTHING', 'DOCUMENTS', 'ELECTRONICS', 'TOILETRIES', 'MEDICINE', 'ACCESSORIES', 'OTHER']

export default function PackingPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [newItem, setNewItem] = useState('')
  const [newCat, setNewCat] = useState('OTHER')
  const [adding, setAdding] = useState(false)
  const [activeCategory, setActiveCategory] = useState('ALL')

  useEffect(() => {
    Promise.all([getTrip(id), getPackingItems(id)])
      .then(([tRes, pRes]) => { setTrip(tRes.data); setItems(pRes.data) })
      .catch(() => toast.error('Failed to load packing list'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newItem.trim()) return
    setAdding(true)
    try {
      const { data } = await addPackingItem(id, { itemName: newItem.trim(), category: newCat })
      setItems([...items, data])
      setNewItem('')
      toast.success('Item added')
    } catch { toast.error('Failed to add item') }
    finally { setAdding(false) }
  }

  const handleToggle = async (itemId) => {
    try {
      const { data } = await togglePacked(id, itemId)
      setItems(items.map((i) => i.id === itemId ? { ...i, isPacked: data.isPacked } : i))
    } catch { toast.error('Failed to update item') }
  }

  const handleDelete = async (itemId) => {
    try {
      await deletePackingItem(id, itemId)
      setItems(items.filter((i) => i.id !== itemId))
    } catch { toast.error('Failed to delete item') }
  }

  const handleReset = async () => {
    if (!confirm('Reset all items to unpacked?')) return
    try {
      await resetChecklist(id)
      setItems(items.map((i) => ({ ...i, isPacked: false })))
      toast.success('Checklist reset')
    } catch { toast.error('Failed to reset') }
  }

  const filteredItems = activeCategory === 'ALL' ? items : items.filter((i) => i.category === activeCategory)
  const packed = items.filter((i) => i.isPacked).length
  const progress = items.length > 0 ? Math.round((packed / items.length) * 100) : 0

  const grouped = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/trips/${id}/view`} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{trip?.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Packing Checklist</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-500">
          <RefreshCw size={14} /> Reset
        </Button>
      </div>

      <div className="card p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">{packed} of {items.length} packed</span>
          <span className="font-semibold text-primary-600 dark:text-primary-400">{progress}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleAdd} className="card p-4 flex gap-3">
        <Input
          placeholder="Add item (e.g. Passport)"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1"
        />
        <select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="input w-40">
          {CATEGORIES.map((c) => <option key={c} value={c}>{categoryIcon(c)} {c.charAt(0) + c.slice(1).toLowerCase()}</option>)}
        </select>
        <Button type="submit" loading={adding}><Plus size={16} /></Button>
      </form>

      <div className="flex gap-2 flex-wrap">
        {['ALL', ...CATEGORIES].map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}>
            {cat === 'ALL' ? 'All' : `${categoryIcon(cat)} ${cat.charAt(0) + cat.slice(1).toLowerCase()}`}
          </button>
        ))}
      </div>

      {loading ? <ListSkeleton count={6} /> : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([category, catItems]) => (
            <div key={category} className="card overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {categoryIcon(category)} {category.charAt(0) + category.slice(1).toLowerCase()} ({catItems.length})
                </span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {catItems.map((item) => (
                  <div key={item.id} className={clsx('flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group', item.isPacked && 'opacity-60')}>
                    <button onClick={() => handleToggle(item.id)} className="text-gray-400 hover:text-primary-500 transition-colors flex-shrink-0">
                      {item.isPacked ? <CheckCircle2 size={20} className="text-primary-500" /> : <Circle size={20} />}
                    </button>
                    <span className={clsx('flex-1 text-sm text-gray-900 dark:text-white', item.isPacked && 'line-through text-gray-400')}>
                      {item.itemName}
                    </span>
                    <button onClick={() => handleDelete(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="card p-10 text-center">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-gray-400">No items yet. Add something above!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
