import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBudget, updateBudget } from '../../api/budget'
import { getTrip } from '../../api/trips'
import { formatCurrency } from '../../utils/formatters'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import toast from 'react-hot-toast'
import { Wallet, TrendingUp, ArrowLeft, Users } from 'lucide-react'

const COLORS = ['#3b82f6', '#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444']
const CATEGORIES = [
  { key: 'hotelCost',      label: 'Hotel / Accommodation', emoji: '🏨', color: COLORS[0] },
  { key: 'transportCost',  label: 'Transport',             emoji: '✈️', color: COLORS[1] },
  { key: 'foodCost',       label: 'Food & Drinks',         emoji: '🍜', color: COLORS[2] },
  { key: 'activityCost',   label: 'Activities',            emoji: '🎭', color: COLORS[3] },
  { key: 'miscCost',       label: 'Miscellaneous',         emoji: '📦', color: COLORS[4] },
]

export default function BudgetPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [budget, setBudget] = useState(null)
  const [form, setForm] = useState({ hotelCost: 0, transportCost: 0, foodCost: 0, activityCost: 0, miscCost: 0 })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [persons, setPersons] = useState(1)

  useEffect(() => {
    Promise.all([getTrip(id), getBudget(id)])
      .then(([tripRes, budgetRes]) => {
        setTrip(tripRes.data)
        const b = budgetRes.data
        setBudget(b)
        setForm({
          hotelCost: b.hotelCost ?? 0,
          transportCost: b.transportCost ?? 0,
          foodCost: b.foodCost ?? 0,
          activityCost: b.activityCost ?? 0,
          miscCost: b.miscCost ?? 0,
        })
      })
      .catch(() => toast.error('Failed to load budget'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { data } = await updateBudget(id, form)
      setBudget(data)
      toast.success('Budget updated!')
    } catch { toast.error('Failed to update budget') }
    finally { setSaving(false) }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: parseFloat(e.target.value) || 0 })

  const chartData = CATEGORIES.map(({ key, label, emoji }) => ({
    name: label, value: form[key] ?? 0, emoji,
  })).filter((d) => d.value > 0)

  const totalCost = CATEGORIES.reduce((acc, { key }) => acc + (form[key] ?? 0), 0)

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/trips/${id}/view`} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{trip?.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Budget & Cost Breakdown</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
        { label: 'Total Budget',     value: formatCurrency(totalCost),                icon: Wallet,      color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/30' },
          { label: 'Per Person',        value: formatCurrency(Math.round(totalCost / Math.max(persons, 1))), icon: Users, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/30' },
          { label: 'Biggest Expense',   value: CATEGORIES.reduce((a, b) => (form[a.key] ?? 0) > (form[b.key] ?? 0) ? a : b, CATEGORIES[0]).label, icon: Wallet, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5 flex items-center gap-4">
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center justify-between">
            Edit Budget
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span className="text-xs text-gray-400">Persons:</span>
              <input type="number" min="1" max="20" value={persons} onChange={(e) => setPersons(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 text-sm text-center input py-1 px-2" />
            </div>
          </h3>
          {CATEGORIES.map(({ key, label, emoji }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xl w-7">{emoji}</span>
              <div className="flex-1">
                <Input
                  label={label}
                  type="number"
                  min="0"
                  step="0.01"
                  value={form[key]}
                  onChange={set(key)}
                />
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Total</span>
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(totalCost)}</span>
            </div>
            <Button onClick={handleSave} loading={saving} className="w-full">Save Budget</Button>
          </div>
        </div>

        <div className="card p-6 space-y-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Breakdown</h3>
          {chartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
              Enter budget values to see charts
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="emoji" tick={{ fontSize: 18 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => formatCurrency(v)} labelFormatter={(l) => chartData.find((d) => d.emoji === l)?.name ?? l} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
