import { withOverride } from '../slots/withOverride'
import type { SlotPropsMap } from '../slots/types'

function TodoCounterBase({ remaining, total }: SlotPropsMap['todo.counter']) {
  return (
    <p className="counter">
      {remaining} of {total} remaining
    </p>
  )
}

export const TodoCounter = withOverride('todo.counter')(TodoCounterBase)
