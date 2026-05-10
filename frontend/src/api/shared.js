import api from './axios'

export const shareTrip = (tripId) => api.post(`/trips/${tripId}/share`)
export const unshareTrip = (tripId) => api.delete(`/trips/${tripId}/share`)
export const getSharedTrip = (slug) => api.get(`/shared/${slug}`)
