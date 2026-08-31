export type SlotPropsMap = {
  'todo.counter': { remaining: number; total: number }
}

export type SlotId = keyof SlotPropsMap
