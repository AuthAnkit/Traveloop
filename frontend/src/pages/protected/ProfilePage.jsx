import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../../api/users'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input, { Textarea } from '../../components/ui/Input'
import { formatDate } from '../../utils/dateUtils'
import { User, Calendar, Map, Camera } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', bio: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    getProfile()
      .then(({ data }) => {
        setProfile(data)
        setForm({ name: data.name, bio: data.bio ?? '' })
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return }
    setSaving(true)
    try {
      const { data } = await updateProfile(form)
      setProfile(data)
      updateUser({ name: data.name })
      setEditing(false)
      toast.success('Profile updated!')
    } catch { toast.error('Failed to update profile') }
    finally { setSaving(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile card */}
      <div className="card p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-3xl">
              {profile?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
              <Camera size={13} className="text-gray-500" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile?.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Calendar size={11} />Joined {formatDate(profile?.createdAt)}</span>
              <span className="flex items-center gap-1"><Map size={11} />{profile?.totalTrips} trips</span>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
              <textarea
                className="input resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setEditing(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} loading={saving} className="flex-1">Save Changes</Button>
            </div>
          </div>
        ) : (
          <div>
            {profile?.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{profile.bio}</p>
            )}
            <Button variant="outline" onClick={() => setEditing(true)}>
              <User size={14} /> Edit Profile
            </Button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Trips', value: profile?.totalTrips ?? 0 },
          { label: 'Countries', value: '—' },
          { label: 'Activities', value: '—' },
        ].map(({ label, value }) => (
          <div key={label} className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Account info */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
        <div className="space-y-3">
          {[
            { label: 'Email', value: profile?.email },
            { label: 'Member since', value: formatDate(profile?.createdAt) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
