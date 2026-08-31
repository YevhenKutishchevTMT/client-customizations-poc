import type { ComponentType } from 'react'
import type { SlotId, SlotPropsMap } from './types'
import { getOverride } from './registry'

export function withOverride<Id extends SlotId>(id: Id) {
  return function wrap(Original: ComponentType<SlotPropsMap[Id]>) {
    return function SlotComponent(props: SlotPropsMap[Id]) {
      const override = getOverride(id)
      const Before = override?.before
      const Replace = override?.replace
      const After = override?.after

      return (
        <>
          {Before && <Before {...props} />}
          {Replace ? <Replace {...props} /> : <Original {...props} />}
          {After && <After {...props} />}
        </>
      )
    }
  }
}
