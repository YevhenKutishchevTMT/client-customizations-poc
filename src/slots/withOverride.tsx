import type { ComponentType, ReactNode } from 'react'
import type { SlotId, SlotPropsMap } from './types'
import { getOverride } from './registry'

function SlotBefore({ children }: { children: ReactNode }) {
  return <>{children}</>
}
function SlotAfter({ children }: { children: ReactNode }) {
  return <>{children}</>
}
function SlotOriginal({ children }: { children: ReactNode }) {
  return <>{children}</>
}
function SlotReplace({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function withOverride<Id extends SlotId>(id: Id) {
  return function wrap(OriginalComponent: ComponentType<SlotPropsMap[Id]>) {
    function SlotComponent(props: SlotPropsMap[Id]) {
      const override = getOverride(id)
      const Before = override?.before
      const Replace = override?.replace
      const After = override?.after

      return (
        <>
          {Before && (
            <SlotBefore>
              <Before {...props} />
            </SlotBefore>
          )}
          {Replace ? (
            <SlotReplace>
              <Replace {...props} />
            </SlotReplace>
          ) : (
            <SlotOriginal>
              <OriginalComponent {...props} />
            </SlotOriginal>
          )}
          {After && (
            <SlotAfter>
              <After {...props} />
            </SlotAfter>
          )}
        </>
      )
    }

    SlotComponent.displayName = `Slot(${id})`
    return SlotComponent
  }
}
