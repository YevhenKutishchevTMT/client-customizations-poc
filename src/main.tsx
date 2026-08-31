import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { loadClient } from './slots/loadClient'

async function bootstrap() {
  await loadClient()

  const DevClientSwitcher = import.meta.env.DEV
    ? (await import('./slots/DevClientSwitcher')).DevClientSwitcher
    : null

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {DevClientSwitcher && <DevClientSwitcher />}
      <App />
    </StrictMode>,
  )
}

bootstrap()
