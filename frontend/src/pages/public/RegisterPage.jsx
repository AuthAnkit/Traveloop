import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await register(form.name, form.email, form.password, form.bio)
      toast.success('Account created! Welcome to Traveloop 🎉')
      navigate('/app/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Registration failed')
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Globe size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Traveloop</span>
        </Link>

        <div className="card p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create your account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Start planning your adventures today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full name" placeholder="Alex Johnson" value={form.name} onChange={set('name')} error={errors.name} />
            <Input label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} error={errors.email} />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  className="input pr-10"
                  value={form.password}
                  onChange={set('password')}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <Input label="Bio (optional)" placeholder="Avid traveler, foodie..." value={form.bio} onChange={set('bio')} />

            <Button type="submit" className="w-full" loading={loading} size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
