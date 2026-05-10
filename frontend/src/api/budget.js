import api from './axios'

export const getBudget = (tripId) => api.get(`/trips/${tripId}/budget`)
export const updateBudget = (tripId, data) => api.put(`/trips/${tripId}/budget`, data)
