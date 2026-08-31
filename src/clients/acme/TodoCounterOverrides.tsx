import { registerComponentOverride } from '../../slots/registry'
import type { SlotPropsMap } from '../../slots/types'

function AcmeBanner() {
  return <p style={{ color: '#d97706', fontWeight: 600 }}>🎉 Acme Todo</p>
}

function AcmeCounter({ remaining, total }: SlotPropsMap['todo.counter']) {
  return <p style={{ color: '#d97706' }}>Acme: {remaining} / {total} tasks left</p>
}

registerComponentOverride({
  id: 'todo.counter',
  before: AcmeBanner,
  replace: AcmeCounter,
})
