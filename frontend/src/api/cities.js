import api from './axios'

export const getCities = (q) => api.get('/cities', { params: q ? { q } : {} })
export const getPopularCities = () => api.get('/cities/popular')
export const getCity = (id) => api.get(`/cities/${id}`)
export const getCityActivities = (cityId, category) =>
  api.get(`/cities/${cityId}/activities`, { params: category ? { category } : {} })
export const searchActivities = (q) => api.get('/cities/activities/search', { params: { q } })
