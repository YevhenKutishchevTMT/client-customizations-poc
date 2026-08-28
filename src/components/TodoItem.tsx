import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className={todo.done ? 'done' : ''}>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span>{todo.text}</span>
      </label>
      <button className="remove" onClick={() => onRemove(todo.id)}>
        ✕
      </button>
    </li>
  )
}
