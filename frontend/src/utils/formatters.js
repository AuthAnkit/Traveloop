export const formatCurrency = (amount, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount ?? 0)

export const statusColor = (status) => ({
  PLANNED:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  ACTIVE:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  COMPLETED: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
}[status] ?? 'bg-gray-100 text-gray-600')

export const categoryIcon = (cat) => ({
  CLOTHING: '👕', DOCUMENTS: '📄', ELECTRONICS: '💻',
  TOILETRIES: '🧴', MEDICINE: '💊', ACCESSORIES: '👜', OTHER: '📦',
}[cat] ?? '📦')

export const activityCategoryColor = (cat) => ({
  'Sightseeing': 'bg-purple-100 text-purple-700',
  'Food':        'bg-orange-100 text-orange-700',
  'Adventure':   'bg-red-100 text-red-700',
  'Culture':     'bg-yellow-100 text-yellow-700',
  'Shopping':    'bg-pink-100 text-pink-700',
  'Nature':      'bg-green-100 text-green-700',
}[cat] ?? 'bg-gray-100 text-gray-700')
