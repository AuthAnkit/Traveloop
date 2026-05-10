export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <div className="skeleton h-48 w-full" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

export function StatSkeleton() {
  return (
    <div className="card p-5 space-y-2">
      <div className="skeleton h-8 w-16" />
      <div className="skeleton h-4 w-24" />
    </div>
  )
}

export function ListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-4 flex items-center gap-3">
          <div className="skeleton w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
