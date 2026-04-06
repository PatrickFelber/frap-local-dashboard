import { useState, useEffect } from 'react'

function formatAgo(ts) {
  const secs = Math.floor((Date.now() - ts) / 1000)
  if (secs < 60)   return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  return `${Math.floor(secs / 3600)}h ago`
}

/**
 * Returns a human-readable "X ago" string that updates every 5 seconds.
 * Resets whenever `value` changes (by reference).
 */
export function useLastUpdated(value) {
  const [ts, setTs] = useState(null)
  const [label, setLabel] = useState(null)

  // Reset timestamp on every new state object
  useEffect(() => {
    if (value !== undefined) setTs(Date.now())
  }, [value])

  // Tick every 5 seconds to refresh the label
  useEffect(() => {
    if (!ts) return
    setLabel(formatAgo(ts))
    const id = setInterval(() => setLabel(formatAgo(ts)), 1000)
    return () => clearInterval(id)
  }, [ts])

  return label
}
