import api from './axios'

export const getPlacesByState = (state) => api.get(`/places/state/${state}`)
export const getPlacesByCity = (city) => api.get(`/places/city/${city}`)
export const getRecommendedPlaces = (city) => api.get(`/places/recommended/${city}`)
