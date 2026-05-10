import clsx from 'clsx'

export default function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <input className={clsx('input', error && 'border-red-400 focus:ring-red-400', className)} {...props} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <textarea className={clsx('input resize-none', error && 'border-red-400 focus:ring-red-400', className)} {...props} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Select({ label, error, children, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <select className={clsx('input', error && 'border-red-400', className)} {...props}>{children}</select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
