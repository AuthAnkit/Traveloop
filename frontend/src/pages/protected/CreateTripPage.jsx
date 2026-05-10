import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTrip, updateTrip, getTrip } from '../../api/trips'
import Button from '../../components/ui/Button'
import Input, { Textarea, Select } from '../../components/ui/Input'
import toast from 'react-hot-toast'
import { Map } from 'lucide-react'

const coverEmojis = ['✈️','🇮🇳','🏔️','🌊','🌴','🛕','🏰','🌅','🧘','🏕️','🌸','🐯','🦚','🎭','🌺','🚂','⛩️','🗺️','🌆','🏜️']

export default function CreateTripPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '', description: '', startDate: '', endDate: '',
    coverImage: '✈️', visibility: 'PRIVATE',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    getTrip(id).then(({ data }) => {
      setForm({
        title: data.title ?? '',
        description: data.description ?? '',
        startDate: data.startDate ?? '',
        endDate: data.endDate ?? '',
        coverImage: data.coverImage ?? '✈️',
        visibility: data.visibility ?? 'PRIVATE',
      })
    }).catch(() => toast.error('Failed to load trip'))
  }, [id, isEdit])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { toast.error('Trip title is required'); return }
    setLoading(true)
    try {
      const res = isEdit
        ? await updateTrip(id, form)
        : await createTrip(form)
      toast.success(isEdit ? 'Trip updated!' : 'Trip created!')
      navigate(`/app/trips/${res.data.id}/builder`)
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
            <Map size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Trip' : 'Plan a New Trip'}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the details to get started</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Trip Title *" placeholder="e.g. Rajasthan Heritage Tour 2025" value={form.title} onChange={set('title')} />

          <Textarea label="Description" placeholder="What's this trip about?" value={form.description} onChange={set('description')} rows={3} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={form.startDate} onChange={set('startDate')} />
            <Input label="End Date" type="date" value={form.endDate} onChange={set('endDate')} />
          </div>

          <Select label="Visibility" value={form.visibility} onChange={set('visibility')}>
            <option value="PRIVATE">🔒 Private</option>
            <option value="PUBLIC">🌍 Public</option>
          </Select>

          {/* Cover emoji picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
            <div className="flex flex-wrap gap-2">
              {coverEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setForm({ ...form, coverImage: emoji })}
                  className={`w-10 h-10 text-xl rounded-lg border-2 transition-all ${
                    form.coverImage === emoji
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 scale-110'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              {isEdit ? 'Update Trip' : 'Create & Build Itinerary'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
