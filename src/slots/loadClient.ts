export async function loadClient() {
  if (import.meta.env.DEV) {
    const { loadActiveClient } = await import('./devClients')
    const activeClientId = localStorage.getItem('activeClientId')
    if (activeClientId) {
      await loadActiveClient(activeClientId)
    }
    return
  }

  await import('virtual:active-client')
}
