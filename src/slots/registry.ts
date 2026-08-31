import type { ComponentType } from 'react'
import type { SlotId, SlotPropsMap } from './types'

interface SlotOverride<Id extends SlotId> {
  before?: ComponentType<SlotPropsMap[Id]>
  after?: ComponentType<SlotPropsMap[Id]>
  replace?: ComponentType<SlotPropsMap[Id]>
}

const overrides = new Map<SlotId, SlotOverride<SlotId>>()

export function registerComponentOverride<Id extends SlotId>(
  config: { id: Id } & SlotOverride<Id>,
) {
  const { id, ...override } = config

  if (overrides.has(id)) {
    throw new Error(
      `Slot "${id}" is already registered. Combine before/after/replace in a single registerComponentOverride call for this slot.`,
    )
  }

  overrides.set(id, override as SlotOverride<SlotId>)
}

export function getOverride<Id extends SlotId>(id: Id): SlotOverride<Id> | undefined {
  return overrides.get(id) as SlotOverride<Id> | undefined
}
