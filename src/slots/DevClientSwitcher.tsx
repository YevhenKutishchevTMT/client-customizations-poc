import { useEffect, useState } from 'react'

const STORAGE_KEY = 'activeClientId'

export function DevClientSwitcher() {
  const [clientIds, setClientIds] = useState<string[]>([])
  const [activeClientId, setActiveClientId] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? '',
  )

  useEffect(() => {
    import('./devClients').then(({ availableClientIds }) => setClientIds(availableClientIds))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      localStorage.setItem(STORAGE_KEY, value)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setActiveClientId(value)
    window.location.reload()
  }

  return (
    <div style={{ position: 'fixed', top: 8, right: 8, zIndex: 9999, fontSize: 12 }}>
      <select value={activeClientId} onChange={handleChange}>
        <option value="">— no client —</option>
        {clientIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </div>
  )
}
