import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import SharedTripPage from './pages/SharedTripPage'

import ProtectedLayout from './components/layout/ProtectedLayout'
import DashboardPage from './pages/protected/DashboardPage'
import MyTripsPage from './pages/protected/MyTripsPage'
import CreateTripPage from './pages/protected/CreateTripPage'
import ItineraryBuilderPage from './pages/protected/ItineraryBuilderPage'
import ItineraryViewPage from './pages/protected/ItineraryViewPage'
import BudgetPage from './pages/protected/BudgetPage'
import PackingPage from './pages/protected/PackingPage'
import NotesPage from './pages/protected/NotesPage'
import ProfilePage from './pages/protected/ProfilePage'

function RequireAuth({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/trip/:slug" element={<SharedTripPage />} />

      <Route
        path="/app"
        element={<RequireAuth><ProtectedLayout /></RequireAuth>}
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="trips" element={<MyTripsPage />} />
        <Route path="trips/new" element={<CreateTripPage />} />
        <Route path="trips/:id/edit" element={<CreateTripPage />} />
        <Route path="trips/:id/builder" element={<ItineraryBuilderPage />} />
        <Route path="trips/:id/view" element={<ItineraryViewPage />} />
        <Route path="trips/:id/budget" element={<BudgetPage />} />
        <Route path="trips/:id/packing" element={<PackingPage />} />
        <Route path="trips/:id/notes" element={<NotesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
