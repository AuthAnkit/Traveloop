import api from './axios'

export const getTrips = () => api.get('/trips')
export const getPublicTrips = () => api.get('/trips/public')
export const getTrip = (id) => api.get(`/trips/${id}`)
export const createTrip = (data) => api.post('/trips', data)
export const updateTrip = (id, data) => api.put(`/trips/${id}`, data)
export const updateTripStatus = (id, status) => api.patch(`/trips/${id}/status`, { status })
export const deleteTrip = (id) => api.delete(`/trips/${id}`)

export const getTripStops = (tripId) => api.get(`/trips/${tripId}/stops`)
export const addStop = (tripId, data) => api.post(`/trips/${tripId}/stops`, data)
export const updateStop = (stopId, data) => api.put(`/stops/${stopId}`, data)
export const deleteStop = (stopId) => api.delete(`/stops/${stopId}`)
export const reorderStops = (tripId, stopIds) => api.put(`/trips/${tripId}/stops/reorder`, { stopIds })

export const addActivity = (stopId, data) => api.post(`/stops/${stopId}/activities`, data)
export const removeActivity = (id) => api.delete(`/stop-activities/${id}`)
