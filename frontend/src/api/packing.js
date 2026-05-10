import api from './axios'

export const getPackingItems = (tripId) => api.get(`/trips/${tripId}/packing`)
export const addPackingItem = (tripId, data) => api.post(`/trips/${tripId}/packing`, data)
export const togglePacked = (tripId, itemId) => api.patch(`/trips/${tripId}/packing/items/${itemId}/toggle`)
export const deletePackingItem = (tripId, itemId) => api.delete(`/trips/${tripId}/packing/items/${itemId}`)
export const resetChecklist = (tripId) => api.post(`/trips/${tripId}/packing/reset`)
