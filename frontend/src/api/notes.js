import api from './axios'

export const getNotes = (tripId) => api.get(`/trips/${tripId}/notes`)
export const createNote = (tripId, data) => api.post(`/trips/${tripId}/notes`, data)
export const updateNote = (tripId, noteId, data) => api.put(`/trips/${tripId}/notes/${noteId}`, data)
export const deleteNote = (tripId, noteId) => api.delete(`/trips/${tripId}/notes/${noteId}`)
