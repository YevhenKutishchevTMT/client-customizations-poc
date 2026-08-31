const clientFiles = import.meta.glob('/src/clients/*/*.{ts,tsx}')

export const availableClientIds = [
  ...new Set(Object.keys(clientFiles).map((path) => path.split('/')[3])),
]

export async function loadActiveClient(clientId: string) {
  const prefix = `/src/clients/${clientId}/`
  const entries = Object.entries(clientFiles).filter(([path]) => path.startsWith(prefix))
  await Promise.all(entries.map(([, load]) => load()))
}
