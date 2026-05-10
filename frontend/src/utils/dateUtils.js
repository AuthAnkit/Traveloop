import { format, differenceInDays, parseISO } from 'date-fns'

export const formatDate = (date) => date ? format(typeof date === 'string' ? parseISO(date) : date, 'MMM dd, yyyy') : '—'
export const formatShort = (date) => date ? format(typeof date === 'string' ? parseISO(date) : date, 'MMM dd') : '—'
export const tripDuration = (start, end) => {
  if (!start || !end) return null
  return differenceInDays(parseISO(end), parseISO(start))
}
